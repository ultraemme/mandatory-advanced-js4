import React from 'react';

const hoverEffect = (e) => {
  if (e.nativeEvent.type === "mouseover") {
    if (e.target.classList.contains("col")) {
      e.target.classList.add("hover");
    } else {
      e.target.parentNode.classList.add("hover");
    }
  } else if (e.nativeEvent.type === "mouseout") {
    if (e.target.classList.contains("col")) {
      e.target.classList.remove("hover");
    } else {
      e.target.parentNode.classList.remove("hover");
    }
  }
}

const returnColor = (cell) => {
  if(cell === 1) {
    return '#62ACB5';
  } else if (cell === 2){
    return '#c9324c';
  }
}

const Grid = (props) => {
  const grid = props.grid;

  return (
    <>
      <div className="grid">
        {grid.map((col, idx) => {
            return (
              <div onMouseLeave={hoverEffect} onMouseOver={hoverEffect} className="col" key={idx}>
                {col.map((cell, idx2) => {
                  return (
                    <div
                      key={`${idx}-${idx2}`}
                      className="cell"
                      style={{backgroundColor: returnColor(cell)}}
                      onClick={props.makeMove}
                      data-pos={`${idx}-${idx2}`}/>
                  )})}
              </div>
            )})}
      </div>
    </>
  );
}

export default Grid;