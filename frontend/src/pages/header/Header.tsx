import { NavLink } from "react-router-dom";
interface PropsComponent {
  itemCount: number;
}

function Header(props: PropsComponent) {
  const renderCounter = () => {
    if (props.itemCount) {
      return (
        <span className="ms-1 badge rounded-pill bg-danger">
          {props.itemCount}
        </span>
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          PokeDex
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                exact
                className="nav-link"
                activeClassName="active"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                className="nav-link"
                activeClassName="active"
                to="/pokedex"
              >
                My Pokedex
                {renderCounter()}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Header;
