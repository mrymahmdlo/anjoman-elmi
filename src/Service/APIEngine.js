import { TokenManager } from "src/Identity/Service/TokenManager";
const { GetToken } = TokenManager();

const BaseUrl = process.env.REACT_APP_API_BASE;
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

const UploadFileRequest = async (body) => {
  const init = {
    headers: {
      Authorization: "Bearer " + GetToken(),
    },
    mode: "no-cors",
    method: "POST",
    body,
  };

  const res = await fetch(BaseUrl + "File/Upload", init);
  try {
    const json = await res.json();
    if (res.status < 400) return json;
    throw json;
  } catch {
    return null;
  }
};

export { PostData, GetData, UploadFileRequest };
