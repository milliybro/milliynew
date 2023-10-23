import { useState } from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import request from "../../../server";

const CommentPage = () => {
  const { blogId } = useParams();
  const [post, setPost] = useState();
  const [user, setUser] = useState();


  useEffect(() => {
    const getComment = async () => {
      try {
        let { data } = await request.get(`comment?post=${blogId}`);
        setPost(data);
      } catch (err) {
        console.log(err);
      }
    };
    getComment();
  }, [blogId]);





  return (
    <Fragment>
      <div className="container">
      <h2>Comments</h2>
      <h4>{post?.data[0].user}</h4>
      <h3>{post?.data[0].comment}</h3>
      </div>
    </Fragment>
  );
};

export default CommentPage;
