// dashboard.js

// Função simples para alternar o visual das abas ativas
function switchTab(clickedTab) {
    // Pega todos os botões da aba
    const tabs = document.querySelectorAll('.tabs .tab');
    
    // Remove a classe 'active' de todos
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Adiciona a classe 'active' apenas no botão clicado
    clickedTab.classList.add('active');
    
    // Aqui você adicionaria no futuro a lógica para filtrar a lista de OS via backend ou escondendo as divs via JavaScript.
}

// Animação de entrada nas OS para deixar "animadinho"
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.os-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        card.style.transition = `all 0.4s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });
});