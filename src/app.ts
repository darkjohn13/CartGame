type render = {
    [key: string]: Function;
};

interface appplicationType {
    blocks: render;
    screens: render;
    timer: string;
    app: HTMLElement;
    gameDifficulty: number;
    iter: number;
    renderScreen: (screenName: string) => void;
    renderBlock: (blockName: string, container: HTMLElement) => void;
}

export const application: appplicationType = {
    blocks: {},
    screens: {},
    timer: '',
    app: document.querySelector('.app'),
    gameDifficulty: 1,
    iter: 0,

    renderScreen: function (screenName) {
        if (this.screens[screenName]) {
            this.app.innerHTML = '';
            this.screens[screenName]();
        } else {
            console.warn(`Screen "${screenName}" does not exist`);
        }
    },
    renderBlock: function (blockName, container) {
        if (this.blocks[blockName]) {
            this.blocks[blockName](container);
        } else {
            console.warn(`Block "${blockName}" does not exist`);
        }
    },
};
