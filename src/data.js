export const roadmapData = [
  {
    id: 1,
    title: "1. Ay — Temel programlama + veriyle çalışma alışkanlığı",
    overview: "Önce araç hâkimiyeti kazan. Bu ayın sonunda bir CSV dosyasını okuyup temizleyebilmeli, filtreleyebilmeli, özetleyebilmeli ve basit grafikler çizebilmelisin.",
    weeks: [
      {
        id: "m1-w1",
        title: "1. hafta",
        goals: "Programlama temelleri, Dosya okuma/yazma, Basit veri tipleri, Küçük alıştırmalar",
        todos: [
          { id: "t-1", text: "Programlama temelleri çalış", completed: false },
          { id: "t-2", text: "Dosya okuma/yazma yap", completed: false },
          { id: "t-3", text: "Basit veri tipleri öğren", completed: false },
          { id: "t-4", text: "Küçük alıştırmalar çöz", completed: false }
        ]
      },
      {
        id: "m1-w2",
        title: "2. hafta",
        goals: "DataFrame mantığı, Satır/sütun seçme, filtreleme, sıralama, eksik veri",
        todos: [
          { id: "t-5", text: "DataFrame mantığı anla", completed: false },
          { id: "t-6", text: "Satır/sütun seçme pratiği", completed: false },
          { id: "t-7", text: "Filtreleme ve sıralama yap", completed: false },
          { id: "t-8", text: "Eksik veriyle tanışma", completed: false }
        ]
      },
      {
        id: "m1-w3",
        title: "3. hafta",
        goals: "Gruplama, toplulaştırma, Birleştirme işlemleri, Temel görselleştirme",
        todos: [
          { id: "t-9", text: "Gruplama ve toplulaştırma", completed: false },
          { id: "t-10", text: "Birleştirme işlemleri", completed: false },
          { id: "t-11", text: "Temel görselleştirme kütüphanelerine (matplotlib vb.) giriş", completed: false }
        ]
      },
      {
        id: "m1-w4",
        title: "4. hafta",
        goals: "Baştan sona mini analiz",
        todos: [
          { id: "t-12", text: "Küçük bir veri seti al", completed: false },
          { id: "t-13", text: "Temizle, özetle, görselleştir", completed: false },
          { id: "t-14", text: "Kısa yorum yaz ve ay sonu çıktısı oluştur", completed: false }
        ]
      }
    ],
    milestones: {
      output: "Bir Jupyter Notebook veya R Markdown dosyası: veri seti tanıtımı, temizlik adımları, 3–4 grafik, 1 sayfalık kısa yorum",
      successCriteria: "Şunu rahat yapabiliyor ol: 'Bir veri setini aç, problemli sütunları bul, temizle, özet tablo çıkar, grafik üret.'"
    }
  },
  {
    id: 2,
    title: "2. Ay — Temel istatistik + keşifsel veri analizi",
    overview: "Sosyal veride teknik eşik sadece kod yazmak değil, veriyi istatistiksel olarak okumak. LSE ve NYU gibi programlar güçlü istatistik temelini özellikle vurguluyor.",
    weeks: [
      {
        id: "m2-w1",
        title: "1. hafta",
        goals: "Betimsel istatistik, Dağılımları okuma, Histogram, boxplot",
        todos: [
          { id: "t-15", text: "Betimsel istatistik öğren", completed: false },
          { id: "t-16", text: "Dağılımları okuma pratiği", completed: false },
          { id: "t-17", text: "Histogram, boxplot, density plot çizimleri", completed: false }
        ]
      },
      {
        id: "m2-w2",
        title: "2. hafta",
        goals: "Olasılık sezgisi, Normal dağılım, Standartlaştırma",
        todos: [
          { id: "t-18", text: "Olasılık sezgisi kur", completed: false },
          { id: "t-19", text: "Normal dağılım ve standartlaştırma", completed: false },
          { id: "t-20", text: "Örnekleme hatası mantığını kavra", completed: false }
        ]
      },
      {
        id: "m2-w3",
        title: "3. hafta",
        goals: "Hipotez testi, t-testi, ki-kare",
        todos: [
          { id: "t-21", text: "Hipotez testi", completed: false },
          { id: "t-22", text: "t-testi, ki-kare mantığı", completed: false },
          { id: "t-23", text: "İstatistiksel anlamlılık ile pratik anlam farkı", completed: false }
        ]
      },
      {
        id: "m2-w4",
        title: "4. hafta",
        goals: "Keşifsel veri analizi (EDA) projesi",
        todos: [
          { id: "t-24", text: "Bir sosyal konu seç (eğitim, gelir vs.)", completed: false },
          { id: "t-25", text: "Verideki en dikkat çekici örüntüleri bul", completed: false },
          { id: "t-26", text: "EDA projesi çıktısı hazırla (araştırma sorusu, grafikler, yorum)", completed: false }
        ]
      }
    ],
    milestones: {
      output: "Bir EDA projesi: araştırma sorusu, veri tanımı, temel istatistikler, grafikler, ilk bulgular, sınırlılıklar",
      successCriteria: "Şunu açıklayabiliyor ol: 'İki değişken ilişkili görünüyor ama bu neden-sonuç kanıtı değildir.'"
    }
  },
  {
    id: 3,
    title: "3. Ay — Regresyon + araştırma tasarımı",
    overview: "Sosyal veri yüksek lisansında seni farklılaştıracak şey, sadece analiz yapmak değil, doğru soru sormak. Programlar araştırma tasarımı ve causal inference tarafını özellikle önemsiyor.",
    weeks: [
      {
        id: "m3-w1",
        title: "1. hafta",
        goals: "Araştırma sorusu kurma, Kavramsal çerçeve, Değişkenleştirme",
        todos: [
          { id: "t-27", text: "Araştırma sorusu kurma pratiği yap", completed: false },
          { id: "t-28", text: "Kavramsal çerçeve mantığını anla", completed: false },
          { id: "t-29", text: "Soyut kavramları ölçülebilir hale getir (Değişkenleştirme)", completed: false }
        ]
      },
      {
        id: "m3-w2",
        title: "2. hafta",
        goals: "Lineer regresyon mantığı, Katsayı okuma, R², hata terimi",
        todos: [
          { id: "t-30", text: "Lineer regresyon mantığını kavra", completed: false },
          { id: "t-31", text: "Regresyon katsayılarını okumayı öğren", completed: false },
          { id: "t-32", text: "R², hata terimi ve temel varsayımları anla", completed: false }
        ]
      },
      {
        id: "m3-w3",
        title: "3. hafta",
        goals: "Lojistik regresyona giriş, Kategorik sonuçlar, Dummy variable",
        todos: [
          { id: "t-33", text: "Lojistik regresyona giriş yap", completed: false },
          { id: "t-34", text: "Kategorik sonuçlarla çalışmayı öğren", completed: false },
          { id: "t-35", text: "Dummy variable mantığını kavra", completed: false }
        ]
      },
      {
        id: "m3-w4",
        title: "4. hafta",
        goals: "Sosyal bilim odaklı mini proje",
        todos: [
          { id: "t-36", text: "Mini proje alanını seç (Eğitim, gelir, vd.)", completed: false },
          { id: "t-37", text: "Soruyu sor, modeli tasarla, regresyon analizi yap", completed: false },
          { id: "t-38", text: "İlk 'yarı akademik' raporunu hazırla", completed: false }
        ]
      }
    ],
    milestones: {
      output: "İlk yarı akademik rapor: soru, literatür benzeri kısa çerçeve, veri ve yöntem, regresyon tablosu, yorum, sınırlılıklar",
      successCriteria: "Bir regresyon tablosunu okuyup şunu söyleyebil: 'Bu ilişki var gibi görünüyor ama karıştırıcı değişkenler yüzünden nedensel iddia kuramam.'"
    }
  },
  {
    id: 4,
    title: "4. Ay — Makine öğrenmesi temelleri + değerlendirme",
    overview: "Oxford ve LSE gibi programlar makine öğrenmesini sosyal veri eğitimine dahil ediyor; ama burada önemli olan 'en karmaşık modeli kurmak' değil, modeli sosyal bağlam içinde doğru kullanmak.",
    weeks: [
      {
        id: "m4-w1",
        title: "1. hafta",
        goals: "ML’e giriş, Tahmin ve açıklama ayrımı",
        todos: [
          { id: "t-39", text: "Makine öğrenmesine giriş yap", completed: false },
          { id: "t-40", text: "İstatistik ile ML farkını anla", completed: false },
          { id: "t-41", text: "Tahmin (prediction) ve açıklama (explanation) ayrımını çalış", completed: false }
        ]
      },
      {
        id: "m4-w2",
        title: "2. hafta",
        goals: "Train/test split, Basit modeller, Performans ölçütleri",
        todos: [
          { id: "t-42", text: "Veriyi train/test olarak bölmeyi öğren", completed: false },
          { id: "t-43", text: "Basit sınıflandırma ve regresyon modelleri kur", completed: false },
          { id: "t-44", text: "Accuracy, precision, recall, F1 gibi metrikleri kavra", completed: false }
        ]
      },
      {
        id: "m4-w3",
        title: "3. hafta",
        goals: "Ağaç tabanlı modeller, Feature importance, Overfitting",
        todos: [
          { id: "t-45", text: "Decision tree ve Random forest algoritmalarını çalış", completed: false },
          { id: "t-46", text: "Feature importance ile değişkenleri yorumla", completed: false },
          { id: "t-47", text: "Overfitting (aşırı öğrenme) senaryolarını incele ve engelle", completed: false }
        ]
      },
      {
        id: "m4-w4",
        title: "4. hafta",
        goals: "Küçük sosyal veri tahmin projesi",
        todos: [
          { id: "t-48", text: "Tahmin (prediction) odaklı sosyal veri problemi bul", completed: false },
          { id: "t-49", text: "Model kur, baseline ve 2 ayrı model karşılaştırması yap", completed: false },
          { id: "t-50", text: "Yorumlanabilirlik ve etik risk notunu rapora ekle", completed: false }
        ]
      }
    ],
    milestones: {
      output: "Tahmin odaklı mini proje: problem tanımı, veri hazırlama, baseline + en az 2 model, model karşılaştırma, yorumlanabilirlik değerlendirmesi, etik risk notu",
      successCriteria: "Şunu net söyleyebiliyor ol: 'Daha yüksek accuracy, her zaman daha iyi sosyal bilim analizi anlamına gelmez.'"
    }
  },
  {
    id: 5,
    title: "5. Ay — Metin analizi / ağ analizi + etik",
    overview: "Sosyal veri alanında özellikle text analysis ve network analysis öne çıkıyor. Ayrıca etik, bias ve mahremiyet bu alanda temel yeterliliklerden biri.",
    weeks: [
      {
        id: "m5-w1",
        title: "1. ve 2. hafta",
        goals: "Metin (NLP) veya Ağ Analizine Giriş + Teknik Uygulama",
        todos: [
          { id: "t-51", text: "YOL A: Metin temizleme, tokenization, frekans ve topic modeling", completed: false },
          { id: "t-52", text: "YOL B: Düğüm, kenar (node/edge), centrality ve community mantığı", completed: false },
          { id: "t-53", text: "Seçilen alanda minik uygulama yap (Örn: sosyal medya tema analizi veya etkileşim ağı)", completed: false }
        ]
      },
      {
        id: "m5-w2",
        title: "3. hafta",
        goals: "Küçük proje geliştirme",
        todos: [
          { id: "t-54", text: "Metin veya Ağ analizi temel alınarak mini bir sosyal veri projesi başlat", completed: false },
          { id: "t-55", text: "Veriyi topla/bul, temizle ve analiz yöntemini uygula", completed: false },
          { id: "t-56", text: "Bulguları görselleştir ve ilk yorumlarını yaz", completed: false }
        ]
      },
      {
        id: "m5-w3",
        title: "4. hafta",
        goals: "Etik değerlendirme ve Raporlama",
        todos: [
          { id: "t-57", text: "Sampling bias, representation bias ve privacy kavramlarını çalış", completed: false },
          { id: "t-58", text: "Platform verilerinde etik sorunlar (consent) tartışmalarını oku", completed: false },
          { id: "t-59", text: "Projenin etik risklerini ve metodolojik sınırlarını raporuna ekle", completed: false }
        ]
      }
    ],
    milestones: {
      output: "Bir tematik proje: veri kaynağı, yöntem, bulgular, etik riskler, metodolojik sınırlılıklar",
      successCriteria: "Şunu tartışabiliyor ol: 'Bu analiz teknik olarak mümkün ama etik olarak sorunlu olabilir.'"
    }
  },
  {
    id: 6,
    title: "6. Ay — Capstone proje + portföy + başvuruya dönüştürme",
    overview: "Son ayın odağı öğrenmek değil, kanıt üretmek. Başvuru komitesi 'hangi videoları izlediğinle' değil, ne üretebildiğinle ilgilenir.",
    weeks: [
      {
        id: "m6-w1",
        title: "1. hafta",
        goals: "Capstone Konu Seçimi ve Planlama",
        todos: [
          { id: "t-60", text: "Sosyal etki yaratan net bir araştırma sorusu belirle", completed: false },
          { id: "t-61", text: "Kullanacağın veri setini sabitle", completed: false },
          { id: "t-62", text: "Uygulayacağın analiz/modelleme adımlarını (yöntem akışını) çıkar", completed: false }
        ]
      },
      {
        id: "m6-w2",
        title: "2. hafta",
        goals: "Veri temizleme ve İlk analizler",
        todos: [
          { id: "t-63", text: "Veri temizliği aşamasını (cleaning/preprocessing) tamamla", completed: false },
          { id: "t-64", text: "Keşifsel analiz (EDA) yap ve temel bulguları değerlendir", completed: false },
          { id: "t-65", text: "Gerekirse araştırma sorusunda iyileştirmeler yap", completed: false }
        ]
      },
      {
        id: "m6-w3",
        title: "3. hafta",
        goals: "Ana modelleme, Görseller ve Bulguların yazımı",
        todos: [
          { id: "t-66", text: "İstatistiksel analiz veya makine öğrenmesi modellerini inşa et", completed: false },
          { id: "t-67", text: "Sonuçları etkili tablolar ve grafiklerle sun", completed: false },
          { id: "t-68", text: "Sonuçların toplumsal/sosyal bilim bağlamındaki bilimsel yorumunu taslak halinde yaz", completed: false }
        ]
      },
      {
        id: "m6-w4",
        title: "4. hafta",
        goals: "Final rapor, GitHub düzeni ve CV uyarlaması",
        todos: [
          { id: "t-69", text: "Projenin final raporunu (Markdown, PDF vb.) tamamla", completed: false },
          { id: "t-70", text: "Projeni düzenli ve açıklayıcı (README) bir şekilde GitHub deposunda yayınla", completed: false },
          { id: "t-71", text: "Projeyi bir 'portföy' özetine dönüştürüp SOP/niyet mektubu anlatısına hazır hale getir", completed: false }
        ]
      }
    ],
    milestones: {
      output: "1 capstone proje, 2–3 mini proje, GitHub veya düzenli klasör portföyü, 1 sayfalık “proje özetleri” dosyası",
      successCriteria: "Bir hocaya veya başvuru komitesine 3 dakikada net olarak: Hangi soruyu sordun, hangi veriyi/yöntemi kullandın, ne buldun, sınırlılıklar nelerdi anlatabil."
    }
  }
];
