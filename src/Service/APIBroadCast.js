import { TokenManager } from "src/Identity/Service/TokenManager";
import { secret, sendRequest } from "./Engine";
const { GetToken } = TokenManager();

const BaseUrl = window.config.Broad_BASE;

const APIBoardcastGet = async (url) => sendRequest(BaseUrl + url);

const APIBoardcastPost = async (url, body = {}) =>
  sendRequest(BaseUrl + url, body);

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

const DownloadExcelReportBroad = async (url, body) => {
  return await fetch(BaseUrl + url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => {
    res.blob().then((blob) => {
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = "Tutoring.csv";
      a.click();
    });
  });
};

const GetFileDownloadLink = (hash) => BaseUrl + "File/Download/" + hash;

export {
  APIBoardcastPost,
  APIBoardcastGet,
  UploadFileRequest,
  GetFileDownloadLink,
  DownloadExcelReportBroad,
};
