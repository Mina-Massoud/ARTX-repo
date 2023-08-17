import { useState } from "react";
import ReactDOM from "react-dom/client";
import React from "react";
import {
  RouterProvider,
  createRoutesFromElements,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Login from "./login/Login";
import Register from "./register/Register";
import PostDetails from "./Post-details";
import { auth } from "./APIS/auth";

export default function App() {

  const router = createBrowserRouter(

    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} loader={auth} />
          <Route path="sign-in" element = {<Login/>} />
          <Route path="sign-up" element = {<Register/>} />
          <Route path="/post/:id" element = {<PostDetails/>} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}
