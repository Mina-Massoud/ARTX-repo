import { useState } from "react";
import ReactDOM from "react-dom/client";
import React from "react";
import {
  RouterProvider,
  createRoutesFromElements,
  Route,
  createHashRouter,
} from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Login from "./login/Login";
import Register from "./register/Register";
import PostDetails from "./Post-details";
import { auth } from "./APIS/auth";

export default function App() {

  const router = createHashRouter(

    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sign-in" element = {<Login/>} />
          <Route path="sign-up" element = {<Register/>} />
          <Route path="/post/:id" element = {<PostDetails/>} loader={auth} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}
