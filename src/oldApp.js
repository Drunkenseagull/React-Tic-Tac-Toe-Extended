import Square from "./Square"
import { useState } from 'react';

export default function Board() {

  const [dimensions, setDimensions] = useState({
    width: 3,
    height: 3,
    winDistance: 3,
  });
  dimensions.stopCheckVert = dimensions.width * dimensions.height - ((dimensions.winDistance - 1) * dimensions.width);
  dimensions.stopCheckDiag = (dimensions.width < dimensions.winDistance || dimensions.height < dimensions.winDistance) ? 0 : dimensions.stopCheckVert
  dimensions.stopCheckHori = dimensions.width * dimensions.height - dimensions.winDistance;

  const [winLines, setWinLines] = useState(Array(dimensions.width * dimensions.height).fill(null));


  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  console.log(dimensions.stopCheckVert);
  console.log(dimensions.stopCheckDiag);
  console.log("winner: " + calculateWinner());
  console.log("drawing: " + new Date().getTime());

  function handleClick(i) {
    if (squares[i]) { return; }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    }
    else {
      nextSquares[i] = "O";
    }

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function calculateWinLines() {
    for (let i = 0; i < dimensions.width * dimensions.height; i++) {
      winLines[i] = {
        vert: calculateVertLine(i)
      }
    }


    calculateVertLine(i)
    {
      if (i < dimensions.stopCheckVert) {
        return null;
      }
      else {
        res = [];
        for (let j = i + dimensions.width; j <= i + (dimensions.winDistance - 1) * dimensions.width; j += dimensions.width) {
          res.push(j)
        }
      }
      return j;
    }
  }
  function calculateWinner() {
    let checkVal = null;

    function checkVertLine(i) {
      for (let j = i + dimensions.width; j <= i + (dimensions.winDistance - 1) * dimensions.width; j += dimensions.width) {
        //console.log("CheckVal: " + checkVal + ", jIndex: ", + j + ", jVal: " + squares[j]);
        if (squares[j] !== checkVal)
          return null;
      }
      return checkVal;
    }

    function checkHoriLine(i) {
      for (let j = i + 1; j <= i + (dimensions.winDistance - 1); j++) {
        console.log("CheckVal: " + checkVal + ", jIndex: ", + j + ", jVal: " + squares[j]);
        // guard going over side of board
        if (j % dimensions.width === 0)
          return null;
        if (squares[j] !== checkVal)
          return null;
      }
      return checkVal;
    }

    function checkDiagForward(i) {
      for (let j = i + 1; j <= i + (dimensions.winDistance - 1); j++) {
        console.log("CheckVal: " + checkVal + ", jIndex: ", + j + ", jVal: " + squares[j]);
        // guard going over side of board
        if (j % dimensions.width === 0)
          return null;
        if (squares[j] !== checkVal)
          return null;
      }
      return checkVal;
    }



    // check vertical + diag
    for (let i = 0; i < dimensions.stopCheckVert; i++) {
      checkVal = squares[i];
      if (checkVal === null)
        continue;

      if (checkVertLine(i))
        return (checkVertLine(i));
    }
    // check horizontal
    for (let i = 0; i < dimensions.stopCheckHori; i++) {
      checkVal = squares[i];
      if (checkVal === null)
        continue;

      if (checkHoriLine(i))
        return (checkHoriLine(i));
    }

    return null;
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}


let rows = new Array(dimensions.height).fill(null);
for (let i = 0; i < dimensions.width * dimensions.height; i++) {
  if (i % dimensions.width === 0) {
    row = new Array(dimensions.width).fill(null);
  }
  row[i] = 
};