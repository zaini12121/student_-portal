# Stellar Academy Student Portal

A professional-grade, full-stack student management portal built with a modern web stack. Features a sleek, interactive frontend and a robust Python-based backend powered by serverless PostgreSQL.

## 🚀 Key Features
- **🔑 Role-based Authentication**: Secure portals for both Students and Administrators.
- **📚 Academic Management**: Class-wise student records with instant "Folder-style" filtering.
- **💎 Premium UI**: Glassmorphism, dark mode, and smooth animations with Outfit typography.
- **💵 Fee Tracking**: Real-time status toggles for monthly fees.
- **📅 Attendance System**: One-click "Present/Absent" markings in the Admin panel.
- **✉️ Leave Management**: Students can submit leave requests; Admins can review and approve them.
- **🔍 Advanced Search**: Filter students by Name or Roll No instantly.
- **⚡ Performance**: Powered by **FastAPI** and **Neon PostgreSQL**.

## 🛠️ Tech Stack
- **Frontend**: HTML5, Vanilla CSS3 (Glassmorphism), Modular JavaScript (ES6+), Font Awesome.
- **Backend**: Python 3, FastAPI, SQLAlchemy (ORM), Uvicorn.
- **Database**: Neon (Serverless PostgreSQL).

## 📂 Project Structure
```text
/
├── assets/
│   ├── css/ (Stunning styles)
│   └── js/ (Auth, Admin, Student modules)
├── backend/
│   ├── main.py (API Routes)
│   ├── models.py (SQL Schema)
│   └── database.py (Neon Config)
├── index.html (Main Entry)
└── README.md
```

## 🛠️ Installation & Setup
1. **Clone the Repo**:
   ```bash
   git clone [Your-Repo-Link]
   cd student-portal
   ```
2. **Install Dependencies**:
   ```bash
   pip install fastapi "uvicorn[standard]" sqlalchemy psycopg2-binary python-dotenv
   ```
3. **Database Setup**:
   - Create a project on [Neon.tech](https://neon.tech).
   - Create a `backend/.env` file and add your `DATABASE_URL`.
4. **Run the Server**:
   ```bash
   python -m uvicorn backend.main:app --reload --port 8080
   ```
5. **Open index.html**: Just open `index.html` in your favorite browser!

---
Developed by **[Your Name]** 🎓✨
