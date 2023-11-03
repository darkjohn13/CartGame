import './css/style.css';
import { application } from './app';
import { templateEngine } from './lib/template-engine';
import './endGameScreen';
import { node } from 'webpack';

const app = application.app;

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
        application.gameDifficulty = 1;
        application.renderScreen('startScreen');
    });
}
application.blocks['gameSubBlock'] = renderGameSubBlock;

function stopWatchHolder() {
    let sec = 0;
    let min = 0;
    const container = document.querySelector('.game-sub-block__timer');
    application.timer = setInterval(() => {
        if (sec % 60 === 0 && sec !== 0) {
            min++;
            sec = 0;
        }
        sec++;

        container.textContent =
            (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec);

        application.timer = container.textContent;
    }, 1000).toString();
}

function renderGameMainBlock() {
    const divCards = document.createElement('div');
    divCards.classList.add('game');
    application.app.appendChild(divCards);

    const numberOfCards = application.gameDifficulty * 6;

    function getRandomCard() {
        const cardNumber: number = Math.floor(1 + Math.random() * 36);
        return cardNumber;
    }

    const arrCard: number[] = [];

    for (let i = 0; i < numberOfCards / 2; i++) {
        let cardNumber: number = getRandomCard();
        if (cardNumber !== undefined) {
            if (arrCard.includes(cardNumber)) {
                i--;
            } else {
                arrCard.push(cardNumber);
            }
        }
    }

    arrCard.push(...arrCard);
    arrCard.sort(() => Math.random() - 0.5);
    console.log(arrCard);

    for (let i = 0; i < numberOfCards; i++) {
        const card: HTMLElement = document.createElement('div');
        card.classList.add('card');
        card.id = String(arrCard[i]);

        const back = document.createElement('img');
        back.classList.add('back-face');
        back.src = '../static/cards/shirt.png';

        const front = document.createElement('img');
        front.classList.add('front-face');
        front.src = '../static/cards/' + arrCard[i] + '.png';
        divCards.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);
    }

    const flipCard = (card: Element) => {
        if (
            !card.classList.contains('flip') &&
            card.classList.contains('card')
        ) {
            card.classList.add('flip');
            application.iter++;
        }
    };
    const flipCardBack = (card: Element) => {
        setTimeout(() => card.classList.remove('flip'), 300);
        application.iter = 0;
    };

    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => {
        setTimeout(() => {
            flipCard(card);
        }, 300);

        setTimeout(() => {
            flipCardBack(card);
        }, 2000);
    });

    const flipCardClick = (event: Event) => {
        let target = event.target as HTMLElement;
        target = target.parentElement;
        flipCard(target);
    };
    const compareCards = () => {
        const flippedCards: NodeListOf<Element> =
            document.querySelectorAll('.flip');
        console.log(flippedCards);
        if (flippedCards.length === 2) {
            const div = document.createElement('div');
            div.classList.add('pageCover');
            document.querySelector('.game').appendChild(div);
            setTimeout(() => {
                document
                    .querySelector('.game')
                    .removeChild(document.querySelector('.pageCover'));
            }, 2000);
        }
        if (
            flippedCards.length === 2 &&
            flippedCards[0].id === flippedCards[1].id &&
            flippedCards[0] &&
            flippedCards[1]
        ) {
            setTimeout(() => {
                flippedCards[0].firstElementChild.classList.add('card-i');
                flippedCards[1].firstElementChild.classList.add('card-i');
            }, 1000);
            setTimeout(() => {
                flippedCards[0].parentElement.removeChild(flippedCards[0]);
                flippedCards[1].parentElement.removeChild(flippedCards[1]);
            }, 2000);
        } else {
            if (flippedCards.length === 2) {
                setTimeout(() => {
                    flippedCards.forEach((item) =>
                        item.classList.remove('flip')
                    );
                }, 1000);
            }
        }

        setTimeout(() => {
            let game = document.querySelector('.game');
            if (game.children.length === 0)
                application.renderScreen('endGameMainScreen');
            console.log(game.children.length);
        }, 2100);
    };
    cards.forEach((card) => {
        card.addEventListener('click', flipCardClick);
        card.addEventListener('click', compareCards);
    });
}

application.blocks['gameMainBlock'] = renderGameMainBlock;

function renderGameScreen() {
    application.renderBlock('gameSubBlock', app);
    application.renderBlock('gameMainBlock', app);
    console.warn(`game diff = ${application.gameDifficulty}`);
}
application.screens['gameScreen'] = renderGameScreen;
