import React, { useState, useEffect } from 'react';

const cols = 7, rows = 6;
const initialGrid = createGrid(cols, rows);
let turn = 1;

function switchTurn () {
  turn === 1 ?  turn = 2 : turn = 1;
  return turn;
}

function createGrid (cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}


const Grid = (props) => {
  const [grid, setGrid] = useState(initialGrid);

  function makeMove(e) {
    console.log(e.nativeEvent);
    let position = e.target.dataset.position.split("-");
    let newGrid = grid.map(arr => {
      return [...arr];
    })
    for (let i = grid[position[0]].length; i >= 0; i--) {
      if (grid[position[0]][i] === 0) {
        newGrid[position[0]][i] = switchTurn();
        setGrid(newGrid);
        return;
      }
    }
  }

  return (
    <>
      <div className="grid">
        {grid.map((col, idx) => {
            return (
              <div className="col" key={idx}>
                {col.map((cell, idx2) => {
                  return (
                    <div onClick={makeMove} className="cell" data-position={`${idx}-${idx2}`} key={`${idx}-${idx2}`}>{cell}</div>
                  )})}
              </div>
            )})}
      </div>
    </>
  );
}

export default Grid;