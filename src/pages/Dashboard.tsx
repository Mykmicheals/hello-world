
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import SideBar from "../components/SideBar";
import ChartBoard from "./ChartBoard";

Chart.register(CategoryScale);

function Dashboard() {




  return (
    <div className="flex gap-20">
      <SideBar />
      <ChartBoard />
    </div>
  );
}

export default Dashboard;
