// Import react
import React from "react";

// Import API address
import { getAddress } from "../api/address";

// List of fetching status
const statusList = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

export function useAddressData() {
  // States
  let [data, setData] = React.useState([]);
  let [count, setCount] = React.useState(0);
  let [status, setStatus] = React.useState(statusList.idle);
  let [page, setPage] = React.useState(1);
  let [limit, setLimit] = React.useState(10);

  // Fetching address api
  let fetchAddress = React.useCallback(
    async function () {
      setStatus(statusList.process);
      let { data, count, error } = await getAddress({ page, limit });

      if (error) {
        setStatus(statusList.error);
        return;
      }

      setData(data);
      setStatus(statusList.success);
      setCount(count);
    },
    [page, limit]
  );
  
  
  React.useEffect(() => {
    fetchAddress();
  }, [fetchAddress]);

  return {
    data,
    count,
    status,
    page,
    limit,
    setPage,
    setLimit,
    fetchAddress
  };
}
