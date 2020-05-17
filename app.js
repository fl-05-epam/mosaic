class Mosaic {

    constructor(params) {
        this.params = params;
        this.render();
    }

    render() {
        const element = document.createElement('div');
        element.classList.add('mosaic')
        element.innerHTML = this.createTemplate();
        this.element = element;

        this.initEventListeners();
    }

    createTemplate() {
        const blocksAmount = this.params.blocks;
        let template = '';

        for (let i = blocksAmount; i > 0; i--) {
            template = template.concat(this.getBlockTemplate(i))
        }

        return template;
    }

    getBlockTemplate(id) {
        return `<div class="mosaic__block" tabindex="${id}" id="${id}">Test</div>\n`
    }

    initEventListeners() {
        this.element.addEventListener('click', (event) => this.onMosaicClick(event));
    }

    onMosaicClick(event) {
        const target = event.target;
        const oldFocused = this.element.querySelectorAll('.focused');

        if(oldFocused){
            oldFocused.forEach(item => item.classList.remove('focused'));
        }

        if (target.classList.contains('mosaic__block')){
            target.focus();
            target.classList.add('focused');
        }
    }
}

const addEventListeners = function(){
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

const onBlockColorChange =(event) => {
    const color = event.target.value;
    const focused = document.querySelector('.focused');

    focused.style.backgroundColor = color;
}

const onGenerateBtnClick = (event) => {
    const mosaic= document.getElementById('mosaic');

    //mocked data
    const data = {
        blocks: 9
    }

    const blocks = new Mosaic(data);
    mosaic.append(blocks.element);
}

addEventListeners();
