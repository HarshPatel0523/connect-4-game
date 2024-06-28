let playerBlue = "B";
let playerYellow = "Y";
let currentPlayer = playerBlue;

let gameOver = false

let rows = 6;
let columns = 7;

window.onload = function(){
    setGame();
}

let para = document.querySelector('#Turn');

if(currentPlayer == "B"){
    para.innerHTML = '<h3>Player <span style="color: Blue">Blue</span> Turn</h3>'
}
else{
    para.innerHTML = '<h3>Player <span style="color: Yellow">Yellow</span> Turn</h3>'
}

let board = []
let currColumns = [5,5,5,5,5,5,5]

function setGame(){
    for(let i=0;i<rows;i++){
        let row = [];
        
        for(let j=0;j<columns;j++){
            row.push(' ')
            
            let tile = document.createElement("div");
            tile.id = i.toString() + "-" + j.toString();
            tile.classList.add("tile");
            tile.addEventListener("click",setpiece);
            document.querySelector("#box").append(tile);
        }
        board.push(row);
    }
}

function setpiece(){
    if(gameOver){
        return;
    }

    let co_ords = this.id.split("-");
    let r = parseInt(co_ords[0]);
    let c = parseInt(co_ords[1]);

    r = currColumns[c];
    if(r<0){
        return;
    }
    
    board[r][c] = currentPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    
    if(currentPlayer == playerBlue){
        tile.classList.add("blue-piece");
        para.innerHTML = '<h3>Player <span style="color: Yellow">Yellow</span> Turn</h3>'
        currentPlayer = playerYellow;
    }
    else{
        tile.classList.add("yellow-piece");
        currentPlayer = playerBlue;
        para.innerHTML = '<h3>Player <span style="color: Blue">Blue</span> Turn</h3>'
    }
    
    r -= 1;
    currColumns[c] = r;
    
    checkWinner();
}

function checkWinner(){
    for(let r=0;r<rows;r++){
        for(let c=0;c<columns-3;c++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r][c+1] && board[r][c] == board[r][c+2] && board[r][c] == board[r][c+3]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
    
    for(let c=0;c<columns;c++){
        for(let r=0;r<rows-3;r++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r+1][c] && board[r][c] == board[r+2][c] && board[r][c] == board[r+3][c]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

    for(let r=0;r<rows-3;r++){
        for(let c=0;c<columns-3;c++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r+1][c+1] && board[r][c] == board[r+2][c+2] && board[r][c] == board[r+3][c+3]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ' &&
                board[r][c] == board[r-1][c+1] &&
                board[r][c] == board[r-2][c+2] &&
                board[r][c] == board[r-3][c+3]) {
                setWinner(r, c);
                return;
            }
        }
    }
}

function setWinner(r,c){
    if(board[r][c] == playerBlue){
        para.innerHTML = '<h3><span style="color: Blue">Blue</span> Wins</h3>'
        // document.querySelector('h1').classList.add("blue-shadow");
    }
    else{
        para.innerHTML = '<h3><span style="color: Yellow">Yellow</span> Wins</h3>'
        // document.querySelector('h1').classList.add("yellow-shadow");
    }

    gameOver = true;
}