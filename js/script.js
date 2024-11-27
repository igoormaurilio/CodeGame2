const modal = document.getElementById('modal');
const openModalButton = document.getElementById('openModal');
const closeModalButton = document.getElementById('closeModal');

openModalButton.addEventListener('click', () => {
    modal.classList.add('show');
});

closeModalButton.addEventListener('click', () => {
    modal.classList.remove('show');
});

// Fecha a modal clicando fora do conteúdo
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});