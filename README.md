# Roadmap Tracker

Sosyal Veri Bilimi odaklı 6 aylık bir öğrenme planını takip etmek için hazırlanmış, tamamen istemci tarafında çalışan bir roadmap uygulaması.

Canlı demo: [roadmap-tracker-sd.vercel.app](https://roadmap-tracker-sd.vercel.app/)

GitHub repo: [ygt212/roadmap-tracker](https://github.com/ygt212/roadmap-tracker)

## Ne Yapıyor?

Bu uygulama haftalık ve aylık öğrenme hedeflerini tek bir arayüzde takip etmeyi amaçlar. Todo ilerlemesi, haftalık notlar, kaynak bağlantıları, portföy linkleri ve Pomodoro ayarları tarayıcı içinde saklanır.

Öne çıkan özellikler:

- 6 aylık yapılandırılmış sosyal veri bilimi roadmap’i
- Haftalık todo takibi
- Markdown destekli haftalık not alanı
- Haftalık kaynak bağlantısı yönetimi
- Portföy ve GitHub proje vitrini
- Yerleşik Pomodoro sayacı
- İstatistik ve ilerleme panosu
- `localStorage` üstünde çalışan kalıcı veri yapısı
- Eski kayıtlar için state migration desteği

## Teknoloji Yığını

- React 19
- Vite
- Tailwind CSS
- Lucide React
- Recharts
- React Markdown
- Node.js test runner (`node:test`)

## Yerel Kurulum

Gereksinimler:

- Node.js
- npm
- Git

Kurulum:

```bash
git clone https://github.com/ygt212/roadmap-tracker.git
cd roadmap-tracker
npm install
```

Geliştirme sunucusu:

```bash
npm run dev
```

Uygulama varsayılan olarak genelde `http://localhost:5173` adresinde açılır.

## Komutlar

```bash
npm run dev
npm test
npm run build
```

Komut açıklamaları:

- `npm run dev`: geliştirme sunucusunu başlatır
- `npm test`: state ve migration testlerini çalıştırır
- `npm run build`: production build oluşturur

## Veri Saklama

Uygulama backend kullanmaz. Kullanıcı verileri tarayıcıdaki `localStorage` içinde tutulur.

Saklanan başlıca alanlar:

- roadmap todo ilerlemesi
- haftalık notlar
- haftalık kaynaklar
- portföy bağlantıları
- Pomodoro süre ayarları

State katmanında sürüm kontrollü migration mantığı bulunur. Böylece veri yapısı değiştiğinde eski kayıtlar mümkün olduğunca korunarak yeni yapıya taşınır.

## Proje Yapısı

Önemli dosya ve klasörler:

- `src/App.jsx`
- `src/data.js`
- `src/hooks/useRoadmapState.js`
- `src/utils/roadmapState.js`
- `src/utils/roadmapState.test.js`
- `src/Pomodoro.jsx`
- `src/Dashboard.jsx`
- `src/Portfolio.jsx`

## Yol Haritası

İleride eklenebilecek geliştirmeler:

- veri dışa aktarma ve içe aktarma
- çoklu roadmap desteği
- isteğe bağlı bulut senkronizasyonu
- oyunlaştırma ve rozet sistemi

## Katkıda Bulunma

Katkı vermek istersen:

```bash
git checkout -b feature/yeni-ozellik
```

Değişikliklerden sonra şu iki komutu çalıştırmak iyi bir minimum kontroldür:

```bash
npm test
npm run build
```

Sonrasında commit, push ve pull request açabilirsin.

## Not

Bu proje şu anda istemci tarafı odaklı bir kişisel takip aracı olarak tasarlandı. Tarayıcı verisi temizlenirse ilerleme bilgileri de silinir.
