import { sendFormData, sendRequest, UploadFile } from "./Engine";

export const BaseUrl = process.env.REACT_APP_API_BASE;

const APICoreGet = (url) => sendRequest(BaseUrl + url);

const APICorePost = async (url, body = {}) => sendRequest(BaseUrl + url, body);

const APICoreFormData = async (url, form) => sendFormData(BaseUrl + url, form);

const APICoreUpload = async (file) => UploadFile(BaseUrl, file);

const GetFileDownload = async (hash) => {
  return fetch(BaseUrl + `file/Download?hashId=${hash}`, {
    method: "GET",
  }).then((res) => res.json());
};
const GetFileDownloadLink = async (hash) => BaseUrl + "File/Download/" + hash;

export {
  APICoreGet,
  APICorePost,
  APICoreFormData,
  APICoreUpload,
  GetFileDownloadLink,
  GetFileDownload,
};
