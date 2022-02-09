import { sendFormData, sendRequest } from "./Engine";

const baseUrl = window.config.EXAM_BASE;

const APIExamSendRequest = async (url, body) =>
  sendRequest(baseUrl + url, body);

const APICExamFormData = async (url, form) => sendFormData(baseUrl + url, form);

export { APIExamSendRequest, APICExamFormData };
