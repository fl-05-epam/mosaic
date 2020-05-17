let mosaic = document.getElementById('mosaic');
let num = 39; //майбутнє рандомне число
for (let i = 0; i < 9; i++) {
    let newDiv = document.createElement('div');
    newDiv.className = 'newDiv';
    newDiv.setAttribute('id', `div${i}`);
    mosaic.append(newDiv);
    if (num % 2 !== 0){
        newDiv.style.gridTemplateColumns = `1fr 2fr`;
    }else{
        newDiv.style.gridTemplateColumns = `1fr`;
    }
    if (num > 9 && num < 40000) {
        for (let i = 9; i < num; i++) {
            let childDiv = document.createElement('div');
            childDiv.className = 'childDiv';
            newDiv.append(childDiv)
        }
    }
}
