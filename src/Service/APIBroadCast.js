import { downloadFile, sendRequest } from "./Engine";

const baseUrl = window.config.Broad_BASE;

const APIBoardcastGet = async (url) => sendRequest(baseUrl + url);

const APIBoardcastPost = async (url, body = {}) =>
  sendRequest(baseUrl + url, body);

const APIBoardcastDownloadExcel = async (url, body,name) =>
  downloadFile(baseUrl + url, body,name);

export { APIBoardcastPost, APIBoardcastGet, APIBoardcastDownloadExcel };
