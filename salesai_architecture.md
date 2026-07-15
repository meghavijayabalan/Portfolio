# SalesAI — Enterprise Site-Feasibility & Proposal Architecture

This document describes the design, pipeline flow, and technical modules of **SalesAI**, ChargeMOD's agentic chatbot for site-feasibility assessment and branded proposal generation.

---

## 🎨 Visual System Architecture Diagram

The visual diagram showcases the interaction between the API Gateway, auth/rate-limiting middlewares, CrewAI orchestrator flow, tool registry integrations, persistent database systems, and background scheduling.

![SalesAI System Architecture Diagram](C:\Users\admin\.gemini\antigravity-ide\brain\29bf79d5-74ad-4c37-8b77-9aed4ffe8451\salesai_architecture_1783772349304.png)

---

## 📊 Detailed System flow (Mermaid)

The interactive Mermaid chart below traces a client request through the system. User inputs are authed and rate-limited at the gate before invoking the CrewAI parameter extraction flow, running calculations inside dedicated packages, compiling docx/pdf proposals, and reporting telemetry:

```mermaid
graph TD
    %% Define styles
    classDef client fill:#0d1117,stroke:#30363d,stroke-width:2px,color:#c9d1d9;
    classDef core fill:#1e293b,stroke:#f97316,stroke-width:2px,color:#f8fafc;
    classDef tool fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#e2e8f0;
    classDef storage fill:#090d16,stroke:#10b981,stroke-width:2px,color:#e2e8f0;
    classDef obs fill:#2e1515,stroke:#ef4444,stroke-width:2px,color:#f8fafc;

    %% Elements
    UI[HTML / JS Client Widget]:::client
    API[FastAPI Gateway]:::core
    Auth[Auth Middleware Depends]:::core
    RateLim[Rate Limiter Middleware]:::core
    
    subgraph "Orchestration & Flow"
        Flow[CrewAI Flow Manager]:::core
        State[Flow State Serialization]:::storage
        Prompt[Prompt Builder / Fragments]:::core
        Crew[Sequential Crew: 4 Agents]:::core
    end
    
    subgraph "Tool Packages"
        Geo[Geolocation Service<br>Google Geocoding & Places]:::tool
        Market[Market Analyst Service<br>RTO Distances & EV Regs]:::tool
        Finance[Financial Analyst Service<br>Payback & Matplotlib ROI]:::tool
        Knowledge[Knowledge Search Tool<br>Chroma Specs Search]:::tool
        Proposal[Proposal Service<br>python-docx & reportlab]:::tool
    end

    subgraph "Data Storage"
        Postgres[(PostgreSQL DB<br>Users & EV Counts)]:::storage
        Mongo[(MongoDB<br>Sessions, States & Cache)]:::storage
        Chroma[(ChromaDB<br>Specs & Past Proposals)]:::storage
    end

    Metrics[Prometheus metrics]:::obs
    Logs[structlog JSON Logs]:::obs
    Scheduler[APScheduler Service]:::obs

    %% Paths
    UI -- "1. Send Chat POST /chat/message" --> API
    API --> Auth
    Auth --> RateLim
    RateLim -- "2. Validated Request" --> Flow
    
    Flow -- "3. Get/Update state" --> State
    State -- "motor client" --> Mongo
    
    Flow -- "4. Assemble system prompt" --> Prompt
    Prompt -- "Concatenate fragments" --> Flow
    Flow -- "5. (P1) Flow / (P2) Crew loop" --> Crew
    
    Crew -- "6. Execute actions" --> Geo
    Crew -- "6. Execute actions" --> Market
    Crew -- "6. Execute actions" --> Finance
    Crew -- "6. Execute actions" --> Knowledge
    Crew -- "7. Generate branded files" --> Proposal
    
    %% Storage connections
    Geo -- "Read/Write TTL cache" --> Mongo
    Market -- "Query distance / stats" --> Postgres
    Market -- "Query fleet cross-ref" --> Mongo
    Finance -- "Matplotlib plot ROI" --> Finance
    Knowledge -- "Query documents" --> Chroma
    Proposal -- "Retrieve similar / specs" --> Knowledge
    Proposal -- "Embed ROI plot" --> Proposal
    
    %% Infrastructure tasks
    Scheduler -- "Nightly RTO refresh" --> Postgres
    API --> Metrics
    API --> Logs
```

---

## 🛠️ Deep Dive: Architectural Modules

### 1. Presentation Layer (Static Web Frontend)
*   **Location**: [app/web/](file:///c:/Users/admin/Desktop/SalesAIAgent/SalesAIagent/app/web/) (no framework, no bundler structure).
*   **Files**:
    *   `index.html`: Dark-mode chatbot widget using chargeMOD orange palette `#ED7D31`.
    *   `chat.js`: Establishes the SSE streaming connection, manages chat progress state messages, renders interactive widgets, and provides secure proposal download buttons.
    *   `admin/index.html`: Admin metrics portal with charts fed by FastAPI `/metrics` telemetry.

### 2. API Gateway & Middleware Layer (FastAPI)
*   **Location**: [app/main.py](file:///c:/Users/admin/Desktop/SalesAIAgent/SalesAIagent/app/main.py), [app/middleware/](file:///c:/Users/admin/Desktop/SalesAIAgent/SalesAIagent/app/middleware/)
*   **Lifespan Hook**:
    *   Loads app settings via Pydantic-Settings ([app/platform/config.py](file:///c:/Users/admin/Desktop/SalesAIAgent/SalesAIagent/app/platform/config.py)).
    *   Configures structlog logging, launches SQLAlchemy async engine, initializes collection handles, and mounts APScheduler.
*   **Auth Dependency**:
    *   `auth.py`: Extracts Bearer token or `cm_token` cookie, parses JWT claims (HS256), and yields `UserCtx(user_id, role)`. Dev credentials bypass enabled in non-production.
*   **Rate Limiter Dependency**:
    *   `ratelimit.py`: Sliding-window limiter keeping in-memory track of requests per minute per user ID (Redis-swappable interface).

### 3. Agent Orchestration Layer
*   **Location**: [app/chat/](file:///c:/Users/admin/Desktop/SalesAIAgent/SalesAIagent/app/chat/)
*   **Flow Orchestrator**:
    *   `flow.py` handles the workflow steps: `capture_params` (parsing latitude, longitude, and optional capex inputs) $\rightarrow$ `validate` (verifying location coordinates and prompting clarifications) $\rightarrow$ `confirm` (awaiting user affirmation) $\rightarrow$ `run_analysis` (executing tools synchronously in worker threads) $\rightarrow$ `summarize` $\rightarrow$ `offer_proposal`.
*   **Phase 2 Agent Crew**:
    *   `crew.py` upgrades analysis to a 4-agent Crew (Site Analyst, Market Analyst, Financial Analyst, and Proposal Writer) running sequential tasks with strict token/cost guards.
*   **Flow State Manager**:
    *   `state.py`: Handles mongo serialization and resumption logic of CrewAI flows.

### 4. Tool Service Layer
*   **Location**: [app/tools/](file:///c:/Users/admin/Desktop/SalesAIAgent/SalesAIagent/app/tools/)
*   **Tools**:
    1.  **Geolocation**: Resolves coordinates using Google Maps APIs (cached in MongoDB for 7 days), normalizes connector ratings (CCS2, Type 2, GB-T, etc.), and outputs nearby chargers within 5km and amenities within 1.5km.
    2.  **Market Analysis**: Computes geodesic distances to local RTO coordinates via geopy within 15km, fetches EV registration stats from Postgres, and links fleet datasets.
    3.  **Financial Projections**: Compares target sites against similar benchmarks, calculates payback terms, and compiles Matplotlib ROI line graphs.
    4.  **Knowledge Retrieval**: Queries local persistent ChromaDB collections (`product_specs` and `past_proposals`) to grab specifications.
    5.  **Proposal Writer**: Automatically formats professional Word (`python-docx`) and PDF (`reportlab`) packages incorporating the financial figures and charts.

### 5. Platform Storage Layer
*   **PostgreSQL**: Configured in [app/platform/db.py](file:///c:/Users/admin/Desktop/SalesAIAgent/SalesAIagent/app/platform/db.py). Houses static data: users, RTO tables, and pre-aggregated registration metrics.
*   **MongoDB**: Configured in [app/platform/mongo.py](file:///c:/Users/admin/Desktop/SalesAIAgent/SalesAIagent/app/platform/mongo.py). Holds session history logs, geolocation caches, and active agent flow states.
*   **ChromaDB**: Configured in [app/platform/chroma.py](file:///c:/Users/admin/Desktop/SalesAIAgent/SalesAIagent/app/platform/chroma.py). Embedded local vector databases holding chunks for specifications search.

---

### 6. Background Scheduling & Observability
*   **APScheduler**: Configured in [app/jobs/scheduler.py](file:///c:/Users/admin/Desktop/SalesAIAgent/SalesAIagent/app/jobs/scheduler.py) to run daily data updates and metric cleanups.
*   **Metrics**: Prometheus collector configuration in [app/platform/metrics.py](file:///c:/Users/admin/Desktop/SalesAIAgent/SalesAIagent/app/platform/metrics.py) exporting custom counters and timing statistics.
