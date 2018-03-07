// Cursor starting position //
// first two digits are the row, last two digits are the column //
let currentPos = '0900';

// intended position for cursor based on arrow button selection //
let newPosition;

// create the maze div? //
const mazeContainer = document.getElementById('container');

// array showing the placement of the walls "W", starting position "S", and finishing position "F" //
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


function createMaze() {
   for (let i = 0; i < map.length; i++) {
      let row = document.createElement('div');
      row.className = 'row';
      mazeContainer.appendChild(row);
      for (let j = 0; j < map[i].length; j++) {
        // this makes numbers less than 10 double digits (like "9" is "09") //
         let randomVar = String(i > 9 ? "" + i : "0" + i) + String(j > 9 ? "" + j : "0" + j)

        // create divs and assign a class depending on whether the position on the "const map" is "W", "S", "F", or " " //
         if (map[i][j] === 'W') {
            let cell = document.createElement("div");
            // two classes 'wall' & 'mazeBlock'.//
            // 'mazeBlock' is consistent for all divs except 'cursor'.//
            // 'wall', 'open', 'start' & 'finish' are unique for those specific div types. //
            cell.className = 'wall mazeBlock';
            cell.id = randomVar;
            row.appendChild(cell);

         } else if (map[i][j] === ' ') {
            let cell = document.createElement("div");
            cell.className = 'open mazeBlock';
            cell.id = randomVar;
            row.appendChild(cell);

         } else if (map[i][j] === 'S') {
            let cell = document.createElement("div");
            // cell.className = 'start mazeBlock';
            cell.className = 'wall start mazeBlock';
            cell.id = randomVar;
            row.appendChild(cell);

            // Appending the starting cursor to the starting div
            let cursor = document.createElement('div');
            cursor.className = 'cursor';
            cell.appendChild(cursor);
         } else {
            let cell = document.createElement("div");
            cell.className = 'finish mazeBlock';
            cell.id = randomVar;
            row.appendChild(cell);
         }
      }
   }
}

function moveCursor() {
   // remove 'cursor' div (child) away from current div (parent) //
   var toCancelClass = document.getElementById(currentPos);
   toCancelClass.removeChild(toCancelClass.childNodes[0]);

   // move 'cursor' div (child) into new div (parent) //
   const moveCursorTo = document.getElementById(newPosition);
   let newCursor = document.createElement("div");
   newCursor.className = 'cursor';
   moveCursorTo.appendChild(newCursor);

   // update 'currentPos' to equal the new value of 'newPosition' //
   currentPos = newPosition;

   return true;
}

// Left most position of the maze has a column number of 0 //
function checkLeft() {
   currentCol = Number(currentPos.substring(2, 4));
   columnToMoveTo = currentCol - 1

   // this prevents initial move from stepping outside of the maze //
   // *** This might be able to be removed by assigning a class of 'wall' to starting position 'S'. *** //
   if (columnToMoveTo < 0) {
      alert('Illegal Move');
      return;
   }

   columnToMoveTo > 9 ? "" + columnToMoveTo : columnToMoveTo = "0" + columnToMoveTo;
   newPosition = currentPos.substring(0, 2) + String(columnToMoveTo);
   // console.log("columnToMoveTo " + columnToMoveTo);

   // assigns a variable to the intended newPosition (left or right of the cursor) //
   let leftRightOptions = map[Number(currentPos.substring(0, 2))][Number(columnToMoveTo)]

   // checks for a wall. If positive, prevents movement into the wall. //
   // if negative (not a wall) calls function moveCursor() //
   // which moves the cursor from the current position into the new position //
   return leftRightOptions === 'W' ? false : moveCursor();

}

function checkRight() {
   currentCol = Number(currentPos.substring(2, 4));
   columnToMoveTo = currentCol + 1

   columnToMoveTo > 9 ? "" + columnToMoveTo : columnToMoveTo = "0" + columnToMoveTo;
   newPosition = currentPos.substring(0, 2) + String(columnToMoveTo);

   let leftRightOptions = map[Number(currentPos.substring(0, 2))][Number(columnToMoveTo)]

   // Checks for a win (movement into the position "F") //
   if (leftRightOptions === "F") {
      moveCursor();
      alert('You Win!!');
   }

   return leftRightOptions === 'W' ? false : moveCursor();
}

function checkUp() {
   currentRow = Number(currentPos.substring(0, 2));
   rowToMoveTo = currentRow - 1;

   rowToMoveTo > 9 ? "" + rowToMoveTo : rowToMoveTo = "0" + rowToMoveTo;
   newPosition = String(rowToMoveTo) + currentPos.substring(2, 4);

   upDownOptions = map[Number(rowToMoveTo)][Number(currentPos.substring(2, 4))];

   return upDownOptions === 'W' ? false : moveCursor();
}

function checkDown() {
   currentRow = Number(currentPos.substring(0, 2));
   rowToMoveTo = currentRow + 1;

   rowToMoveTo > 9 ? "" + rowToMoveTo : rowToMoveTo = "0" + rowToMoveTo;
   newPosition = String(rowToMoveTo) + currentPos.substring(2, 4);

   upDownOptions = map[Number(rowToMoveTo)][Number(currentPos.substring(2, 4))];

   return upDownOptions === 'W' ? false : moveCursor();
}

document.addEventListener('keydown', (event) => {
   const keyName = event.key;
   if (keyName === 'ArrowLeft') {
      checkLeft();
   };
   if (keyName === 'ArrowRight') {
      checkRight();
   };
   if (keyName === 'ArrowUp') {
      checkUp();
   };
   if (keyName === 'ArrowDown') {
      checkDown();
   }

});

createMaze();
