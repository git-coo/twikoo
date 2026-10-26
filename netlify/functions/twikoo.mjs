import twikoo from "twikoo-netlify"

export const handler = async (event, context) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "*"
  }
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: ""
    }
  }
  const result = await twikoo(event, context)
  result.headers = { ...corsHeaders, ...result.headers }
  return result
}