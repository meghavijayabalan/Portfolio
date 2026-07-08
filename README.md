# Megha Raj V S — Portfolio (React + FastAPI)

This is a modern, high-performance portfolio application built for Megha Raj V S (Data Scientist & AI Engineer), featuring a React frontend and a FastAPI backend with a "Vein-Green" neuron theme.

## Architecture

- **Frontend**: React 19, CRACO, Tailwind CSS, and Radix/shadcn UI components. Features interactive mouse-controlled 3D parallax effects, responsive grid sections, dark/light theme switching, and custom particle background animations.
- **Backend**: FastAPI (Python) serving API endpoints, supporting database connections and test configurations.

---

## 1. Project Structure

- `frontend/`: The React application codebase.
  - `src/components/`: Core components like `Portfolio.jsx`, `NeuralCanvas.jsx`, and `PortraitVortex.jsx`.
  - `src/data/portfolio.js`: Single source of truth for all text and resume data displayed in the frontend.
- `backend/`: The FastAPI backend codebase.
  - `server.py`: FastAPI server setup with `/api` routers and database hooks.
- `tests/`: Automated pytest suites for backend validation.

---

## 2. Running the Application

### Running the Frontend
```bash
cd frontend
yarn install
yarn start    # runs the React app on http://localhost:3000
```

### Running the Backend
1. Create a virtual environment and install backend requirements:
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate
pip install -r requirements.txt
```
2. Configure `.env` file inside `backend/` directory using the provided env variables.
3. Start the FastAPI server:
```bash
uvicorn server:app --reload --port 8000
```
The FastAPI documentation will be available at `http://localhost:8000/docs`.

---

## 3. Legacy Flask Monolith

The legacy Flask implementation files are still retained in the root directory for reference:
- `app.py`: Flask entrypoint.
- `chatbot.py` & `profile_data.py`: Rule-based chatbot and static resume data dictionary.
- `templates/` & `static/`: HTML template and legacy CSS/JS files.
