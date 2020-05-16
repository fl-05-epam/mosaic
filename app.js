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
        return `<div class="mosaic__block" id="${id}">Test</div>\n`
    }

    initEventListeners() {
        this.element.addEventListener('click', (event) => this.onMosaicClick(event));
    }

    onMosaicClick(event) {
        console.log('Mosaic click');
    }
}

//---------mocked data

const data = {
    blocks: 9
}

const root = document.getElementById('root');
const mosaic = new Mosaic(data);
root.append(mosaic.element);
