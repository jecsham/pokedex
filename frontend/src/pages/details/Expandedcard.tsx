import { Pokemon } from "../../adapters/http-pokemon";

function ExpandedCard(props: Pokemon) {
  return (
    <div className="card shadow-sm">
      <img
        src={props.picture}
        draggable={false}
        className="card-img-top bg-secondary bg-gradient"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title text-capitalize">{props.name}</h5>
        <div className="mb-2">
          <h6># {props.id}</h6>
          <strong className="me-1">Types:</strong>
          {props.types.map((e) => (
            <div className="me-1 d-inline-block">
              <span className="badge bg-primary">{e}</span>
            </div>
          ))}
        </div>
        <button className="btn btn-sm btn-success">Add to PokeDex</button>
      </div>
    </div>
  );
}

export default ExpandedCard;
