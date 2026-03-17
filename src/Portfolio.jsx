import React, { useState } from 'react';
import { Github, Edit2, ExternalLink, Save, FolderGit2 } from 'lucide-react';
import { isValidUrl, normalizeUrl } from './utils/validation';

const projectTemplates = [
  {
    id: 'eda',
    title: 'Mini Proje: Keşifsel Veri Analizi',
    description: 'Gerçek dünya verisi üzerinde veri temizleme, eksik değer yönetimi ve görselleştirme odaklı bir analiz projesi.',
    tags: ['Python', 'Pandas', 'Seaborn', 'EDA'],
    type: 'mini'
  },
  {
    id: 'regression',
    title: 'Mini Proje: Tahmin veya Sınıflandırma',
    description: 'Sosyal bir problemi regresyon veya sınıflandırma yaklaşımıyla ele alan uçtan uca bir modelleme projesi.',
    tags: ['Scikit-Learn', 'Statsmodels', 'ML', 'Modeling'],
    type: 'mini'
  },
  {
    id: 'nlp',
    title: 'Mini Proje: Metin veya Ağ Analizi',
    description: 'Metin verisi ya da ağ yapıları kullanarak sosyal ilişkileri veya temaları inceleyen uygulamalı proje.',
    tags: ['NLTK', 'NetworkX', 'NLP', 'Graph'],
    type: 'mini'
  },
  {
    id: 'capstone',
    title: 'Capstone Proje: Final Sosyal Veri Bilimi Çalışması',
    description: 'Veri toplama, temizleme, modelleme ve hikayeleştirme adımlarını bir araya getiren kapsamlı final projesi.',
    tags: ['End-to-End', 'Storytelling', 'Social Science', 'Advanced'],
    type: 'capstone'
  }
];

export default function Portfolio({ portfolioData, onSaveGithubLink }) {
  const [editingId, setEditingId] = useState(null);
  const [editUrl, setEditUrl] = useState('');
  const [urlError, setUrlError] = useState('');

  const handleEdit = (id, currentUrl) => {
    setEditingId(id);
    setEditUrl(currentUrl || '');
    setUrlError('');
  };

  const handleSave = (id) => {
    const finalUrl = normalizeUrl(editUrl);
    if (!finalUrl || !isValidUrl(finalUrl)) {
      setUrlError('Geçerli bir GitHub bağlantısı gir.');
      return;
    }

    onSaveGithubLink(id, finalUrl);
    setEditingId(null);
    setEditUrl('');
    setUrlError('');
  };

  return (
    <div className="max-w-5xl mx-auto pb-12 animate-in fade-in duration-500">
      <div className="mb-8 md:mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-100 flex items-center gap-3">
          <FolderGit2 className="text-indigo-500" size={32} />
          Portföy Vitrini
        </h1>
        <p className="text-slate-400 mt-2 text-sm md:text-base leading-relaxed">
          Ürettiğin projeleri burada sergileyebilir, GitHub bağlantılarını ekleyerek başvuru sürecine hazır bir portföy oluşturabilirsin.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projectTemplates.map((project) => {
          const isCapstone = project.type === 'capstone';
          const savedUrl = portfolioData[project.id];
          const isEditing = editingId === project.id;

          return (
            <div
              key={project.id}
              className={`flex flex-col bg-slate-900 border rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-lg ${
                isCapstone
                  ? 'lg:col-span-full border-amber-500/40 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 shadow-amber-900/10'
                  : 'border-slate-800 hover:border-indigo-500/30 shadow-indigo-900/10'
              }`}
            >
              <div className="flex-1">
                <h2 className={`text-xl md:text-2xl font-bold mb-3 ${isCapstone ? 'text-amber-400' : 'text-slate-100'}`}>
                  {project.title}
                </h2>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-slate-950 border border-slate-700/50 text-slate-300 text-xs font-semibold rounded-full uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-5 border-t border-slate-800">
                {isEditing || (!savedUrl && editingId !== project.id) ? (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Github size={18} className="text-slate-500" />
                      </div>
                      <input
                        type="url"
                        placeholder="GitHub depo bağlantısını yapıştır"
                        value={isEditing ? editUrl : ''}
                        onChange={(event) => {
                          if (!isEditing) {
                            setEditingId(project.id);
                          }
                          setEditUrl(event.target.value);
                          if (urlError) {
                            setUrlError('');
                          }
                        }}
                        onFocus={() => {
                          if (!isEditing) {
                            handleEdit(project.id, savedUrl);
                          }
                        }}
                        className={`w-full bg-slate-950 border text-slate-200 text-sm rounded-lg pl-10 pr-3 py-3 focus:outline-none focus:ring-1 transition-colors ${
                          urlError && isEditing
                            ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                            : 'border-slate-700 focus:border-indigo-500 focus:ring-indigo-500'
                        }`}
                        aria-invalid={urlError && isEditing ? 'true' : 'false'}
                        aria-label={`${project.title} GitHub bağlantısı`}
                      />
                      {urlError && isEditing && (
                        <p className="mt-1 text-xs text-rose-400">{urlError}</p>
                      )}
                    </div>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => handleSave(project.id)}
                        className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors shrink-0"
                      >
                        <Save size={18} />
                        Kaydet
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-lg p-3">
                    <a
                      href={savedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 font-medium truncate ${isCapstone ? 'text-amber-400 hover:text-amber-300' : 'text-indigo-400 hover:text-indigo-300'} transition-colors`}
                      title={savedUrl}
                    >
                      <Github size={18} />
                      <span className="truncate max-w-[200px] md:max-w-xs block">GitHub'da Görüntüle</span>
                      <ExternalLink size={14} className="ml-1 opacity-70" />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleEdit(project.id, savedUrl)}
                      className="p-2 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 text-sm font-medium"
                      aria-label={`${project.title} bağlantısını düzenle`}
                    >
                      <Edit2 size={16} />
                      <span className="hidden sm:inline">Düzenle</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
