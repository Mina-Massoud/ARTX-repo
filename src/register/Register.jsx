import React from "react";
import { useState } from "react";
import axios from "axios";
import CustomInputUpload from "../customButtons/CustomInput";
import { useNavigate } from "react-router-dom";
const Register = (props) => {
  const [RegData, setRegData] = useState();
  const navigate = useNavigate();

  const proxy = "https://corsproxy.io/?";
  const url = "http://127.0.0.1:8000/api/accounts/register/";

  function RegisterHandle() {
    axios
      .post("http://127.0.0.1:8000/api/accounts/register/", RegData)
      .then((response) => {
        navigate("/sign-in")
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <h1 className="text-center my-[1em] text-[2em]">
        Welcome in <strong className="text-green-600">ArtX</strong>
      </h1>
      <div className="flex p-[1em] justify-center flex-col items-center full-height animate__animated animate__fadeIn">
        <form>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2  mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                First Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-800 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Jane"
                name="first_name"
                onChange={(event) => {
                  setRegData({
                    ...RegData,
                    [event.target.name]: event.target.value,
                  });
                }}
              />
            </div>
            <div className="w-full md:w-1/2 pl-[1em]">
              <label
                className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Last Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-800  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                name="last_name"
                placeholder="Doe"
                onChange={(event) => {
                  setRegData({
                    ...RegData,
                    [event.target.name]: event.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full ">
              <label
                className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                username
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-800 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="username"
                placeholder="mairo@portrait"
                name="username"
                onChange={(event) => {
                  setRegData({
                    ...RegData,
                    [event.target.name]: event.target.value,
                  });
                }}
              />
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full">
              <label
                className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-800 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="password"
                placeholder="******************"
                name="password"
                onChange={(event) => {
                  setRegData({
                    ...RegData,
                    [event.target.name]: event.target.value,
                  });
                }}
              />
              <p className="text-gray-400 text-xs italic">
                Make it as long and as crazy as you'd like
              </p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <CustomInputUpload />
          </div>
          <div className="button-cont">
            <button
              onClick={RegisterHandle}
              className="shadow bg-green-700 hover:bg-green-500 tranisiton duration-300 focus:shadow-outline focus:outline-none text-white font-bold my-[1em] py-2 px-4 rounded"
              type="button"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
