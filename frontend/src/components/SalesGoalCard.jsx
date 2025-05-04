import React, { useEffect, useState } from "react";
import axios from "axios";

const SalesGoalCard = ({ achieved = 0 }) => {
  const [goal, setGoal] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);

  // Satış hedefini backend'den al
  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/settings/sales-goal");
        setGoal(res.data.salesGoal);
        setInputValue(res.data.salesGoal);
      } catch (err) {
        console.error("Satış hedefi alınamadı:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGoal();
  }, []);

  // Hedefi kaydet (PUT isteği)
  const handleSave = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        "http://localhost:5000/api/settings/sales-goal",
        { salesGoal: inputValue },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGoal(res.data.salesGoal);
    } catch (err) {
      console.error("Satış hedefi güncellenemedi:", err);
      alert("Hedef güncellenemedi. Admin misiniz?");
    }
  };

  const percent = goal > 0 ? Math.min((achieved / goal) * 100, 100).toFixed(1) : 0;

  if (loading) return <div className="text-gray-500">Satış hedefi yükleniyor...</div>;

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">🎯 Satış Hedefi</h2>

      <div className="mb-3 flex items-center gap-3">
        <input
          type="number"
          className="border px-3 py-1 rounded w-40"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
        >
          Kaydet
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-1">
        Hedef: <span className="font-medium">₺{goal.toLocaleString()}</span>
      </p>

      <p className="text-sm text-gray-600 mb-4">
        Gerçekleşen:{" "}
        <span className="font-medium text-green-600">₺{achieved.toLocaleString()}</span> ({percent}
        %)
      </p>

      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className="bg-green-500 h-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default SalesGoalCard;
