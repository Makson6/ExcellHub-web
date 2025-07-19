import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios
      .get("/api/admin/logs")
      .then((res) => setLogs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Historique des actions admin</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Date</th>
              <th className="p-2">Admin</th>
              <th className="p-2">Action</th>
              <th className="p-2">Cible</th>
              <th className="p-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t">
                <td className="p-2">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="p-2">
                  {log.admin.name} {log.admin.lastName}
                </td>
                <td className="p-2">{log.action}</td>
                <td className="p-2">
                  {log.targetType} - {log.targetId}
                </td>
                <td className="p-2">{log.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
