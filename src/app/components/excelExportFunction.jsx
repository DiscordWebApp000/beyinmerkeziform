import { getDocs, collection } from 'firebase/firestore';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { db } from '../../../lib/firebase'; 
const exportToExcel = async () => {
  try {
    // Firebase'den veriyi çekme
    const querySnapshot = await getDocs(collection(db, "forms"));
    const data = querySnapshot.docs.map(doc => doc.data());  // Verileri al

    if (!data || data.length === 0) {
      throw new Error("Veri bulunamadı!");
    }

    // Veriyi Excel formatına dönüştürme
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Qeydiyatdan Kecenlerin Siyahısı");

    // Çalışma kitabını Excel dosyasına yazma
    const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // Excel dosyasını indir
    saveAs(new Blob([excelFile]), "Qeydiyatdan Kecenlerin Siyahısı.xlsx");

  } catch (error) {
    console.error("Veri alma veya export işlemi sırasında hata oluştu:", error);
  }
};

export { exportToExcel };
