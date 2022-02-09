import { TokenManager } from "src/Identity/Service/TokenManager";
const { GetToken } = TokenManager();

const secret = "AMP_!YUHDSJHYG@&12312!W@sAs";

const headers = {
  "content-Type": "application/json; charset=utf-8",
  Authorization: "Bearer " + GetToken(),
};

const sendRequest = async (url, body) => {
  let res;
  if (body) {
    res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
  } else {
    res = await fetch(url, { headers });
  }

  if (res.status < 400) {
    try {
      const text = await res.text();
      const json = JSON.parse(text);
      return json;
    } catch (err) {
      return true;
    }
  }
  if (res.status === 403) {
    const error = { error: "دسترسی شما به این بخش ممکن نیست" };
    throw error;
  }
  const error = await res.json();
  throw error;
};

const sendFormData = async (url, form) => {
  const formData = new FormData();
  for (var key in form) {
    formData.append(key, form[key]);
  }
  const res = await fetch(url, {
    headers: {
      Authorization: "Bearer " + GetToken(),
    },
    method: "POST",
    body: formData,
  });
  if (res.status < 400) {
    try {
      const text = await res.text();
      const json = JSON.parse(text);
      return json;
    } catch (err) {
      return true;
    }
  }
  const error = await res.json();
  throw error;
};

const UploadFile = async (base, file) => {
  const form = new FormData();
  form.append("file", file);
  form.append("secret", secret);
  form.append("fileName", file.name);
  const init = {
    headers: {
      Authorization: "Bearer " + GetToken(),
    },
    method: "POST",
    body: form,
  };

  const res = await fetch(base + "File/Upload", init);
  if (res.status < 400) {
    try {
      const text = await res.text();
      const json = JSON.parse(text);
      return json;
    } catch (err) {
      return true;
    }
  }
  const error = await res.json();
  throw error;
};

export { secret, sendRequest, sendFormData, UploadFile };
