import { useDrag } from "react-dnd";
import { ItemTypes } from "../constants/coin";

const Coin = ({ coin }) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      id: coin.id
    },
    type: ItemTypes.COIN,
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return (
    <img
      ref={drag}
      style={{ width: isDragging ? '2rem' : '' }}
      className="coin m-2"
      src={coin.img}
      alt={coin.value} />
  )
}

export default Coin;