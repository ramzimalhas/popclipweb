export const config = {
  runtime: "edge",
};

export default async function handler(request: Request) {
  // get the query string
  const query = request.url.split("?")[1];
  if (!query) {
    return new Response("No query", { status: 400 });
  }

  // perform the upstream request
  const upstreamUrl = `https://icons.popclip.app/icon?${query}`;
  const res = await fetch(upstreamUrl.toString());

  // add vercel-specific cache headers if the upstream is healthy
  let cacheControl = res.headers.get("Cache-Control") || "public,max-age=1";
  if (res.status < 500) {
    cacheControl += ",s-maxage=604800,stale-while-revalidate=604800";
  }

  return new Response(res.body, {
    status: res.status,
    headers: {
      "X-Icon-Color-Mode": res.headers.get("X-Icon-Color-Mode") || "unknown",
      "Content-Type": res.headers.get("Content-Type") || "text/plain",
      "Cache-Control": cacheControl,
      "Access-Control-Allow-Origin": "*",
    },
  });
}
