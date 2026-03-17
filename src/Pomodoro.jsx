import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain, Timer, Minimize2, Settings, BellOff } from 'lucide-react';

export default function Pomodoro() {
  const [isOpen, setIsOpen] = useState(false); // Default hep kapalı (ikon) olsun
  const [mode, setMode] = useState('work'); // 'work' | 'break'
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Ayarlar menüsü

  // Kullanıcının değiştirebileceği default süreler (dakika cinsinden)
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  const [timeLeft, setTimeLeft] = useState(workDuration * 60);
  const [isAlarmRinging, setIsAlarmRinging] = useState(false);

  // Ses sistemi için referanslar
  const audioCtxRef = useRef(null);
  const intervalRef = useRef(null);

  const playBeep = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const oscillator = audioCtxRef.current.createOscillator();
    const gainNode = audioCtxRef.current.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioCtxRef.current.currentTime);
    
    gainNode.gain.setValueAtTime(1, audioCtxRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.5);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtxRef.current.destination);
    
    oscillator.start();
    oscillator.stop(audioCtxRef.current.currentTime + 0.5);
  };

  const startAlarm = () => {
    setIsAlarmRinging(true);
    playBeep(); // İlk beep hemen çalsın
    intervalRef.current = setInterval(playBeep, 1000); // Saniyede bir tekrar et
  };

  const stopAlarm = () => {
    setIsAlarmRinging(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Bileşen unmount olunca alarmı kapat
  useEffect(() => {
    return () => stopAlarm();
  }, []);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Süre bittiğinde otomatik durdur ve alarmı çal
      setIsActive(false);
      startAlarm();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Mod veya ayarlar değiştiğinde sayacı güncelle (eğer zamanlayıcı çalışmıyorsa)
  useEffect(() => {
    if (!isActive) {
      setTimeLeft(mode === 'work' ? workDuration * 60 : breakDuration * 60);
    }
  }, [mode, workDuration, breakDuration]);

  const handleTabChange = (newMode) => {
    stopAlarm();
    setMode(newMode);
  };

  const toggleTimer = () => {
    if (isAlarmRinging) stopAlarm();
    setIsActive(!isActive);
  };
  
  const resetTimer = () => {
    stopAlarm();
    setIsActive(false);
    setTimeLeft(mode === 'work' ? workDuration * 60 : breakDuration * 60);
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    stopAlarm();
    setIsEditing(false);
    // Kaydettikten sonra süreyi yeni ayarlarla sıfırla
    setIsActive(false);
    setTimeLeft(mode === 'work' ? workDuration * 60 : breakDuration * 60);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const isWork = mode === 'work';

  // Kapalı (Minimize) Görünüm
  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 text-white \${
          isWork ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-900/50' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/50'
        }`}
      >
        <Timer size={24} />
      </button>
    );
  }

  // Açık (Maximize) Görünüm
  return (
    <div className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-72 md:w-80 bg-slate-900 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 border \${
      isWork ? 'border-indigo-500/30' : 'border-emerald-500/30'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-2">
           <Timer size={18} className={isWork ? 'text-indigo-400' : 'text-emerald-400'} />
           <span className="font-semibold text-slate-200 text-sm">Pomodoro Timer</span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={`p-1.5 rounded-lg transition-colors \${isEditing ? 'bg-slate-800 text-slate-200' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
            title="Süre Ayarları"
          >
            <Settings size={16} />
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Minimize2 size={16} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        {isEditing ? (
          /* Ayarlar (Settings) Görünümü */
          <form onSubmit={handleSaveSettings} className="space-y-4 animate-in fade-in duration-200">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Odak Süresi (dakika)</label>
              <input 
                type="number" 
                min="1" 
                max="120"
                value={workDuration}
                onChange={(e) => setWorkDuration(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-indigo-500 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Mola Süresi (dakika)</label>
              <input 
                type="number" 
                min="1" 
                max="60"
                value={breakDuration}
                onChange={(e) => setBreakDuration(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500 transition-colors"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm py-2.5 rounded-lg transition-colors mt-2"
            >
              Kaydet
            </button>
          </form>
        ) : (
          /* Normal Zamanlayıcı Görünümü */
          <div className="animate-in fade-in duration-200">
            {/* Mode Tabs */}
            <div className="flex p-1 bg-slate-950/80 rounded-xl mb-6 border border-slate-800">
              <button
                onClick={() => handleTabChange('work')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all duration-200 \${
                  isWork ? 'bg-indigo-500/20 text-indigo-400 shadow-sm border border-indigo-500/20' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <Brain size={16} />
                Odak
              </button>
              <button
                onClick={() => handleTabChange('break')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all duration-200 \${
                  !isWork ? 'bg-emerald-500/20 text-emerald-400 shadow-sm border border-emerald-500/20' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <Coffee size={16} />
                Mola
              </button>
            </div>

            {/* Timer Display */}
            <div className="text-center mb-7">
              <div className={`text-5xl font-bold tracking-tight font-mono mb-2 transition-colors duration-300 \${isWork ? 'text-indigo-100' : 'text-emerald-100'}`}>
                {formatTime(timeLeft)}
              </div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                {isWork ? 'ÇALIŞMA SÜRESİ' : 'DİNLENME SÜRESİ'}
              </div>
            </div>

            {/* Controls */}
            {isAlarmRinging ? (
              <div className="flex items-center justify-center">
                <button 
                  onClick={stopAlarm}
                  className="flex items-center gap-2 bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500 hover:text-white px-6 py-3.5 rounded-2xl shadow-lg transition-all duration-300 animate-pulse w-full justify-center"
                >
                  <BellOff size={20} />
                  <span className="font-semibold tracking-wide">ALARM'I KAPAT</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-4">
                <button 
                  onClick={resetTimer}
                  className="p-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 rounded-xl transition-all duration-200"
                  title="Sıfırla"
                >
                  <RotateCcw size={20} />
                </button>
                
                <button 
                  onClick={toggleTimer}
                  className={`flex items-center justify-center w-14 h-14 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 text-white \${
                    isWork 
                      ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-900/40' 
                      : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/40'
                  }`}
                >
                  {isActive ? <Pause size={24} className="fill-current" /> : <Play size={24} className="fill-current ml-1" />}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
