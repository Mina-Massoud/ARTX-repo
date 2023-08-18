import { redirect } from "react-router-dom";
import axios from "axios";
 export async function auth() {
  const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
  let flag = false;
  await axios
    .get("http://localhost:8000/api/accounts/check_token/", {
      headers: { Authorization: `Token ${token}` },
    })
    .then((response) => {
      console.log(response);
      flag = true;
      console.log(flag)
    })
    .catch((error) => {
      console.error(error);
    });
  if (flag) {
    return true;
  } else {
    console.log(flag)
    throw redirect(`/sign-in`);
  }
  return null;
}
