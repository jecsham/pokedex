function Card(props: any) {
  return (
    <div className="card shadow-sm">
      <img src={props.picture} className="card-img-top bg-secondary bg-gradient" alt="..." />
      <div className="card-body">
        <h5 className="card-title text-capitalize">{props?.name}</h5>
        {/* <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p> */}
        <a href="#" className="btn btn-sm btn-secondary">
          Description
        </a>
      </div>
    </div>
  );
}

export default Card;
