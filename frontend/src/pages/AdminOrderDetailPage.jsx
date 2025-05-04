import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AdminOrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [noteInput, setNoteInput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`http://localhost:5000/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrder(data);
      setNoteInput(data.note || "");
    } catch (error) {
      console.error(error);
      toast.error("❌ Sipariş alınamadı.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/orders/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`✅ Durum \"${status}\" olarak güncellendi.`);
      fetchOrder();
    } catch (error) {
      console.error(error);
      toast.error("❌ Durum güncellenemedi.");
    }
  };

  const saveNote = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/orders/${id}/note`,
        { note: noteInput },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("✅ Not kaydedildi");
    } catch (err) {
      toast.error("❌ Not kaydedilemedi");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-xl font-bold text-gray-600">
        Yükleniyor...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-xl font-bold text-red-500">
        Sipariş bulunamadı.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">📦 Admin Sipariş Detayı</h1>

      {/* Kargo ve Ödeme Bilgileri */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 sm:p-6 rounded shadow space-y-2">
          <h2 className="text-xl font-semibold mb-4">Kargo Bilgileri</h2>
          <p><strong>Adres:</strong> {order.shippingAddress.address}</p>
          <p><strong>Şehir:</strong> {order.shippingAddress.city}</p>
          <p><strong>Posta Kodu:</strong> {order.shippingAddress.postalCode}</p>
          <p><strong>Ülke:</strong> {order.shippingAddress.country}</p>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded shadow space-y-2">
          <h2 className="text-xl font-semibold mb-4">Ödeme Bilgileri</h2>
          <p><strong>Yöntem:</strong> {order.paymentMethod}</p>
          <p><strong>Durum:</strong> {order.isPaid ? "✅ Ödendi" : "❌ Ödenmedi"}</p>
          <p><strong>Toplam:</strong> {order.totalPrice.toLocaleString()} ₺</p>
        </div>
      </div>

      {/* Ürünler */}
      <div className="bg-white p-4 sm:p-6 rounded shadow mt-10">
        <h2 className="text-xl font-semibold mb-6">Ürünler</h2>
        {order.orderItems.map((item) => (
          <div key={item._id} className="flex flex-col sm:flex-row items-center gap-4 border-b pb-4 mb-4">
            <img src={item.image || "/placeholder.jpg"} alt={item.name} className="w-20 h-20 rounded object-cover" />
            <div className="flex-1 text-center sm:text-left">
              <p className="font-medium">{item.name}</p>
              <p className="text-gray-500 text-sm">{item.qty} x {item.price.toLocaleString()} ₺</p>
            </div>
            <p className="text-blue-600 font-semibold">
              {(item.qty * item.price).toLocaleString()} ₺
            </p>
          </div>
        ))}
      </div>

      {/* Durum Güncelle */}
      <div className="bg-white p-4 sm:p-6 rounded shadow mt-10 space-y-4">
        <h2 className="text-xl font-semibold mb-2">Durumu Güncelle</h2>
        <div className="flex flex-wrap gap-3">
          {["Hazırlanıyor", "Kargoda", "Teslim Edildi", "İptal Edildi"].map((status) => (
            <button
              key={status}
              onClick={() => updateStatus(status)}
              className={`px-4 py-2 rounded text-white font-medium text-sm sm:text-base ${
                status === "Hazırlanıyor" ? "bg-yellow-500 hover:bg-yellow-600 text-black" :
                status === "Kargoda" ? "bg-blue-500 hover:bg-blue-600" :
                status === "Teslim Edildi" ? "bg-green-600 hover:bg-green-700" :
                "bg-red-500 hover:bg-red-600"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Sipariş Notu */}
      <div className="bg-white p-4 sm:p-6 rounded shadow mt-10 space-y-4">
        <h2 className="text-xl font-semibold mb-2">📝 Sipariş Notu</h2>
        <textarea
          rows={4}
          className="w-full border rounded p-3"
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          placeholder="Bu sipariş hakkında not yazın..."
        />
        <button
          onClick={saveNote}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Kaydet
        </button>
      </div>
    </div>
  );
};

export default AdminOrderDetailPage;
