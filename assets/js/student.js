/* Student View Functions */
document.addEventListener('submit', async (e) => {
    if (e.target.id === 'leaveApplicationForm') {
        e.preventDefault();
        const reason = document.getElementById('leaveReason').value;
        const date = document.getElementById('leaveDate').value;
        
        try {
            const res = await fetch(`${API_BASE}/leaves/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    roll_no: currentUser.roll_no, 
                    name: currentUser.name, 
                    reason, 
                    date 
                })
            });

            if(res.ok) {
                alert("Leave application submitted successfully to Admin!");
                e.target.reset();
            }
        } catch (err) {
            alert("Submission failed!");
        }
    }
});

function selectClass(grade) {
    selectedClass = grade;
    showView('dashboard');
}

async function renderDashboard() {
    if (!currentUser || currentUser.role === 'ADMIN') return;
    
    // Update basic profile
    const avatarName = currentUser.name.split(' ').map(n=>n[0]).join('');
    document.getElementById('avatarName').innerText = avatarName;
    document.getElementById('studentNameDisplay').innerText = currentUser.name;
    document.getElementById('studentClassDisplay').innerText = `Grade ${selectedClass || currentUser.class} | Roll: ${currentUser.roll_no}`;
    
    // Set current month
    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    document.getElementById('currentMonth').innerText = currentMonth;

    // Fee Status from current user object (initially fetched from /login)
    const feeStatusDiv = document.getElementById('feeStatusValue');
    if (currentUser.fee_status === 'PAID') {
        feeStatusDiv.innerHTML = `PAID <i class="fas fa-check-circle status-paid"></i>`;
    } else {
        feeStatusDiv.innerHTML = `UNPAID <i class="fas fa-exclamation-circle status-unpaid"></i>`;
    }

    document.getElementById('attendanceValue').innerHTML = `${currentUser.attendance} <i class="fas fa-chart-line" style="color: #6366f1;"></i>`;

    // History Table
    const tableBody = document.getElementById('feeHistoryBody');
    tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Wait for history (backend)...</td></tr>';
}
