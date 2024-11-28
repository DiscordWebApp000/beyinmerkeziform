'use client';
import { useState } from 'react';
import { db, addDoc, collection } from '../../lib/firebase';
import Image from 'next/image';

export default function FormPage() {
  const [selectedUniversity, setSelectedUniversity] = useState(""); // Seçilen üniversite
  const [otherUniversity, setOtherUniversity] = useState(""); // Diğer üniversite input değeri

  const handleUniversityChange = (e) => {
    const { name, value } = e.target;
    if (name === "university") {
      setSelectedUniversity(value);
    }
    if (name === "otherUniversity") {
      setOtherUniversity(value);
    }
  };

  const initialFormData = {
    firstName: '',
    lastName: '',
    fatherName: '',
    email: '',
    phone: '',
    militaryService: '',
    university: '',
    specialty: '',
    degree: '',
    averageScore: '',
    finCode: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'forms'), formData);
      alert('Veri başarıyla kaydedildi!');
    } catch (error) {
      alert('Veri kaydederken bir hata oluştu');
      console.error(error);
    }
    

    setTimeout(() => {
      window.location.reload()
    }, 3000);
    
  };

  const resetPage = () => {
    setFormData(initialFormData);
    window.location.reload(); // Sayfayı yeniden yükler
  };

  return (
    <div className="min-h-screen bg-[#F8F4EC] p-4">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 rounded-lg">

        <div className="bg-white p-2 mb-6 rounded-md shadow-md flex items-center justify-center"> 
          <Image src="/images/azerisiq_logo.png" alt="Logo" width={200} height={200} />
        </div>

        <div className="bg-white  mb-6 rounded-[10px] shadow-md flex  justify-center flex-col text-gray-700"> 
          <div className='h-3 w-full bg-[#D0B380] rounded-t-[10px]'></div>
          <div className='flex flex-col p-4'>

          <div className="flex flex-wrap items-center text-black mb-4">
            <h2 className="text-2xl lg:text-3xl font-semibold mr-2 whitespace-nowrap">
              &quot;Beyin Mərkəzi 2025&quot;
            </h2>
            <p className=" text-2xl lg:text-3xl font-base">
              layihəsi
            </p>
          </div>

            <div className='mb-4' >
              <p className='text-sm font-base'>&quot;Azərişıq&quot; Açıq Səhmdar Cəmiyyəti tərəfindən energetika sektorunda yüksək
              rəqabətli gənc insan kapitalının formalaşdırılması,  müasir, innovativ, beynəlxalq tələblərə uyğun bacarıqlı, ixtisaslı və yüksək peşəkarlığı olan mütəxəssislərin hazırlanması  məqsədilə, &quot;Beyin Mərkəzi 2025&quot; layihəsi start verilmişdir.</p>
            </div>

            <div className='mb-4'>
              <p className='text-sm font-base'>Layihədən texniki sahə üzrə kadr hazırlayan universitetlərin 4-cü kurs bakalavr və magistr tələbələri yararlana biləcək. 3 aylıq təcrübə proqramına qəbul prosesi müraciətçilərin müsahibə nəticələrinə əsasən aparılacaq. Təcrübə proqramının nəticəsi olaraq, son qiymətləndirmə indeksi qənaətbəxş olan müdavimlərin Səhmdar Cəmiyyətin aidiyyəti sturukturlarında işlə təmin olunması nəzərdə tutulur.</p>
            </div>

            <div className="mb-4">
                <p className="text-sm font-medium mb-2">Müraciətçilərə qoyulan tələblər:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li className="text-sm">71+ ortalama bal;</li>
                  <li className="text-sm">4-cü kurs bakalavr və ya magistr tələbəsi;</li>
                </ul>
              </div>

              <div className='mb-4'>
              <p className='text-sm font-base'>Müraciət edəcək hər bir şəxsə təşəkkürümüzü bildiririk. Qısa zamanda müsahibə üçün sizinlə əlaqə saxlanılacaq.</p>
            </div>
          </div>
        </div>

        

        {/* Ad */}
        <div className="bg-white p-4 mb-6 rounded-md shadow-md">
          <h3 className="text-base mb-4 text-black">Ad</h3>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            placeholder="Your Answer"
            onChange={handleChange}
            className="mt-1 p-2 w-full border-b-2 border-gray-300 focus:outline-none focus:border-green-500 text-gray-800 text-sm"
          />
        </div>

        {/* Soyad */}
        <div className="bg-white p-4 mb-6 rounded-md shadow-md">
          <h3 className="text-base mb-4 text-black">Soyad</h3>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            placeholder="Your Answer"
            onChange={handleChange}
            className="mt-1 p-2 w-full border-b-2 border-gray-300 focus:outline-none focus:border-green-500 text-gray-800 text-sm"
          />
        </div>

        {/* Ata Adı */}
        <div className="bg-white p-4 mb-6 rounded-md shadow-md">
          <h3 className="text-base mb-4 text-black">Ata Adı</h3>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            placeholder="Your Answer"
            onChange={handleChange}
            className="mt-1 p-2 w-full border-b-2 border-gray-300 focus:outline-none focus:border-green-500 text-gray-800 text-sm"
          />
        </div>

        {/* E-posta Ünvanı */}
        <div className="bg-white p-4 mb-6 rounded-md shadow-md">
          <h3 className="text-base mb-4 text-black">Elektron poçt ünvanı
          </h3>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Your Answer"
            onChange={handleChange}
            className="mt-1 p-2 w-full border-b-2 border-gray-300 focus:outline-none focus:border-green-500 text-gray-800 text-sm"
            required
          />
        </div>

        {/* Telefon Numarası */}
        <div className="bg-white p-4 mb-6 rounded-md shadow-md">
          <h3 className="text-base mb-4 text-black">Əlaqə Nömrəsi</h3>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            placeholder="Your Answer"
            onChange={handleChange}
            className="mt-1 p-2 w-full border-b-2 border-gray-300 focus:outline-none focus:border-green-500 text-gray-800 text-sm"
            required
          />
        </div>

        {/* Askerlik Durumu */}
        <div className="bg-white p-4 mb-6 rounded-md shadow-md">
          <h3 className="text-base mb-4 text-black">Hərbi xidmətdə olmusunuzmu?
          </h3>
          <div className="flex flex-col gap-3">
            <label className="inline-flex items-center text-gray-700">
              <input
                type="radio"
                name="militaryService"
                value="Bəli"
                onChange={handleChange}
                className="mr-2"
              />
              Bəli
            </label>
            <label className="inline-flex items-center text-gray-700">
              <input
                type="radio"
                name="militaryService"
                value="Xeyr"
                onChange={handleChange}
                className="mr-2"
              />
              Xeyr
            </label>
          </div>
        </div>

        {/* Üniversite Seçimi */}
        <div className="bg-white p-4 mb-6 rounded-md shadow-md">
          <h3 className="text-base mb-4 text-black">Təhsil aldığınız universitet</h3>
          <div className="flex flex-col gap-2 text-gray-700">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="university"
                value="Azərbaycan Dövlət Neft və Sənaye Universiteti"
                onChange={handleChange}
                className="mr-2"
              />
              Azərbaycan Dövlət Neft və Sənaye Universiteti
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="university"
                value="Sumqayıt Dövlət Universiteti"
                onChange={handleChange}
                className="mr-2"
              />
              Sumqayıt Dövlət Universiteti
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="university"
                value="Azərbaycan Texniki Universiteti"
                onChange={handleChange}
                className="mr-2"
              />
              Azərbaycan Texniki Universiteti
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="university"
                value="Bakı Mühəndislik Universiteti"
                onChange={handleChange}
                className="mr-2"
              />
              Bakı Mühəndislik Universiteti
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="university"
                value="Diğer"
                onChange={handleChange}
                className="mr-2"
              />
              Diğer
            </label>
            {selectedUniversity === "Diğer" && (
              <input
                type="text"
                name="otherUniversity"
                value={otherUniversity}
                onChange={handleUniversityChange}
                placeholder="Lütfen üniversitenizi yazın"
                className="mt-1 p-2 w-full border-b-2 border-gray-300 focus:outline-none focus:border-green-500 text-gray-800 text-sm"
              />
            )}
          </div>
        </div>

        {/* İxtisas Seçimi */}
        <div className="bg-white p-4 mb-6 rounded-md shadow-md">
          <h3 className="text-base mb-4 text-black">İxtisas</h3>
          <div className="flex flex-col gap-2 text-gray-700">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="specialty"
                value="Energetika/Elektrik və Elektronika mühəndisliyi"
                onChange={handleChange}
                className="mr-2"
              />
              Energetika/Elektrik və Elektronika mühəndisliyi
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="specialty"
                value="İnformasiya texnologiyaları"
                onChange={handleChange}
                className="mr-2"
              />
              İnformasiya texnologiyaları
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="specialty"
                value="Robototexnika/mexanika mühəndisliyi"
                onChange={handleChange}
                className="mr-2"
              />
              Robototexnika/mexanika mühəndisliyi
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="specialty"
                value="Proseslərin avtomatlaşdırılması mühəndisliyi"
                onChange={handleChange}
                className="mr-2"
              />
              Proseslərin avtomatlaşdırılması mühəndisliyi

            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="specialty"
                value="İqtisadiyyat"
                onChange={handleChange}
                className="mr-2"
              />
              İqtisadiyyat
            </label>
          </div>
        </div>

       {/* Ali Təhsil Dərəcəsi Seçimi */}
       <div className="bg-white p-4 mb-6 rounded-md shadow-md">
          <h3 className="text-base mb-4 text-black">Ali təhsil dərəcəsi</h3>
          <div className="flex flex-col gap-2 text-gray-700">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="degree"
                value="Bakalavr"
                onChange={handleChange}
                className="mr-2"
              />
              Bakalavr
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="degree"
                value="Magistr"
                onChange={handleChange}
                className="mr-2"
              />
              Magistr
            </label>
            
          </div>
        </div>

        {/* Ortalama not */}
        <div className="bg-white p-4 mb-6 rounded-md shadow-md">
          <h3 className="text-base mb-4 text-black">ÜOMG - Ortalama bal
          </h3>
          <input
            type="number"
            name="averageScore"
            value={formData.averageScore}
            onChange={handleChange}
            placeholder="Your Answer"
            className="mt-1 p-2 w-full border-b-2 border-gray-300 focus:outline-none focus:border-green-500 text-gray-800 text-sm"
          />
        </div>

        {/* Fin Kod */}
        <div className="bg-white p-4 mb-6 rounded-md shadow-md">
          <h3 className="text-base mb-4 text-black">Ortalama balın uyğunluğunun yoxlanılması üçün FİN kodu daxil edin
          </h3>
          <input
            type="text"
            name="finCode"
            value={formData.finCode}
            onChange={handleChange}
            placeholder="Your Answer"
            className="mt-1 p-2 w-full border-b-2 border-gray-300 focus:outline-none focus:border-green-500 text-gray-800 text-sm"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-between mt-8">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-base px-6 py-2 rounded-[5px]"
          >
            Gönder
          </button>

          <button
            type="button"
            onClick={resetPage} // Sayfayı yenilemek için reset fonksiyonu
            className="bg-red-600 hover:bg-red-700 text-white font-base px-6 py-2 rounded-[5px]"
          >
            Təmizlə
          </button>
        </div>
      </form>
      <div className='h-[50px] w-full flex items-center justify-center text-black italic'>
        Beyin Merkezi 2025
      </div>
    </div>
  );
}
