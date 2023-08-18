import { redirect } from "react-router-dom";
import axios from "axios";
export function auth() {
  const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
  axios
    .get("http://localhost:8000/api/accounts/check_token/", {
      headers: { Authorization: `Token ${token}` },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });

  if (!token) {
    throw redirect(`/sign-in`);
  }
  return null;
}
