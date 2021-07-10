import { Link } from "react-router-dom";

function Card(props: any) {
  return (
    <div className="card shadow-sm">
      <img src={props.picture} draggable={false} className="card-img-top bg-secondary bg-gradient" alt="..." />
      <div className="card-body">
        <h5 className="card-title text-capitalize">{props?.name}</h5>
        <Link to={`/details/${props.name}`} className="btn btn-sm btn-secondary">
          Details
        </Link>
      </div>
    </div>
  );
}

export default Card;
