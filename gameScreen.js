function renderGameScreen(){
    const h1 = document.createElement('h1');
    h1.textContent = 'здесь будет экран игры';
    app.appendChild(h1);
    console.warn(`game diff = ${window.application.gameDifficulty}`);
}
window.application.screens['gameScreen'] = renderGameScreen;