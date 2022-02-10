import { getFileLink, sendFormData, sendRequest, uploadFile } from "./Engine";
export const baseUrl = window.config.API_BASE;

const APICoreGet = (url) => sendRequest(baseUrl + url);

const APICorePost = async (url, body = {}) => sendRequest(baseUrl + url, body);

const APICoreFormData = async (url, form) => sendFormData(baseUrl + url, form);

const APICoreUpload = async (file) => uploadFile(baseUrl, file);

const APICoreFileLink = (hash) => getFileLink(baseUrl, hash);

export {
  APICoreGet,
  APICorePost,
  APICoreFormData,
  APICoreFileLink,
  APICoreUpload,
};
