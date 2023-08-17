import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = (props) => {
  const [RegData, setRegData] = useState({ image: null });
  const navigate = useNavigate();
  const [AtFind, setAtFind] = useState(false);
  const [warning, setWarning] = useState(false);
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
        setRegData((prev) => {
          return { ...prev, image: result.info.url };
        });
      }
    }
  );

  function createWidget() {
    myCropWidget.open();
  }

  function RegisterHandle() {
    if (!RegData.username || !RegData.password) {
      setWarning(true);
    }
    if (!AtFind) {
      axios
        .post("http://127.0.0.1:8000/api/accounts/register/", RegData)
        .then((response) => {
          console.log(response);
          navigate("/sign-in");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <>
      <h1 className="text-center my-[1em] text-[2em]">
        Welcome in <strong className="text-blue-600">ArtX</strong>
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
                type="text"
                placeholder="mairoportrait23"
                name="username"
                required={true}
                onChange={(event) => {
                  if (event.target.value.includes("@")) {
                    setAtFind(true);
                  } else setAtFind(false);

                  setRegData({
                    ...RegData,
                    [event.target.name]: event.target.value,
                  });
                }}
              />
              <p className="text-orange-500 text-xs italic">
                {AtFind && "Please enter valid username"}
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
                required={true}
                placeholder="******************"
                name="password"
                onChange={(event) => {
                  setRegData({
                    ...RegData,
                    [event.target.name]: event.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <label
              className="block cursor-pointer custom-file-input-label uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-city"
              onClick={createWidget}
            >
              {!RegData.image ? "Upload Image" : "Image Uploaded"}
            </label>
          </div>
          <div className="button-cont">
            <button
              onClick={RegisterHandle}
              className="shadow bg-blue-700 hover:bg-blue-500 tranisiton duration-300 focus:shadow-outline focus:outline-none text-white font-bold my-[1em] py-2 px-4 rounded"
              type="submit"
            >
              Register
            </button>
            {warning && (
              <p className="text-orange-500 text-xs italic">
                Please fill all required fields.
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
