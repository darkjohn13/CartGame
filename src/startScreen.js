function renderStartBlock() {
    app.appendChild(templateEngine(startScreenTemplate));

    const diffButtons = document.querySelector('.start-screen__diff-holder');
    diffButtons.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.target;

        if (target.tagName === 'BUTTON') {
            window.application.gameDifficulty = target.textContent;
            Array.from(diffButtons.children).forEach((child) =>
                child.classList.remove('start-screen__diff-changer_current')
            );
            target.classList.add('start-screen__diff-changer_current');
        }
    });

    const startButton = document.querySelector('.start-screen__button');
    startButton.addEventListener('click', (event) => {
        event.preventDefault();
        window.application.renderScreen('gameScreen');
    });
}
window.application.blocks['startBlock'] = renderStartBlock;

function renderStartScreen() {
    window.application.renderBlock('startBlock', app);
}
window.application.screens['startScreen'] = renderStartScreen;

const startScreenTemplate = {
    tag: 'div',
    cls: 'start-screen',
    content: [
        {
            tag: 'div',
            cls: 'start-screen__title',
            content: 'Выберите сложность',
        },
        {
            tag: 'form',
            cls: 'start-screen__form',
            content: [
                {
                    tag: 'div',
                    cls: 'start-screen__diff-holder',
                    content: [
                        {
                            tag: 'button',
                            cls: [
                                'start-screen__diff-changer',
                                'start-screen__diff-changer_current',
                            ],
                            content: '1',
                        },
                        {
                            tag: 'button',
                            cls: 'start-screen__diff-changer',
                            content: '2',
                        },
                        {
                            tag: 'button',
                            cls: 'start-screen__diff-changer',
                            content: '3',
                        },
                    ],
                },
                {
                    tag: 'button',
                    cls: ['start-screen__button', 'button'],
                    content: 'Старт',
                },
            ],
        },
    ],
};

window.application.renderScreen('startScreen');
