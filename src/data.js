export const roadmapData = [
  {
    id: 1,
    title: '1. Ay - Temel programlama ve veriyle çalışma alışkanlığı',
    overview: 'Araç hakimiyeti kur. Bu ayın sonunda bir CSV dosyasını okuyup temizleyebilmeli, filtreleyebilmeli, özetleyebilmeli ve basit grafikler çizebilmelisin.',
    weeks: [
      {
        id: 'm1-w1',
        title: '1. hafta',
        goals: 'Programlama temelleri, dosya okuma yazma, veri tipleri ve küçük alıştırmalar',
        todos: [
          { id: 't-1', text: 'Programlama temellerini çalış', completed: false },
          { id: 't-2', text: 'Dosya okuma ve yazma pratiği yap', completed: false },
          { id: 't-3', text: 'Temel veri tiplerini öğren', completed: false },
          { id: 't-4', text: 'Kısa alıştırmalar çöz', completed: false }
        ]
      },
      {
        id: 'm1-w2',
        title: '2. hafta',
        goals: 'DataFrame mantığı, satır sütun seçme, filtreleme, sıralama ve eksik veri',
        todos: [
          { id: 't-5', text: 'DataFrame mantığını kavra', completed: false },
          { id: 't-6', text: 'Satır ve sütun seçme pratiği yap', completed: false },
          { id: 't-7', text: 'Filtreleme ve sıralama uygula', completed: false },
          { id: 't-8', text: 'Eksik veri senaryolarını incele', completed: false }
        ]
      },
      {
        id: 'm1-w3',
        title: '3. hafta',
        goals: 'Gruplama, toplulaştırma, birleştirme işlemleri ve temel görselleştirme',
        todos: [
          { id: 't-9', text: 'Gruplama ve toplulaştırma uygula', completed: false },
          { id: 't-10', text: 'Birleştirme işlemlerini öğren', completed: false },
          { id: 't-11', text: 'Matplotlib veya benzeri bir araçla grafik üret', completed: false }
        ]
      },
      {
        id: 'm1-w4',
        title: '4. hafta',
        goals: 'Baştan sona mini analiz',
        todos: [
          { id: 't-12', text: 'Küçük bir veri seti seç', completed: false },
          { id: 't-13', text: 'Veriyi temizle, özetle ve görselleştir', completed: false },
          { id: 't-14', text: 'Kısa bir yorum yaz ve ay sonu çıktısı oluştur', completed: false }
        ]
      }
    ],
    milestones: {
      output: 'Bir notebook: veri seti tanıtımı, temizlik adımları, 3 ila 4 grafik ve kısa yorum',
      successCriteria: 'Bir veri setini açıp problemli sütunları bulabiliyor, temizleyebiliyor ve grafik üretebiliyor ol.'
    }
  },
  {
    id: 2,
    title: '2. Ay - Temel istatistik ve keşifsel veri analizi',
    overview: 'Kod yazmanın ötesine geçip veriyi istatistiksel olarak okumayı öğren. Amaç, sosyal veride örüntüleri doğru yorumlamak.',
    weeks: [
      {
        id: 'm2-w1',
        title: '1. hafta',
        goals: 'Betimsel istatistik, dağılımlar, histogram ve boxplot',
        todos: [
          { id: 't-15', text: 'Betimsel istatistik kavramlarını öğren', completed: false },
          { id: 't-16', text: 'Dağılımları yorumlama pratiği yap', completed: false },
          { id: 't-17', text: 'Histogram ve boxplot çiz', completed: false }
        ]
      },
      {
        id: 'm2-w2',
        title: '2. hafta',
        goals: 'Olasılık sezgisi, normal dağılım, standartlaştırma ve örnekleme hatası',
        todos: [
          { id: 't-18', text: 'Olasılık sezgisini güçlendir', completed: false },
          { id: 't-19', text: 'Normal dağılım ve standartlaştırmayı çalış', completed: false },
          { id: 't-20', text: 'Örnekleme hatasını anlamaya odaklan', completed: false }
        ]
      },
      {
        id: 'm2-w3',
        title: '3. hafta',
        goals: 'Hipotez testi, t-testi, ki-kare ve anlamlılık yorumu',
        todos: [
          { id: 't-21', text: 'Hipotez testi mantığını öğren', completed: false },
          { id: 't-22', text: 't-testi ve ki-kare örnekleri çöz', completed: false },
          { id: 't-23', text: 'İstatistiksel ve pratik anlam farkını not al', completed: false }
        ]
      },
      {
        id: 'm2-w4',
        title: '4. hafta',
        goals: 'Keşifsel veri analizi projesi',
        todos: [
          { id: 't-24', text: 'Bir sosyal konuya ait veri seti seç', completed: false },
          { id: 't-25', text: 'Dikkat çekici örüntüleri bul ve görselleştir', completed: false },
          { id: 't-26', text: 'İlk bulgularını ve sınırlılıkları yaz', completed: false }
        ]
      }
    ],
    milestones: {
      output: 'Bir EDA projesi: araştırma sorusu, temel istatistikler, grafikler, ilk bulgular ve sınırlılıklar',
      successCriteria: 'İki değişken ilişkili görünse bile bunun nedensellik kanıtı olmadığını açıklayabiliyor ol.'
    }
  },
  {
    id: 3,
    title: '3. Ay - Regresyon ve araştırma tasarımı',
    overview: 'Bu ayın odağı doğru araştırma sorusu kurmak ve regresyon çıktısını sosyal bilim bağlamında yorumlamak.',
    weeks: [
      {
        id: 'm3-w1',
        title: '1. hafta',
        goals: 'Araştırma sorusu kurma, kavramsal çerçeve ve değişkenleştirme',
        todos: [
          { id: 't-27', text: 'Araştırma sorusu yazma pratiği yap', completed: false },
          { id: 't-28', text: 'Kavramsal çerçeve oluştur', completed: false },
          { id: 't-29', text: 'Soyut kavramları ölçülebilir değişkenlere dönüştür', completed: false }
        ]
      },
      {
        id: 'm3-w2',
        title: '2. hafta',
        goals: 'Lineer regresyon mantığı, katsayı okuma, R kare ve temel varsayımlar',
        todos: [
          { id: 't-30', text: 'Lineer regresyonun mantığını kavra', completed: false },
          { id: 't-31', text: 'Katsayı yorumlama pratiği yap', completed: false },
          { id: 't-32', text: 'R kare ve hata terimini anlamlandır', completed: false }
        ]
      },
      {
        id: 'm3-w3',
        title: '3. hafta',
        goals: 'Lojistik regresyona giriş, kategorik sonuçlar ve dummy değişkenler',
        todos: [
          { id: 't-33', text: 'Lojistik regresyona giriş yap', completed: false },
          { id: 't-34', text: 'Kategorik sonuçlarla çalışma pratiği yap', completed: false },
          { id: 't-35', text: 'Dummy değişken mantığını öğren', completed: false }
        ]
      },
      {
        id: 'm3-w4',
        title: '4. hafta',
        goals: 'Sosyal bilim odaklı mini proje',
        todos: [
          { id: 't-36', text: 'Bir sosyal araştırma sorusu seç', completed: false },
          { id: 't-37', text: 'Modelini kur ve regresyon analizi yap', completed: false },
          { id: 't-38', text: 'Yarı akademik bir kısa rapor hazırla', completed: false }
        ]
      }
    ],
    milestones: {
      output: 'Soru, veri ve yöntem bölümleri olan kısa bir rapor ve regresyon tablosu',
      successCriteria: 'Bir regresyon tablosunu okuyup karıştırıcı değişken riskini açıklayabiliyor ol.'
    }
  },
  {
    id: 4,
    title: '4. Ay - Makine öğrenmesi temelleri ve değerlendirme',
    overview: 'Makine öğrenmesini sosyal bağlam içinde kullanmayı öğren. Amaç en karmaşık modeli kurmak değil, doğru problemi doğru metriklerle değerlendirmek.',
    weeks: [
      {
        id: 'm4-w1',
        title: '1. hafta',
        goals: 'Makine öğrenmesine giriş, tahmin ve açıklama ayrımı',
        todos: [
          { id: 't-39', text: 'Makine öğrenmesinin temel mantığını öğren', completed: false },
          { id: 't-40', text: 'İstatistik ve makine öğrenmesi farkını not al', completed: false },
          { id: 't-41', text: 'Tahmin ve açıklama ayrımını örneklerle çalış', completed: false }
        ]
      },
      {
        id: 'm4-w2',
        title: '2. hafta',
        goals: 'Train test ayrımı, baseline model ve performans ölçütleri',
        todos: [
          { id: 't-42', text: 'Train test split uygula', completed: false },
          { id: 't-43', text: 'Basit sınıflandırma veya regresyon modeli kur', completed: false },
          { id: 't-44', text: 'Accuracy, precision, recall ve F1 metriklerini karşılaştır', completed: false }
        ]
      },
      {
        id: 'm4-w3',
        title: '3. hafta',
        goals: 'Ağaç tabanlı modeller, feature importance ve overfitting',
        todos: [
          { id: 't-45', text: 'Decision tree veya random forest dene', completed: false },
          { id: 't-46', text: 'Feature importance yorumla', completed: false },
          { id: 't-47', text: 'Overfitting örnekleri incele', completed: false }
        ]
      },
      {
        id: 'm4-w4',
        title: '4. hafta',
        goals: 'Tahmin odaklı sosyal veri mini projesi',
        todos: [
          { id: 't-48', text: 'Bir tahmin problemi tanımla', completed: false },
          { id: 't-49', text: 'En az iki model karşılaştır', completed: false },
          { id: 't-50', text: 'Etik risk ve yorumlanabilirlik notu ekle', completed: false }
        ]
      }
    ],
    milestones: {
      output: 'Problem tanımı, veri hazırlama, model karşılaştırması ve yorum içeren mini ML projesi',
      successCriteria: 'Daha yüksek doğruluğun her zaman daha iyi sosyal analiz anlamına gelmediğini açıklayabiliyor ol.'
    }
  },
  {
    id: 5,
    title: '5. Ay - Metin analizi veya ağ analizi ve etik',
    overview: 'Bu ay bir teknik kulvara derinleşirken etik, bias ve mahremiyet tarafını da görünür biçimde çalış.',
    weeks: [
      {
        id: 'm5-w1',
        title: '1. ve 2. hafta',
        goals: 'Metin analizi veya ağ analizine giriş ve ilk uygulamalar',
        todos: [
          { id: 't-51', text: 'Metin temizleme veya ağ temellerini öğren', completed: false },
          { id: 't-52', text: 'Tokenization, topic veya centrality gibi kavramları uygula', completed: false },
          { id: 't-53', text: 'Seçtiğin kulvarda küçük bir deneme yap', completed: false }
        ]
      },
      {
        id: 'm5-w2',
        title: '3. hafta',
        goals: 'Küçük proje geliştirme',
        todos: [
          { id: 't-54', text: 'Bir mini proje başlat', completed: false },
          { id: 't-55', text: 'Veriyi temizle ve yöntemi uygula', completed: false },
          { id: 't-56', text: 'Bulguları görselleştir ve ilk yorumlarını yaz', completed: false }
        ]
      },
      {
        id: 'm5-w3',
        title: '4. hafta',
        goals: 'Etik değerlendirme ve raporlama',
        todos: [
          { id: 't-57', text: 'Bias ve privacy kavramlarını çalış', completed: false },
          { id: 't-58', text: 'Consent ve platform verisi etik risklerini oku', completed: false },
          { id: 't-59', text: 'Projeye etik riskler ve sınırlılıklar bölümü ekle', completed: false }
        ]
      }
    ],
    milestones: {
      output: 'Veri kaynağı, yöntem, bulgular ve etik değerlendirme içeren tematik proje',
      successCriteria: 'Teknik olarak mümkün olan bir analizin etik açıdan sorunlu olabileceğini tartışabiliyor ol.'
    }
  },
  {
    id: 6,
    title: '6. Ay - Capstone proje, portföy ve başvuru hazırlığı',
    overview: 'Son ayın amacı öğrenmekten çok üretmek. Başvuru dosyasına girecek güçlü bir capstone proje ve düzenli bir portföy oluştur.',
    weeks: [
      {
        id: 'm6-w1',
        title: '1. hafta',
        goals: 'Capstone konu seçimi ve planlama',
        todos: [
          { id: 't-60', text: 'Net bir araştırma sorusu belirle', completed: false },
          { id: 't-61', text: 'Kullanacağın veri setini sabitle', completed: false },
          { id: 't-62', text: 'Yöntem akışını planla', completed: false }
        ]
      },
      {
        id: 'm6-w2',
        title: '2. hafta',
        goals: 'Veri temizleme ve ilk analizler',
        todos: [
          { id: 't-63', text: 'Veri temizliğini tamamla', completed: false },
          { id: 't-64', text: 'İlk keşifsel analizleri yap', completed: false },
          { id: 't-65', text: 'Gerekirse araştırma sorusunu daralt', completed: false }
        ]
      },
      {
        id: 'm6-w3',
        title: '3. hafta',
        goals: 'Ana modelleme, görseller ve bulguların yazımı',
        todos: [
          { id: 't-66', text: 'Ana modelini veya analizini tamamla', completed: false },
          { id: 't-67', text: 'Tablo ve grafiklerini üret', completed: false },
          { id: 't-68', text: 'Bulguları toplumsal bağlamla birlikte yaz', completed: false }
        ]
      },
      {
        id: 'm6-w4',
        title: '4. hafta',
        goals: 'Final rapor, GitHub düzeni ve başvuru anlatısı',
        todos: [
          { id: 't-69', text: 'Final raporunu tamamla', completed: false },
          { id: 't-70', text: 'Projeyi düzenli bir README ile GitHub’a yerleştir', completed: false },
          { id: 't-71', text: 'Projeyi portföy ve başvuru anlatısına dönüştür', completed: false }
        ]
      }
    ],
    milestones: {
      output: 'Bir capstone proje, birkaç mini proje ve düzenli bir GitHub portföyü',
      successCriteria: 'Bir hocaya veya başvuru komitesine 3 dakikada soru, veri, yöntem, bulgu ve sınırlılıkları net anlatabiliyor ol.'
    }
  }
];
