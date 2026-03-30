from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, database
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="Stellar Academy API")

# Enable CORS for Frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Schemas for validation
class LoginRequest(BaseModel):
    username: str
    password: str
    is_admin: bool

class LeaveRequest(BaseModel):
    roll_no: str
    name: str
    reason: str
    date: str

class FeeToggleRequest(BaseModel):
    roll_no: str

class AttendanceMarkRequest(BaseModel):
    roll_no: str
    status: str # Present/Absent

class RegisterStudentRequest(BaseModel):
    roll_no: str
    name: str
    password: str
    class_grade: str

# Routes
@app.get("/")
def read_root():
    return {"message": "Stellar Academy API is LIVE"}

# Login Route
@app.post("/login")
def login(req: LoginRequest, db: Session = Depends(database.get_db)):
    if req.is_admin:
        if req.username == "admin" and req.password == "admin123":
            return {"role": "ADMIN", "name": "Administrator"}
        raise HTTPException(status_code=401, detail="Invalid Admin credentials")
    
    student = db.query(models.Student).filter(models.Student.roll_no == req.username).first()
    if student and student.password == req.password:
        return {
            "role": "STUDENT",
            "name": student.name,
            "roll_no": student.roll_no,
            "class": student.class_grade,
            "fee_status": student.fee_status,
            "attendance": student.attendance_pct
        }
    raise HTTPException(status_code=401, detail="Invalid Student credentials")

# Get Students by Class (Admin)
@app.get("/students/{class_grade}")
def get_students_by_class(class_grade: str, db: Session = Depends(database.get_db)):
    students = db.query(models.Student).filter(models.Student.class_grade == class_grade).all()
    return students

# Submit Leave (Student)
@app.post("/leaves/submit")
def submit_leave(req: LeaveRequest, db: Session = Depends(database.get_db)):
    db_leave = models.LeaveApplication(
        student_roll=req.roll_no,
        student_name=req.name,
        reason=req.reason,
        date=req.date
    )
    db.add(db_leave)
    db.commit()
    return {"status": "Leave submitted"}

# Get All Pendings (Admin)
@app.get("/admin/leaves")
def get_pending_leaves(db: Session = Depends(database.get_db)):
    return db.query(models.LeaveApplication).filter(models.LeaveApplication.status == "Pending").all()

# Mark Attendance (Admin)
@app.post("/admin/attendance")
def mark_attendance(req: AttendanceMarkRequest, db: Session = Depends(database.get_db)):
    student = db.query(models.Student).filter(models.Student.roll_no == req.roll_no).first()
    if not student: raise HTTPException(status_code=404, detail="Student not found")
    
    curr = int(student.attendance_pct.replace('%',''))
    if req.status == "Present": curr = min(100, curr + 1)
    else: curr = max(0, curr - 1)
    
    student.attendance_pct = str(curr) + "%"
    db.commit()
    return {"new_attendance": student.attendance_pct}

# Toggle Fee (Admin)
@app.post("/admin/fees")
def toggle_fee(req: FeeToggleRequest, db: Session = Depends(database.get_db)):
    student = db.query(models.Student).filter(models.Student.roll_no == req.roll_no).first()
    if not student: raise HTTPException(status_code=404, detail="Student not found")
    
    student.fee_status = "PAID" if student.fee_status == "UNPAID" else "UNPAID"
    db.commit()
    return {"new_fee_status": student.fee_status}

# Add New Student (Admin)
@app.post("/admin/students/add")
def register_student(req: RegisterStudentRequest, db: Session = Depends(database.get_db)):
    # Check if exists
    exists = db.query(models.Student).filter(models.Student.roll_no == req.roll_no).first()
    if exists: raise HTTPException(status_code=400, detail="Roll No already exists")
    
    db_student = models.Student(
        roll_no=req.roll_no,
        name=req.name,
        password=req.password,
        class_grade=req.class_grade
    )
    db.add(db_student)
    db.commit()
    return {"status": "Student registered successfully"}

# Init Database (Optional - to seed initial bache)
@app.post("/init-db")
def init_db(db: Session = Depends(database.get_db)):
    try:
        # Create tables explicitly
        models.Base.metadata.create_all(bind=database.engine)
        
        # Seed 1 student if empty
        if db.query(models.Student).count() == 0:
            s1 = models.Student(roll_no="10234", name="Jane Smith", password="p123", class_grade="10", attendance_pct="94%")
            s2 = models.Student(roll_no="9001", name="Ali Ahmed", password="p123", class_grade="9", attendance_pct="90%")
            db.add(s1)
            db.add(s2)
            db.commit()
            return {"status": "Tables created and seeded!"}
        return {"status": "Already seeded"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
