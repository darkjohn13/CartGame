export const application: any = {
    blocks: {},
    screens: {},
    timer: '',
    app: document.querySelector('.app'),
    gameDifficulty: '1',
    iter: 0,

    renderScreen: function (screenName: string) {
        if (this.screens[screenName]) {
            this.app.innerHTML = '';
            this.screens[screenName]();
        } else {
            console.warn(`Screen "${screenName}" does not exist`);
        }
    },
    renderBlock: function (blockName: string, container: HTMLElement) {
        if (this.blocks[blockName]) {
            this.blocks[blockName](container);
        } else {
            console.warn(`Block "${blockName}" does not exist`);
        }
    },
};
