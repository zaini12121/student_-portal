from sqlalchemy import Column, Integer, String, Date, ForeignKey, Float
from sqlalchemy.orm import relationship
from .database import Base

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    roll_no = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    password = Column(String, nullable=False)
    class_grade = Column(String, nullable=False)  # 9, 10, 11, 12
    fee_status = Column(String, default="UNPAID") # PAID/UNPAID
    attendance_pct = Column(String, default="0%")

    # Relationships
    fees = relationship("FeeHistory", back_populates="student")

class FeeHistory(Base):
    __tablename__ = "fee_history"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    month = Column(String)
    invoice = Column(String)
    amount = Column(String)
    status = Column(String)
    date_paid = Column(String, default="-")

    student = relationship("Student", back_populates="fees")

class LeaveApplication(Base):
    __tablename__ = "leave_applications"

    id = Column(Integer, primary_key=True, index=True)
    student_roll = Column(String, nullable=False)
    student_name = Column(String, nullable=False)
    reason = Column(String, nullable=False)
    date = Column(String, nullable=False) # Store as string for simplicity
    status = Column(String, default="Pending") # Pending/Approved
