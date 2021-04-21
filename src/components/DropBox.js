import { useDrop } from "react-dnd";
import { ItemTypes } from "../constants/coin";
import Coin from "./Coin";

const DropBox = ({ requiredValue, coins, onDrop }) => {
  const [{ isDroped }, drop] = useDrop({
    accept: ItemTypes.COIN,
    drop: (item, monitor) => onDrop(item.id),
    collect: monitor => ({
      isDroped: !!monitor.isOver()
    })
  });

  const dropAreaStyle = () => {
    const className = 'coin-box border rounded shadow-sm p-3';
    return isDroped ? `${className} bg-light` : className;
  }

  return (
    <div className="col-md-6">
      <h5>Required Value: <span>{requiredValue}</span></h5>
      <div className={dropAreaStyle()} ref={drop}>
       {
          coins.map((coin, i) => {
            return <Coin coin={coin} key={'coin' + i} />
          })
       }
      </div>
    </div>
  )
}

export default DropBox;