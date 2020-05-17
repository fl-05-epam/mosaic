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

    getSizes() {
        //todo изменить размеры;
        const numberElement = this.params.blocksAmount;
        switch (true) {
            case numberElement <= 200:
                Mosaic.minWidth = this.params.mosaicWidth / 10;
                Mosaic.minHeight = this.params.mosaicHeight / 10;
                break;
            case numberElement <= 1800:
                Mosaic.minWidth = this.params.mosaicWidth / 50;
                Mosaic.minHeight = this.params.mosaicHeight / 50;
                break;
            case numberElement <= 5000:
                Mosaic.minWidth = this.params.mosaicWidth / 100;
                Mosaic.minHeight = this.params.mosaicHeight / 100;
                break;
            default:
                Mosaic.minWidth = this.params.mosaicWidth / 200;
                Mosaic.minHeight = this.params.mosaicHeight / 200;
        }

    }

    createTemplate() {
        const numberElement = this.params.blocksAmount;
        let counter = 1;

        while (counter < numberElement) {
            let insideGame = this.element.querySelectorAll('.mosaic__block');

            for (let i = 0; i < insideGame.length; i++) {
                const parent = insideGame[i];
                const parentHeight = parseInt(parent.style.height) / Mosaic.minHeight;
                const  parentWidth = parseInt(parent.style.width) / Mosaic.minWidth;

                if (parentHeight > 1 && parentWidth > 1) {
                    Math.round(Math.random())
                        ? this.partHeight(parent, parentHeight, parentWidth)
                        : this.partWidth(parent, parentHeight, parentWidth);
                    counter += 1;
                    i++;
                } else if (parentWidth === 1 && parentHeight > 1) {
                    this.partHeight(parent, parentHeight, parentWidth);
                    counter += 1;
                    i++;
                } else if (parentHeight === 1 && parentWidth > 1) {
                    this.partWidth(parent, parentHeight, parentWidth);
                    counter +=1;
                    i++;
                } else {
                    continue;
                }

                if (counter === numberElement) {
                    break;
                }
            }
        }
    }

    partWidth(parent, parentHeight, parentWidth) {
        parent.classList.add('container');
        parent.classList.remove('mosaic__block');
        let width1 = 1 + Math.floor(Math.random() * (parentWidth - 1));
        let width2 = parentWidth - width1;
        let insideGame1 = this.createElem('div', parent, 'mosaic__block');
        insideGame1.style.height = parentHeight * Mosaic.minHeight + 'px';
        insideGame1.style.width = width1 * Mosaic.minWidth + 'px';
        let insideGame2 = this.createElem('div', parent, 'mosaic__block');
        insideGame2.style.height = parentHeight * Mosaic.minHeight + 'px';
        insideGame2.style.width = width2 * Mosaic.minWidth + 'px';
    }

    partHeight(parent, parentHeight, parentWidth) {
        console.log(parent);
        parent.classList.add('container');
        parent.classList.remove('mosaic__block');
        let height1 = 1 + Math.floor(Math.random() * (parentHeight - 1));
        let height2 = parentHeight - height1;
        let insideGame1 = this.createElem('div', parent, 'mosaic__block');
        insideGame1.style.height = height1 * Mosaic.minHeight + 'px';
        insideGame1.style.width = parentWidth * Mosaic.minWidth + 'px';
        let insideGame2 = this.createElem('div', parent, 'mosaic__block');
        insideGame2.style.height = height2 * Mosaic.minHeight + 'px';
        insideGame2.style.width = parentWidth * Mosaic.minWidth + 'px';
    }

    createElem(strElem, parent, strClass) {
        let elem = document.createElement(strElem);
        if (strClass) {
            elem.className = strClass;
        }
        if (parent) {
            parent.appendChild(elem);
        }

        return elem;
    }

    initEventListeners() {
        this.element.addEventListener('click', (event) => this.onMosaicClick(event));
    }

    onMosaicClick(event) {
        const target = event.target;
        const oldFocused = this.element.querySelectorAll('.focused');

        if (oldFocused) {
            oldFocused.forEach(item => item.classList.remove('focused'));
        }

        if (target.classList.contains('mosaic__block')) {
            target.focus();
            target.classList.add('focused');
        }
    }
}

const addEventListeners = function () {
    //можна потім буде винести отримання елементів в окрему функцію
    const borderColorSelector = document.getElementById('border-color');
    const blockColorSelector = document.getElementById('fragment-color');
    const blocksGenerator = document.getElementById('generate-button');

    borderColorSelector.addEventListener('change', onBorderChange);
    blockColorSelector.addEventListener('change', onBlockColorChange);
    blocksGenerator.addEventListener('click', onGenerateBtnClick);

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
    const mosaic = document.getElementById('mosaic');
    const blocksAmount = getRandomAmount();
    const data = {
        //todo change sizes
        mosaicHeight:600,
        mosaicWidth:800,
        blocksAmount: blocksAmount
    }
    const blocks = new Mosaic(data);
    mosaic.append(blocks.element);
}

const getRandomAmount  = () =>{
        //todo возможно ли сократить формулу;
    return MIN_NUMBER + Math.floor(Math.random() * (MAX_NUMBER / 10 + 1 - MIN_NUMBER));
}

addEventListeners();
