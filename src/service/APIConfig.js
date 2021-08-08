const BaseUrl = "http://dev.bamis.ir/api/v1/";
const GetData = (url) => {
  return fetch(BaseUrl + url, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxMyIsIm5iZiI6MTYyODE4MTExMSwiZXhwIjoxNjI4Nzg1OTExLCJpYXQiOjE2MjgxODExMTF9.aiqbx0UzdCc6ICnMWQnHyFfV2Q5lFbSVvrjdX3_ghVU",
    },
  }).then((res) => res.json());
};

const PostData = async (url, body) => {
  const data = await fetch(BaseUrl + url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxMyIsIm5iZiI6MTYyODE4MTExMSwiZXhwIjoxNjI4Nzg1OTExLCJpYXQiOjE2MjgxODExMTF9.aiqbx0UzdCc6ICnMWQnHyFfV2Q5lFbSVvrjdX3_ghVU",
    },
    body: JSON.stringify(body),
  });

  const json = await data.json();

  if (data.status < 400) return json;
  throw json;
};

export { PostData, GetData };
