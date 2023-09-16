import './css/style.css';
import { application } from './app';
import { templateEngine } from './lib/template-engine';

const app: HTMLElement = application.app;

function endGameMainBlock() {
    app.appendChild(
        templateEngine({
            tag: 'div',
            cls: 'endgame-mainblock',
            content: [
                {
                    tag: 'div',
                    cls: 'endgame-mainblock__image',
                },
                {
                    tag: 'h1',
                    cls: 'endgame-mainblock__title',
                    content: 'Вы выиграли!',
                },
                {
                    tag: 'p',
                    cls: 'endgame-mainblock__timetitle',
                    content: 'Затраченное время:',
                },
                {
                    tag: 'div',
                    cls: 'endgame-mainblock__time',
                    content: application.timer,
                },
                {
                    tag: 'button',
                    cls: 'button',
                    content: 'Играть снова',
                },
            ],
        })
    );
    const againButton = document.querySelector('.button');
    againButton.addEventListener('click', (event) => {
        event.preventDefault();
        application.gameDifficulty = '1';
        application.renderScreen('startScreen');
    });
}
application.blocks['endGameMainBlock'] = endGameMainBlock;

function renderEndGameScreen() {
    application.renderBlock('endGameMainBlock', application);
}
application.screens['endGameMainScreen'] = renderEndGameScreen;

application.renderScreen('endGameMainScreen');
