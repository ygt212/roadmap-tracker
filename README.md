<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/map.svg" alt="Roadmap Tracker Logo" width="80" height="80">

  # Data Science & Social Data Learning OS
  
  **6 Aylık Sosyal Veri Bilimi Yol Haritası ve Kişisel Öğrenme İşletim Sistemi**

  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](#)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
  [![LocalStorage](https://img.shields.io/badge/Storage-Local-emerald?style=for-the-badge)](#)

  [**Canlı Previëw (Demo)**](https://senindomainin.vercel.app) · [**Hata Bildir**](https://github.com/seninkullaniciadin/roadmap-tracker/issues) · [**Özellik İste**](https://github.com/seninkullaniciadin/roadmap-tracker/issues)

</div>

---

> 🎉 **Sıradan bir "Yapılacaklar Listesi" değil; disiplinli çalışmayı, üretkenliği ve bilgiyi merkezine alan devasa bir öğrenme ekosistemi.**

Bu proje, Veri Bilimi ve Sosyal Bilimler kesişiminde uzmanlaşmak isteyenler için hazırlanmış 6 aylık yoğun bir yol haritasını interaktif ve tatmin edici bir şekilde takip etmek amacıyla geliştirilmiştir. Yalnızca görevleri işaretlemez; Pomodoro tekniği ile sizi odaklar, öğrendiklerinizi Markdown defterinize kaydeder ve hedeflerinizi şık bir Dashboard ile özetler.

---

## 📸 Ekran Görüntüleri

<div align="center">
  <!-- TODO: Uygulama tamamlandığında ekran görüntülerini buraya ekle -->
  <img src="https://via.placeholder.com/800x450.png?text=Dashboard+%26+Main+UI" alt="Main UI" width="800">
  <br>
  <em>(Projenin Genel Görünümü ve Karanlık Tema)</em>
</div>

---

## 🚀 Öne Çıkan Özellikler (Features)

Öğrenme sürecinizi kesintisiz kılmak için en son teknoloji ve modern UX disiplinleriyle donatıldı:

*   📱 **Modern & Responsive UI**: Mobil cihazlar da dahil tüm ekran boyutlarında kusursuz (%100 Responsive) görünüm.
*   🌙 **Premium Karanlık Tema**: Göz yormayan, odağı koruyan Gece Mavisi (Slate/Indigo) modern arayüz ve pürüzsüz animasyonlar.
*   💾 **Local Storage Senkronizasyonu**: Verileriniz sunucuya veya buluta ihtiyaç duymadan doğrudan tarayıcınızda (Local Storage) kaydedilir. Gizlilik odaklıdır ve anında tepki verir.
*   🍅 **Entegre Pomodoro Sayacı**:
    *   Sayfadan ayrılmadan, ekranın köşesinde her an erişilebilir "Focus & Break" aracı.
    *   Kişiselleştirilebilir zaman tanımlaması (Örn: 50dk Çalış, 10dk Mola).
    *   Süre bittiğinde *Web Audio API* destekli, gecikmesiz döngüsel Alarm sistemi.
*   📝 **Haftalık Markdown Not Defteri**:
    *   *react-markdown* destekli zengin metin editörü.
    *   Öğrendiğiniz güncel kodları, istatistik formüllerini haftaların altına bir "Journal" mantığıyla iliştirip arşivleyin.
    *   Önizleme (Preview) ve Düzenleme (Edit) sekmeleriyle akıcı geçiş.
*   🔗 **Kaynak (Bookmark) Yöneticisi**: Her hafta için incelediğiniz YouTube kurslarını, Medium makalelerini veya resmi dokümantasyonları anında ilgili haftaya bağlayın.
*   📊 **Kişisel İstatistik Panosu (Dashboard)**:
    *   *Recharts* tabanlı aylık ilerleme grafikleri.
    *   Toplam tamamlanan görev, toplam yazılan not ve kaydedilen kaynak sayısı metrikleri.
*   📁 **Bütünleşik GitHub Portföy Vitrini**: 
    *   Yolculuğunuz boyunca ürettiğiniz projelerin Github Linklerini saklayın.
    *   Sınıflandırma, EDA ve devasa **Capstone Projelerinizi** Premium tasarımlı kartlarla tek bir vitrinde toplayın.

---

## 🛠️ Teknoloji Yığını (Tech Stack)

Bu proje performans, sadelik ve estetik dikkate alınarak geliştirilmiştir.

| Teknoloji | Açıklama |
| :--- | :--- |
| **[React 18](https://react.dev/)** | Bileşen tabanlı modüler mimari ve state yönetimi (useState, useEffect, useMemo). |
| **[Vite](https://vitejs.dev/)** | Yeni nesil, inanılmaz hızlı frontend geliştirme derleyicisi. |
| **[Tailwind CSS](https://tailwindcss.com/)** | Yardımcı sınıf (utility-first) tabanlı mükemmel CSS iskeleti (Dark Mode, Animasyonlar). |
| **[Lucide React](https://lucide.dev/)** | Oldukça net, özelleştirilebilir vektörel ikon seti. |
| **[Recharts](https://recharts.org/)** | SVG tabanlı, oldukça esnek, deklaratif veri görselleştirme/grafik kütüphanesi. |
| **[React Markdown](https://github.com/remarkjs/react-markdown)** | MD uzantılı formatları doğrudan HTML/Bileşen yapısına güvenle çeviren dönüştürücü. |

---

## ⚙️ Yerel Kurulum (Local Setup)

Projeyi kendi bilgisayarınızda (localhost) çalıştırmak veya geliştirmek isterseniz aşağıdaki adımları sırasıyla uygulayın.

### Gereksinimler
*   Node.js (v16.14.0 veya üzeri)
*   npm (veya pnpm/yarn)
*   Git

### Kurulum Adımları

1.  **Repoyu klonlayın:**
    ```bash
    git clone https://github.com/KULLANICI_ADIN/roadmap-tracker.git
    ```

2.  **Proje dizinine geçiş yapın:**
    ```bash
    cd roadmap-tracker
    ```

3.  **Paketleri (Dependencies) yükleyin:**
    ```bash
    npm install
    # veya yarn install
    ```

4.  **Uygulamayı çalıştırın:**
    ```bash
    npm run dev
    ```

5.  **Tarayıcıyı açın:**
    Terminalde dönen adresi kopyalayarak tarayıcınıza yapıştırın (Genellikle `http://localhost:5173/`).

---

## 🗺️ Gelecek Vizyonu (Roadmap & To-Do)

Proje bir "işletim sistemine" dönüşme yolunda ilerlemektedir. İlerleyen güncellemelerde hedeflenen vizyonlar:

- [ ] **Data Export / Import**: İlerlemelerin JSON formatında indirilip yedeklenebilmesi veya başka cihaza aktarılabilmesi *(İlk öncelik)*.
- [ ] **Supabase / Firebase Entegrasyonu**: Verilerin Local Storage dışına taşıp çapraz platform bulut sistemine aktarılması (Opsiyonel Authentication entegrasyonu).
- [ ] **Çoklu Yol Haritası (Switcher)**: Sistemin içerisine "Backend Developer Roadmap" veya "Data Engineer Roadmap" paketlerinin bir json olarak atılıp, sistemden dropdown ile harita değiştirilmesi.
- [ ] **Gelişmiş Puanlama Sistemi**: Tamamlanan projelere göre rozet kazanma gibi gamification/oyunlaştırma özellikleri.

---

## 🤝 Katkıda Bulunma (Contributing)

Bu bir açık kaynaklı projedir. Her türlü Issue açma (hata bildirimi), Pull Request (yeni özellik başvurusu) ve geri bildirimi heyecanla bekliyoruz!

1. Bu projeyi fork'layın (`Fork`)
2. Yeni bir feature branch'i yaratın (`git checkout -b feature/MuthisÖzellik`)
3. Değişikliklerinizi commit yapın (`git commit -m 'feat: Müthiş özellik eklendi'`)
4. Branch'inize Push yapın (`git push origin feature/MuthisÖzellik`)
5. **Pull Request** başlatın!

---

<div align="center">
  <p>Sevgi, kahve ☕ ve <a href="https://react.dev/" target="_blank">React</a> ile kodlanmıştır.</p>
</div>
