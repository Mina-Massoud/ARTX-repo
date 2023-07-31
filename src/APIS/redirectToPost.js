import { redirect } from "react-router-dom";

export function postData(id = "") {
  if (id) {
    throw redirect(`/post/${id}`);
  }
  return null;
}
