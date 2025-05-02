import React from "react";
import FileUpload from "../components/FileUpload";
import TransactionList from "../components/TransactionList";
import { removeToken } from "../utils";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  const logout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button onClick={logout} className="text-red-600">
          Logout
        </button>
      </div>
      <FileUpload onSuccess={() => {}} />
      <TransactionList />
    </div>
  );
};

export default DashboardPage;
