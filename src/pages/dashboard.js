import DashboardCard from "../components/dashboardCard";
import axios from "axios";
import Navbar from "../components/navBar";
import ApiConfig from "../utils/url";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [dashboardData, setDashboardData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Department wise Total vs Closed Projects',
      },
    },
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false, // Remove background grid lines
        },
        ticks: {
          stepSize: 1,
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false, // Remove background grid lines
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const data = {
    labels: chartData.map((data) => data.department),
    datasets: [
      {
        label: 'Total projects',
        data: chartData.map((data) => data.totalProjects),
        backgroundColor: 'rgb(53, 162, 235)',
        stack: 'Stack 0',
      },
      {
        label: 'Closed projects',
        data: chartData.map((data) => data.closedProjects),
        backgroundColor: 'rgb(255, 99, 132)',
        stack: 'Stack 1',
      },
    ],
  };

  // Fetch chart data
  const fetchData = async () => {
    try {
      const response = await axios.get(ApiConfig.API_CHART_URL, {
        withCredentials: true,
      });
      const data = response.data;
      setChartData(data);
      console.log('Chart data:', data);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  // Fetch dashboard data
  const getDashboardData = async () => {
    try {
      const response = await axios.get(ApiConfig.API_DASHBOARD_URL, {
        withCredentials: true,
      });
      setDashboardData(Object.entries(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    getDashboardData();
  }, []);

  return (
    <>
      <Navbar header={"Dashboard"} />
      <div className="w-full md:w-[90%] h-screen mx-4 md:mx-8 px-0 md:px-6 rounded-lg fixed top-32 overflow-scroll md:overflow-hidden scrollbar         ">
        <div className="flex md:justify-between justify-center gap-x-2 md:gap-x-0">
          {dashboardData.slice(0, 5).map((data, index) => (
            <div key={index} className={`${index >= 3 ? 'hidden md:block' : ''}`}>
              <DashboardCard data={data} />
            </div>
          ))}
        </div>
        <div className="p-4 mt-8 mx-auto md:mx-0 w-4/5 h-80 md:h-80 md:w-1/2 bg-white">
          <Bar data={data} options={options} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;