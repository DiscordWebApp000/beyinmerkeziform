import { getDocs, collection, query, limit, startAfter } from 'firebase/firestore';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { db } from '../../../lib/firebase';

const exportToExcel = async () => {
  try {
    let allData = []; // Tüm verilerin tutulacağı dizi
    let lastVisible = null; // Sayfalama için son alınan belge
    let moreData = true; // Veri olup olmadığını kontrol etmek için

    // Veriyi sayfalama ile çekme
    while (moreData) {
      // Başlangıçta limit 100 ile sorgu oluşturuluyor
      let q = query(collection(db, "forms"), limit(100));

      // Eğer önceki sayfadan alınan son veri varsa, startAfter ile devam ediyoruz
      if (lastVisible) {
        q = query(collection(db, "forms"), limit(100), startAfter(lastVisible));
      }

      const querySnapshot = await getDocs(q); // Verileri çekme

      if (querySnapshot.empty) {
        moreData = false; // Veri kalmadıysa sayfalamayı durdur
      } else {
        // Verileri allData dizisine ekleme
        querySnapshot.docs.forEach(doc => {
          allData.push(doc.data());
        });

        // Sonraki sayfa için lastVisible'ı güncelle
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      }
    }

    // Verileri Excel formatına dönüştürme
    if (allData.length > 0) {
      const ws = XLSX.utils.json_to_sheet(allData); // Veriyi Excel sayfasına dönüştür
      const wb = XLSX.utils.book_new(); // Yeni bir çalışma kitabı oluştur
      XLSX.utils.book_append_sheet(wb, ws, "Qeydiyatdan Kecenlerin Siyahısı"); // Sayfayı çalışma kitabına ekle

      // Çalışma kitabını Excel dosyasına yazma
      const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

      // Excel dosyasını indirme
      saveAs(new Blob([excelFile]), "Qeydiyatdan Kecenlerin Siyahısı.xlsx");
    } else {
      throw new Error("Veri bulunamadı!"); // Veri bulunmazsa hata
    }

  } catch (error) {
    console.error("Veri alma veya export işlemi sırasında hata oluştu:", error); // Hata mesajı
  }
};

export { exportToExcel };
