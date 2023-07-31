import React, { useEffect, useRef, useState } from "react";
import Post from "./Post";
import "animate.css";
import { useParams } from "react-router-dom";
import axios from "axios";
const PostDetails = (props) => {
  const [commentData, setCommentData] = useState();
  const [comments, setComments] = useState();
  const [postData, setPostData] = useState();
  const [flag, setFlag] = useState();
  const myInput = useRef();
  const param = useParams();

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/api/portrait/portrait_detail/?portrait_id=${param.id}`
      )
      .then((response) => {
        setPostData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [flag]);

  useEffect(() => {
    if (postData) setComments(postData.comments);
  }, [postData]);


  function handleSendComment() {
    const token = localStorage.getItem("token").replace(/^"|"$/g, "");
    axios
      .post(
        `http://127.0.0.1:8000/api/portrait/comments/?portrait_id=${param.id}`,
        { content: commentData, token: token }
      )
      .then((response) => {
        console.log(response);
        myInput.current.value = "";
        setFlag((prev) => !prev);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  if (!comments) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="post-details-section">
      <div className="custom-grid-layout">
        <div className="post-content bg-effect rounded animate__animated animate__zoomIn">
          {postData ? <Post data={postData} /> : ""}
        </div>
        <div className="comments bg-[#cce4dc1c] animate__animated animate__zoomIn">
          <h1 className="py-[1em] px-[1em] font-black text-[1.5rem]">
            Comments
          </h1>
          <div className="comments-list ml-[2rem] max-h-[68vh] py-[1em] px-[1.5em] h-full">
            <div className="comments-list-item">
              {comments &&
                comments.map((child) => {
                  return (
                    <div className="comments-content mb-[0.5em] bg-green-800 min-content px-[1.2em] py-[0.3em] rounded">
                      {child.content}
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="comments-buttons mt-auto flex mb-[1.5em] justify-between">
            <input
              ref={myInput}
              type="text"
              onChange={(event) => {
                setCommentData(event.target.value);
              }}
              className="py-[0.8em] text-black px-[1em] w-[80%] ml-[2em] mr-[2em] rounded"
            />
            <button
              onClick={handleSendComment}
              className="bg-green-800 hover:bg-green-600 tranisiton duration-300 px-[2em] rounded mr-[1em]"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
