import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const STATUS_OPTIONS = ["Hazırlanıyor", "Kargoda", "Teslim Edildi", "İptal Edildi"];

const AdminOrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`http://localhost:5000/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrder(data);
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
      toast.success(`✅ Durum "${status}" olarak güncellendi.`);
      fetchOrder();
    } catch (error) {
      console.error(error);
      toast.error("❌ Durum güncellenemedi.");
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
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">📦 Admin Sipariş Detayı</h1>

      {/* Adres & Ödeme */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <InfoCard title="Kargo Bilgileri" info={order.shippingAddress} />
        <PaymentCard method={order.paymentMethod} isPaid={order.isPaid} total={order.totalPrice} />
      </div>

      {/* Ürünler */}
      <div className="bg-white p-6 rounded shadow mt-10">
        <h2 className="text-xl font-bold mb-6">Ürünler</h2>
        {order.orderItems.map((item) => (
          <div key={item._id} className="flex items-center gap-6 border-b pb-4 mb-4">
            <img src={item.image || "/placeholder.jpg"} alt={item.name} className="w-20 h-20 rounded object-cover" />
            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-gray-500 text-sm">
                {item.qty} x {item.price.toLocaleString()} ₺
              </p>
            </div>
            <p className="text-blue-600 font-bold">
              {(item.qty * item.price).toLocaleString()} ₺
            </p>
          </div>
        ))}
      </div>

      {/* Durum Güncelle */}
      <div className="bg-white p-6 rounded shadow mt-10 space-y-4">
        <h2 className="text-xl font-bold mb-4">Durumu Güncelle</h2>
        <div className="flex flex-wrap gap-3">
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status}
              onClick={() => updateStatus(status)}
              disabled={order.status === status}
              className={`px-4 py-2 rounded transition ${
                order.status === status
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : status === "Hazırlanıyor"
                  ? "bg-yellow-400 hover:bg-yellow-500 text-black"
                  : status === "Kargoda"
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : status === "Teslim Edildi"
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ title, info }) => (
  <div className="bg-white p-6 rounded shadow space-y-2">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <p><strong>Adres:</strong> {info.address}</p>
    <p><strong>Şehir:</strong> {info.city}</p>
    <p><strong>Posta Kodu:</strong> {info.postalCode}</p>
    <p><strong>Ülke:</strong> {info.country}</p>
  </div>
);

const PaymentCard = ({ method, isPaid, total }) => (
  <div className="bg-white p-6 rounded shadow space-y-2">
    <h2 className="text-xl font-bold mb-4">Ödeme Bilgileri</h2>
    <p><strong>Yöntem:</strong> {method}</p>
    <p><strong>Durum:</strong> {isPaid ? "✅ Ödendi" : "❌ Ödenmedi"}</p>
    <p><strong>Toplam:</strong> {total.toLocaleString()} ₺</p>
  </div>
);

export default AdminOrderDetailPage;
