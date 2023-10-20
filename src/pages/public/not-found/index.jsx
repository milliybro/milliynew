import { memo } from "react";
import { Link } from "react-router-dom";

import "./style.scss";

const NotFoundPage = () => {
  return (
    <div id="notfound">
     <div className="notfound">
       <div className="notfound-404">
         <h1>404</h1>
         <h2>Page not found</h2>
       </div>
       <a href="#">Report</a>
       <Link to={"/"} >Homepage</Link>
     </div>
   </div>
  );
};

const MemoNotFoundPage = memo(NotFoundPage);

export default MemoNotFoundPage;
