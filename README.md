# Indian Pagris Web Application

A web application showcasing different types of traditional Indian turbans (pagris), their cultural significance, and tying instructions.

## Features

- Browse a gallery of traditional Indian pagris
- View detailed information about each pagri
- Learn about historical significance and cultural value
- Step-by-step tying instructions
- Search functionality
- Responsive design

## Tech Stack

- Frontend: React.js with Material-UI
- Backend: FastAPI (Python)
- Database: MongoDB

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- MongoDB

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start the backend server:
```bash
python main.py
```

The backend will run on http://localhost:8000

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on http://localhost:3000

## Project Structure

```
project/
├── backend/
│   ├── main.py
│   ├── seed_data.py
│   └── requirements.txt
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── utils/
    └── package.json
```

## Contributing

Feel free to submit issues and enhancement requests. 