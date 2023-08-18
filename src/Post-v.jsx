import React, { useEffect, useState } from "react";
import { BiSolidUpvote } from "react-icons/bi";
import "animate.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "animate.css";
const PostV = ({ data }) => {
  const [hoverEff, setHoverEff] = useState(false);
  const [voteCount, setVoteCount] = useState(data.votes);
  const [isVoted, setIsVoted] = useState(data.voted);
  const [DisableParent, setDisableParent] = useState(false);

  const navigate = useNavigate();

  function handleNavigate() {
    if (!DisableParent) navigate(`/post/${data.id}`);
  }
  function handleClick() {
    const token = localStorage.getItem("token").replace(/^"|"$/g, "");

    axios
      .post(
        `http://127.0.0.1:8000/api/portrait/vote_portrait/?portrait_id=${data.id}`,
        { token: token }
      )
      .then((response) => {
        console.log(response);
        setIsVoted((prev) => !prev);
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
    <div
      className={`relative animate__animated animate__zoomIn post-v`}
      onClick={handleNavigate}
      onMouseOver={() => {
        setHoverEff(true);
      }}
      onMouseLeave={() => {
        setHoverEff(false);
      }}
    >
      <div className="right-side  relative">
        <div
          onMouseOver={() => {
            setDisableParent(true);
          }}
          onMouseLeave={() => {
            setDisableParent(false);
          }}
          className="absolute top-level flex flex-row-reverse items-center right-5 top-3"
        >
          {" "}
          <BiSolidUpvote
            onClick={handleClick}
            className={`vote-btn ${isVoted && "active"}`}
          />
          <span className="my-[0.4em] mx-[0.5em]">{voteCount}</span>
        </div>
      </div>
      <p className="center-v-h show-details w-fit h-fit">
        Click to show Details
      </p>
      <img
        src={data.photo}
        className={`bg-white rounded-lg  object-cover w-full max-w-[300px] ${
          hoverEff && "blur-effect"
        } h-[300px]`}
        alt=""
      />
    </div>
  );
};

export default PostV;
