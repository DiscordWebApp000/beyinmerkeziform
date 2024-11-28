'use client';
import { useState, useEffect } from 'react';
import { db, addDoc, collection } from '../../lib/firebase';
import TextInput from './components/TextInput';
import RadioButtonGroup from './components/RadioButtonGroup';
import RadioGroupWithOther from './components/RadioGroupWithOther';
import Image from 'next/image';

export default function FormPage() {
  // Formun başlangıç değerlerini tanımlıyoruz
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

  // Form verilerini yönetmek için state kullanıyoruz
  const [formData, setFormData] = useState(initialFormData);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Formda değişiklik olduğunda çalışacak fonksiyon
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Formun gönderilmesi sırasında yapılacak işlemler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Cihazdaki form gönderim sayısını kontrol et
    const formSubmissionCount = localStorage.getItem("formSubmittedCount") || 0;
    if (parseInt(formSubmissionCount) >= 2) {
      alert("Bu cihazdan 2'den fazla form gönderemezsiniz.");
      return;
    }

    try {
      await addDoc(collection(db, 'forms'), formData); // Firebase'e veri ekleme
      alert('Məlumat uğurla qeyd edildi!');
      
      // Form gönderildikten sonra sayacı artır
      localStorage.setItem("formSubmittedCount", parseInt(formSubmissionCount) + 1);

      setIsFormSubmitted(true); // Formun gönderildiğini işaretle
    } catch (error) {
      alert('Məlumatı qeyd edərkən xəta baş verdi');
      console.error(error);
    }

    setTimeout(() => {
      window.location.reload(); // Sayfayı yeniden yükle
    }, 2000);
  };

  // Formu sıfırlamak için kullanılan fonksiyon
  const resetPage = () => {
    window.location.reload(); // Sayfayı yeniden yükle
  };

  // Form seçenekleri
  const specialtyOptions = [
    'Energetika/Elektrik və Elektronika mühəndisliyi',
    'İnformasiya texnologiyaları',
    'Robototexnika/mexanika mühəndisliyi',
    'Proseslərin avtomatlaşdırılması mühəndisliyi',
    'İqtisadiyyat',
  ];

  const degreeOptions = ['Bakalavr', 'Magistratura'];

  const militaryServiceOptions = ['Bəli', 'Xeyr'];

  const universityOptions = [
    'Azərbaycan Dövlət Neft və Sənaye Universiteti',
    'Sumqayıt Dövlət Universiteti',
    'Azərbaycan Texniki Universiteti',
    'Bakı Mühəndislik Universiteti',
  ];

  // Formun tamamlanıp tamamlanmadığını kontrol eden fonksiyon
  const isFormComplete = () => {
    return Object.values(formData).every((value) => value.trim() !== ''); // Tüm değerler dolu mu?
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
        <TextInput 
          label="Ad" 
          type={"text"}
          name="firstName" 
          value={formData.firstName} 
          placeholder="Your Answer" 
          onChange={handleChange} />

        {/* Soyad */}
        <TextInput 
          label="Soyad" 
          type={"text"}
          name="lastName" 
          value={formData.lastName} 
          placeholder="Your Answer" 
          onChange={handleChange} />

        {/* Ata Adı */}
        <TextInput 
          label="Ata Adı" 
          type={"text"}
          name="fatherName" 
          value={formData.fatherName} 
          placeholder="Your Answer" 
          onChange={handleChange} />
        
        {/* E-posta Ünvanı */}
        <TextInput 
          label="Elektron poçt ünvanı" 
          type={"email"}
          name="email" 
          value={formData.email} 
          placeholder="Your Answer" 
          onChange={handleChange} />

        {/* Telefon Numarası */}
        <TextInput 
          label="Əlaqə Nömrəsi" 
          type={"number"}
          name="phone" 
          value={formData.phone} 
          placeholder="Your Answer" 
          onChange={handleChange} />

        {/* Askerlik Durumu */}
        <RadioButtonGroup
          label="Hərbi xidmətdə olmusunuzmu?"
          name="militaryService"
          options={militaryServiceOptions}
          selectedValue={formData.militaryService}
          onChange={handleChange}
        />

        {/* Üniversite Seçimi */}
        <RadioGroupWithOther
          label="Təhsil aldığınız universitet"
          name="university"
          options={universityOptions}
          selectedValue={formData.university}
          onChange={handleChange}
          placeholder="Lütfen üniversitenizi yazın"
        />

        {/* İxtisas Seçimi */}
        <RadioButtonGroup
          label="İxtisas"
          name="specialty"
          options={specialtyOptions}
          selectedValue={formData.specialty}
          onChange={handleChange}
        />

        {/* Ali Təhsil Dərəcəsi Seçimi */}
        <RadioButtonGroup
          label="Ali təhsil dərəcəsi"
          name="degree"
          options={degreeOptions}
          selectedValue={formData.degree}
          onChange={handleChange}
        />

        {/* Ortalama not */}
        <TextInput 
          label="ÜOMG - Ortalama bal" 
          type={"number"}
          name="averageScore" 
          value={formData.averageScore} 
          placeholder="Your Answer" 
          onChange={handleChange} />

        {/* Fin Kod */}
        <TextInput 
          label="Ortalama balın uyğunluğunun yoxlanılması üçün FİN kodu daxil edin" 
          type={"text"}
          name="finCode" 
          value={formData.finCode} 
          placeholder="Your Answer" 
          onChange={handleChange} />

        {/* Submit Button */}
        <div className="flex justify-between mt-8">
          <button
            type="submit"
            className={`${
              isFormComplete()
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gray-400 cursor-not-allowed'
            } text-white font-base px-6 py-2 rounded-[5px]`}
            disabled={!isFormComplete() || isFormSubmitted}
          >
            Gönder
          </button>
          <button
            type="button"
            onClick={resetPage}
            className="bg-red-600 hover:bg-red-700 text-white font-base px-6 py-2 rounded-[5px]"
          >
            Təmizlə
          </button>
        </div>
      </form>
      <div className='h-[50px] w-full flex items-center justify-center text-black italic font-semibold'>
        Beyin Merkezi 2025
      </div>
    </div>
  );
}
