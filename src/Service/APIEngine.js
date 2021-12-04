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

  if (data.status < 400) {
    try {
      const text = await data.text();
      const json = JSON.parse(text);
      return json;
    } catch (err) {
      return true;
    }
  }
  if (data.status === 403) {
    const res = { error: "دسترسی شما به این بخش ممکن نیست" };
    throw res;
  }
  const json = await data.json();
  throw json;
};

const UploadFileRequest = async (file) => {

  const form = new FormData();
  form.append("file", file);
  form.append("secret", secret);
  form.append("fileName", file.name);
  const init = {
    headers: {
      Authorization: "Bearer " + GetToken(),
    },
    method: "POST",
    body: form,
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

export const postFormData = async (url, form) => {
  const formData = new FormData();
  for (var key in form) {
    formData.append(key, form[key]);
  }
  const init = {
    headers: {
      Authorization: "Bearer " + GetToken(),
    },
    method: "POST",
    body: formData,
  };
  const res = await fetch(BaseUrl + url, init);

  try {
    const json = await res.json();
    if (res.status < 400) return json;
    throw json;
  } catch {
    return null;
  }
};

const GetFileDownload = (hash) => {
  return fetch(BaseUrl + `file/Download?hashId=${hash}`, {
    method: "GET",
  }).then((res) => res.json());
};
const GetFileDownloadLink = (hash) =>BaseUrl + "File/Download/" + hash ;


export {
  PostData,
  GetData,
  UploadFileRequest,
  GetFileDownloadLink,
  GetFileDownload,
};
