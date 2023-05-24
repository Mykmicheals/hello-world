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
  const isAdmin = useStoreState((state: storeTypes) => state.isAdmin);

  const [user, setUser] = useState<any>([]);
  const [selectedUser, setSelectedUser] = useState(null);

  console.log(token);

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

    // const fetchAdmin = async () => {
    //   try {
    //     const response = await fetch(`${appUrl}/app/admin/`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });

    //     const adminData = await response.json();
    //     console.log(adminData);

    //     if (adminData.length > 0) {
    //       const firstUser = adminData[0];
    //       setUser({
    //         name: firstUser.trader_name,
    //         total_balance: firstUser.data[0]?.trader.total_balance,
    //       });

    //       const values = firstUser?.data.map((item: any) => item.profit_loss);
    //       const labels = firstUser?.data.map((item: any) =>
    //         moment(item.timestamp).format("HH:mm")
    //       );

    //       setData({
    //         ...data,
    //         labels,
    //         datasets: [
    //           {
    //             ...data.datasets[0],
    //             data: values,
    //           },
    //         ],
    //       });
    //     }
    //   } catch (error) {
    //     console.error("Error fetching performance data:", error);
    //   }
    // };

    const fetchAdmin = async () => {
      try {
        const response = await fetch(`${appUrl}/app/admin/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const adminData = await response.json();
        console.log(adminData);

        if (adminData.length > 0) {
          const firstUser = adminData[0];
          setSelectedUser(firstUser);
          setUser({
            name: firstUser.trader_name,
            total_balance: firstUser.data[0]?.trader.total_balance,
          });

          const values = firstUser.data.map((item: any) => item.profit_loss);
          const labels = firstUser.data.map((item: any) =>
            moment(item.timestamp).format("HH:mm")
          );

          setData({
            ...data,
            labels,
            datasets: [
              {
                ...data.datasets[0],
                data: values,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching performance data:", error);
      }
    };

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${appUrl}/app/data/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUser(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching performance data:", error);
      }
    };

    !isAdmin ? fetchData() : fetchAdmin();
    !isAdmin && fetchUserDetails();
  }, []);

  if (isAdmin === false) {
    return (
      <div className="w-2/3 mt-28">
        <div className="flex gap-32">
          <div>User:{user[0]?.name}</div>
          <div>Ballance: ${user[0]?.total_balance}</div>
        </div>
        <LineChart chartData={data} />
      </div>
    );
  } else {
    return (
      <div className="w-2/3 mt-28">
      
        <LineChart chartData={data} />
      </div>
    );
  }
}

export default ChartBoard;
