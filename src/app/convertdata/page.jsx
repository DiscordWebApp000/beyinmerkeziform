'use client';
import React, { useState, useEffect } from 'react';
import { exportToExcel } from '../components/excelExportFunction';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../../lib/firebase'; // Firebase yapılandırması

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Firebase'den veriyi alma
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "forms")); // Koleksiyon adını doğru girin
        const fetchedData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // ID dahil tüm veriler
        setData(fetchedData);
        setLoading(false);
      } catch (error) {
        console.error("Veri çekme sırasında hata:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExportClick = async () => {
    setLoading(true);
    await exportToExcel(data); // Export için veriyi fonksiyona gönder
    setLoading(false);
  };

  // Tablonun başlıklarını sabit ve sıralı hale getirme
  const tableHeaders = ["id", "firstName", "lastName", "fatherName", "degree", ...Object.keys(data[0] || {}).filter(key => !["id", "firstname", "lastname", "fathername", "degree"].includes(key))];

  return (
    <div className="container p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Firebase Verilerini Excel Olarak İndir</h1>
        {/* Excel İndirme Butonu */}
        <button
          onClick={handleExportClick}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? 'Yükleniyor...' : 'Excel Olarak İndir'}
        </button>
      </div>

      {/* Veri Görüntüleme */}
      {loading ? (
        <p>Veriler yükleniyor...</p>
      ) : (
        <div>
          {/* Tablo */}
          <table className="table-auto w-full border-collapse mb-4">
            <thead>
              <tr>
                {tableHeaders.map((header, index) => (
                  <th key={index} className="border px-4 py-2">
                    {header.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, rowIndex) => (
                <tr key={rowIndex}>
                  {tableHeaders.map((header, colIndex) => (
                    <td key={colIndex} className="border px-4 py-2">
                      {item[header] || "—"} {/* Veri olmayan alanlar için boş bırakma */}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
