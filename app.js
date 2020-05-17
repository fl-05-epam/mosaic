const MIN_NUMBER = 9;
const MAX_NUMBER = 40000;

//Коментарі перед тим як заливати прибери

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
        //Тут імхо як не зроби все одно буде не дуже. 
        const blocks = this.params.blocksAmount;
        switch (true) {
            case blocks <= 200:
                Mosaic.minWidth = this.params.mosaicWidth / 10;
                Mosaic.minHeight = this.params.mosaicHeight / 10;
                break;
            case blocks <= 1800:
                Mosaic.minWidth = this.params.mosaicWidth / 50;
                Mosaic.minHeight = this.params.mosaicHeight / 50;
                break;
            case blocks <= 5000:
                Mosaic.minWidth = this.params.mosaicWidth / 100;
                Mosaic.minHeight = this.params.mosaicHeight / 100;
                break;
            default:
                Mosaic.minWidth = this.params.mosaicWidth / 200;
                Mosaic.minHeight = this.params.mosaicHeight / 200;
        }

    }

    createTemplate() {
        //змінні перейменовано, але трохи код підправити;
        // Імхо якщо працює то краще не чіпати. В теорії блоки коду в іфах можна замінити рекурсією, але боюся що буде Stack Overflow і краще залишити як є 
        const blocks = this.params.blocksAmount;
        let counter = 1;

        while (counter < blocks) {
            const blocksElement = this.element.querySelectorAll('.mosaic__block');

            for (let i = 0; i < blocksElement.length; i++) {
                const parent = blocksElement[i];
                const parentHeight = parseInt(parent.style.height,10) / Mosaic.minHeight;
                const parentWidth = parseInt(parent.style.width,10) / Mosaic.minWidth;

                if (parentHeight > 1 && parentWidth > 1) {
                    Math.round(Math.random())
                        ? this.partHeight(counter, parent, parentHeight, parentWidth)
                        : this.partWidth(counter, parent, parentHeight, parentWidth);
                    counter += 1;
                    i++;
                } else if (parentWidth === 1 && parentHeight > 1) {
                    this.partHeight(counter,parent, parentHeight, parentWidth);
                    counter += 1;
                    i++;
                } else if (parentHeight === 1 && parentWidth > 1) {
                    this.partWidth(counter, parent, parentHeight, parentWidth);
                    counter +=1;
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

    partWidth(id, parent, parentHeight, parentWidth) {
        //тут все ок.
        parent.classList.add('container');
        parent.classList.remove('mosaic__block');
        parent.removeAttribute('tabindex');

        const widthOne = 1 + Math.floor(Math.random() * (parentWidth - 1));
        const firstBlock = this.createElem(id, parent);
        firstBlock.style.height = parentHeight * Mosaic.minHeight + 'px';
        firstBlock.style.width = widthOne * Mosaic.minWidth + 'px';

        const widthTwo = parentWidth - widthOne;
        const secondBlock = this.createElem(id, parent);
        secondBlock.style.height = parentHeight * Mosaic.minHeight + 'px';
        secondBlock.style.width = widthTwo * Mosaic.minWidth + 'px';
    }

    partHeight(id,parent, parentHeight, parentWidth) {
        //тут все ок.
        parent.classList.add('container');
        parent.classList.remove('mosaic__block');
        parent.removeAttribute('tabindex');

        const heightOne = 1 + Math.floor(Math.random() * (parentHeight - 1));
        const firstBlock = this.createElem(id,parent);
        firstBlock.style.height = heightOne * Mosaic.minHeight + 'px';
        firstBlock.style.width = parentWidth * Mosaic.minWidth + 'px';

        const heightTwo = parentHeight - heightOne;
        const secondBlock = this.createElem(id, parent);
        secondBlock.style.height = heightTwo * Mosaic.minHeight + 'px';
        secondBlock.style.width = parentWidth * Mosaic.minWidth + 'px';
    }

    createElem(id, parent) {
        //тут все ок.
        const elem = document.createElement('div');
        elem.className = 'mosaic__block';
        elem.setAttribute('tabindex', id);
        parent.appendChild(elem);

        return elem;
    }

    initEventListeners() {
        this.element.addEventListener('click', (event) => this.onMosaicClick(event));
    }

    onMosaicClick(event) {
        //тут все ок.
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
            target.style.borderColor =borderColor;
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
    mosaic.innerHTML = '';
    const blocksAmount = getRandomAmount();
    const data = {
        //todo change sizes
        // Просто збільшив їх вдвічі, як на мене норм.
        mosaicHeight:1200,
        mosaicWidth:1600,
        blocksAmount: blocksAmount
    }
    const blocks = new Mosaic(data);
    mosaic.append(blocks.element);
}

const getRandomAmount  = () =>{
        //todo возможно ли сократить формулу;
        // Формулу можна спростити прибравши десятку, але тоді починає безбожно тупити. Залишаю на твій розсуд.
        
    return MIN_NUMBER + Math.floor(Math.random() * (MAX_NUMBER / 10 - 1 - MIN_NUMBER));
}

addEventListeners();