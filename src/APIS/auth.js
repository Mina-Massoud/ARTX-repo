import { redirect } from "react-router-dom";

export function auth() {

  const user = localStorage.getItem("token");

  if (!user) {
    throw redirect(`/sign-in`);
  }
  return null;
}
