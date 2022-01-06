import {TokenManager} from "src/Identity/Service/TokenManager";
const { GetToken } = TokenManager();

export const BaseUrl = process.env.REACT_APP_Webinar_BASE;
const GetDataWebinar = (url) => {
  return fetch(BaseUrl + url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + GetToken(),
    },
  }).then((res) => res.json());
};

const PostDataWebinar = async (url, body) => {
  const data = await fetch(BaseUrl + url, {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=utf-8",
      Authorization: "Bearer " + GetToken(),
    },
    body: JSON.stringify(body),
  });

  if (data.status < 400) {
    try {
      const text = await data.text();
      return JSON.parse(text);
    } catch (err) {
      return true;
    }
  }
  if (data.status === 403) {
    throw {error: "دسترسی شما به این بخش ممکن نیست"};
  }
  throw await data.json();
};

export { PostDataWebinar, GetDataWebinar };
