/* script.js */
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
}

function openModal(modalId) {
    const overlay = document.getElementById('overlay');
    const modal = document.getElementById(modalId);
    
    overlay.style.display = 'block';
    // Timeout para garantir que a transição de opacidade/escala ocorra
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function closeAllModals() {
    const overlay = document.getElementById('overlay');
    const modals = document.querySelectorAll('.floating-card');
    
    overlay.style.display = 'none';
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
}

function showSection(sectionId, navLink) {
    const sections = document.querySelectorAll('.content-section');
    const navTabs = document.querySelectorAll('.nav-tab');

    sections.forEach(section => {
        section.classList.remove('active');
    });

    navTabs.forEach(tab => {
        tab.classList.remove('active');
    });

    document.getElementById(sectionId).classList.add('active');
    navLink.classList.add('active');
}

function selectTask(element) {
    element.classList.toggle('selected');
}

function markTaskAsDone(event, button) {
    event.stopPropagation();
    const taskCard = button.closest('.task-card');
    taskCard.classList.toggle('done');
}

function deleteTask(event, button) {
    event.stopPropagation();
    const taskCard = button.closest('.task-card');
    taskCard.remove();
}

function deleteContact(button) {
    const contactItem = button.closest('.contact-item');
    contactItem.remove();
}
