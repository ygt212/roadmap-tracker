import React, { useState } from 'react';
import { Plus, Trash2, ExternalLink } from 'lucide-react';
import { isValidUrl, normalizeUrl } from './utils/validation';

export default function WeeklyLinksManager({ weekId, links, onAddLink, onRemoveLink }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !url.trim()) {
      return;
    }

    const finalUrl = normalizeUrl(url);
    if (!isValidUrl(finalUrl)) {
      setUrlError('Geçerli bir bağlantı gir.');
      return;
    }

    onAddLink(weekId, {
      id: Date.now().toString(),
      title: title.trim(),
      url: finalUrl
    });

    setTitle('');
    setUrl('');
    setUrlError('');
  };

  return (
    <div className="mt-4 bg-slate-900 border border-slate-700/60 rounded-xl overflow-hidden shadow-inner animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="p-4 bg-slate-950/50 border-b border-slate-800">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Yeni Kaynak Ekle</h4>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Başlık (Örn: React Dokümantasyon)"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="flex-1 bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            aria-label="Kaynak başlığı"
            required
          />
          <div className="flex-1">
            <input
              type="url"
              placeholder="URL (https://...)"
              value={url}
              onChange={(event) => {
                setUrl(event.target.value);
                if (urlError) {
                  setUrlError('');
                }
              }}
              className={`w-full bg-slate-900 border text-slate-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 transition-colors ${
                urlError
                  ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                  : 'border-slate-700 focus:border-indigo-500 focus:ring-indigo-500'
              }`}
              aria-invalid={urlError ? 'true' : 'false'}
              aria-label="Kaynak bağlantısı"
              required
            />
            {urlError && (
              <p className="mt-1 text-xs text-rose-400">{urlError}</p>
            )}
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shrink-0"
          >
            <Plus size={16} />
            Ekle
          </button>
        </form>
      </div>

      <div className="p-4 min-h-[100px] flex flex-col gap-2 bg-slate-900/50">
        {(links || []).length > 0 ? (
          (links || []).map((link) => (
            <div key={link.id} className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-lg group transition-colors hover:border-slate-700">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="bg-emerald-500/10 p-1.5 rounded-lg shrink-0">
                  <ExternalLink size={14} className="text-emerald-400" />
                </div>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 hover:text-blue-300 hover:underline truncate font-medium max-w-[200px] md:max-w-md"
                  title={link.url}
                >
                  {link.title}
                </a>
              </div>
              <button
                type="button"
                onClick={() => onRemoveLink(weekId, link.id)}
                className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100 shrink-0"
                title="Linki Sil"
                aria-label={`Kaynağı sil: ${link.title}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-slate-500 text-sm italic">
            Bu haftaya henüz bir kaynak eklenmedi. Videolar, makaleler veya referanslar ekleyerek başlayabilirsin.
          </div>
        )}
      </div>
    </div>
  );
}
