// Import react
import React from "react";

// Import API order
import { getOrder } from "../api/order";

// List of fetching status
const statusList = {
    idle: "idle",
    process: "process",
    success: "success",
    error: "error",
};

export function useOrderData() {
    // States
    let [data, setData] = React.useState([]);
    let [status, setStatus] = React.useState(statusList.idle);
    let [page, setPage] = React.useState(1);
    let [limit, setLimit] = React.useState(10);
    let [count, setCount] = React.useState(0);

    // Fetching order api
    let fetchOrderData = React.useCallback(
        async function () {
            setStatus(statusList.process);
            let { data, count, error } = await getOrder({ page, limit });

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
        fetchOrderData();
    }, [fetchOrderData]);

    return {
        data,
        count,
        status,
        page,
        limit,
        setPage,
        setLimit,
    };
}