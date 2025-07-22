let turn = "O";

let gameover = false;

let winner = [ 
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

let total_count = 0;
const boardarray = new Array(9).fill('E');  // 🔧 Fixed here

function checkwinner() {
    for (let [i0, i1, i2] of winner) {
        if (boardarray[i0] != "E" && boardarray[i0] === boardarray[i1] && boardarray[i1] === boardarray[i2]) {
            return true;
        }
    }
    return false;
}

//reset button
const reset = document.getElementById('restartButton');
reset.addEventListener('click',(event) => {

 location.reload()

})

const maindiv = document.getElementById('board');

maindiv.addEventListener('click', (event) => {

    if(gameover) return;
    const element = event.target;
    const id = Number(element.id);

    if (boardarray[id] !== 'E') return; // prevent overwrite


    total_count++;
    if (turn === 'O') {
        element.innerHTML = "O";
        boardarray[id] = "O";
        if (checkwinner()) {
            document.getElementById('winningMessage').innerHTML = "Winner is O";
            gameover = true;
            return
            
        }
        
        turn = "X";
    } else {
        element.innerHTML = "X";
        boardarray[id] = "X";
        if (checkwinner()) {
            document.getElementById('winningMessage').innerHTML = "Winner is X";
            gameover = true;
            return
           
        }
        
        turn = "O";
    }
    if (total_count === 9) {
        document.getElementById('winningMessage').innerHTML = "Match is Draw";
        gameover = true;
        return;
    }
});
