/* Authentication Logic */
const loginForm = document.getElementById('loginForm');
const adminToggleBtn = document.getElementById('adminToggleBtn');

function toggleAdminLogin() {
    isAdminMode = !isAdminMode;
    const loginTitle = document.querySelector('#loginView h1');
    const loginPara = document.querySelector('#loginView p');
    if (isAdminMode) {
        loginTitle.innerText = "Admin Portal Login";
        loginPara.innerText = "Authorized access ONLY for faculty and staff";
        adminToggleBtn.innerText = "Login as Student";
    } else {
        loginTitle.innerText = "Welcome Back";
        loginPara.innerText = "Access your stellar academic dashboard";
        adminToggleBtn.innerText = "Login as Administrator";
    }
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password: pass, is_admin: isAdminMode })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.detail || "Login failed");
        }

        currentUser = await response.json();
        
        if (currentUser.role === 'ADMIN') {
            showView('admin');
        } else {
            showView('classSelection');
        }
    } catch (err) {
        alert(err.message);
    }
});

function logout() {
    currentUser = null;
    selectedClass = null;
    adminSelectedGrade = null;
    document.getElementById('loginForm').reset();
    showView('login');
}
