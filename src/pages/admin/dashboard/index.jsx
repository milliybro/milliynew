import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";


import { getCategories } from "../../../redux/actions/category";
import { getUsers } from "../../../redux/actions/user";
import { getPosts } from "../../../redux/actions/post";

import "./style.scss";
import { Progress } from "antd";

const DashboardPage = () => {
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
  console.log(date);
  
  return (
    <section className="dashboard">
      <div className="main-card">
        <div className="dashboard-greeting">
          <h3 className="dashboard-username">Hello, Abdulaziz !</h3>
        </div>
      </div>
        <div className="userTotal">
          <h2>Total user: <span>{userTotal}</span></h2>
        </div>
      <div className="wrapper">
        <div>
          {" "}
          <h2>Total category:</h2>
          <Progress
            type="circle"
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
            percent={total}
            format={(percent) => percent + ""}
          />
        </div>

        <div>
          <h2>Total post:</h2>

          <Progress
            type="circle"
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
            percent={postTotal}
            format={(percent) => percent + ""}
          />
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
