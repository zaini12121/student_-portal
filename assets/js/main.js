/* Main Entry & Navigation */
const loginView = document.getElementById('loginView');
const classSelectionView = document.getElementById('classSelectionView');
const dashboardView = document.getElementById('dashboardView');
const adminView = document.getElementById('adminView');

// Backend API Base URL
const API_BASE = "http://127.0.0.1:8080";

function showView(viewId) {
    loginView.classList.add('hidden');
    classSelectionView.classList.add('hidden');
    dashboardView.classList.add('hidden');
    adminView.classList.add('hidden');

    if (viewId === 'login') loginView.classList.remove('hidden');
    else if (viewId === 'classSelection') classSelectionView.classList.remove('hidden');
    else if (viewId === 'dashboard') { 
        dashboardView.classList.remove('hidden'); 
        renderDashboard(); 
    }
    else if (viewId === 'admin') { 
        adminView.classList.remove('hidden'); 
        renderAdminDashboard(); 
    }
}

// Initial state
window.onload = () => {
    console.log("Portal initialized with Backend support.");
};
