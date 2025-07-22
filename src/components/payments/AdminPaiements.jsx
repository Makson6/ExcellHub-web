import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPaiements = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/transactions")
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Historique des paiements</h2>
      <table className="w-full table-auto border">
        <thead className="bg-gray-200">
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Email</th>
            <th>Montant</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="text-sm border-t">
              <td>{tx.transactionId}</td>
              <td>{tx.customerName}</td>
              <td>{tx.customerEmail}</td>
              <td>
                {tx.amount} {tx.currency}
              </td>
              <td className="text-green-600">{tx.status}</td>
              <td>{new Date(tx.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPaiements;
