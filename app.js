let mosaic = document.getElementById('mosaic');
const TOTAL_RECTANGLES_AMOUNT = getRandomIntInclusive(9, 20);
console.log('TOTAL_RECTANGLES_AMOUNT', TOTAL_RECTANGLES_AMOUNT);
let list_amount_rectangles = TOTAL_RECTANGLES_AMOUNT - 1;
let amount_horizontal_blocks = 400;
let amount_vertical_blocks = 100;
let cells_amount = 40000;

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

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
    let square_limit = cells_amount - list_amount_rectangles;  // рахуємо максимальну кількість ячейок яку МОЖЕ займати ОДИН прямокутник
    // так щоб залишилось хоча б по 1 ячейці на кожного
    console.log('square_limit', square_limit);
    list_amount_rectangles -= 1; //зменшуємо кількість прямокутників які ще потрібно намалювати
    let square_div = Math.round(getRandomIntInclusive(1, square_limit));//визначаємо рандомно фактичну площу 1-го прямокутника
    console.log('square_div', square_div);
    cells_amount -= square_div;//віднімаємо від загальної к-сті ячейок використані ячейки на вже намальований прямокутник
    console.log('cells_amount', cells_amount);
    let height_div = Math.round(square_div / getRandomIntInclusive(1, amount_horizontal_blocks));// ділимо площу прямокутника(яку знайшли рандомно)
                                                                                                      // на рандомну ширину
    console.log('height_div', height_div);
    let width_div = Math.round(square_div / height_div);
    console.log('width_div', width_div);
    amount_horizontal_blocks -= width_div; // визначаємо скільки залишилось вільних стовпчиків
    console.log('amount_horizontal_blocks', amount_horizontal_blocks);
    amount_vertical_blocks -= height_div; // визначаємо скільки залишилось вільних рядків
    console.log(' amount_vertical_blocks', amount_vertical_blocks);

    div.style.gridColumn = `auto / span ${width_div}`;
    div.style.gridRow = `auto / span ${height_div}`;

}

