import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminLogsPage = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:5000/api/admin/logs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLogs(data);
      } catch (err) {
        console.error("Log verileri alınamadı:", err);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🧾 Admin İşlem Kayıtları</h1>
      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Tarih</th>
              <th className="p-2">Admin</th>
              <th className="p-2">İşlem</th>
              <th className="p-2">Detay</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id} className="border-b hover:bg-gray-50">
                <td className="p-2">{new Date(log.createdAt).toLocaleString()}</td>
                <td className="p-2">{log.adminUser?.name || "Bilinmiyor"}</td>
                <td className="p-2 font-semibold">{log.action}</td>
                <td className="p-2">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLogsPage;
