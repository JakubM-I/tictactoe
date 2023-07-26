{
const fields = document.querySelectorAll(".js-gameField");
const gameInfo = document.querySelector(".js-gameInfo");
const gameScore = document.querySelector(".js-gameScore");
let player = "player1"
let gameScore1 = 0;
let gameScore2 = 0;

let player1moves = [];
let player2moves = [];

const displayGameScore = () => {
    gameScore.innerHTML = `
        <p class="gameBoard__players">Gracz 1 : Gracz 2</p>
        <p class="gameBoard__score">${gameScore1} : ${gameScore2}</p>
        `;
};

const markField = (e) => {
    if(player === "player1"){
        e.target.classList.add("gameField--circle")
        player1moves.push(+e.target.id);
    } else if (player === "player2"){
        e.target.classList.add("gameField--cross")
        player2moves.push(+e.target.id);
    }
    player = player === "player1" ? "player2" : "player1";
    gameInfo.innerText = `Kolejny ruch: ${player === "player1" ? "gracz 1" : "gracz 2"}`
    e.target.removeEventListener("click", markField);
    winningGame();
}

const gameOn = () => {
    fields.forEach(field => {
        field.addEventListener("click", markField );
    })
};

const winningGame = () => {

    const winningCombo = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

     winningCombo.forEach(item => {
        let result = item.every(number => fields[number].classList.contains("gameField--circle"));

        if(result) {
            gameInfo.innerText = "Wygrywa gracz 1!";
            gameScore1++;
            winningFieldsMark(winningCombo, player1moves, "win1");
            fields.forEach(field => {
                field.removeEventListener("click", markField);
            })
        };
        return;
    });

    winningCombo.forEach(item => {
        let result = item.every(number => fields[number].classList.contains("gameField--cross"));

        if(result) {
            gameInfo.innerText = "Wygrywa gracz 2!";
            gameScore2++;
            winningFieldsMark(winningCombo, player2moves, "win2");
            fields.forEach(field => {
                field.removeEventListener("click", markField);
            })
        }; 
        return;
    });
    displayGameScore();
};

const winningFieldsMark = (winningCombo, playerMoves, winClass) => {
    winningCombo.forEach(item => {
       let winItem = item.filter(number => playerMoves.includes(number))
       if(winItem.length === 3){
        for(const cell of winItem){
            fields[cell].classList.add(winClass)
            };
       };
       return;
    });
};


const newGame = () => {
    const newGameButton = document.querySelector(".js-newGameButton");

    newGameButton.addEventListener("click", () => {
        fields.forEach(field => {
            field.addEventListener("click", markField);
            field.classList.remove("gameField--circle")
            field.classList.remove("gameField--cross")
            field.classList.remove("win1")
            field.classList.remove("win2")
        });
        player = "player1"
        player1moves = [];
        player2moves = [];
        gameInfo.innerText = "Zaczyna gracz 1";
        // player1moves = [];
    });
};

const scoreReset = () => {
    const scoreResetButton = document.querySelector(".js-scoreResetButton");

    scoreResetButton.addEventListener("click", () => {
        gameScore1 = 0;
        gameScore2 = 0;
        displayGameScore();
    });
};

const init = () => {
    gameInfo.innerText = "Zaczyna gracz 1";
    displayGameScore();
    gameOn();
    newGame();
    scoreReset();
};

init();
}