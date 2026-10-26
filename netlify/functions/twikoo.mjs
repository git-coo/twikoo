import twikoo from "twikoo-netlify";

export default async (event, context) => {
  const origin = event.headers.origin || "";
  const allowOrigin = "http://coobk.com"; // 改成你的域名！

  const headers = {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };

  // 预检OPTIONS单独返回
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers
    };
  }

  const res = await twikoo.handler(event, context);
  res.headers = { ...headers, ...res.headers };
  return res;
};