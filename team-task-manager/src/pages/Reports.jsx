import Sidebar from "../components/Sidebar";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Reports() {

  // PIE CHART DATA
  const taskStatusData = [

    { name: "Completed", value: 8 },

    { name: "Pending", value: 5 },

  ];

  // BAR CHART DATA
  const priorityData = [

    { priority: "High", tasks: 6 },

    { priority: "Medium", tasks: 4 },

    { priority: "Low", tasks: 3 },

  ];

  // COLORS
  const COLORS = [
    "#22c55e",
    "#ef4444"
  ];

  return (
    <div className="flex">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-10 bg-gray-100 min-h-screen">

        <h1 className="text-4xl font-bold mb-8">
          Reports & Analytics
        </h1>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-bold mb-2">
              Total Tasks
            </h2>

            <p className="text-4xl font-bold text-blue-600">
              2
            </p>

          </div>

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-bold mb-2">
              Completed
            </h2>

            <p className="text-4xl font-bold text-green-600">
              1
            </p>

          </div>

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-bold mb-2">
              Pending
            </h2>

            <p className="text-4xl font-bold text-red-600">
              1
            </p>

          </div>

        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* PIE CHART */}
          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-2xl font-bold mb-6">
              Task Completion Status
            </h2>

            <ResponsiveContainer width="100%" height={300}>

              <PieChart>

                <Pie
                  data={taskStatusData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >

                  {
                    taskStatusData.map((entry, index) => (

                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />

                    ))
                  }

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* BAR CHART */}
          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-2xl font-bold mb-6">
              Tasks By Priority
            </h2>

            <ResponsiveContainer width="100%" height={300}>

              <BarChart data={priorityData}>

                <XAxis dataKey="priority" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="tasks" fill="#3b82f6" />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Reports;