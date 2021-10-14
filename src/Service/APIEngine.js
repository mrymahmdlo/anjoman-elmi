import { TokenManager } from "src/Identity/Service/TokenManager";
const { GetToken } = TokenManager();
const secret = "AMP_!YUHDSJHYG@&12312!W@sAs";

export const BaseUrl = process.env.REACT_APP_API_BASE;
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

const UploadFileRequest = async (file) => {
  const form = new FormData();
  form.append("file", file);
  form.append("secret", secret);
  const init = {
    headers: {
      Authorization: "Bearer " + GetToken(),
    },
    method: "POST",
    body: form,
  };

  const res = await fetch("http://dev.bamis.ir/api/v1/" + "File/Upload", init);
  try {
    const json = await res.json();
    if (res.status < 400) return json;
    throw json;
  } catch {
    return null;
  }
};

const GetFileDownloadLink = (hash) => "http://dev.bamis.ir/api/v1/" + "File/Download/" + hash;

export { PostData, GetData, UploadFileRequest, GetFileDownloadLink };
