import React, { useRef, useState, useEffect } from "react";
import { BsListNested } from "react-icons/bs";
import "animate.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
const Header = (props) => {
  const [dropDownOpened, setDropDownOpened] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [removeDrop, setRemoveDrop] = useState(true);
  let styleDropDown = {
    position: "absolute",
    right: "-25%",
    padding: "1em",
    top: "50px",
  };
  const navigate = useNavigate();
  function handleRemoveDrop() {
    if (screenWidth >= 550) {
      setRemoveDrop(true);
    } else if (removeDrop) {
      setRemoveDrop((prev) => !prev);
    } else {
      setTimeout(() => {
        setRemoveDrop((prev) => !prev);
      }, 200);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const userToken = localStorage.getItem("token");
  const username = localStorage.getItem("username") ? localStorage.getItem("username").replace(/"/g, "") : "";

  return (
    <div className="h-[50px] bg-effect w-full flex items-center justify-between px-[3em] border-b-[1px] border-[#54bbd8]">
      <Link to="/">
        <h2 className="font-black text-[1.6rem]">
          Art<span className="text-[2rem] text-blue-500">X</span>
        </h2>
      </Link>
      <div className="header-sign-options relative min-w-[100px]">
        {!userToken && (
          <BsListNested
            onClick={() => {
              setDropDownOpened((prev) => !prev);
              handleRemoveDrop();
            }}
            size={30}
            className="dropdown text-white ml-auto cursor-pointer"
          />
        )}

        {!removeDrop && (
          <ul
            style={styleDropDown}
            className={`main-color dropDownElements ${
              !dropDownOpened
                ? "animate__animated animate__zoomOut"
                : "animate__animated animate__zoomIn"
            } w-fit border border-[#54bbd8] rounded`}
          >
            <Link to="sign-in">
              <li className="dropdown-elem mx-[1em] rounded  hover:bg-[#54bbd8] px-[1em] py-[0.5em] hover:transition duration-200 cursor-pointer">
                Sign in
              </li>
            </Link>
            <Link to="sign-up">
              <li className="dropdown-elem mx-[1em] rounded  hover:bg-[#54bbd8] px-[1em] py-[0.5em] hover:transition duration-200 cursor-pointer">
                Sign Up
              </li>
            </Link>
          </ul>
        )}
        {!userToken && (
          <div className="buttons-header">
            <Link to="sign-in">
              <button className="inline-block mx-[0.5em]  px-[1em] py-[0.3em] hover:bg-[#54bbd8] tranistion duration-300 rounded">
                Sign in
              </button>
            </Link>
            <p className="inline-block mx-[0.5em]">|</p>
            <Link to="sign-up">
              <button className="inline-block px-[1em] py-[0.3em] hover:bg-[#54bbd8] tranistion duration-300 rounded">
                Sign Up
              </button>
            </Link>
          </div>
        )}
        {username && <p className="font-black">{username}</p>}
      </div>
    </div>
  );
};

export default Header;
