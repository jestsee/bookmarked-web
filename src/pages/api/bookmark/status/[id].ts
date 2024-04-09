import EventSource from "eventsource";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { id } = req.query;

  if (!id) {
    res.status(400).end(`The 'id' parameter is required`);
  }

  const eventSource = new EventSource(
    `${process.env.BOOKMARKED_API_URL}/notion/bookmark-tweet/${id}/status/sse`,
  );

  res.writeHead(200, {
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",
    "Content-Encoding": "none",
  });

  eventSource.onmessage = (event) => {
    res.write(`data: ${event.data}\n\n`);
    res.flushHeaders();
  };

  eventSource.onerror = (event) => {
    if (event.data) {
      res.write(`event: error\ndata: ${event.data}\n\n`);
    }

    res.flushHeaders();
    eventSource.close();
    res.end();
  };

  req.on("close", () => {
    eventSource.close();
    res.end();
  });
}
