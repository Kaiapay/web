import { renderToString } from "react-dom/server";
import { routes } from "./routes";

export default function handleRequest(request: Request) {
  return new Response(
    "<!DOCTYPE html><html><body><div id='root'></div></body></html>",
    {
      headers: { "Content-Type": "text/html" },
    }
  );
}
