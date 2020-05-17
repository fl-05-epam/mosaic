let mosaic = document.getElementById('mosaic');
const TOTAL_RECTANGLES_AMOUNT = 10;
let list_amount_rectangles = TOTAL_RECTANGLES_AMOUNT;
let amount_horizontal_blocks = 400;
let amount_vertical_blocks = 100;
let cells_amount = 40000;

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

console.log(TOTAL_RECTANGLES_AMOUNT);

function create_rectangles(num) {
    for (let i = 0; i < num; i++) {
        let div = document.createElement('div');
        div.className = 'rectangle';
        set_size(div);
        mosaic.append(div);
    }

    let last_div = document.createElement('div');
    last_div.className = 'last-div';
    mosaic.append(last_div);
    last_div.style.gridColumn = `auto / span ${amount_vertical_blocks}`;
    last_div.style.gridRow = `auto / span ${amount_horizontal_blocks}`;
}

create_rectangles(TOTAL_RECTANGLES_AMOUNT - 1);

function set_size(div) {
    let vertical_blocks = getRandomIntInclusive(1, count_max_verical_blocks_amount_limit());
    let horizontal_blocks = getRandomIntInclusive(1, count_max_horizontal_blocks_amount_limit());
    let square = vertical_blocks * horizontal_blocks;
    cells_amount -= square;
    list_amount_rectangles -= 1;
    amount_horizontal_blocks -= horizontal_blocks;
    amount_vertical_blocks -= vertical_blocks;
    div.style.gridColumn = `auto / span ${vertical_blocks}`;
    div.style.gridRow = `auto / span ${horizontal_blocks}`;

}

function count_max_verical_blocks_amount_limit() {
    return amount_vertical_blocks - list_amount_rectangles;
}

function count_max_horizontal_blocks_amount_limit() {
    return amount_horizontal_blocks - list_amount_rectangles;
}