import { postFormData, sendRequest } from "./Engine";

const baseUrl = window.config.EXAM_BASE;

const APIExamSendRequest = async (url, body) =>
  sendRequest(baseUrl + url, body);

const APICExamFormData = async (url, form) => postFormData(baseUrl + url, form);

export { APIExamSendRequest, APICExamFormData };
