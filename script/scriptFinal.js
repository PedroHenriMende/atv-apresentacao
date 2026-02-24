document.addEventListener('DOMContentLoaded', () => {
    // Cronômetro simples
    let timerDisplay = document.getElementById('timerDisplay');
    let playBtn = document.getElementById('playTimer');
    
    let seconds = 0;
    let interval = null;
    let isPlaying = false;

    function updateTimer() {
        seconds++;
        let hrs = Math.floor(seconds / 3600);
        let mins = Math.floor((seconds - (hrs * 3600)) / 60);
        let secs = seconds % 60;

        // Formata para 00:00:00
        hrs = hrs.toString().padStart(2, '0');
        mins = mins.toString().padStart(2, '0');
        secs = secs.toString().padStart(2, '0');

        timerDisplay.innerText = `${hrs}:${mins}:${secs}`;
    }

    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            clearInterval(interval);
            playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            playBtn.style.background = '#555';
        } else {
            interval = setInterval(updateTimer, 1000);
            playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            playBtn.style.background = '#d9534f'; // Fica vermelho no pause
        }
        isPlaying = !isPlaying;
    });

    // Efeito de conclusão
    const btnFinalizar = document.querySelector('.btn-finalizar-os');
    btnFinalizar.addEventListener('click', () => {
        btnFinalizar.innerText = "Salvando...";
        btnFinalizar.style.opacity = "0.7";
        setTimeout(() => {
            alert("Ordem de Serviço finalizada com sucesso!");
            window.location.href = "principal.html"; // Volta para o Dashboard
        }, 1000);
    });
});
// ====== LÓGICA DO QUADRO DE ASSINATURA ======
const canvas = document.getElementById('signatureCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;

// Configuração do traço da caneta
ctx.lineWidth = 2;
ctx.lineCap = 'round';
ctx.strokeStyle = '#000000';

// Função para iniciar o desenho
function startPosition(e) {
    isDrawing = true;
    draw(e);
}

// Função para parar o desenho
function endPosition() {
    isDrawing = false;
    ctx.beginPath(); // Reseta o caminho para não conectar linhas soltas
}

// Função principal de desenho
function draw(e) {
    if (!isDrawing) return;

    // Impede o comportamento padrão de rolagem de tela apenas quando estiver desenhando
    e.preventDefault();

    // Pega a posição correta considerando se é mouse ou toque na tela (mobile)
    let clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    let clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

    // Ajusta a posição em relação ao canvas na tela
    const rect = canvas.getBoundingClientRect();
    
    // O ajuste do scale corrige distorções se o CSS redimensionar o canvas
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Eventos para Mouse (Computador)
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseleave', endPosition);

// Eventos para Touch (Celular e Tablet)
canvas.addEventListener('touchstart', startPosition, { passive: false });
canvas.addEventListener('touchend', endPosition);
canvas.addEventListener('touchmove', draw, { passive: false });

// Lógica do botão de Limpar
const btnClear = document.getElementById('clearSignature');
btnClear.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});