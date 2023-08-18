import React, { useEffect, useRef, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "animate.css";
import axios from "axios";

const CreatePost = ({ readyToPostFunc }) => {
  const navigate = useNavigate();
  const [warning, setWarning] = useState(false);
  const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
  if (!token) {
    navigate("/sign-in");
    return 0;
  }

  const [postClosed, setPostClosed] = useState(false);

  const [postData, setPostData] = useState({
    token: token,
  });
  console.log(postData);

  const myPost = useRef(null);

  function handleClosePost() {
    setPostClosed(true);
    setTimeout(() => {
      readyToPostFunc(postClosed);
    }, 300);
  }

  function handlePublishPost() {
    if (!postData.photo) {
      setWarning(true);
    } else {
      axios
        .post("http://127.0.0.1:8000/api/portrait/portraits/", postData, {
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          handleClosePost();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  var myCropWidget = cloudinary.createUploadWidget(
    {
      cloudName: "dik65evmf", // Replace with your Cloudinary cloud name
      uploadPreset: "z9w9zvet", // Replace with your Cloudinary upload preset
      folder: "widgetUpload",
      cropping: true,
      resourceType: "image", // Add this line to filter only image files
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        setPostData((prev) => {
          return { ...prev, photo: result.info.url };
        });
      }
    }
  );

  function createWidget() {
    myCropWidget.open();
  }

  return (
    <div
      ref={myPost}
      className={`border bg-effect  ${
        postClosed
          ? "animate__animated animate__fadeOut"
          : "animate__animated animate__fadeIn"
      }
    : "animate__animated animate__zoomIn" border-white p-[1em] fixed centered flex flex-col rounded-lg`}
    >
      <AiOutlineArrowLeft
        size={30}
        onClick={() => {
          handleClosePost();
        }}
        className="hover:bg-sky-800 hover:cursor-pointer py-[0.2em] rounded-lg tranisiton duration-300"
      />
      <div className="post-section flex flex-col justify-center text-black mx-auto full-height py-[2em] w-fit">
        <h1 className="mb-[2em] text-xl text-white font-black">
          Create Your Post
        </h1>
        <input
          type="text"
          placeholder="caption"
          className="w-full text-white font-black bg-transparent p-[1em] border rounded-lg mb-[2em]"
          name="name"
          id=""
          onChange={(event) => {
            setPostData({
              ...postData,
              [event.target.name]: event.target.value,
            });
          }}
        />
        <textarea
          className="p-[1em] rounded bg-transparent bg-effect border font-black text-white"
          name="description"
          id=""
          placeholder="Write your Description.."
          cols="40"
          rows="5"
          onChange={(event) => {
            setPostData({
              ...postData,
              [event.target.name]: event.target.value,
            });
          }}
        ></textarea>
        <div className="inputs-post my-[2em]">
          <div className="w-full md:w-1/2">
            <label
              className="block cursor-pointer custom-file-input-label uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-city"
              onClick={createWidget}
            >
              {!postData.photo ? "Upload Image" : "Image Uploaded"}
            </label>
          </div>
        </div>
        <button
          onClick={handlePublishPost}
          className="bg-blue-600 text-white py-[0.5em] px-[1.5em] font-black rounded"
        >
          Publish
        </button>
        {warning && (
          <p className="text-orange-500 my-[2em] text-xs italic">
            You have to upload image to publish yout post
          </p>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
