import React from "react";
import imgTest from "../media/testface.jpg";
import { useState } from "react";
import axios from "axios";
import { BiSolidUpvote } from "react-icons/bi";

const FullPostDetail = ({ data }) => {
  const [voteCount, setVoteCount] = useState(data.votes);
  const [isVoted, setIsVoted] = useState(data.voted);

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
    <div className="overflow-handle">
      <div className="flex  mx-[1em] border-b pb-[1em] mb-[2em] justify-between ">
        <div className="flex mb-[1em]">
          <img
            className="max-w-[50px] mr-[1em] w-[50px] h-[50px] rounded-full"
            src={data.owner.image ? data.owner.image : imgTest}
            alt=""
          />
          <div>
            <h3 className="font-black">
              {data.owner.first_name} {data.owner.list_name}
            </h3>
            <p className="text-[0.7em]">{data.owner.username}</p>
          </div>
        </div>
        <div>
          <div className="flex items-center">
            {" "}
            <BiSolidUpvote
              onClick={handleClick}
              className={`vote-btn ${isVoted && "active"}`}
            />
            <span className="my-[0.4em] mx-[0.5em]">{voteCount}</span>
          </div>
        </div>
      </div>

      <div className="lg:mx-[3em] flex flex-col">
        <p className="mb-[1em] border-b pb-[1em]">{data.name}</p>
        <img src={data.photo} className="rounded-lg p-[1em]" alt="" />
        <p className="my-[2em] border-t pt-[1em]">{data.description}</p>
      </div>
    </div>
  );
};

export default FullPostDetail;
