import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function Login() {
  const [loginData, setLoginData] = useState();
  const [warning, setWarning] = useState(false);
  const navigate = useNavigate();
  const [AtFind, setAtFind] = useState(false);

  function loginhandle() {
    if (!AtFind) {
      axios
        .post("http://127.0.0.1:8000/api/accounts/login/", loginData)
        .then((response) => {
          localStorage.setItem("token", JSON.stringify(response.data.token));
          localStorage.setItem("username", JSON.stringify(loginData.username));
          navigate(`/`);
        })
        .catch((error) => {
          setWarning(true);
          console.error(error);
        });
    }
  }

  return (
    <div className="full-height bg-effect">
      {" "}
      <h1 className="text-center font-black my-[3em] text-[2em]">
        Welcome in <strong className="text-blue-600">ArtX</strong>
      </h1>
      <div className="flex justify-center  animate__animated animate__fadeIn">
        <form className="">
          <div className="">
            <div className="my-[1em]">
              <label className="" htmlFor="inline-full-name">
                username
              </label>
            </div>
            <div className="">
              <input
                className="p-[0.5em] text-[1.2rem] rounded text-blue-800 font-black pl-[1em] pr-[1em]"
                id="inline-full-name"
                type="text"
                required={true}
                name="username"
                onChange={(event) => {
                  if (event.target.value.includes("@")) {
                    setAtFind(true);
                  } else setAtFind(false);

                  setLoginData({
                    ...loginData,
                    [event.target.name]: event.target.value,
                  });
                }}
              />
              <p className="text-orange-500 my-[2em] text-xs italic">
                {AtFind && "Please enter valid username"}
              </p>
            </div>
          </div>
          <div className="my-[2em]">
            <div className="my-[1em]">
              <label className="" htmlFor="inline-password">
                Password
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="p-[0.5em] text-[1.2rem] rounded text-blue-800 font-black pl-[1em] pr-[1em]"
                id="inline-password"
                type="password"
                required={true}
                name="password"
                placeholder="******************"
                onChange={(event) => {
                  setLoginData({
                    ...loginData,
                    [event.target.name]: event.target.value,
                  });
                }}
              />
            </div>
          </div>
          <button
            className="shadow bg-blue-700 hover:bg-blue-500 tranisiton duration-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={loginhandle}
          >
            Login
          </button>
          {warning && (
            <p className="text-orange-500 my-[2em] text-xs italic">
              username or password is not correct.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
