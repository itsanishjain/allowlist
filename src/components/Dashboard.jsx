import React from "react";

const Dashboard = ({ data }) => {
  console.log("Dashboard data: ", data);

  return (
    <div>
      <p>YOur projects</p>
      <div>
        <p>{data.name}</p>
        <p> {data.description}</p>
      </div>
      <hr />
    </div>
  );
};

export default Dashboard;
