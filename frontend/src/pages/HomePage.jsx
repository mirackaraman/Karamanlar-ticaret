import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center px-4">
      {/* Ana Başlık */}
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
      Karamanlar Ticaret’e Hoş Geldiniz
      </h1>

      {/* Alt açıklama */}
      <p className="text-lg md:text-xl text-gray-600 mb-8 text-center max-w-2xl">
      Karamanlar Ticaret, toptan ve perakende gıda, bakliyat, temizlik ve hırdavat ürünlerinde
      güvenilir ve ekonomik çözümler sunar.
      </p>

      {/* Buton */}
      <Link
        to="/products"
        className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-full text-lg shadow transition duration-300"
      >
        Alışverişe Başla
      </Link>

      {/* Tailwind Çalışıyor testi */}
      <div className="bg-green-500 text-white mt-12 p-4 rounded-lg shadow-md">
        ✅ Tailwind CSS başarıyla çalışıyor!
      </div>
    </div>
  );
}

export default HomePage;
