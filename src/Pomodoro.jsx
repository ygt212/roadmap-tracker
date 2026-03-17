import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain, Timer, Minimize2, Settings, BellOff } from 'lucide-react';

const POMODORO_STORAGE_KEY = 'roadmapPomodoroSettings';

function readSavedDurations() {
  try {
    const rawValue = localStorage.getItem(POMODORO_STORAGE_KEY);
    if (!rawValue) {
      return { workDuration: 25, breakDuration: 5 };
    }

    const parsedValue = JSON.parse(rawValue);
    const workDuration = Number(parsedValue.workDuration);
    const breakDuration = Number(parsedValue.breakDuration);

    return {
      workDuration: Number.isFinite(workDuration) && workDuration > 0 ? workDuration : 25,
      breakDuration: Number.isFinite(breakDuration) && breakDuration > 0 ? breakDuration : 5
    };
  } catch (error) {
    return { workDuration: 25, breakDuration: 5 };
  }
}

export default function Pomodoro() {
  const savedDurations = useMemo(() => readSavedDurations(), []);
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('work');
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [workDuration, setWorkDuration] = useState(savedDurations.workDuration);
  const [breakDuration, setBreakDuration] = useState(savedDurations.breakDuration);
  const durations = useMemo(() => ({
    work: workDuration * 60,
    break: breakDuration * 60
  }), [workDuration, breakDuration]);
  const [timeLeft, setTimeLeft] = useState(savedDurations.workDuration * 60);
  const [isAlarmRinging, setIsAlarmRinging] = useState(false);

  const audioCtxRef = useRef(null);
  const alarmIntervalRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(
      POMODORO_STORAGE_KEY,
      JSON.stringify({ workDuration, breakDuration })
    );
  }, [workDuration, breakDuration]);

  const playBeep = useCallback(() => {
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
  }, []);

  const stopAlarm = useCallback(() => {
    setIsAlarmRinging(false);
    if (alarmIntervalRef.current) {
      clearInterval(alarmIntervalRef.current);
      alarmIntervalRef.current = null;
    }
  }, []);

  const startAlarm = useCallback(() => {
    stopAlarm();
    setIsAlarmRinging(true);
    playBeep();
    alarmIntervalRef.current = setInterval(playBeep, 1000);
  }, [playBeep, stopAlarm]);

  useEffect(() => () => stopAlarm(), [stopAlarm]);

  useEffect(() => {
    if (!isActive) {
      return undefined;
    }

    const timerInterval = setInterval(() => {
      setTimeLeft((currentTime) => {
        if (currentTime <= 1) {
          clearInterval(timerInterval);
          setIsActive(false);
          startAlarm();
          return 0;
        }

        return currentTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [isActive, startAlarm]);

  const handleTabChange = (newMode) => {
    stopAlarm();
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(durations[newMode]);
  };

  const toggleTimer = () => {
    if (isAlarmRinging) {
      stopAlarm();
    }
    setIsActive((currentValue) => !currentValue);
  };

  const resetTimer = () => {
    stopAlarm();
    setIsActive(false);
    setTimeLeft(durations[mode]);
  };

  const handleSaveSettings = (event) => {
    event.preventDefault();
    stopAlarm();
    setIsEditing(false);
    setIsActive(false);
    setTimeLeft(durations[mode]);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
  };

  const isWork = mode === 'work';

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 text-white ${
          isWork ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-900/50' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/50'
        }`}
      >
        <Timer size={24} />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-72 md:w-80 bg-slate-900 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 border ${
      isWork ? 'border-indigo-500/30' : 'border-emerald-500/30'
    }`}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-2">
          <Timer size={18} className={isWork ? 'text-indigo-400' : 'text-emerald-400'} />
          <span className="font-semibold text-slate-200 text-sm">Pomodoro</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsEditing((currentValue) => !currentValue)}
            className={`p-1.5 rounded-lg transition-colors ${isEditing ? 'bg-slate-800 text-slate-200' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
            title="Süre Ayarları"
          >
            <Settings size={16} />
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Minimize2 size={16} />
          </button>
        </div>
      </div>

      <div className="p-5">
        {isEditing ? (
          <form onSubmit={handleSaveSettings} className="space-y-4 animate-in fade-in duration-200">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Odak Süresi (dakika)</label>
              <input
                type="number"
                min="1"
                max="120"
                value={workDuration}
                onChange={(event) => setWorkDuration(Number(event.target.value))}
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
                onChange={(event) => setBreakDuration(Number(event.target.value))}
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
          <div className="animate-in fade-in duration-200">
            <div className="flex p-1 bg-slate-950/80 rounded-xl mb-6 border border-slate-800">
              <button
                type="button"
                onClick={() => handleTabChange('work')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isWork ? 'bg-indigo-500/20 text-indigo-400 shadow-sm border border-indigo-500/20' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <Brain size={16} />
                Odak
              </button>
              <button
                type="button"
                onClick={() => handleTabChange('break')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  !isWork ? 'bg-emerald-500/20 text-emerald-400 shadow-sm border border-emerald-500/20' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <Coffee size={16} />
                Mola
              </button>
            </div>

            <div className="text-center mb-7">
              <div className={`text-5xl font-bold tracking-tight font-mono mb-2 transition-colors duration-300 ${isWork ? 'text-indigo-100' : 'text-emerald-100'}`}>
                {formatTime(timeLeft)}
              </div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                {isWork ? 'ÇALIŞMA SÜRESİ' : 'DİNLENME SÜRESİ'}
              </div>
            </div>

            {isAlarmRinging ? (
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={stopAlarm}
                  className="flex items-center gap-2 bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500 hover:text-white px-6 py-3.5 rounded-2xl shadow-lg transition-all duration-300 animate-pulse w-full justify-center"
                >
                  <BellOff size={20} />
                  <span className="font-semibold tracking-wide">Alarmı Kapat</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={resetTimer}
                  className="p-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 rounded-xl transition-all duration-200"
                  title="Sıfırla"
                >
                  <RotateCcw size={20} />
                </button>

                <button
                  type="button"
                  onClick={toggleTimer}
                  className={`flex items-center justify-center w-14 h-14 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 text-white ${
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
