import React, { useEffect, useState } from "react";
import imgTest from "../media/testface.jpg";
import imgPost from "../media/testPostImg.jpg";
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import "animate.css";
import { Link } from "react-router-dom";
import axios from "axios";
const Post = ({ length, openHandle, data }) => {
  const [voteCount, setVoteCount] = useState(data.votes);

  function getRandomNumber(length) {
    return Math.floor(Math.random() * length); // generates a random number between 0 and 10
  }

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(getRandomNumber(length) % 5);
  }, []);

  function handleClick() {
    const token = localStorage.getItem("token").replace(/^"|"$/g, "");

    axios
      .post(
        `http://127.0.0.1:8000/api/portrait/vote_portrait/?portrait_id=${data.id}`,
        { token: token }
      )
      .then((response) => {
        console.log(response);
        if (!response.data.message) {
          setVoteCount((prev) => prev - 1);
        } else {
          setVoteCount((prev) => prev + 1);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }


  return (
    <div className="animate__animated animate__zoomIn card_small ">
      <div className="right-side relative z-[99999]">
        {!data.voted ? (
          <div className="absolute flex flex-row-reverse items-center right-5 top-3">
            {" "}
            <BiSolidUpvote onClick={handleClick} className="vote-btn active" />
            <span className="my-[0.4em] mx-[0.5em]">{voteCount}</span>
          </div>
        ) : (
          <p className="font-black text-green-500 absolute top-8 right-5">
            voted
          </p>
        )}
      </div>
      <Link
        to={`${openHandle ? `/post/${data.id}` : ""}`}
        className={`w-full h-full py-[2em] block ${
          openHandle && "hover:cursor-pointer"
        } p-[1em] ${openHandle && "bg-[#00431a4f]"} rounded-lg ${
          !index && "horizontal"
        }`}
      >
        <div className={`${!openHandle && "cursor-default"} flex flex-col h-full`}>
          <div className="post-sender flex justify-between">
            <div className="left-side-post flex items-center h-fit">
              <img
                className="max-w-[50px] object-cover rounded-lg"
                src={imgTest}
                alt=""
              />
              <div className="post-sender-info mx-[1em]">
                <p>{data.owner.first_name}</p>
                <p className="text-sm">11:00 pm</p>
              </div>
            </div>
          </div>
          <div className="content my-[1em]">
            <img className="post-img rounded-lg" src={data.photo} alt="" />
          </div>
          <div className="desc-post mt-auto">{data.description}</div>
        </div>
      </Link>
    </div>
  );
};

export default Post;
