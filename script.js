const fields = document.querySelectorAll(".js-gameField");
const gameInfo = document.querySelector(".js-gameInfo");
const gameScore = document.querySelector(".js-gameScore");


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


const init = () => {
    gameOn();
};

init();