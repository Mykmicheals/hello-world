import React, { useEffect, useState } from "react";
import { useStoreState } from "easy-peasy";
import Chart from "chart.js/auto";

import { storeTypes } from "../projectTypes";
import { appUrl } from "../App";
import moment from "moment";
import LineChart from "../components/LineChart";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

function ChartBoard() {
  const token = useStoreState((state: storeTypes) => state.token);

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Profit/Loss",
        data: [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${appUrl}/app/graph/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const tradersData = await response.json();
        const values = tradersData?.map((item: any) => item.profit_loss);
        const labels = tradersData?.map((item: any) =>
          moment(item.timestamp).format("HH:mm")
        );
        console.log(values);

        setData({
          ...data,
          labels,
          datasets: [
            {
              ...data?.datasets[0],
              data: values,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching performance data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-2/3 mt-28">

      <LineChart chartData={data} />
    </div>
  );
}

export default ChartBoard;
