import { TokenManager } from "src/Identity/Service/TokenManager";
const { GetToken } = TokenManager();

const BaseUrl = "http://dev.bamis.ir/api/v1/";
const GetData = (url) => {
  return fetch(BaseUrl + url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + GetToken(),
    },
  }).then((res) => res.json());
};

const PostData = async (url, body) => {
  const data = await fetch(BaseUrl + url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + GetToken(),
    },
    body: JSON.stringify(body),
  });

  const json = await data.json();

  if (data.status < 400) return json;
  throw json;
};

export { PostData, GetData };
