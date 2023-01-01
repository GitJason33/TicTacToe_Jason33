const x_icon = "./X-icon.png";
const o_icon = "./O-icon.png";
let squares = document.querySelectorAll('#container button');
let turns = 9;
let current_Symbol = x_icon;
const Win_Possibility = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
let scoreX = 0;
let scoreO = 0;
let draw = 0;

function start(v){
   let play = document.querySelector("#play");
   if(v == 0){
      play.disabled = "true";
      On_Off(1);
      play.style.backgroundColor = "crimson";
      play.style.borderColor = "orange";
      play.style.color = "lightgray";
   }else{
      play.removeAttribute("disabled");
      play.style.backgroundColor = "cyan";
      play.style.borderColor = "purple";
      play.style.color = "blue";
   }
}
function changeSymbol(){
   switch(current_Symbol){
      case x_icon:
         current_Symbol = o_icon;
         break;
      default:
         current_Symbol = x_icon;
   }
}
function disablePressedButton(th){
   th.disabled = "true";
   if(turns > 0){
      turns--;
      changeSymbol();
   }else{
      console.log("Game Over!");
   }
}
function PlayOneTurn(current, th){
   let image = document.createElement('img');
   image.setAttribute('src', current);
   image.setAttribute('width', '100%');
   image.setAttribute('height', "100%");
   th.appendChild(image);
   th.value = current_Symbol == x_icon ? "X" : "O";
   disablePressedButton(th);
   let isOver = checkWin();
   if(isOver == "X"){
      console.log("Player 'X' wins! Flawless victory!");
      scoreX++;
   } else if(isOver == "O"){
      console.log("Player 'O' wins! Flawless victory!");
      scoreO++;
   } else if(turns == 0){
      console.log("Draw! No one Wins, good job, both of you are great warriors");
      draw++;
   } UpdateScores();
}
// rows checker for the win
function checkWin(){
   let checkWin;
   for(let i = 0; i < Win_Possibility.length; i++){
      // now "X" checker 
      checkWin = true; 
      for(let j = 0; j < Win_Possibility[i].length; j++){
         checkWin &&= squares[(Win_Possibility[i][j])-1].getAttribute('value') == "X";
      }
      if(checkWin){ 
         On_Off(0);
         return "X"; 
      } // now "O" checker
      checkWin = true;
      for(let j = 0; j < Win_Possibility[i].length; j++){
         checkWin &&= squares[(Win_Possibility[i][j])-1].getAttribute('value') == "O";
      }
      if(checkWin){ 
         On_Off(0);
         return "O"; 
      } 
   } return "N"; // this is when no winner is found
}


// useful functions
// enable (value = 1)/ disable (value = 0) all buttons
function On_Off(v){
   if(v == 0){ // disable
      for(let x of squares){
         x.disabled = "true";
      }
   }else{ // enable
      for(let x of squares){
         x.removeAttribute('disabled');
      }
   }
}
// restarts all and goes to another round (New Round button)
function Next(){
   for(x of squares){
      x.innerHTML = "";
      x.removeAttribute("value");
      x.disabled = "true";
   }
   turns = 9;
   start(1);
}
function UpdateScores(){
   let scores = ["#X", "#O", "#D"];
   let scores2 = [scoreX, scoreO, draw];
   for(let i = 0;i < scores.length; i++){
      document.querySelector(scores[i]).innerHTML = scores2[i];
   }
   let trn = ["X", "Y"];
   if(current_Symbol == x_icon){
      document.querySelector("#T").innerHTML = "&quot;X&quot;";
   } else {
      document.querySelector("#T").innerHTML = "&quot;O&quot;";
   }
}