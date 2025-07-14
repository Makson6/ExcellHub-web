import React, { useEffect, useState } from "react";
import api from "../api/Axios";

export default function AdminNewsletterHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/api/newsletter/history");
        console.log(res);

        setHistory(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Historique des Newsletters</h2>
      <div className="bg-white dark:bg-background rounded shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-dark-primary">
              <th className="px-4 py-2 text-left">Sujet</th>
              <th className="px-4 py-2 text-left">Pièce jointe</th>
              <th className="px-4 py-2 text-left">Date d’envoi</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="px-4 py-2">{item.subject}</td>
                <td className="px-4 py-2">{item.attachment || "Aucune"}</td>
                <td className="px-4 py-2">
                  {new Date(item.sentAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
