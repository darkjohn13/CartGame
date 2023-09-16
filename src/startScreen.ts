import './css/style.css';
import { application } from './app';
import { templateEngine } from './lib/template-engine';
import './gameScreen';
import { node } from 'webpack';

const app: HTMLElement = application.app;

function renderStartBlock() {
    app.appendChild(templateEngine(startScreenTemplate));

    const diffButtons: HTMLElement = document.querySelector(
        '.start-screen__diff-holder'
    );
    diffButtons?.addEventListener('click', (event: any) => {
        event.preventDefault();
        const target: HTMLElement = event.target;

        if (target.tagName === 'BUTTON') {
            application.gameDifficulty = target.textContent;
            Array.from(diffButtons.children).forEach((child) =>
                child.classList.remove('start-screen__diff-changer_current')
            );
            target.classList.add('start-screen__diff-changer_current');
        }
    });

    const startButton: HTMLElement = document.querySelector(
        '.start-screen__button'
    );
    startButton?.addEventListener('click', (event) => {
        event.preventDefault();
        application.renderScreen('gameScreen');
    });
}
application.blocks['startBlock'] = renderStartBlock;

function renderStartScreen() {
    application.renderBlock('startBlock', app);
}
application.screens['startScreen'] = renderStartScreen;

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

application.renderScreen('startScreen');
