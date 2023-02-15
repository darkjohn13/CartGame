function renderGameSubBlock() {
    app.appendChild(
        templateEngine({
            tag: 'div',
            cls: 'game-sub-block',
            content: [
                {
                    tag: 'div',
                    cls: 'game-sub-block__box',
                    content: [
                        {
                            tag: 'div',
                            cls: 'game-sub-block__time-box',
                            content: [
                                {
                                    tag: 'label',
                                    content: 'min',
                                },
                                {
                                    tag: 'label',
                                    content: 'sec',
                                },
                            ],
                        },
                        {
                            tag: 'div',
                            cls: 'game-sub-block__timer',
                            content: `00:00`,
                        },
                    ],
                },
                {
                    tag: 'button',
                    cls: ['game-sub-block__button', 'button'],
                    content: 'Начать заново',
                },
            ],
        })
    );
    stopWatchHolder();

    const againButton = document.querySelector('.game-sub-block__button');
    againButton.addEventListener('click', (event) => {
        event.preventDefault();
        window.application.renderScreen('startScreen');
    });
}
window.application.blocks['gameSubBlock'] = renderGameSubBlock;

function stopWatchHolder() {
    let sec = 0;
    let min = 0;
    const container = document.querySelector('.game-sub-block__timer');
    window.application.timer = setInterval(() => {
        if (sec % 60 === 0 && sec !== 0) {
            min++;
            sec = 0;
        }
        sec++;

        container.textContent =
            (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec);
    }, 1000);
}

function renderGameMainBlock() {}
window.application.blocks['gameMainBlock'] = renderGameMainBlock;

function renderGameScreen() {
    window.application.renderBlock('gameSubBlock', app);
    const h1 = document.createElement('h1');
    h1.textContent = 'здесь будет экран игры';
    app.appendChild(h1);
    console.warn(`game diff = ${window.application.gameDifficulty}`);
}
window.application.screens['gameScreen'] = renderGameScreen;
