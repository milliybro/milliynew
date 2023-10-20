import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";



import "./Header.scss";
import { AuthContext } from "../../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { switchLanguage } from "../../../redux/actions/language";

const Header = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const dispatch = useDispatch();
  const { language: lang, languageType } = useSelector(
    (state) => state.language
  );

  return (
    <header id="header">
      <nav className="nav">
        <div className="container nav__container">
          <div className="nav__logo">
            {isAuthenticated ? (
              <Link className="nav__logo" to="/my-posts">
                {lang.myPosts}
              </Link>
            ) : (
              <Link to="/" className="logo__link">
                <img className="site-logo" src={"/public/logo.png"} alt="Website logo" />
              </Link>
            )}
          </div>
          <ul className="nav__menu">
            <li className="nav__item">
              <NavLink to="/" className="nav__link">
                {lang.home}
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/posts" className="nav__link">
                Blog
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/about" className="nav__link">
                {lang.about}
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/register" className="nav__link">
                {lang.register}
              </NavLink>
            </li>
            <li className="nav__item">
              {isAuthenticated ? (
                <Link to="/account" className="nav__login__btn">
                  {lang.account}
                </Link>
              ) : (
                <Link to="/login" className="nav__login__btn">
                  {lang.login}
                </Link>
              )}
            </li>
            <li className="nav__item">
              <select
                onChange={(e) => dispatch(switchLanguage(e.target.value))}
                value={languageType}
              >
                <option value="en">EN</option>
                <option value="uz">UZ</option>
              </select>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
