'use client';
import React, { useState, useEffect } from 'react';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { exportToExcel } from '../components/excelExportFunction';
import { db } from '../../../lib/firebase';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Firebase'den veriyi alma
  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "forms"));
          const fetchedData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setData(fetchedData);
          setLoading(false);
        } catch (error) {
          console.error("Veri çekme sırasında hata:", error);
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [isAuthenticated]);

  // Silme fonksiyonu
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "forms", id));
      // Silme işleminden sonra veriyi güncelle
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error("Veri silme sırasında hata:", error);
    }
  };

  // Excel'e aktarma fonksiyonu
  const handleExportClick = async () => {
    setLoading(true);
    await exportToExcel(data);
    setLoading(false);
  };

  // Tablonun başlıklarını belirleme
  const tableHeaders = [ "id", "firstName", "lastName", "fatherName", "degree", ...Object.keys(data[0] || {}).filter(key => !["id", "firstName", "lastName", "fatherName", "degree"].includes(key))];

  // Şifre doğrulama
  const handlePasswordSubmit = () => {
    if (password === "1234") {
      setIsAuthenticated(true);
    } else {
      alert("Yanlış şifre, tekrar deneyin!");
    }
  };

  // Sayfa değiştirme fonksiyonları
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      {/* Şifre Giriş Modalı */}
      {!isAuthenticated && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Şifre Gerekiyor</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifrenizi girin"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 mb-4 text-gray-700"
            />
            <button
              onClick={handlePasswordSubmit}
              className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 transition"
            >
              Giriş Yap
            </button>
          </div>
        </div>
      )}

      {/* İçerik */}
      {isAuthenticated && (
        <div className="min-h-screen w-full bg-gray-900 text-white py-6">
          <div className="container mx-auto p-6 bg-gray-800 rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-semibold">Firebase Verileri</h1>
              <button
                onClick={handleExportClick}
                disabled={loading}
                className={`bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading ? 'Yükleniyor...' : 'Excel Olarak İndir'}
              </button>
            </div>

            {/* Veri Görüntüleme */}
            {loading ? (
              <p className="text-gray-400">Veriler yükleniyor...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="table-auto w-full border border-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                  <th className="border px-4 py-2 text-left">Sil</th>
                      {tableHeaders.map((header, index) => (
                        <th key={index} className="border px-4 py-2 text-left">
                          {header.toUpperCase()}
                        </th>
                      ))}
                      
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((item, rowIndex) => (
                      <tr key={rowIndex} className="hover:bg-gray-600">
                        <td className="border px-4 py-2">
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          >
                            Sil
                          </button>
                        </td>
                        {tableHeaders.map((header, colIndex) => (
                          <td key={colIndex} className="border px-4 py-2">
                            {item[header] || "—"}
                          </td>
                        ))}
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Sayfa Değiştirme Navigasyonu */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-4 overflow-x-auto">
                {[...Array(totalPages)].map((_, pageIndex) => (
                  <button
                    key={pageIndex}
                    onClick={() => handlePageChange(pageIndex + 1)}
                    className={`px-4 py-2 mx-1 rounded ${
                      currentPage === pageIndex + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {pageIndex + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
