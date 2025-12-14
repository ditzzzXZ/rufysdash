// ======================
// GAME STATE - SEMUA DATA GAME DI SINI
// ======================
let oldName, oldCountry;
let remainingTime = 15 * 60; // 15 menit dalam detik
let deletedTraces = 0;
let photos = [];
let activeId = null;
let hasTicket = false;
let textSpeed = 100;
let timerInterval;
let dbClues = {
    db1: { clue: "CELAH ADA DI db-leak.net → CARI KODE 'HCK-001'", hacked: false },
    db2: { clue: "CELAH ADA DI data-archive.org → CARI KODE 'HCK-002'", hacked: false },
    db3: { clue: "CELAH ADA DI server-log.net → CARI KODE 'HCK-003'", hacked: false }
};

// ======================
// DRAG JENDELA APLIKASI
// ======================
let draggedWindow, offsetX, offsetY;

function startDrag(e, window) {
    draggedWindow = window;
    const rect = window.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    document.addEventListener('mousemove', dragWindow);
    document.addEventListener('mouseup', stopDrag);
}

function dragWindow(e) {
    if (draggedWindow) {
        draggedWindow.style.left = `${e.clientX - offsetX}px`;
        draggedWindow.style.top = `${e.clientY - offsetY}px`;
    }
}

function stopDrag() {
    draggedWindow = null;
    document.removeEventListener('mousemove', dragWindow);
    document.removeEventListener('mouseup', stopDrag);
}

// ======================
// MANAJEMEN LAYAR & POPUP
// ======================
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
    document.getElementById(screenId).style.display = 'flex';
}

function showPopup(popupId) {
    document.getElementById(popupId).style.display = 'block';
    clearInterval(timerInterval
