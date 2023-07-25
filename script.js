const fields = document.querySelectorAll(".js-gameField");
const gameInfo = document.querySelector(".js-gameInfo");
const gameScore = document.querySelector(".js-gameScore");
let player = "player1"

const markField = (e) => {
    if(player === "player1"){
        e.target.classList.add("gameField--circle")

    } else if (player === "player2"){
        e.target.classList.add("gameField--cross")
        
    }
    player = player === "player1" ? "player2" : "player1";
    gameInfo.innerText = `Kolejny ruch: ${player === "player1" ? "gracz 1" : "gracz 2"}`
    e.target.removeEventListener("click", markField);
    
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
            
            winningFieldsMark(winningCombo, player2moves, "win2");
            fields.forEach(field => {
                field.removeEventListener("click", markField);
            })
        }; 
        return;
    });
    
};


const init = () => {
    gameInfo.innerText = "Zaczyna gracz 1";
    gameOn();
};

init();