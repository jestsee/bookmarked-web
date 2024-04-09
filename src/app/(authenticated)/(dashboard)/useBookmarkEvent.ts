import { useEffect, useState } from "react";

import { BookmarkStatus, EventData, STATUS } from "./type";

const useBookmarkEvent = (id: string) => {
  const [data, setData] = useState<EventData>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const processData = (data: BookmarkStatus) => {
    if (data.status === STATUS.SCRAPING) {
      return setData(data);
    }
    setData((previousData) => previousData && { ...previousData, ...data });
  };

  const openConnection = () => {
    // reset needed when called on retry
    setData(undefined);
    setErrorMessage(undefined);

    const sse = new EventSource(`api/bookmark/status/${id}`);

    sse.onmessage = (event) => {
      const data = JSON.parse(event.data) as BookmarkStatus;
      processData(data);
    };

    sse.onerror = (event) => {
      setErrorMessage((event as unknown as { data: string }).data);
      sse.close();
    };

    return sse;
  };

  useEffect(() => {
    const sse = openConnection();

    return () => sse.close();
  }, []);

  return { openConnection, eventData: data, errorMessage };
};

export default useBookmarkEvent;
