import { Link } from "react-router-dom";
import "./notFound.css";
const NotFound = () => {
  return (
    <div className="notFound">
      <h1 className="main-text">404</h1>
      <h4 className="sub-text">Uh Oh! Page not found!</h4>
      <Link className="home-link" to="/">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
