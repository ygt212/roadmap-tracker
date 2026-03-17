import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Circle,
  ChevronRight,
  Menu,
  Map,
  RefreshCcw,
  Award,
  Flag,
  X,
  StickyNote,
  Bookmark,
  Activity,
  FolderGit2
} from 'lucide-react';
import WeeklyNoteEditor from './WeeklyNoteEditor';
import WeeklyLinksManager from './WeeklyLinksManager';
import useRoadmapState from './hooks/useRoadmapState';
import { getMonthSummaryTitle, getWeekStorageKey } from './utils/roadmapState';

const Pomodoro = lazy(() => import('./Pomodoro'));
const Dashboard = lazy(() => import('./Dashboard'));
const Portfolio = lazy(() => import('./Portfolio'));

function SectionFallback() {
  return (
    <div className="max-w-4xl mx-auto pb-12 animate-pulse">
      <div className="h-7 w-56 bg-slate-800 rounded mb-4"></div>
      <div className="h-24 w-full bg-slate-900 rounded-2xl border border-slate-800"></div>
    </div>
  );
}

function App() {
  const {
    data,
    weeklyNotes,
    setWeeklyNotes,
    weeklyLinks,
    setWeeklyLinks,
    portfolioData,
    setPortfolioData,
    progress,
    toggleTodoCompletion,
    resetRoadmap
  } = useRoadmapState();

  const [activeMonthId, setActiveMonthId] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [openNoteWeekId, setOpenNoteWeekId] = useState(null);
  const [openLinksWeekId, setOpenLinksWeekId] = useState(null);
  const animationTimeoutRef = useRef(null);

  useEffect(() => () => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
  }, []);

  const handleSaveGithubLink = (id, url) => {
    setPortfolioData((currentValue) => ({
      ...currentValue,
      [id]: url
    }));
  };

  const handleToggleNote = (weekId) => {
    setOpenLinksWeekId(null);
    setOpenNoteWeekId((currentValue) => (currentValue === weekId ? null : weekId));
  };

  const handleToggleLinks = (weekId) => {
    setOpenNoteWeekId(null);
    setOpenLinksWeekId((currentValue) => (currentValue === weekId ? null : weekId));
  };

  const handleAddLink = (weekId, link) => {
    setWeeklyLinks((currentValue) => ({
      ...currentValue,
      [weekId]: [...(currentValue[weekId] || []), link]
    }));
  };

  const handleRemoveLink = (weekId, linkId) => {
    setWeeklyLinks((currentValue) => ({
      ...currentValue,
      [weekId]: (currentValue[weekId] || []).filter((link) => link.id !== linkId)
    }));
  };

  const handleMonthChange = (id) => {
    if (id === activeMonthId) {
      return;
    }

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    setIsAnimating(true);
    animationTimeoutRef.current = setTimeout(() => {
      setActiveMonthId(id);
      setIsAnimating(false);
    }, 150);

    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleResetProgress = () => {
    const isConfirmed = window.confirm('Tüm ilerlemeni sıfırlamak istediğine emin misin? Bu işlem geri alınamaz.');
    if (!isConfirmed) {
      return;
    }

    resetRoadmap();
    setOpenNoteWeekId(null);
    setOpenLinksWeekId(null);
    setActiveMonthId(1);

    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const activeMonth = data.find((month) => month.id === activeMonthId) || data[0];

  return (
    <div className="flex h-[100dvh] bg-slate-950 text-slate-200 font-sans overflow-hidden">
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-slate-800 z-30 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-500 p-1.5 rounded-lg text-white">
            <Map size={20} />
          </div>
          <h1 className="font-bold text-slate-100 leading-tight">Roadmap Tracker</h1>
        </div>
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors"
          aria-label="Menüyü aç"
        >
          <Menu size={24} />
        </button>
      </div>

      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-slate-950/80 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed md:relative z-50 w-72 h-full bg-slate-900 border-r border-slate-800 shadow-xl md:shadow-none flex flex-col transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-500 p-2 rounded-lg text-white">
              <Map size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg text-slate-100 leading-tight">Roadmap Tracker</h1>
              <p className="text-xs text-slate-400">Sosyal Veri Bilimi</p>
            </div>
          </div>
          <button
            type="button"
            className="md:hidden p-2 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Menüyü kapat"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-3">
            Genel Bakış
          </div>

          <button
            type="button"
            onClick={() => handleMonthChange('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
              activeMonthId === 'dashboard'
                ? 'bg-indigo-500/10 text-indigo-400 shadow-sm font-medium'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <Activity size={18} className={activeMonthId === 'dashboard' ? 'text-indigo-400' : 'text-slate-500'} />
            <div className="flex-1 text-left">
              <div className="text-sm truncate">İstatistikler</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleMonthChange('portfolio')}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 mb-4 ${
              activeMonthId === 'portfolio'
                ? 'bg-amber-500/10 text-amber-500 shadow-sm font-medium'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <FolderGit2 size={18} className={activeMonthId === 'portfolio' ? 'text-amber-500' : 'text-slate-500'} />
            <div className="flex-1 text-left">
              <div className="text-sm truncate">Portföyüm</div>
            </div>
          </button>

          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-3">
            Aylar
          </div>

          {data.map((month) => (
            <button
              key={month.id}
              type="button"
              onClick={() => handleMonthChange(month.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                activeMonthId === month.id
                  ? 'bg-indigo-500/10 text-indigo-400 shadow-sm font-medium'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Calendar size={18} className={activeMonthId === month.id ? 'text-indigo-400' : 'text-slate-500'} />
              <div className="flex-1 text-left">
                <div className="text-sm truncate">{getMonthSummaryTitle(month.title)}</div>
              </div>
              <ChevronRight
                size={16}
                className={`transition-all duration-300 ${
                  activeMonthId === month.id ? 'text-indigo-400 opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                }`}
              />
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-900 mt-auto">
          <button
            type="button"
            onClick={handleResetProgress}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg transition-colors duration-200"
          >
            <RefreshCcw size={16} />
            İlerlemeyi Sıfırla
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full relative pt-16 md:pt-0 overflow-hidden">
        <header className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800 px-4 md:px-8 py-4 shrink-0 z-10 sticky top-0 transition-all duration-300">
          <div className="max-w-4xl mx-auto w-full">
            <div className="flex justify-between items-end mb-2">
              <div>
                <h2 className="text-xs md:text-sm font-medium text-slate-400 mb-0.5 md:mb-1">Genel İlerleme</h2>
                <div className="text-xl md:text-2xl font-bold text-slate-100">{progress.percentage}%</div>
              </div>
              <div className="text-xs md:text-sm text-slate-400 font-medium">
                {progress.percentage}% tamamlandı
              </div>
            </div>
            <div className="w-full h-2 md:h-3 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                style={{ width: `${progress.percentage}%` }}
              >
                <div className="absolute inset-0 bg-white/10 -skew-x-12 translate-x-full animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-6 md:p-8 bg-slate-950 relative">
          <Suspense fallback={<SectionFallback />}>
            {activeMonthId === 'dashboard' ? (
              <Dashboard data={data} weeklyNotes={weeklyNotes} weeklyLinks={weeklyLinks} />
            ) : activeMonthId === 'portfolio' ? (
              <Portfolio portfolioData={portfolioData} onSaveGithubLink={handleSaveGithubLink} />
            ) : activeMonth ? (
              <div className={`max-w-4xl mx-auto pb-12 transition-opacity duration-200 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                <div className="mb-6 md:mb-8">
                  <h1 className="text-xl md:text-3xl font-bold text-slate-100 mb-2 md:mb-3 leading-tight">{activeMonth.title}</h1>
                  <p className="text-slate-300 leading-relaxed text-sm md:text-base bg-slate-900 p-4 md:p-5 rounded-xl md:rounded-2xl border border-slate-800 shadow-sm">
                    {activeMonth.overview}
                  </p>
                </div>

                <div className="space-y-4 md:space-y-6">
                  {activeMonth.weeks.map((week) => {
                    const weekStorageKey = getWeekStorageKey(week);
                    const isNoteOpen = openNoteWeekId === weekStorageKey;
                    const hasNote = (weeklyNotes[weekStorageKey] || '').trim().length > 0;
                    const isLinksOpen = openLinksWeekId === weekStorageKey;
                    const hasLinks = (weeklyLinks[weekStorageKey] || []).length > 0;

                    return (
                      <div
                        key={week.id}
                        className="bg-slate-900 rounded-xl md:rounded-2xl border border-slate-800 shadow-sm overflow-hidden transition-all hover:shadow-md hover:border-slate-700 duration-300"
                      >
                        <div className="px-4 md:px-6 py-3 md:py-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] md:text-xs font-bold px-2 py-0.5 md:px-2.5 md:py-1 rounded-md tracking-wide uppercase">
                                {week.title}
                              </span>
                            </div>
                            <h3 className="text-base md:text-lg font-semibold text-slate-200 mt-1.5 md:mt-2 leading-snug">{week.goals}</h3>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                            <button
                              type="button"
                              onClick={() => handleToggleLinks(weekStorageKey)}
                              className={`p-2 rounded-lg transition-all duration-200 ${
                                isLinksOpen || hasLinks
                                  ? 'text-emerald-400 bg-emerald-500/20 border border-emerald-500/30'
                                  : 'text-slate-500 hover:text-emerald-400 hover:bg-slate-800'
                              }`}
                              title={hasLinks ? 'Kaynakları Gör / Düzenle' : 'Kaynak Ekle'}
                              aria-label={hasLinks ? `${week.title} kaynaklarını düzenle` : `${week.title} için kaynak ekle`}
                            >
                              <Bookmark size={18} />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleToggleNote(weekStorageKey)}
                              className={`p-2 rounded-lg transition-all duration-200 ${
                                isNoteOpen || hasNote
                                  ? 'text-indigo-400 bg-indigo-500/20 border border-indigo-500/30'
                                  : 'text-slate-500 hover:text-indigo-400 hover:bg-slate-800'
                              }`}
                              title={hasNote ? 'Notları Gör / Düzenle' : 'Haftalık Not Ekle'}
                              aria-label={hasNote ? `${week.title} notlarını düzenle` : `${week.title} için not ekle`}
                            >
                              <StickyNote size={18} />
                            </button>
                          </div>
                        </div>

                        <div className="p-1 md:p-2 flex flex-col space-y-0.5">
                          {week.todos.map((todo) => (
                            <button
                              key={todo.id}
                              type="button"
                              onClick={() => toggleTodoCompletion(activeMonth.id, week.id, todo.id)}
                              className="flex w-full items-start gap-3 md:gap-4 p-3 md:p-4 text-left hover:bg-slate-800/50 rounded-lg md:rounded-xl transition-all duration-200 cursor-pointer group"
                              aria-pressed={todo.completed}
                            >
                              <span className="mt-[3px] md:mt-0.5 text-slate-500 group-hover:text-indigo-400 transition-colors shrink-0">
                                {todo.completed ? (
                                  <CheckCircle2 size={18} className="text-indigo-500 md:w-[20px] md:h-[20px]" />
                                ) : (
                                  <Circle size={18} className="md:w-[20px] md:h-[20px]" />
                                )}
                              </span>
                              <span className={`${todo.completed ? 'text-slate-500 line-through' : 'text-slate-300'} text-[13px] md:text-sm font-medium leading-relaxed pt-px transition-all duration-200`}>
                                {todo.text}
                              </span>
                            </button>
                          ))}
                        </div>

                        {isNoteOpen && (
                          <div className="px-4 pb-4 md:px-6 md:pb-6 border-t border-slate-800 bg-slate-900/30">
                            <WeeklyNoteEditor
                              weekId={weekStorageKey}
                              initialNote={weeklyNotes[weekStorageKey]}
                              onSave={(id, content) => {
                                setWeeklyNotes((currentValue) => ({
                                  ...currentValue,
                                  [id]: content
                                }));
                              }}
                            />
                          </div>
                        )}

                        {isLinksOpen && (
                          <div className="px-4 pb-4 md:px-6 md:pb-6 border-t border-slate-800 bg-slate-900/30">
                            <WeeklyLinksManager
                              weekId={weekStorageKey}
                              links={weeklyLinks[weekStorageKey]}
                              onAddLink={handleAddLink}
                              onRemoveLink={handleRemoveLink}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {activeMonth.milestones && (
                  <div className="mt-8 md:mt-10 bg-gradient-to-r from-slate-900 to-indigo-950 border border-indigo-900/50 rounded-xl md:rounded-2xl p-5 md:p-6 shadow-sm transition-all hover:shadow-md duration-300">
                    <div className="flex items-center gap-2 mb-3 md:mb-4">
                      <Flag className="text-indigo-400" size={20} />
                      <h3 className="text-lg md:text-xl font-bold text-indigo-200">Ay Sonu Kilometre Taşı</h3>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                      <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4 border border-indigo-900/30 transition-all hover:bg-slate-900 duration-200">
                        <div className="flex items-start gap-2 md:gap-3">
                          <div className="bg-indigo-500/20 p-1.5 md:p-2 rounded-lg shrink-0 mt-0.5">
                            <Award size={16} className="text-indigo-400 md:w-[18px] md:h-[18px]" />
                          </div>
                          <div>
                            <h4 className="text-xs md:text-sm font-bold text-slate-200 mb-0.5 md:mb-1 uppercase tracking-wide">Beklenen Çıktı</h4>
                            <p className="text-[13px] md:text-sm text-slate-400 leading-relaxed font-medium">
                              {activeMonth.milestones.output}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4 border border-indigo-900/30 transition-all hover:bg-slate-900 duration-200">
                        <div className="flex items-start gap-2 md:gap-3">
                          <div className="bg-indigo-500/20 p-1.5 md:p-2 rounded-lg shrink-0 mt-0.5">
                            <CheckCircle2 size={16} className="text-indigo-400 md:w-[18px] md:h-[18px]" />
                          </div>
                          <div>
                            <h4 className="text-xs md:text-sm font-bold text-slate-200 mb-0.5 md:mb-1 uppercase tracking-wide">Başarı Ölçütü</h4>
                            <p className="text-[13px] md:text-sm text-slate-400 leading-relaxed font-medium">
                              {activeMonth.milestones.successCriteria}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </Suspense>
        </div>
      </main>

      <Suspense fallback={null}>
        <Pomodoro />
      </Suspense>
    </div>
  );
}

export default App;
