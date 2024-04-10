import EventSource from "eventsource";

export const runtime = "nodejs";
// This is required to enable streaming
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  const { id } = params;

  if (!id) {
    const errorMessage = "The id parameter is required";
    await writer.write(
      encoder.encode(`event: error\ndata: ${errorMessage}\n\n`),
    );
  }

  const response = new EventSource(
    `${process.env.BOOKMARKED_API_URL}/notion/bookmark-tweet/${id}/status/sse`,
  );

  response.onmessage = async (event) => {
    await writer.write(
      encoder.encode(`event: message\ndata: ${event.data}\n\n`),
    );
  };

  response.onerror = async (event: Event & { data?: string }) => {
    if (event.data) {
      console.log("evdat", event.data);
      await writer.write(
        encoder.encode(`event: error\ndata: ${event.data}\n\n`),
      );
    }
    response.close();
    await writer.close();
  };

  return new Response(responseStream.readable, {
    headers: {
      Connection: "keep-alive",
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Content-Encoding": "none",
    },
  });
}
