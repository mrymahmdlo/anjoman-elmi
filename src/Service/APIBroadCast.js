import { downloadFile, sendRequest } from "./Engine";

const baseUrl = process.env.REACT_APP_Broad_BASE;

const APIBoardcastGet = async (url) => sendRequest(baseUrl + url);

const APIBoardcastPost = async (url, body = {}) =>
  sendRequest(baseUrl + url, body);

const APIBoardcastDownloadExcel = async (url, body) =>
  downloadFile(baseUrl + url, body, "Tutoring.csv");

export { APIBoardcastPost, APIBoardcastGet, APIBoardcastDownloadExcel };
