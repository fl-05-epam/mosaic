const MIN_NUMBER = 9;
const MAX_NUMBER = 40000;

class Mosaic {
    static minHeight;
    static minWidth;

    constructor(params) {
        this.params = params;
        this.render();
    }

    render() {
        const element = document.createElement('div');
        element.classList.add('mosaic');

        element.innerHTML = '<div class="mosaic__block"></div>';
        element.firstChild.style.height = this.params.mosaicHeight + 'px';
        element.firstChild.style.width = this.params.mosaicWidth + 'px';

        this.element = element;
        this.getSizes();
        this.createTemplate();
        this.initEventListeners();
    }

    initEventListeners() {
        this.element.addEventListener('click', (event) => this.onMosaicClick(event));
    }

    onMosaicClick(event) {
        const target = event.target;
        const oldFocused = this.element.querySelectorAll('.focused');
        const blockColor = document.getElementById('fragment-color').value;
        const borderColor = document.getElementById('border-color').value;

        if (oldFocused) {
            oldFocused.forEach(item => item.classList.remove('focused'));
        }

        if (target.classList.contains('mosaic__block')) {
            target.focus();
            target.classList.add('focused');
            target.style.backgroundColor = blockColor;
            target.style.borderColor = borderColor;
        }
    }

    getSizes() {
        const blocks = this.params.blocksAmount;
        switch (true) {
            case blocks <= 200:
                Mosaic.minWidth = this.params.mosaicWidth / 10;
                Mosaic.minHeight = this.params.mosaicHeight / 10;
                break;
            case blocks <= 800:
                Mosaic.minWidth = this.params.mosaicWidth / 50;
                Mosaic.minHeight = this.params.mosaicHeight / 50;
                break;
            case blocks <= 1000:
                Mosaic.minWidth = this.params.mosaicWidth / 100;
                Mosaic.minHeight = this.params.mosaicHeight / 100;
                break;
            default:
                Mosaic.minWidth = this.params.mosaicWidth / 200;
                Mosaic.minHeight = this.params.mosaicHeight / 200;
        }
    }

    createTemplate() {
        const blocks = this.params.blocksAmount;
        let counter = 1;

        while (counter < blocks) {
            const blocksElement = this.element.querySelectorAll('.mosaic__block');

            for (let i = 0; i < blocksElement.length; i++) {
                const parent = blocksElement[i];
                const parentHeight = parseInt(parent.style.height, 10) / Mosaic.minHeight;
                const parentWidth = parseInt(parent.style.width, 10) / Mosaic.minWidth;

                if (parentHeight > 1 && parentWidth > 1) {
                    Math.round(Math.random())
                        ? this.setFractionHeight(counter, parent, parentHeight, parentWidth)
                        : this.setFractionWidth(counter, parent, parentHeight, parentWidth);
                    counter += 1;
                    i++;
                } else if (parentWidth === 1 && parentHeight > 1) {
                    this.setFractionHeight(counter, parent, parentHeight, parentWidth);
                    counter += 1;
                    i++;
                } else if (parentHeight === 1 && parentWidth > 1) {
                    this.setFractionWidth(counter, parent, parentHeight, parentWidth);
                    counter += 1;
                    i++;
                } else {
                    continue;
                }

                if (counter === blocks) {
                    break;
                }
            }
        }
    }

    setFractionWidth(id, parent, parentHeight, parentWidth) {
        parent.classList.add('container');
        parent.classList.remove('mosaic__block');
        parent.removeAttribute('tabindex');

        const widthOne = 1 + Math.floor(Math.random() * (parentWidth - 1));
        const firstBlock = this.createBlock(id, parent);
        firstBlock.style.height = parentHeight * Mosaic.minHeight + 'px';
        firstBlock.style.width = widthOne * Mosaic.minWidth + 'px';

        const widthTwo = parentWidth - widthOne;
        const secondBlock = this.createBlock(id, parent);
        secondBlock.style.height = parentHeight * Mosaic.minHeight + 'px';
        secondBlock.style.width = widthTwo * Mosaic.minWidth + 'px';
    }

    setFractionHeight(id, parent, parentHeight, parentWidth) {
        parent.classList.add('container');
        parent.classList.remove('mosaic__block');
        parent.removeAttribute('tabindex');

        const heightOne = Math.floor(Math.random() * (parentHeight - 1)) + 1;
        const firstBlock = this.createBlock(id, parent);
        firstBlock.style.height = heightOne * Mosaic.minHeight + 'px';
        firstBlock.style.width = parentWidth * Mosaic.minWidth + 'px';

        const heightTwo = parentHeight - heightOne;
        const secondBlock = this.createBlock(id, parent);
        secondBlock.style.height = heightTwo * Mosaic.minHeight + 'px';
        secondBlock.style.width = parentWidth * Mosaic.minWidth + 'px';
    }

    createBlock(id, parent) {
        const elem = document.createElement('div');
        elem.className = 'mosaic__block';
        elem.setAttribute('tabindex', id);
        parent.appendChild(elem);

        return elem;
    }
}

const addEventListeners = function () {
    const borderColorSelector = document.getElementById('border-color');
    const blockColorSelector = document.getElementById('fragment-color');
    const blocksGenerator = document.getElementById('generate-button');
    const userSetAmount = document.getElementById('user-amount');
    const userSetRandom = document.getElementById('set-random');

    borderColorSelector.addEventListener('change', onBorderChange);
    blockColorSelector.addEventListener('change', onBlockColorChange);
    blocksGenerator.addEventListener('click', onGenerateBtnClick);
    userSetAmount.addEventListener('click', onUserBtnClick);
    userSetRandom.addEventListener('click', onGenerateBtnClick)

}

const onBorderChange = (event) => {
    const color = event.target.value;
    const focused = document.querySelector('.focused');

    focused.style.borderColor = color;

}

const onBlockColorChange = (event) => {
    const color = event.target.value;
    const focused = document.querySelector('.focused');

    focused.style.backgroundColor = color;
}

const onGenerateBtnClick = (event) => {
    const modal = document.getElementById("my-modal");
    modal.style.display = "none";
    const mosaic = document.getElementById('mosaic');
    const blocksAmount = getRandomAmount();
    const data = {
        mosaicWidth: 1000,
        mosaicHeight: 600,
        blocksAmount: blocksAmount
    }
    mosaic.innerHTML = '';
    const blocks = new Mosaic(data);
    mosaic.append(blocks.element);
}

const getRandomAmount = () => {
    return Math.floor(Math.random() * (MAX_NUMBER - 1 - MIN_NUMBER)) + MIN_NUMBER;
}

const onUserBtnClick = (event)=>{
    const modal = document.getElementById("my-modal");
    modal.style.display = "none";
    let setAmount = parseInt(document.getElementById("set-user").value);
    if (setAmount < 9){
        setAmount = 9;
    }
    const blocksAmount = setAmount ? setAmount : getRandomAmount();
    const data = {
        mosaicWidth: 1000,
        mosaicHeight: 600,
        blocksAmount: blocksAmount
    }
    mosaic.innerHTML = '';
    const blocks = new Mosaic(data);
    mosaic.append(blocks.element);
}

addEventListeners();
