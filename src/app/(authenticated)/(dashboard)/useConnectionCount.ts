import { useState } from "react";

const MAX_CONNECTION = 4;

const useConnectionCount = () => {
  const [connectionCount, setConnectionCount] = useState(0);

  const addConnection = () => {
    setConnectionCount((previousValue) => ++previousValue);
  };

  const removeConnection = () => {
    setConnectionCount((previousValue) =>
      previousValue === 0 ? previousValue : --previousValue,
    );
  };

  const isReachedMaxConnection = connectionCount >= MAX_CONNECTION;

  return {
    isReachedMaxConnection,
    connectionCount,
    addConnection,
    removeConnection,
  };
};

export default useConnectionCount;
