import { TokenManager } from "src/Identity/Service/TokenManager";
const { GetToken } = TokenManager();

const BaseUrl = "http://myexam.bamis.ir/";

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
  const json = await res.json();

  if (res.status < 400) return json;
  throw json;
};

export { sendRequest };
