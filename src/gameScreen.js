import './css/style.css';
import { application } from './app';
import { templateEngine } from './lib/template-engine';

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
        application.gameDifficulty = '1';
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
    }, 1000);
}

function renderGameMainBlock() {
    const divCards = document.createElement('div');
    divCards.classList.add('game');
    application.app.appendChild(divCards);

    const numberOfCards = application.gameDifficulty * 6;

    function getRandomCard() {
        const cardNumber = Math.floor(1 + Math.random() * 36);
        return cardNumber;
    }

    const arrCard = [];

    for (let i = 0; i < numberOfCards / 2; i++) {
        let cardNumber = getRandomCard();
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
        const card = document.createElement('div');
        card.classList.add('card');
        card.id = arrCard[i];

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

    const flipCard = (card) => {
        if (!card.classList.contains('flip')) {
            card.classList.add('flip');
            application.iter++;
        }
    };
    const flipCardBack = (card) => {
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

    const flipCardClick = (event) => {
        const target = event.target.parentElement;
        flipCard(target);
        setTimeout(500);
    };
    const compareCards = () => {
        const flippedCards = document.querySelectorAll('.flip');
        if (
            flippedCards.length === 2 &&
            flippedCards[0].id === flippedCards[1].id
        ) {
            setTimeout(() => {
                flippedCards[0].firstChild.classList.add('card-i');
                flippedCards[1].firstChild.classList.add('card-i');
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
            if (game.children.length === 0) alert('вы выиграли');
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
