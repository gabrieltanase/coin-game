import Coin from './Coin';

const CoinsContainer = ({ coins }) => {
  return (
    <div className="col-md-6">
      <h5>Coins</h5>
      <div className="coin-box border rounded shadow-sm p-3">
        {
          coins.map((coin, i) => {
            return <Coin coin={coin} key={'coin' + i} />
          })
        }
      </div>
    </div>
  )
}

export default CoinsContainer;