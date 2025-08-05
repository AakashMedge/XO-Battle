
let turn = "O";
let gameover = false;

let winnerPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

let total_count = 0;
const boardarray = new Array(9).fill('E');

function checkwinner() {
    for (let pattern of winnerPatterns) {
        let [i0, i1, i2] = pattern;
        if (boardarray[i0] !== "E" &&
            boardarray[i0] === boardarray[i1] &&
            boardarray[i1] === boardarray[i2]) {
            
            // Highlight winning cells
            pattern.forEach(index => {
                document.getElementById(index).classList.add("winner");
            });

            // Dim all other cells
            document.querySelectorAll(".cell").forEach(cell => {
                if (!cell.classList.contains("winner")) {
                    cell.classList.add("dimmed");
                }
            });

            return true;
        }
    }
    return false;
}

document.getElementById('restartButton').addEventListener('click', () => {
    location.reload();
});

const maindiv = document.getElementById('board');

maindiv.addEventListener('click', (event) => {
    if (gameover) return;
    const element = event.target;
    const id = Number(element.id);

    if (boardarray[id] !== 'E' || isNaN(id)) return;

    total_count++;
    element.innerHTML = turn;
    boardarray[id] = turn;

    if (checkwinner()) {
        document.getElementById('winningMessage').innerHTML = `Winner is ${turn}`;
        gameover = true;
        showOverlay(`🎉 Winner: ${turn} 🎉`);
        launchConfetti();
        return;
    }

    if (total_count === 9) {
        document.getElementById('winningMessage').innerHTML = "Match is Draw";
        gameover = true;
        document.querySelectorAll(".cell").forEach(cell => cell.classList.add("dimmed"));
        showOverlay("🤝 It's a Draw!");
        return;
    }

    turn = (turn === "O") ? "X" : "O";
});

function showOverlay(message) {
    const overlay = document.getElementById("overlay");
    const overlayText = document.getElementById("overlayText");
    overlayText.textContent = message;
    overlay.classList.remove("hidden");
}

// 🎉 Confetti effect
function launchConfetti() {
    let duration = 2 * 1000; // 2 seconds
    let end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

