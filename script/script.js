document.addEventListener('DOMContentLoaded', () => {
    // 1. ANIMAÇÕES DE ENTRADA (Opcional, mas deixa bonito)
    const card = document.querySelector('.login-card');
    const logo = document.querySelector('.main-logo');

    if (card && logo) {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        logo.style.transform = 'translateY(-20px)';
        logo.style.opacity = '0';

        setTimeout(() => {
            logo.style.transition = 'all 0.8s ease';
            logo.style.transform = 'translateY(0)';
            logo.style.opacity = '1';
        }, 200);

        setTimeout(() => {
            card.style.transition = 'all 0.5s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, 500);
    }

    // 2. LÓGICA DE LOGIN E REDIRECIONAMENTO COM A TECLA ENTER
    const form = document.getElementById('loginForm');
    
    if (form) {
        // O evento 'submit' escuta tanto o clique no botão quanto a tecla Enter!
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede que a página recarregue
            
            const button = document.querySelector('.btn-submit');
            button.innerText = "Acessando..."; // Dá um feedback visual
            button.style.opacity = "0.8";

            // Aguarda 1 segundinho e manda para a página principal
            setTimeout(() => {
                // ATENÇÃO: Ajuste o caminho abaixo dependendo de onde está o seu dashboard.
                // Se estiver na mesma pasta raiz, use '/principal.html'
                // Se estiver dentro de uma pasta, use '/pages/principal.html', etc.
                window.location.href = 'principal.html'; 
            }, 1000);
        });
    }
});