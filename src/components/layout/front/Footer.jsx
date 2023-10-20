import { Link, NavLink } from "react-router-dom";
import facebook from "../../../assets/images/facebook.svg";
import instagram from "../../../assets/images/instagram.svg";
import linkedin from "../../../assets/images/linkedin.svg";
import twitter from "../../../assets/images/twitter.svg";
import home from "../../../assets/images/home.png";
import blog from "../../../assets/images/blog.png";
import about from "../../../assets/images/about.png";
import register from "../../../assets/images/register.png";
import login from "../../../assets/images/login.png";



import "./Footer.scss";

const Footer = () => {

  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer__info">
          <a href="https://maps.app.goo.gl/bGYUm2T3ke6Saciw6">MilliyBro 18 10 Chilonzor</a>
          <div className="footer__contact">
            <Link title="Click to email" className="footer__email" to="mailto:shohrux-rustamov@mail.ru">
            shohrux-rustamov@mail.ru
            </Link>
            <Link title="Click to make a phone call" to="tel:+998904969007" className="footer__phone">+998904969007</Link>
          </div>
        </div>
        <div className="footer__media">
          <Link to="https://www.facebook.com/milliybro">
            <img src={facebook} alt="Facebook" className="footer-img" />
          </Link>
          <Link to="https://www.twitter.com/milliybro">
            <img src={twitter} alt="twitter" className="footer-img" />
          </Link>
          <Link to="https://www.instagram.com/milliybro">
            <img src={instagram} alt="instagram" className="footer-img" />
          </Link>
          <Link to="https://www.linkedin.com/in/milliybro">
            <img src={linkedin} alt="linkedin" className="footer-img" />
          </Link>
        </div>
      </div>
      <div className="headfoot">
      <div className="container headercha">
        <NavLink className="headercha-link" to="/"><img src={home} alt="" />Home </NavLink>
        <NavLink className="headercha-link" to="/posts"><img src={blog} alt="" />Blog</NavLink>
        <NavLink className="headercha-link" to="/about"><img src={about} alt="" />About</NavLink>
        <NavLink className="headercha-link" to="/register"><img src={register} alt="" />Register</NavLink>
        <NavLink className="headercha-link" to="/login"><img src={login} alt="" />Login</NavLink>
      </div>
    </div>
    </footer>
  );
};

export default Footer;
