import { sendRequest } from "./Engine";

export const baseUrl = window.config.Provider_BASE;
const APIProviderGet = async (url) => sendRequest(baseUrl + url);
const APIProviderPost = async (url, body = {}) =>
  sendRequest(baseUrl + url, body);

export { APIProviderPost, APIProviderGet };
