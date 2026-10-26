import twikoo from "twikoo-netlify";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400"
};

export default async (event, context) => {
  // 单独处理 OPTIONS 预检请求（解决跨域核心）
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: corsHeaders
    };
  }

  let res;
  try {
    res = await twikoo.handler(event, context);
  } catch (err) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: err.message })
    };
  }
  // 追加跨域头
  res.headers = { ...corsHeaders, ...res.headers };
  return res;
};
