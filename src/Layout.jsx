import React from "react"
import Header from "./header";
import { Outlet } from "react-router-dom";
const Layout = (props) => {
  return (
    <>
    <Header/>
    <Outlet/>
    </>
  )
};

export default Layout;
