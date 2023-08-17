import { data } from "autoprefixer";
import React from "react";
import imgTest from "../media/testface.jpg";
const Comment = ({ data }) => {
  console.log(data);
  return (
    <div className="border-b pb-[2em] pt-[1em] flex">
      <img
        src={data.owner.image ? data.owner.image : imgTest}
        className="min-w-[30px] w-[30px] mr-[0.5em] h-[28px] rounded-full"
        alt=""
      />
      <p>
        <span className="font-black">
          {data.owner.first_name} {data.owner.last_name}
        </span>{" "}
        <span>{data.content}</span>
      </p>
    </div>
  );
};

export default Comment;
