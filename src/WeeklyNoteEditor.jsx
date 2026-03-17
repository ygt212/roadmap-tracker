import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { PenTool, Eye } from 'lucide-react';

export default function WeeklyNoteEditor({ weekId, initialNote, onSave }) {
  const [activeTab, setActiveTab] = useState('edit'); // 'edit' or 'preview'
  const [noteContent, setNoteContent] = useState(initialNote || '');

  const handleChange = (e) => {
    const value = e.target.value;
    setNoteContent(value);
    onSave(weekId, value); // Auto-save on change
  };

  return (
    <div className="mt-4 bg-slate-900 border border-slate-700/60 rounded-xl overflow-hidden shadow-inner animate-in fade-in slide-in-from-top-2 duration-200">
      {/* Tabs */}
      <div className="flex items-center border-b border-slate-800 bg-slate-950/50 px-2 py-1">
        <button
          onClick={() => setActiveTab('edit')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-t-lg \${
            activeTab === 'edit' ? 'text-indigo-400 bg-slate-900 shadow-sm border-b-2 border-indigo-500' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <PenTool size={14} />
          Düzenle
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-t-lg \${
            activeTab === 'preview' ? 'text-emerald-400 bg-slate-900 shadow-sm border-b-2 border-emerald-500' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Eye size={14} />
          Önizleme
        </button>
      </div>

      {/* Editor / Preview Area */}
      <div className="p-4 bg-slate-900/50 min-h-[150px]">
        {activeTab === 'edit' ? (
          <textarea
            value={noteContent}
            onChange={handleChange}
            placeholder="Bu hafta neler öğrendiniz? Önemli notlarınızı buraya markdown formatında yazabilirsiniz..."
            className="w-full min-h-[150px] bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-200 text-sm font-mono focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-y leading-relaxed"
          ></textarea>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800 text-slate-300 leading-relaxed">
            {noteContent.trim() ? (
              <ReactMarkdown>{noteContent}</ReactMarkdown>
            ) : (
              <p className="text-slate-500 italic">Önizlenecek bir not bulunamadı...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
