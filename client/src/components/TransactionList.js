import React, { useEffect, useState } from "react";
import API from "../api";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch transactions");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Transactions</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id}>
              <td className="p-2 border">{txn.description}</td>
              <td className="p-2 border">₹{txn.amount}</td>
              <td className="p-2 border">
                {new Date(txn.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
