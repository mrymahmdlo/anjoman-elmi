import { TokenManager } from "src/Identity/Service/TokenManager";
const { GetToken } = TokenManager();

export const BaseUrl = window.config.EXAM_BASE;

const sendRequest = async (url, body) => {
  const init = {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + GetToken(),
    },
  };

  if (body) {
    init["method"] = "POST";
    init["body"] = JSON.stringify(body);
  }
  const res = await fetch(BaseUrl + url, init);
  if (res.status === 403) {
    const res = { error: "دسترسی شما به این بخش ممکن نیست" };
    throw res;
  }
  const json = await res.json();

  if (res.status < 400) return json;
  throw json;
};

const sendFormData = async (url, body) => {
  const init = {
    headers: {
      Authorization: "Bearer " + GetToken(),
    },
    method: "POST",
    body,
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

export { sendRequest, sendFormData };
