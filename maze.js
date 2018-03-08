const map = [
  "WWWWWWWWWWWWWWWWWWWWW",
  "W   W     W     W W W",
  "W W W WWW WWWWW W W W",
  "W W W   W     W W   W",
  "W WWWWWWW W WWW W W W",
  "W         W     W W W",
  "W WWW WWWWW WWWWW W W",
  "W W   W   W W     W W",
  "W WWWWW W W W WWW W F",
  "S     W W W W W W WWW",
  "WWWWW W W W W W W W W",
  "W     W W W   W W W W",
  "W WWWWWWW WWWWW W W W",
  "W       W       W   W",
  "WWWWWWWWWWWWWWWWWWWWW"
];
var cell;
var maze=document.getElementById("maze");
var rowMaze;
var player=document.getElementById("player");
var tmpX;
var tmpY;
var topPoint=8;
var leftPoint=8;
var playerWon=false;
drawMaze();

movePlayer = function (event) {
     topPoint=8;
     leftPoint=8;
     console.log(tmpX,tmpY);
     // switch event responds to arrow keys being selected //
     switch (event.key){
     
        // If ArrowUp key is pressed...
          case "ArrowUp":
                // checks if tmpX is within the maze boundaries (top/bottom)... //  
                if (tmpX>0 && tmpX<14){ 
                    // if intended location on map is " " (moving up, so tmpY does not change)... //
                      if  (map[tmpX-1][tmpY]==" ") {
                        // assign new value to tmpX //  
                         tmpX=tmpX-1;
                      } 
                    // if intended location on map is "F" (the finish)... //  
                      else if (map[tmpX-1][tmpY]=="F"){
                          // assigns "true" to playerWon //
                          playerWon=true
                      }   
                  }
                  // exit switch statement // 
                  break;
        // If ArrowDown key is pressed... //
          case "ArrowDown":
                // checks if tmpX is within the maze boundaries (top/bottom)... //
                  if (tmpX>0 && tmpX<14) {
                    // if intended location on map is " " (moving down, so tmpY does not change)... //
                    if (map[tmpX+1][tmpY]==" "){
                     // assign new value to tmpX //   
                      tmpX=tmpX+1;
                    } 
                    // if intended location on map is "F" (the finish)... //
                    else if (map[tmpX+1][tmpY]=="F"){
                        // assigns "true" to playerWon //
                        playerWon=true
                    } 
                  }
                  // exit switch statement //
                  break;

        // If ArrowRight key is pressed... //
          case "ArrowRight":
                  // checks if tmpY is within the maze boundaries (left/right)... //
                  if (tmpY>=0 && tmpY<21){ 
                   // if intended location on map is " " (moving right, so tmpX does not change)... //   
                   if (map[tmpX][tmpY+1]==" ") {
                    // assigns new value to tmpY //
                    tmpY=tmpY+1;
                  } 
                  // if intended location on map is "F" (the finish)... //
                  else if (map[tmpX][tmpY+1]=="F"){
                    // assigns "true" to playerWon //  
                    playerWon=true
                    } 
                  }
                  // exit switch statement //
                  break;

        // If ArrowLeft key is pressed... //
          case "ArrowLeft":
                  // checks if tmpY is within the maze boundaries (left/right)... //
                  if (tmpY>0 && tmpY<21) {
                   // if intended location on map is " " or "S" (moving left, so tmpX does not change)... //
                   if ((map[tmpX][tmpY-1]==" ")||(map[tmpX][tmpY-1]=="S")){
                      // assigns new value to tmpY //
                      tmpY=tmpY-1;
                   } 
                   // if intended location on map is "F" (the finish)... // 
                   else if (map[tmpX][tmpY-1]=="F"){
                    // assigns "true" to playerWon //  
                    playerWon=true
                   }
                  }
                  // exit switch statement // 
                  break;
                   
      }
      // compensate for individual cell dimension of 20x20  //
      // maze is "absolute", so position is always from top and from left //
      topPoint+=tmpX*20;
      leftPoint+=tmpY*20;  
      // converts topPoint into pixels & applies the pixels to the css for "player" //
      player.style.top = topPoint+"px";
      // converts leftPoint into pixels & applies the pixels to the css for "player" //
      player.style.left = leftPoint+"px"; 
      
      // if "playerWon" was assigned a value of "true", then alert ""You've finished the Maze"" //
      if (playerWon){
         alert("You've finished the Maze");
         // reset the maze //
         window.location.reload(true);
      } 

}

// defines the function "drawMaze" //
function drawMaze(){
  // assigns class of "player" to the div with id of player //
  player.setAttribute("class","player");
  
  // creates variable "startCellId" //
  var startCellId;

  // dynamically building the maze //
  // starts for loop for variable "i", limited to the length of map //
  for (let i=0;i<map.length;i++){
      // creates a div and assigns variable "rowMaze" //
      rowMaze=document.createElement("div");
      // assigns class=row to rowMaze //
      rowMaze.setAttribute("class","row");
      // creates variable "row" and assigns the contents of map[i] // 
      let row=map[i];
      console.log("map" + i +":" + row,row.length);
      // starts for loop for variable "j", limited to the length of row //
      for (let j=0;j<row.length;j++){
          // creates a div and assigns variable "cell" //        
          let cell=document.createElement("div");
          // checks each position in each row. If 'W'... //
          if (row[j]=='W'){
          // adds class of "cellW" to the cell //
          cell.setAttribute("class","cellW");
          } 
          // checks each position in each row. If 'S'... //
          else if (row[j]=='S'){
              // reassigns value of "topPoint" to (initial topPoint value of "8" plus (i*20)) //
              // i*20 to compensate for individual cell dimension of 20x20 //
              topPoint+=i*20;
              // reassigns value of "leftPoint" to (initial topPoint value of "8" plus (j*20)) //
              // j*20 to compensate for individual cell dimension of 20x20 //
              leftPoint+=j*20;
              // assigns value of "i" to tmpX //
              tmpX=i;
              // assigns value of "j" to tmpY //
              tmpY=j;
              // assigns value of "cell"+i+j to startCellId //
              startCellId="cell"+i+j;
              // assigns class=cellS to cell //
              cell.setAttribute("class","cellS");              
          } 
          else{
              // otherwise... //
              // assigns class of cellE to cell //
              cell.setAttribute("class","cellE");
              // sets the text content for cell to the value of row[j] //
              cell.textContent=row[j];
          }
          // places cell into rowMaze //
          rowMaze.appendChild(cell);
      }
  // places rowMaze into maze //
  maze.appendChild(rowMaze);
  }
  // assigns new top position value to player // 
  player.style.top = topPoint+"px";
  // assigns new left position value to player //
  player.style.left = leftPoint+"px";
}
// creates event listener. When a key is pressed, the function "movePlayer" is called // 
document.addEventListener("keydown",movePlayer);