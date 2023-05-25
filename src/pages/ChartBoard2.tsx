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
  const [adminData, setAdminData] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);

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
        console.log(tradersData);

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

    const fetchAdmin = async () => {
      try {
        const response = await fetch(`${appUrl}/app/admin/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const adminData = await response.json();
        console.log(adminData);
        setAdminData(adminData);

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
    fetchUserDetails();
  }, []);

  const handleUserChange = (username: any) => {
    const selectedUser = adminData.find(
      (user) => user.trader_name === username
    );

    setSelectedUser(selectedUser);
    setUser({
      name: selectedUser.trader_name,
      total_balance: selectedUser.data[0]?.trader.total_balance,
    });

    const values = selectedUser.data.map((item: any) => item.profit_loss);
    const labels = selectedUser.data.map((item: any) =>
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
  };

    console.log(selectedUser)

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
      <div className="relative w-2/3 mt-28">
        {adminData.length > 0 && (
          <select
            value={selectedUser?.trader_name}
            onChange={(e) => handleUserChange(e.target.value)}
          >
            {adminData.map((user) => (
              <option key={user.trader_name} value={user.trader_name}>
                {user.trader_name}
              </option>
            ))}
          </select>
        )}

        {selectedUser && data.labels.length > 0 ? (
          <>
            <div className="absolute right-">Balance: ${selectedUser.total_balance}</div>
            <LineChart chartData={data} />
          </>
        ) : (
          <div>No data available.</div>
        )}
      </div>
    );
  }
}

export default ChartBoard;
