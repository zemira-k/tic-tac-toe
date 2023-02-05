import {squareStyle} from './styles'

export function Square({ handleSquareClick, player }) {
  
  return (
    <div className="square" style={squareStyle} onClick={(e) => handleSquareClick(e)}>
      {player}
    </div>
  );
}
