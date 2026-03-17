import React, { useState, useEffect } from 'react';
import { roadmapData } from './data';
import { Calendar, CheckCircle2, Circle, ChevronRight, Menu, Map, RefreshCcw, Award, Flag, X } from 'lucide-react';

function App() {
  const [activeMonthId, setActiveMonthId] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Local Storage'dan veriyi çek, yoksa varsayılan veriyi kullan.
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('roadmapData');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return roadmapData;
  });

  useEffect(() => {
    localStorage.setItem('roadmapData', JSON.stringify(data));
  }, [data]);

  // Sekme değiştiğinde animasyon tetikle
  const handleMonthChange = (id) => {
    if (id === activeMonthId) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveMonthId(id);
      setIsAnimating(false);
    }, 150);
    // Mobilde menüyü kapat
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleToggleTodo = (monthId, weekId, todoId) => {
    setData(prevData => prevData.map(month => {
      if (month.id !== monthId) return month;
      return {
        ...month,
        weeks: month.weeks.map(week => {
          if (week.id !== weekId) return week;
          return {
            ...week,
            todos: week.todos.map(todo => {
              if (todo.id !== todoId) return todo;
              return { ...todo, completed: !todo.completed };
            })
          };
        })
      };
    }));
  };

  const handleResetProgress = () => {
    const isConfirmed = window.confirm("Tüm ilerlemenizi sıfırlamak istediğinize emin misiniz? Bu işlem geri alınamaz.");
    if (isConfirmed) {
      const resettedData = JSON.parse(JSON.stringify(roadmapData));
      setData(resettedData);
      localStorage.setItem('roadmapData', JSON.stringify(resettedData));
      setActiveMonthId(1);
      if (window.innerWidth < 768) setIsSidebarOpen(false);
    }
  };

  const totalTodos = data.reduce((acc, month) => 
    acc + month.weeks.reduce((wAcc, week) => wAcc + week.todos.length, 0)
  , 0);
  
  const completedTodos = data.reduce((acc, month) => 
    acc + month.weeks.reduce((wAcc, week) => wAcc + week.todos.filter(t => t.completed).length, 0)
  , 0);

  const displayProgress = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;
  const activeMonth = data.find(m => m.id === activeMonthId) || data[0];

  return (
    <div className="flex h-[100dvh] bg-slate-950 text-slate-200 font-sans overflow-hidden">
      
      {/* Mobile Menu Button - Top Header for Mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-slate-800 z-30 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-500 p-1.5 rounded-lg text-white">
            <Map size={20} />
          </div>
          <h1 className="font-bold text-slate-100 leading-tight">Roadmap Tracker</h1>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-slate-950/80 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:relative z-50 w-72 h-full bg-slate-900 border-r border-slate-800 shadow-xl md:shadow-none flex flex-col transition-transform duration-300 ease-in-out \${
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
            className="md:hidden p-2 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-3">
            Aylar
          </div>
          {data.map(month => (
            <button
              key={month.id}
              onClick={() => handleMonthChange(month.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 \${
                activeMonthId === month.id 
                  ? 'bg-indigo-500/10 text-indigo-400 shadow-sm font-medium' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Calendar size={18} className={`transition-colors duration-200 \${activeMonthId === month.id ? 'text-indigo-400' : 'text-slate-500'}`} />
              <div className="flex-1 text-left">
                <div className="text-sm truncate">{month.title.split('—')[0].trim()}</div>
              </div>
              <ChevronRight size={16} className={`transition-all duration-300 \${activeMonthId === month.id ? 'text-indigo-400 opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
            </button>
          ))}
        </nav>

        {/* Reset Button Area */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 mt-auto">
           <button 
             onClick={handleResetProgress}
             className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg transition-colors duration-200"
           >
             <RefreshCcw size={16} />
             İlerlemeyi Sıfırla
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative pt-16 md:pt-0 overflow-hidden">
        
        {/* Top Header & Progress */}
        <header className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800 px-4 md:px-8 py-4 shrink-0 z-10 sticky top-0 transition-all duration-300">
          <div className="max-w-4xl mx-auto w-full">
            <div className="flex justify-between items-end mb-2">
              <div>
                <h2 className="text-xs md:text-sm font-medium text-slate-400 mb-0.5 md:mb-1">Genel İlerleme</h2>
                <div className="text-xl md:text-2xl font-bold text-slate-100">{displayProgress}%</div>
              </div>
              <div className="text-xs md:text-sm text-slate-400 font-medium">
                {displayProgress}% Tamamlandı
              </div>
            </div>
            {/* Progress Bar Container */}
            <div className="w-full h-2 md:h-3 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                style={{ width: `${displayProgress}%` }}
              >
                <div className="absolute inset-0 bg-white/10 -skew-x-12 translate-x-full animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 md:p-8 bg-slate-950">
          <div className={`max-w-4xl mx-auto pb-12 transition-opacity duration-200 \${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            
            {/* Active Month Header */}
            <div className="mb-6 md:mb-8">
              <h1 className="text-xl md:text-3xl font-bold text-slate-100 mb-2 md:mb-3 leading-tight">{activeMonth.title}</h1>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base bg-slate-900 p-4 md:p-5 rounded-xl md:rounded-2xl border border-slate-800 shadow-sm">
                {activeMonth.overview}
              </p>
            </div>

            {/* Weeks Container */}
            <div className="space-y-4 md:space-y-6">
              {activeMonth.weeks.map((week, idx) => (
                <div key={week.id} className="bg-slate-900 rounded-xl md:rounded-2xl border border-slate-800 shadow-sm overflow-hidden transition-all hover:shadow-md hover:border-slate-700 duration-300">
                  {/* Week Header */}
                  <div className="px-4 md:px-6 py-3 md:py-4 border-b border-slate-800 bg-slate-900/50">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] md:text-xs font-bold px-2 py-0.5 md:px-2.5 md:py-1 rounded-md tracking-wide uppercase">
                        {week.title}
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-slate-200 mt-1.5 md:mt-2 leading-snug">{week.goals}</h3>
                  </div>
                  
                  {/* Todos List */}
                  <div className="p-1 md:p-2 flex flex-col space-y-0.5">
                    {week.todos.map(todo => (
                      <div 
                        key={todo.id} 
                        onClick={() => handleToggleTodo(activeMonth.id, week.id, todo.id)}
                        className="flex items-start gap-3 md:gap-4 p-3 md:p-4 hover:bg-slate-800/50 rounded-lg md:rounded-xl transition-all duration-200 cursor-pointer group"
                      >
                        <button className="mt-[3px] md:mt-0.5 text-slate-500 group-hover:text-indigo-400 transition-colors shrink-0">
                          {todo.completed ? (
                            <CheckCircle2 size={18} className="text-indigo-500 md:w-[20px] md:h-[20px]" />
                          ) : (
                            <Circle size={18} className="md:w-[20px] md:h-[20px]" />
                          )}
                        </button>
                        <span className={`\${todo.completed ? 'text-slate-500 line-through' : 'text-slate-300'} text-[13px] md:text-sm font-medium leading-relaxed pt-px transition-all duration-200`}>
                          {todo.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Milestone / Ay Sonu Çıktısı Kartı */}
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
        </div>
      </main>

    </div>
  );
}

export default App;
