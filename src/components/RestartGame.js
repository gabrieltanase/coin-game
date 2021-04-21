const RestartGame = ({ handleOnClick }) => {
  return (
    <div className="row mb-5 justify-content-center">
      <div className="col-md-4">
        <button className="btn btn-danger w-100" onClick={handleOnClick}>Restart</button>
      </div>
    </div>
  )
}

export default RestartGame;