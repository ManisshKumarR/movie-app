import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="head-main">
      <ul>
        <li>
          <Link to="/">Movie List</Link>
        </li>
        <li>
          <Link to="/favourite">Favourite</Link>
        </li>
        <li>Add to List</li>
      </ul>
    </nav>
  );
};

export default Header;
