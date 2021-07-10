import { Link } from "react-router-dom";
import { PartialPokemon } from "../../adapters/http-pokemon";

function Row(props: PartialPokemon) {
  return (
    <div className="border rounded shadow-sm d-flex justify-content-center ">
      <img
        src={props.picture}
        draggable={false}
        className="row-img bg-secondary bg-gradient me-3"
        alt="..."
      />
      <div className="w-100 p-3 d-flex flex-column justify-content-between">
        <div id="body">
          <h5 className="card-title text-capitalize">{props.name}</h5>
        </div>
        <div id="actions" className="d-flex justify-content-end">
          <Link
            to={`/details/${props.name}`}
            className="btn btn-sm btn-secondary me-2"
          >
            Details
          </Link>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => (props.removeFn ? props.removeFn(props.name) : null)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default Row;
