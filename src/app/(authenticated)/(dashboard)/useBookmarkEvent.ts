import { useEffect, useState } from "react";

import { BookmarkStatus, EventData, STATUS } from "./type";

interface Options {
  onOpen: () => void;
  onClose: () => void;
}

const useBookmarkEvent = (id: string, options?: Options) => {
  const [data, setData] = useState<EventData>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const processData = (data: BookmarkStatus) => {
    if (data.status === STATUS.SCRAPING) {
      return setData(data);
    }
    setData((previousData) => previousData && { ...previousData, ...data });
  };

  const openConnection = () => {
    options?.onOpen();

    // reset needed when called on retry
    setData(undefined);
    setErrorMessage(undefined);

    const sse = new EventSource(`api/bookmark/status/${id}`);

    sse.onmessage = (event) => {
      console.log("[client onmessage]", event);
      const data = JSON.parse(event.data) as BookmarkStatus;
      processData(data);
    };

    sse.onerror = (event) => {
      console.log("[client onmessage]", event);
      setErrorMessage((event as unknown as { data: string }).data);
      options?.onClose();
      sse.close();
    };

    return sse;
  };

  useEffect(() => {
    const sse = openConnection();

    return () => {
      if (data?.status !== STATUS.BOOKMARKED) options?.onClose();
      sse.close();
    };
  }, []);

  return { openConnection, eventData: data, errorMessage };
};

export default useBookmarkEvent;
