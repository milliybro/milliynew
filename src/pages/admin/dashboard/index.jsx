import { useEffect } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { AuthContext } from "../../../context/AuthContext";

import { getCategories } from "../../../redux/actions/category";
import { getUsers } from "../../../redux/actions/user";
import { getPosts } from "../../../redux/actions/post";

import "./style.scss";

const DashboardPage = () => {
  const { username } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { total } = useSelector((state) => state.category);
  const { total: userTotal } = useSelector((state) => state.user);
  const { total: postTotal } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getPosts());
    dispatch(getUsers());
  }, [dispatch, total]);

  const [date, setDate] = useState("");
  useEffect(() => {
    const date = new Date();
    let currentDay = date.toDateString();
    setDate(currentDay);
  }, []);

  return (
    <section className="dashboard">
      <div className="main-card">
        <div className="dashboard-greeting">
          <h3 className="dashboard-username">Hello, Abdulaziz !</h3>
        </div>
      </div>
      <div className="wrapper">
       
      </div>
    </section>
  );
};

export default DashboardPage;
