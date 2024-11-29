'use client';
import { useState } from 'react';
import { db, addDoc, collection } from '../../lib/firebase';
import TextInput from './components/TextInput';
import RadioButtonGroup from './components/RadioButtonGroup';
import RadioGroupWithOther from './components/RadioGroupWithOther';
import Image from 'next/image';

export default function FormPage() {
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
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const forbiddenPatterns = [
    /<script.*?>.*?<\/script>/gi,  // XSS saldırılarını engelle
    /javascript:/gi,              // JavaScript URI'lerini engelle
    /('|--|;|\/\*|\*\/|xp_)/gi,   // SQL enjeksiyonlarına karşı
    /<.*?>/g,                     // HTML etiketlerini engelle
  ];
  
  const decodeAndSanitize = (input) => {
    try {
      // URL-decode işlemi ve boşluk temizleme
      const decodedInput = decodeURIComponent(input || '').toLowerCase().trim();
      return decodedInput;
    } catch (e) {
      return input.toLowerCase().trim(); // decodeURIComponent başarısız olursa
    }
  };
  
  const containsMaliciousContent = (input) => {
    const sanitizedInput = decodeAndSanitize(input);
    return forbiddenPatterns.some((pattern) => pattern.test(sanitizedInput));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Zararlı içerik kontrolü
    for (const [key, value] of Object.entries(formData)) {
      if (containsMaliciousContent(value)) {
        alert(
          `"${key}" alanında zararlı içerik tespit edildi! Lütfen bilgilerinizi kontrol edin.`
        );
        return;
      }
    }

    const formSubmissionCount = localStorage.getItem("formSubmittedCount") || 0;
    if (parseInt(formSubmissionCount) >= 1) {
      alert("Siz artıq müraciət etmisiniz.");
      return;
    }

    try {
      await addDoc(collection(db, 'forms'), formData);
      alert('Məlumat uğurla qeyd edildi!');
      localStorage.setItem("formSubmittedCount", parseInt(formSubmissionCount) + 1);
      setIsFormSubmitted(true);
    } catch (error) {
      alert('Məlumatı qeyd edərkən xəta baş verdi');
      console.error(error);
    }

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const resetPage = () => {
    window.location.reload();
  };

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

  const isFormComplete = () => {
    return Object.values(formData).every((value) => value.trim() !== '');
  };

  return (
    <div className="min-h-screen bg-[#F8F4EC] p-4">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 rounded-lg">
        <div className="bg-white p-2 mb-6 rounded-md shadow-md flex items-center justify-center">
          <Image src="/images/azerisiq_logo.png" alt="Logo" width={200} height={200} />
        </div>
        <div className="bg-white mb-6 rounded-[10px] shadow-md flex justify-center flex-col text-gray-700">
          <div className="h-3 w-full bg-[#D0B380] rounded-t-[10px]"></div>
          <div className="flex flex-col p-4">
            <div className="flex flex-wrap items-center text-black mb-4">
              <h2 className="text-2xl lg:text-3xl font-semibold mr-2 whitespace-nowrap">
                &quot;Beyin Mərkəzi 2025&quot;
              </h2>
              <p className="text-2xl lg:text-3xl font-base">layihəsi</p>
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

        <TextInput type={'text'} label="Ad" name="firstName" value={formData.firstName} onChange={handleChange} placeholder={'Sizin Cavabınız ...'}/>
        <TextInput type={'text'} label="Soyad" name="lastName" value={formData.lastName} onChange={handleChange} placeholder={'Sizin Cavabınız ...'}/>
        <TextInput type={'text'} label="Ata Adı" name="fatherName" value={formData.fatherName} onChange={handleChange} placeholder={'Sizin Cavabınız ...'}/>
        <TextInput type={'email'} label="Elektron poçt ünvanı" name="email" value={formData.email} onChange={handleChange} placeholder={'Sizin Cavabınız ...'}/>
        <TextInput type={'number'} label="Əlaqə Nömrəsi" name="phone" value={formData.phone} onChange={handleChange} placeholder={'Sizin Cavabınız ...'}/>
        <RadioButtonGroup
          label="Hərbi xidmətdə olmusunuzmu?"
          name="militaryService"
          options={militaryServiceOptions}
          selectedValue={formData.militaryService}
          onChange={handleChange}
        />
        <RadioGroupWithOther
          label="Təhsil aldığınız universitet"
          name="university"
          options={universityOptions}
          selectedValue={formData.university}
          onChange={handleChange}
        />
        <RadioButtonGroup
          label="İxtisas"
          name="specialty"
          options={specialtyOptions}
          selectedValue={formData.specialty}
          onChange={handleChange}
        />
        <RadioButtonGroup
          label="Ali təhsil dərəcəsi"
          name="degree"
          options={degreeOptions}
          selectedValue={formData.degree}
          onChange={handleChange}
        />
        <TextInput type={'number'} label="ÜOMG - Ortalama bal" name="averageScore" value={formData.averageScore} onChange={handleChange} placeholder={'Sizin Cavabınız ...'}/>
        <TextInput type={'text'} label="FİN kodu daxil edin" name="finCode" value={formData.finCode} onChange={handleChange} placeholder={'Sizin Cavabınız ...'}/>

        <div className="flex justify-between mt-8">
          <button
            type="submit"
            className={`${
              isFormComplete() ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
            } text-white px-6 py-2 rounded`}
            disabled={!isFormComplete() || isFormSubmitted}
          >
            Göndər
          </button>
          <button
            type="button"
            onClick={resetPage}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
          >
            Təmizlə
          </button>
        </div>
      </form>
      <div className="h-[50px] flex items-center justify-center text-black italic font-semibold">
        Beyin Mərkəzi 2025
      </div>
    </div>
  );
}

