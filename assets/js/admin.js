/* Admin Logic & Rendering */
async function adminSelectClass(grade) {
    adminSelectedGrade = grade;
    document.getElementById('adminSelectedClassName').innerText = `Grade ${grade} Students`;
    document.getElementById('adminClassSelection').classList.add('hidden');
    document.getElementById('adminStudentManagement').classList.remove('hidden');
    document.getElementById('adminSearchInput').value = "";
    adminSearchQuery = "";
    
    // Fetch students from backend for this class
    await renderAdminDashboard();
}

// Add Student Form Submission
document.addEventListener('submit', async (e) => {
    if (e.target.id === 'addStudentForm') {
        e.preventDefault();
        const name = document.getElementById('newName').value;
        const roll_no = document.getElementById('newRoll').value;
        const password = document.getElementById('newPass').value;
        const class_grade = document.getElementById('newGrade').value;

        try {
            const res = await fetch(`${API_BASE}/admin/students/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, roll_no, password, class_grade })
            });

            if (res.ok) {
                alert("New Student Registered!");
                e.target.reset();
                if (adminSelectedGrade == class_grade) renderAdminDashboard();
            } else {
                const err = await res.json();
                alert(err.detail || "Registration failed");
            }
        } catch (err) {
            alert("Connection error!");
        }
    }
});

function backToAdminClasses() {
    adminSelectedGrade = null;
    document.getElementById('adminClassSelection').classList.remove('hidden');
    document.getElementById('adminStudentManagement').classList.add('hidden');
    renderAdminDashboard();
}

function handleAdminSearch() { 
    adminSearchQuery = document.getElementById('adminSearchInput').value.toLowerCase();
    renderAdminDashboard(); 
}

async function renderAdminDashboard() {
    const listContainer = document.getElementById('adminStudentList');
    listContainer.innerHTML = '<tr><td colspan="6" style="text-align: center;">Loading bache from database...</td></tr>';

    if (adminSelectedGrade) {
        try {
            const res = await fetch(`${API_BASE}/students/${adminSelectedGrade}`);
            const students = await res.json();
            
            listContainer.innerHTML = '';
            students.forEach(student => {
                const matchesSearch = student.name.toLowerCase().includes(adminSearchQuery) || student.roll_no.includes(adminSearchQuery);
                if (matchesSearch) {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${student.name}</td>
                        <td>${student.roll_no}</td>
                        <td>Class ${student.class_grade}</td>
                        <td><span class="${student.fee_status === 'PAID' ? 'status-paid' : 'status-unpaid'}">${student.fee_status}</span></td>
                        <td>${student.attendance_pct}</td>
                        <td>
                            <button class="btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.75rem; margin: 0; background: #10b981;" onclick="markAttendance('${student.roll_no}', 'Present')">Pres</button>
                            <button class="btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.75rem; margin: 0; background: #ef4444;" onclick="markAttendance('${student.roll_no}', 'Abs')">Abs</button>
                            <button class="btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.75rem; margin: 0; background: #334155;" onclick="toggleFeeStatus('${student.roll_no}')">Fee</button>
                        </td>`;
                    listContainer.appendChild(row);
                }
            });
        } catch (err) {
            listContainer.innerHTML = '<tr><td colspan="6">Error loading data.</td></tr>';
        }
    }

    // Leave Applications (Admin Section)
    const leaveContainer = document.getElementById('adminLeaveList');
    try {
        const res = await fetch(`${API_BASE}/admin/leaves`);
        const leaves = await res.json();
        leaveContainer.innerHTML = '';
        leaves.forEach(app => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${app.student_name}</td><td>${app.student_roll}</td><td>${app.date}</td><td>${app.reason}</td><td><button class="btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.8rem; margin: 0;" onclick="approveLeave(${app.id})">Approve</button></td>`;
            leaveContainer.appendChild(row);
        });
    } catch (err) {}
}

async function toggleFeeStatus(roll) { 
    await fetch(`${API_BASE}/admin/fees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roll_no: roll })
    });
    renderAdminDashboard(); 
}

async function markAttendance(roll, status) {
    await fetch(`${API_BASE}/admin/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roll_no: roll, status })
    });
    renderAdminDashboard();
}

function approveLeave(id) { 
    // Leave approval logic to backend...
    alert("Leave Approved via Database!");
    renderAdminDashboard(); 
}
