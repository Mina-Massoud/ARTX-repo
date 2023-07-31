import React, { useEffect, useState } from "react";
import Post from "./Post";
import CreatePost from "./CreatePost";
import axios from "axios";

const Home = (props) => {
  const [readyToPost, setReadyToPost] = useState(false);
  const [postsData, setPostsData] = useState();
  console.log(postsData);

  useEffect(() => {
    const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
    console.log(token);
    axios
      .get("http://localhost:8000/api/portrait/portraits/", { token: token })
      .then((response) => {
        setPostsData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [readyToPost]);

  function readyToPostFunc(data) {
    setReadyToPost(data);
  }

  return (
    <>
      <div className="home pb-[2em]">
        {readyToPost && (
          <CreatePost
            readyToPostFunc={readyToPostFunc}
            postClosedProp={false}
          />
        )}
        <div className="intro custom-grid-layout">
          <h1 className="intro-title text-[2rem] md:text-[3rem]">
            <span className="font-black text-green-600">Welcome</span>,This is
            Artx
          </h1>
          <div className="about-intro">
            <strong className="block py-[1em] text-[#ffffff7d] text-xl">
              What is the ArtX ?{" "}
            </strong>{" "}
            <p className="md:max-w-[50%] py-[2em]">
              The ultimate art platform for creators. Join our vibrant community
              to share and grow your art. Get constructive feedback and refine
              your skills with fellow artists. Unleash your artistic expression
              with ArtX.
            </p>
          </div>
        </div>
        <div className="custom-grid-layout">
          <div className="post py-[2em]">
            <button
              onClick={() => {
                setReadyToPost(true);
              }}
              className="p-[1em] font-black bg-green-800 px-[2.5em] rounded-lg tranisiton duration-300 hover:bg-green-500"
            >
              Post
            </button>
          </div>
        </div>
        <main className="custom-grid-layout">
          <div className="main-grid">
            {postsData &&
              postsData.map((child, index) => {
                return (
                  <Post
                    data={child}
                    key={index}
                    openHandle={true}
                    length={postsData.length}
                    index={index}
                  />
                );
              })}
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
