import { QueryCache, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    // onError: (error) => {
    //   toast.error(`Something went wrong: ${error.message}`);
    // },
  }),
});
export default queryClient;
