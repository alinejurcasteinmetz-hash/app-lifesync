'use client';

import { useState, useEffect } from 'react';
import { 
  Home, Calendar, Target, TrendingUp, Book, Heart, 
  Clock, Sun, Moon, Zap, Smile, CheckCircle, 
  ChevronRight, Play, Pause, RotateCcw, Plus,
  Award, Flame, Star, Activity, Droplet, Dumbbell,
  Brain, Coffee, X, Check, ArrowLeft, User, Bell,
  Palette, AlertCircle, Shield
} from 'lucide-react';

type Screen = 
  | 'welcome' 
  | 'dashboard' 
  | 'checkin-morning' 
  | 'checkin-night' 
  | 'pomodoro' 
  | 'mood-diary'
  | 'agenda'
  | 'reading'
  | 'health'
  | 'routine-creator'
  | 'tasks'
  | 'reports'
  | 'goals'
  | 'progress'
  | 'profile';

interface Goal {
  id: number;
  title: string;
  progress: number;
  current: number;
  total: number;
}

interface RoutineActivity {
  id: number;
  time: string;
  activity: string;
  icon: any;
}

interface AgendaTask {
  id: number;
  task: string;
  time: string;
  status: 'completed' | 'in-progress' | 'pending';
}

export default function LifeSync() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [showWelcome, setShowWelcome] = useState(true);

  // Pomodoro Timer State
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState<'focus' | 'break'>('focus');

  // Mood Diary State
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [moodNote, setMoodNote] = useState('');

  // Check-in States
  const [sleepQuality, setSleepQuality] = useState(5);
  const [energyLevel, setEnergyLevel] = useState(5);
  const [focusGoal, setFocusGoal] = useState('');
  const [achievements, setAchievements] = useState('');
  const [gratitude, setGratitude] = useState('');

  // Reading State
  const [pagesRead, setPagesRead] = useState(0);
  const [dailyGoal] = useState(30);

  // Health State
  const [waterIntake, setWaterIntake] = useState(0);
  const [workoutDone, setWorkoutDone] = useState(false);

  // Tasks State
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Finalizar relatório mensal', priority: 'high', completed: false },
    { id: 2, title: 'Revisar pull requests', priority: 'medium', completed: false },
    { id: 3, title: 'Organizar emails', priority: 'low', completed: false },
  ]);

  // Goals State
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, title: 'Meditar 30 dias seguidos', progress: 75, current: 23, total: 30 },
    { id: 2, title: 'Exercitar 4x por semana', progress: 50, current: 2, total: 4 },
    { id: 3, title: 'Aprender novo idioma', progress: 30, current: 30, total: 100 },
  ]);

  // Routine Activities State
  const [morningRoutine, setMorningRoutine] = useState<RoutineActivity[]>([
    { id: 1, time: '06:00', activity: 'Acordar', icon: Sun },
    { id: 2, time: '06:15', activity: 'Meditação', icon: Brain },
    { id: 3, time: '06:30', activity: 'Exercícios', icon: Dumbbell },
    { id: 4, time: '07:00', activity: 'Café da manhã', icon: Coffee },
  ]);

  const [nightRoutine, setNightRoutine] = useState<RoutineActivity[]>([
    { id: 1, time: '21:00', activity: 'Jantar leve', icon: Coffee },
    { id: 2, time: '21:30', activity: 'Leitura', icon: Book },
    { id: 3, time: '22:00', activity: 'Preparar para dormir', icon: Moon },
  ]);

  // Agenda State
  const [agendaTasks, setAgendaTasks] = useState<AgendaTask[]>([
    { id: 1, task: 'Reunião com equipe', time: '09:00 - 10:00', status: 'completed' },
    { id: 2, task: 'Desenvolver feature X', time: '10:00 - 12:00', status: 'in-progress' },
    { id: 3, task: 'Almoço', time: '12:00 - 13:00', status: 'pending' },
    { id: 4, task: 'Code review', time: '13:00 - 14:00', status: 'pending' },
  ]);

  // Profile Settings State
  const [notifications, setNotifications] = useState(true);
  const [darkTheme, setDarkTheme] = useState(true);
  const [reminders, setReminders] = useState(true);

  // Modal States
  const [showNewGoalModal, setShowNewGoalModal] = useState(false);
  const [showNewActivityModal, setShowNewActivityModal] = useState(false);
  const [showNewAgendaTaskModal, setShowNewAgendaTaskModal] = useState(false);
  const [activityType, setActivityType] = useState<'morning' | 'night'>('morning');

  // Form States
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalTotal, setNewGoalTotal] = useState('');
  const [newActivityTime, setNewActivityTime] = useState('');
  const [newActivityName, setNewActivityName] = useState('');
  const [newAgendaTask, setNewAgendaTask] = useState('');
  const [newAgendaTime, setNewAgendaTime] = useState('');

  // Pomodoro Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime(prev => prev - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      setIsRunning(false);
      if (pomodoroMode === 'focus') {
        setPomodoroMode('break');
        setPomodoroTime(5 * 60);
      } else {
        setPomodoroMode('focus');
        setPomodoroTime(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, pomodoroTime, pomodoroMode]);

  // Welcome Screen Auto-hide
  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
        setCurrentScreen('dashboard');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Add New Goal
  const handleAddGoal = () => {
    if (newGoalTitle.trim() && newGoalTotal) {
      const newGoal: Goal = {
        id: goals.length + 1,
        title: newGoalTitle,
        progress: 0,
        current: 0,
        total: parseInt(newGoalTotal),
      };
      setGoals([...goals, newGoal]);
      setNewGoalTitle('');
      setNewGoalTotal('');
      setShowNewGoalModal(false);
    }
  };

  // Add New Activity
  const handleAddActivity = () => {
    if (newActivityTime.trim() && newActivityName.trim()) {
      const newActivity: RoutineActivity = {
        id: activityType === 'morning' ? morningRoutine.length + 1 : nightRoutine.length + 1,
        time: newActivityTime,
        activity: newActivityName,
        icon: Zap,
      };
      
      if (activityType === 'morning') {
        setMorningRoutine([...morningRoutine, newActivity]);
      } else {
        setNightRoutine([...nightRoutine, newActivity]);
      }
      
      setNewActivityTime('');
      setNewActivityName('');
      setShowNewActivityModal(false);
    }
  };

  // Remove Activity
  const handleRemoveActivity = (id: number, type: 'morning' | 'night') => {
    if (type === 'morning') {
      setMorningRoutine(morningRoutine.filter(activity => activity.id !== id));
    } else {
      setNightRoutine(nightRoutine.filter(activity => activity.id !== id));
    }
  };

  // Add Agenda Task
  const handleAddAgendaTask = () => {
    if (newAgendaTask.trim() && newAgendaTime.trim()) {
      const newTask: AgendaTask = {
        id: agendaTasks.length + 1,
        task: newAgendaTask,
        time: newAgendaTime,
        status: 'pending',
      };
      setAgendaTasks([...agendaTasks, newTask]);
      setNewAgendaTask('');
      setNewAgendaTime('');
      setShowNewAgendaTaskModal(false);
    }
  };

  // Bottom Navigation Component
  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0D0D0D]/95 backdrop-blur-lg border-t border-purple-500/20 p-4">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <button 
          onClick={() => setCurrentScreen('dashboard')}
          className="flex flex-col items-center space-y-1"
        >
          <Home className={currentScreen === 'dashboard' ? 'text-purple-400' : 'text-gray-500'} size={24} />
          <span className={`text-xs ${currentScreen === 'dashboard' ? 'text-purple-400' : 'text-gray-500'}`}>Início</span>
        </button>
        <button 
          onClick={() => setCurrentScreen('goals')}
          className="flex flex-col items-center space-y-1"
        >
          <Target className={currentScreen === 'goals' ? 'text-purple-400' : 'text-gray-500'} size={24} />
          <span className={`text-xs ${currentScreen === 'goals' ? 'text-purple-400' : 'text-gray-500'}`}>Metas</span>
        </button>
        <button 
          onClick={() => setCurrentScreen('progress')}
          className="flex flex-col items-center space-y-1"
        >
          <Activity className={currentScreen === 'progress' ? 'text-purple-400' : 'text-gray-500'} size={24} />
          <span className={`text-xs ${currentScreen === 'progress' ? 'text-purple-400' : 'text-gray-500'}`}>Progresso</span>
        </button>
        <button 
          onClick={() => setCurrentScreen('profile')}
          className="flex flex-col items-center space-y-1"
        >
          <User className={currentScreen === 'profile' ? 'text-purple-400' : 'text-gray-500'} size={24} />
          <span className={`text-xs ${currentScreen === 'profile' ? 'text-purple-400' : 'text-gray-500'}`}>Perfil</span>
        </button>
      </div>
    </div>
  );

  // Welcome Screen
  if (showWelcome && currentScreen === 'welcome') {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-6">
        <div className="text-center animate-fade-in">
          <div className="mb-8 inline-block">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#9C27B0] to-[#4A148C] flex items-center justify-center animate-pulse">
              <Zap className="text-white" size={48} />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 font-['Poppins']">
            Life<span className="bg-gradient-to-r from-[#9C27B0] to-[#4A148C] bg-clip-text text-transparent">Sync</span>
          </h1>
          <p className="text-gray-400 text-lg font-['Inter']">Sincronize sua vida, alcance seus objetivos</p>
        </div>
      </div>
    );
  }

  // Dashboard Screen
  if (currentScreen === 'dashboard') {
    return (
      <div className="min-h-screen bg-[#0D0D0D] pb-24">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#9C27B0] to-[#4A148C] p-6 rounded-b-3xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white font-['Poppins']">LifeSync</h1>
              <p className="text-purple-200 text-sm">Bem-vindo de volta!</p>
            </div>
            <div className="flex items-center space-x-2">
              <Flame className="text-orange-400" size={24} />
              <span className="text-white font-bold text-xl">7</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setCurrentScreen('checkin-morning')}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all"
            >
              <Sun className="text-yellow-400 mb-2" size={24} />
              <p className="text-white text-sm font-medium">Check-in Matinal</p>
            </button>
            <button 
              onClick={() => setCurrentScreen('checkin-night')}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all"
            >
              <Moon className="text-blue-400 mb-2" size={24} />
              <p className="text-white text-sm font-medium">Check-in Noturno</p>
            </button>
            <button 
              onClick={() => setCurrentScreen('pomodoro')}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all"
            >
              <Clock className="text-purple-400 mb-2" size={24} />
              <p className="text-white text-sm font-medium">Pomodoro</p>
            </button>
            <button 
              onClick={() => setCurrentScreen('mood-diary')}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all"
            >
              <Smile className="text-pink-400 mb-2" size={24} />
              <p className="text-white text-sm font-medium">Diário de Humor</p>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-2xl p-4 border border-purple-500/20">
              <Target className="text-purple-400 mb-2" size={24} />
              <p className="text-2xl font-bold text-white">12/15</p>
              <p className="text-gray-400 text-sm">Tarefas Completas</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-purple-500/20">
              <TrendingUp className="text-green-400 mb-2" size={24} />
              <p className="text-2xl font-bold text-white">87%</p>
              <p className="text-gray-400 text-sm">Produtividade</p>
            </div>
          </div>

          {/* Foco do Dia */}
          <div className="bg-white/5 rounded-2xl p-5 border border-purple-500/20">
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <Brain className="text-purple-400 mr-2" size={20} />
              Foco do Dia
            </h3>
            <p className="text-gray-300">Finalizar apresentação do projeto Q4</p>
          </div>

          {/* Saúde & Bem-estar */}
          <div 
            onClick={() => setCurrentScreen('health')}
            className="bg-white/5 rounded-2xl p-5 border border-purple-500/20 cursor-pointer hover:bg-white/10 transition-colors"
          >
            <h3 className="text-white font-semibold mb-4 flex items-center justify-between">
              <span className="flex items-center">
                <Heart className="text-red-400 mr-2" size={20} />
                Saúde & Bem-estar
              </span>
              <ChevronRight className="text-gray-500" size={20} />
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <Droplet className="text-blue-400 mx-auto mb-1" size={20} />
                <p className="text-white text-sm font-medium">1.5L</p>
                <p className="text-gray-500 text-xs">Água</p>
              </div>
              <div className="text-center">
                <Dumbbell className="text-orange-400 mx-auto mb-1" size={20} />
                <p className="text-white text-sm font-medium">45min</p>
                <p className="text-gray-500 text-xs">Treino</p>
              </div>
              <div className="text-center">
                <Moon className="text-purple-400 mx-auto mb-1" size={20} />
                <p className="text-white text-sm font-medium">7.5h</p>
                <p className="text-gray-500 text-xs">Sono</p>
              </div>
            </div>
          </div>

          {/* Rotina de Leitura */}
          <div 
            onClick={() => setCurrentScreen('reading')}
            className="bg-white/5 rounded-2xl p-5 border border-purple-500/20 cursor-pointer hover:bg-white/10 transition-colors"
          >
            <h3 className="text-white font-semibold mb-3 flex items-center justify-between">
              <span className="flex items-center">
                <Book className="text-yellow-400 mr-2" size={20} />
                Rotina de Leitura
              </span>
              <ChevronRight className="text-gray-500" size={20} />
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">23/30</p>
                <p className="text-gray-400 text-sm">páginas hoje</p>
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-purple-500 flex items-center justify-center">
                <span className="text-white font-bold">77%</span>
              </div>
            </div>
          </div>

          {/* Conquistas */}
          <div className="bg-white/5 rounded-2xl p-5 border border-purple-500/20">
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Award className="text-yellow-400 mr-2" size={20} />
              Conquistas Recentes
            </h3>
            <div className="flex space-x-3">
              {[1, 2, 3, 4].map((badge) => (
                <div key={badge} className="w-14 h-14 rounded-full bg-gradient-to-br from-[#9C27B0] to-[#4A148C] flex items-center justify-center">
                  <Star className="text-white" size={24} />
                </div>
              ))}
            </div>
          </div>

          {/* More Options */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button 
              onClick={() => setCurrentScreen('agenda')}
              className="bg-white/5 rounded-2xl p-4 border border-purple-500/20 hover:bg-white/10 transition-colors"
            >
              <Calendar className="text-blue-400 mb-2" size={24} />
              <p className="text-white text-sm font-medium">Agenda</p>
            </button>
            <button 
              onClick={() => setCurrentScreen('routine-creator')}
              className="bg-white/5 rounded-2xl p-4 border border-purple-500/20 hover:bg-white/10 transition-colors"
            >
              <Zap className="text-purple-400 mb-2" size={24} />
              <p className="text-white text-sm font-medium">Criar Rotina</p>
            </button>
            <button 
              onClick={() => setCurrentScreen('tasks')}
              className="bg-white/5 rounded-2xl p-4 border border-purple-500/20 hover:bg-white/10 transition-colors"
            >
              <CheckCircle className="text-green-400 mb-2" size={24} />
              <p className="text-white text-sm font-medium">Tarefas</p>
            </button>
            <button 
              onClick={() => setCurrentScreen('reports')}
              className="bg-white/5 rounded-2xl p-4 border border-purple-500/20 hover:bg-white/10 transition-colors"
            >
              <Activity className="text-orange-400 mb-2" size={24} />
              <p className="text-white text-sm font-medium">Relatórios</p>
            </button>
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }

  // Check-in Matinal Screen
  if (currentScreen === 'checkin-morning') {
    return (
      <div className="min-h-screen bg-[#0D0D0D] p-6 pb-24">
        <button 
          onClick={() => setCurrentScreen('dashboard')}
          className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Voltar
        </button>

        <div className="bg-gradient-to-br from-[#9C27B0] to-[#4A148C] rounded-3xl p-6 mb-6">
          <Sun className="text-yellow-400 mb-4" size={48} />
          <h1 className="text-3xl font-bold text-white mb-2">Bom dia!</h1>
          <p className="text-purple-200">Como você está se sentindo hoje?</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-white font-medium mb-3 block">Qualidade do Sono</label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={sleepQuality}
              onChange={(e) => setSleepQuality(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>Péssimo</span>
              <span className="text-purple-400 font-bold">{sleepQuality}/10</span>
              <span>Excelente</span>
            </div>
          </div>

          <div>
            <label className="text-white font-medium mb-3 block">Nível de Energia</label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={energyLevel}
              onChange={(e) => setEnergyLevel(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>Baixo</span>
              <span className="text-purple-400 font-bold">{energyLevel}/10</span>
              <span>Alto</span>
            </div>
          </div>

          <div>
            <label className="text-white font-medium mb-3 block">Foco Principal do Dia</label>
            <textarea 
              value={focusGoal}
              onChange={(e) => setFocusGoal(e.target.value)}
              placeholder="O que você quer conquistar hoje?"
              className="w-full bg-white/5 border border-purple-500/20 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 resize-none"
              rows={3}
            />
          </div>

          <button 
            onClick={() => setCurrentScreen('dashboard')}
            className="w-full bg-gradient-to-r from-[#9C27B0] to-[#4A148C] text-white font-semibold py-4 rounded-2xl hover:opacity-90 transition-opacity"
          >
            Salvar Check-in
          </button>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Check-in Noturno Screen
  if (currentScreen === 'checkin-night') {
    return (
      <div className="min-h-screen bg-[#0D0D0D] p-6 pb-24">
        <button 
          onClick={() => setCurrentScreen('dashboard')}
          className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Voltar
        </button>

        <div className="bg-gradient-to-br from-[#4A148C] to-[#1A237E] rounded-3xl p-6 mb-6">
          <Moon className="text-blue-400 mb-4" size={48} />
          <h1 className="text-3xl font-bold text-white mb-2">Boa noite!</h1>
          <p className="text-blue-200">Vamos refletir sobre o seu dia</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-white font-medium mb-3 block">Principais Conquistas</label>
            <textarea 
              value={achievements}
              onChange={(e) => setAchievements(e.target.value)}
              placeholder="O que você conquistou hoje?"
              className="w-full bg-white/5 border border-purple-500/20 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 resize-none"
              rows={3}
            />
          </div>

          <div>
            <label className="text-white font-medium mb-3 block">Gratidão do Dia</label>
            <textarea 
              value={gratitude}
              onChange={(e) => setGratitude(e.target.value)}
              placeholder="Pelo que você é grato hoje?"
              className="w-full bg-white/5 border border-purple-500/20 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 resize-none"
              rows={3}
            />
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-purple-500/20">
            <h3 className="text-white font-medium mb-3">Resumo do Dia</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Tarefas completadas</span>
                <span className="text-white font-semibold">12/15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tempo focado</span>
                <span className="text-white font-semibold">6h 30min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Produtividade</span>
                <span className="text-green-400 font-semibold">87%</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setCurrentScreen('dashboard')}
            className="w-full bg-gradient-to-r from-[#4A148C] to-[#1A237E] text-white font-semibold py-4 rounded-2xl hover:opacity-90 transition-opacity"
          >
            Finalizar Dia
          </button>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Pomodoro Screen
  if (currentScreen === 'pomodoro') {
    return (
      <div className="min-h-screen bg-[#0D0D0D] p-6 pb-24">
        <button 
          onClick={() => setCurrentScreen('dashboard')}
          className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Voltar
        </button>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">Timer Pomodoro</h1>
          <p className="text-gray-400">
            {pomodoroMode === 'focus' ? 'Tempo de Foco' : 'Tempo de Pausa'}
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="relative w-64 h-64">
            <svg className="transform -rotate-90 w-64 h-64">
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="rgba(156, 39, 176, 0.2)"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 120}`}
                strokeDashoffset={`${2 * Math.PI * 120 * (1 - pomodoroTime / (pomodoroMode === 'focus' ? 25 * 60 : 5 * 60))}`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9C27B0" />
                  <stop offset="100%" stopColor="#4A148C" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold text-white">{formatTime(pomodoroTime)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-[#9C27B0] to-[#4A148C] flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            {isRunning ? <Pause className="text-white" size={28} /> : <Play className="text-white ml-1" size={28} />}
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              setPomodoroTime(pomodoroMode === 'focus' ? 25 * 60 : 5 * 60);
            }}
            className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <RotateCcw className="text-white" size={24} />
          </button>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
          <h3 className="text-white font-semibold mb-4">Estatísticas de Hoje</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-white mb-1">4</p>
              <p className="text-gray-400 text-sm">Pomodoros</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white mb-1">2h</p>
              <p className="text-gray-400 text-sm">Tempo Focado</p>
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Mood Diary Screen
  if (currentScreen === 'mood-diary') {
    const moods = [
      { emoji: '😊', label: 'Feliz', color: 'from-yellow-400 to-orange-400' },
      { emoji: '😌', label: 'Calmo', color: 'from-blue-400 to-cyan-400' },
      { emoji: '😔', label: 'Triste', color: 'from-gray-400 to-gray-600' },
      { emoji: '😤', label: 'Estressado', color: 'from-red-400 to-orange-600' },
      { emoji: '😴', label: 'Cansado', color: 'from-purple-400 to-indigo-600' },
      { emoji: '🤩', label: 'Motivado', color: 'from-pink-400 to-purple-600' },
    ];

    return (
      <div className="min-h-screen bg-[#0D0D0D] p-6 pb-24">
        <button 
          onClick={() => setCurrentScreen('dashboard')}
          className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Voltar
        </button>

        <div className="text-center mb-8">
          <Smile className="text-pink-400 mx-auto mb-4" size={48} />
          <h1 className="text-3xl font-bold text-white mb-2">Como você está?</h1>
          <p className="text-gray-400">Registre seu humor e receba sugestões personalizadas</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {moods.map((mood) => (
            <button
              key={mood.label}
              onClick={() => setSelectedMood(mood.label)}
              className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-all ${
                selectedMood === mood.label
                  ? `bg-gradient-to-br ${mood.color} scale-105`
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <span className="text-4xl mb-2">{mood.emoji}</span>
              <span className="text-white text-sm font-medium">{mood.label}</span>
            </button>
          ))}
        </div>

        {selectedMood && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="text-white font-medium mb-3 block">O que está acontecendo?</label>
              <textarea 
                value={moodNote}
                onChange={(e) => setMoodNote(e.target.value)}
                placeholder="Compartilhe seus pensamentos..."
                className="w-full bg-white/5 border border-purple-500/20 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 resize-none"
                rows={4}
              />
            </div>

            <div className="bg-gradient-to-br from-[#9C27B0]/20 to-[#4A148C]/20 rounded-2xl p-5 border border-purple-500/30">
              <h3 className="text-white font-semibold mb-3 flex items-center">
                <Zap className="text-yellow-400 mr-2" size={20} />
                Sugestões para você
              </h3>
              <ul className="space-y-2">
                <li className="text-gray-300 flex items-start">
                  <Check className="text-green-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Faça uma pausa de 10 minutos</span>
                </li>
                <li className="text-gray-300 flex items-start">
                  <Check className="text-green-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Pratique respiração profunda</span>
                </li>
                <li className="text-gray-300 flex items-start">
                  <Check className="text-green-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Ouça uma música relaxante</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => setCurrentScreen('dashboard')}
              className="w-full bg-gradient-to-r from-[#9C27B0] to-[#4A148C] text-white font-semibold py-4 rounded-2xl hover:opacity-90 transition-opacity"
            >
              Salvar Registro
            </button>
          </div>
        )}
        <BottomNav />
      </div>
    );
  }

  // Agenda Screen
  if (currentScreen === 'agenda') {
    return (
      <div className="min-h-screen bg-[#0D0D0D] p-6 pb-24">
        <button 
          onClick={() => setCurrentScreen('dashboard')}
          className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Voltar
        </button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Agenda em Tempo Real</h1>
          <p className="text-gray-400">Monitore seu tempo e produtividade</p>
        </div>

        <div className="bg-gradient-to-br from-[#9C27B0] to-[#4A148C] rounded-2xl p-6 mb-6">
          <div className="text-center">
            <p className="text-purple-200 text-sm mb-2">Tempo na tarefa atual</p>
            <p className="text-5xl font-bold text-white mb-4">01:23:45</p>
            <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full transition-colors">
              Pausar
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold">Tarefas de Hoje</h2>
            <button 
              onClick={() => setShowNewAgendaTaskModal(true)}
              className="bg-gradient-to-r from-[#9C27B0] to-[#4A148C] text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity flex items-center"
            >
              <Plus size={18} className="mr-1" />
              Adicionar
            </button>
          </div>
          
          {agendaTasks.map((item) => (
            <div key={item.id} className="bg-white/5 rounded-xl p-4 border border-purple-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    item.status === 'completed' ? 'bg-green-500' :
                    item.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}></div>
                  <div>
                    <h4 className="font-medium text-white">{item.task}</h4>
                    <p className="text-sm text-gray-400">{item.time}</p>
                  </div>
                </div>
                {item.status === 'in-progress' && (
                  <Clock className="text-yellow-400 animate-pulse" size={20} />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Nova Tarefa Agenda */}
        {showNewAgendaTaskModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50">
            <div className="bg-[#1A1A1A] rounded-3xl p-6 w-full max-w-md border border-purple-500/30">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Nova Tarefa</h2>
                <button 
                  onClick={() => setShowNewAgendaTaskModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">Nome da Tarefa</label>
                  <input 
                    type="text"
                    value={newAgendaTask}
                    onChange={(e) => setNewAgendaTask(e.target.value)}
                    placeholder="Ex: Reunião com cliente"
                    className="w-full bg-white/5 border border-purple-500/20 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Horário</label>
                  <input 
                    type="text"
                    value={newAgendaTime}
                    onChange={(e) => setNewAgendaTime(e.target.value)}
                    placeholder="Ex: 14:00 - 15:00"
                    className="w-full bg-white/5 border border-purple-500/20 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                  />
                </div>

                <button 
                  onClick={handleAddAgendaTask}
                  className="w-full bg-gradient-to-r from-[#9C27B0] to-[#4A148C] text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Adicionar Tarefa
                </button>
              </div>
            </div>
          </div>
        )}

        <BottomNav />
      </div>
    );
  }

  // Reading Screen
  if (currentScreen === 'reading') {
    return (
      <div className="min-h-screen bg-[#0D0D0D] p-6 pb-24">
        <button 
          onClick={() => setCurrentScreen('dashboard')}
          className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Voltar
        </button>

        <div className="mb-6">
          <Book className="text-yellow-400 mb-4" size={48} />
          <h1 className="text-3xl font-bold text-white mb-2">Rotina de Leitura</h1>
          <p className="text-gray-400">Acompanhe seu progresso diário</p>
        </div>

        <div className="bg-gradient-to-br from-[#9C27B0] to-[#4A148C] rounded-2xl p-6 mb-6">
          <div className="text-center mb-4">
            <p className="text-purple-200 text-sm mb-2">Meta Diária</p>
            <p className="text-5xl font-bold text-white">{pagesRead}/{dailyGoal}</p>
            <p className="text-purple-200 text-sm mt-1">páginas</p>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 mb-4">
            <div 
              className="bg-white rounded-full h-3 transition-all duration-500"
              style={{ width: `${(pagesRead / dailyGoal) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-center space-x-3">
            <button 
              onClick={() => setPagesRead(Math.max(0, pagesRead - 1))}
              className="bg-white/20 hover:bg-white/30 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors"
            >
              -
            </button>
            <button 
              onClick={() => setPagesRead(Math.min(dailyGoal, pagesRead + 1))}
              className="bg-white/20 hover:bg-white/30 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors"
            >
              +
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white/5 rounded-2xl p-5 border border-purple-500/20">
            <h3 className="text-white font-semibold mb-3">Estatísticas</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold text-white">7</p>
                <p className="text-gray-400 text-sm">Dias seguidos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">156</p>
                <p className="text-gray-400 text-sm">Páginas esta semana</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-purple-500/20">
            <h3 className="text-white font-semibold mb-3">Livro Atual</h3>
            <p className="text-gray-300 mb-2">Atomic Habits - James Clear</p>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-gradient-to-r from-[#9C27B0] to-[#4A148C] rounded-full h-2 w-2/3"></div>
            </div>
            <p className="text-gray-400 text-sm mt-2">67% completo</p>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Health Screen
  if (currentScreen === 'health') {
    return (
      <div className="min-h-screen bg-[#0D0D0D] p-6 pb-24">
        <button 
          onClick={() => setCurrentScreen('dashboard')}
          className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Voltar
        </button>

        <div className="mb-6">
          <Heart className="text-red-400 mb-4" size={48} />
          <h1 className="text-3xl font-bold text-white mb-2">Plano de Saúde</h1>
          <p className="text-gray-400">Cuide do seu corpo e mente</p>
        </div>

        <div className="space-y-4">
          <div className="bg-white/5 rounded-2xl p-5 border border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Droplet className="text-blue-400 mr-3" size={24} />
                <div>
                  <h3 className="text-white font-semibold">Hidratação</h3>
                  <p className="text-gray-400 text-sm">{waterIntake}/8 copos</p>
                </div>
              </div>
              <button 
                onClick={() => setWaterIntake(Math.min(8, waterIntake + 1))}
                className="bg-blue-500 hover:bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-blue-500 rounded-full h-2 transition-all duration-500"
                style={{ width: `${(waterIntake / 8) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-purple-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Dumbbell className="text-orange-400 mr-3" size={24} />
                <div>
                  <h3 className="text-white font-semibold">Treino do Dia</h3>
                  <p className="text-gray-400 text-sm">45 minutos - Força</p>
                </div>
              </div>
              <button 
                onClick={() => setWorkoutDone(!workoutDone)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  workoutDone ? 'bg-green-500' : 'bg-white/10'
                }`}
              >
                <Check className="text-white" size={20} />
              </button>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-purple-500/20">
            <div className="flex items-center mb-4">
              <Moon className="text-purple-400 mr-3" size={24} />
              <div>
                <h3 className="text-white font-semibold">Qualidade do Sono</h3>
                <p className="text-gray-400 text-sm">Última noite: 7.5h</p>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {[8, 7.5, 6, 7, 8, 7.5, 7].map((hours, index) => (
                <div key={index} className="text-center">
                  <div 
                    className="bg-purple-500 rounded-lg mb-1"
                    style={{ height: `${(hours / 8) * 60}px` }}
                  ></div>
                  <p className="text-gray-500 text-xs">
                    {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'][index]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#9C27B0]/20 to-[#4A148C]/20 rounded-2xl p-5 border border-purple-500/30">
            <h3 className="text-white font-semibold mb-3">Dicas de Saúde</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 flex items-start">
                <Check className="text-green-400 mr-2 mt-1 flex-shrink-0" size={16} />
                <span>Mantenha-se hidratado durante o dia</span>
              </li>
              <li className="text-gray-300 flex items-start">
                <Check className="text-green-400 mr-2 mt-1 flex-shrink-0" size={16} />
                <span>Durma pelo menos 7-8 horas por noite</span>
              </li>
              <li className="text-gray-300 flex items-start">
                <Check className="text-green-400 mr-2 mt-1 flex-shrink-0" size={16} />
                <span>Pratique exercícios regularmente</span>
              </li>
            </ul>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Routine Creator Screen
  if (currentScreen === 'routine-creator') {
    return (
      <div className="min-h-screen bg-[#0D0D0D] p-6 pb-24">
        <button 
          onClick={() => setCurrentScreen('dashboard')}
          className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Voltar
        </button>

        <div className="mb-6">
          <Zap className="text-purple-400 mb-4" size={48} />
          <h1 className="text-3xl font-bold text-white mb-2">Criar Rotina Inteligente</h1>
          <p className="text-gray-400">Personalize sua rotina diária</p>
        </div>

        <div className="space-y-4">
          <div className="bg-white/5 rounded-2xl p-5 border border-purple-500/20">
            <h3 className="text-white font-semibold mb-4">Rotina Matinal</h3>
            <div className="space-y-3">
              {morningRoutine.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-white/5 rounded-xl p-3">
                  <div className="flex items-center space-x-3">
                    <item.icon className="text-purple-400" size={20} />
                    <div>
                      <p className="text-white font-medium">{item.activity}</p>
                      <p className="text-gray-400 text-sm">{item.time}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleRemoveActivity(item.id, 'morning')}
                    className="text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
            <button 
              onClick={() => {
                setActivityType('morning');
                setShowNewActivityModal(true);
              }}
              className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl transition-colors flex items-center justify-center"
            >
              <Plus className="mr-2" size={20} />
              Adicionar Atividade
            </button>
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-purple-500/20">
            <h3 className="text-white font-semibold mb-4">Rotina Noturna</h3>
            <div className="space-y-3">
              {nightRoutine.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-white/5 rounded-xl p-3">
                  <div className="flex items-center space-x-3">
                    <item.icon className="text-blue-400" size={20} />
                    <div>
                      <p className="text-white font-medium">{item.activity}</p>
                      <p className="text-gray-400 text-sm">{item.time}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleRemoveActivity(item.id, 'night')}
                    className="text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
            <button 
              onClick={() => {
                setActivityType('night');
                setShowNewActivityModal(true);
              }}
              className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl transition-colors flex items-center justify-center"
            >
              <Plus className="mr-2" size={20} />
              Adicionar Atividade
            </button>
          </div>

          <button className="w-full bg-gradient-to-r from-[#9C27B0] to-[#4A148C] text-white font-semibold py-4 rounded-2xl hover:opacity-90 transition-opacity">
            Salvar Rotina
          </button>
        </div>

        {/* Modal Nova Atividade */}
        {showNewActivityModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50">
            <div className="bg-[#1A1A1A] rounded-3xl p-6 w-full max-w-md border border-purple-500/30">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Nova Atividade</h2>
                <button 
                  onClick={() => setShowNewActivityModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">Horário</label>
                  <input 
                    type="text"
                    value={newActivityTime}
                    onChange={(e) => setNewActivityTime(e.target.value)}
                    placeholder="Ex: 08:00"
                    className="w-full bg-white/5 border border-purple-500/20 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Nome da Atividade</label>
                  <input 
                    type="text"
                    value={newActivityName}
                    onChange={(e) => setNewActivityName(e.target.value)}
                    placeholder="Ex: Yoga"
                    className="w-full bg-white/5 border border-purple-500/20 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                  />
                </div>

                <button 
                  onClick={handleAddActivity}
                  className="w-full bg-gradient-to-r from-[#9C27B0] to-[#4A148C] text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Adicionar Atividade
                </button>
              </div>
            </div>
          </div>
        )}

        <BottomNav />
      </div>
    );
  }

  // Tasks Screen
  if (currentScreen === 'tasks') {
    return (
      <div className="min-h-screen bg-[#0D0D0D] p-6 pb-24">
        <button 
          onClick={() => setCurrentScreen('dashboard')}
          className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Voltar
        </button>

        <div className="mb-6">
          <CheckCircle className="text-green-400 mb-4" size={48} />
          <h1 className="text-3xl font-bold text-white mb-2">Tarefas Prioritárias</h1>
          <p className="text-gray-400">Organize por urgência e importância</p>
        </div>

        <div className="space-y-4">
          <div className="bg-white/5 rounded-2xl p-5 border border-red-500/30">
            <h3 className="text-red-400 font-semibold mb-3 flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              Alta Prioridade
            </h3>
            {tasks.filter(t => t.priority === 'high').map((task) => (
              <div key={task.id} className="flex items-center justify-between bg-white/5 rounded-xl p-3 mb-2">
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => toggleTask(task.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      task.completed ? 'bg-green-500 border-green-500' : 'border-gray-500'
                    }`}
                  >
                    {task.completed && <Check className="text-white" size={16} />}
                  </button>
                  <p className={`text-white ${task.completed ? 'line-through opacity-50' : ''}`}>
                    {task.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-yellow-500/30">
            <h3 className="text-yellow-400 font-semibold mb-3 flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              Média Prioridade
            </h3>
            {tasks.filter(t => t.priority === 'medium').map((task) => (
              <div key={task.id} className="flex items-center justify-between bg-white/5 rounded-xl p-3 mb-2">
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => toggleTask(task.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      task.completed ? 'bg-green-500 border-green-500' : 'border-gray-500'
                    }`}
                  >
                    {task.completed && <Check className="text-white" size={16} />}
                  </button>
                  <p className={`text-white ${task.completed ? 'line-through opacity-50' : ''}`}>
                    {task.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-green-500/30">
            <h3 className="text-green-400 font-semibold mb-3 flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              Baixa Prioridade
            </h3>
            {tasks.filter(t => t.priority === 'low').map((task) => (
              <div key={task.id} className="flex items-center justify-between bg-white/5 rounded-xl p-3 mb-2">
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => toggleTask(task.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      task.completed ? 'bg-green-500 border-green-500' : 'border-gray-500'
                    }`}
                  >
                    {task.completed && <Check className="text-white" size={16} />}
                  </button>
                  <p className={`text-white ${task.completed ? 'line-through opacity-50' : ''}`}>
                    {task.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full bg-gradient-to-r from-[#9C27B0] to-[#4A148C] text-white font-semibold py-4 rounded-2xl hover:opacity-90 transition-opacity flex items-center justify-center">
            <Plus className="mr-2" size={20} />
            Nova Tarefa
          </button>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Goals Screen
  if (currentScreen === 'goals') {
    return (
      <div className="min-h-screen bg-[#0D0D0D] p-6 pb-24">
        <button 
          onClick={() => setCurrentScreen('dashboard')}
          className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Voltar
        </button>

        <div className="mb-6">
          <Target className="text-purple-400 mb-4" size={48} />
          <h1 className="text-3xl font-bold text-white mb-2">Minhas Metas</h1>
          <p className="text-gray-400">Defina e acompanhe seus objetivos</p>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-[#9C27B0] to-[#4A148C] rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4">Meta Principal</h3>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-white font-medium mb-2">Ler 12 livros este ano</p>
              <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                <div className="bg-white rounded-full h-3 w-1/3"></div>
              </div>
              <p className="text-purple-200 text-sm">4 de 12 livros completos</p>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-purple-500/20">
            <h3 className="text-white font-semibold mb-4">Metas Ativas</h3>
            <div className="space-y-3">
              {goals.map((goal) => (
                <div key={goal.id} className="bg-white/5 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-white font-medium">{goal.title}</p>
                    <span className="text-purple-400 text-sm font-semibold">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                    <div 
                      className="bg-gradient-to-r from-[#9C27B0] to-[#4A148C] rounded-full h-2"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-400 text-sm">{goal.current} de {goal.total}</p>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => setShowNewGoalModal(true)}
            className="w-full bg-gradient-to-r from-[#9C27B0] to-[#4A148C] text-white font-semibold py-4 rounded-2xl hover:opacity-90 transition-opacity flex items-center justify-center"
          >
            <Plus className="mr-2" size={20} />
            Nova Meta
          </button>
        </div>

        {/* Modal Nova Meta */}
        {showNewGoalModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50">
            <div className="bg-[#1A1A1A] rounded-3xl p-6 w-full max-w-md border border-purple-500/30">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Nova Meta</h2>
                <button 
                  onClick={() => setShowNewGoalModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">Título da Meta</label>
                  <input 
                    type="text"
                    value={newGoalTitle}
                    onChange={(e) => setNewGoalTitle(e.target.value)}
                    placeholder="Ex: Correr 5km sem parar"
                    className="w-full bg-white/5 border border-purple-500/20 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Meta Total</label>
                  <input 
                    type="number"
                    value={newGoalTotal}
                    onChange={(e) => setNewGoalTotal(e.target.value)}
                    placeholder="Ex: 30 (dias)"
                    className="w-full bg-white/5 border border-purple-500/20 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                  />
                </div>

                <button 
                  onClick={handleAddGoal}
                  className="w-full bg-gradient-to-r from-[#9C27B0] to-[#4A148C] text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Criar Meta
                </button>
              </div>
            </div>
          </div>
        )}

        <BottomNav />
      </div>
    );
  }

  // Progress Screen
  if (currentScreen === 'progress') {
    return (
      <div className="min-h-screen bg-[#0D0D0D] p-6 pb-24">
        <button 
          onClick={() => setCurrentScreen('dashboard')}
          className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Voltar
        </button>

        <div className="mb-6">
          <Activity className="text-green-400 mb-4" size={48} />
          <h1 className="text-3xl font-bold text-white mb-2">Meu Progresso</h1>
          <p className="text-gray-400">Acompanhe sua evolução</p>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4">Estatísticas Gerais</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <p className="text-4xl font-bold text-white mb-1">87%</p>
                <p className="text-green-100 text-sm">Produtividade</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <p className="text-4xl font-bold text-white mb-1">14</p>
                <p className="text-green-100 text-sm">Dias Streak</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-purple-500/20">
            <h3 className="text-white font-semibold mb-4">Evolução Mensal</h3>
            <div className="space-y-4">
              {[
                { category: 'Tarefas Completas', value: 156, max: 200, color: 'from-blue-500 to-cyan-500' },
                { category: 'Horas de Foco', value: 84, max: 100, color: 'from-purple-500 to-pink-500' },
                { category: 'Exercícios', value: 18, max: 20, color: 'from-orange-500 to-red-500' },
                { category: 'Páginas Lidas', value: 420, max: 500, color: 'from-yellow-500 to-orange-500' },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-white text-sm">{item.category}</span>
                    <span className="text-gray-400 text-sm">{item.value}/{item.max}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${item.color} rounded-full h-2`}
                      style={{ width: `${(item.value / item.max) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-purple-500/20">
            <h3 className="text-white font-semibold mb-4">Conquistas Recentes</h3>
            <div className="grid grid-cols-4 gap-3">
              {[
                { icon: Flame, color: 'from-orange-400 to-red-500', label: '7 dias' },
                { icon: Star, color: 'from-yellow-400 to-orange-400', label: '100 tarefas' },
                { icon: Book, color: 'from-blue-400 to-cyan-500', label: '5 livros' },
                { icon: Dumbbell, color: 'from-green-400 to-emerald-500', label: '20 treinos' },
              ].map((badge, index) => (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center mx-auto mb-2`}>
                    <badge.icon className="text-white" size={28} />
                  </div>
                  <p className="text-gray-400 text-xs">{badge.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Profile Screen
  if (currentScreen === 'profile') {
    return (
      <div className="min-h-screen bg-[#0D0D0D] p-6 pb-24">
        <button 
          onClick={() => setCurrentScreen('dashboard')}
          className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Voltar
        </button>

        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#9C27B0] to-[#4A148C] flex items-center justify-center mx-auto mb-4">
            <User className="text-white" size={48} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">João Silva</h1>
          <p className="text-gray-400">Membro desde Janeiro 2024</p>
        </div>

        <div className="space-y-4">
          <div className="bg-white/5 rounded-2xl p-5 border border-purple-500/20">
            <h3 className="text-white font-semibold mb-4">Estatísticas do Perfil</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold text-white mb-1">156</p>
                <p className="text-gray-400 text-sm">Tarefas</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white mb-1">14</p>
                <p className="text-gray-400 text-sm">Streak</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white mb-1">87%</p>
                <p className="text-gray-400 text-sm">Taxa</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-purple-500/20">
            <h3 className="text-white font-semibold mb-4">Preferências</h3>
            <div className="space-y-3">
              <button 
                onClick={() => setNotifications(!notifications)}
                className="w-full flex items-center justify-between bg-white/5 rounded-xl p-3 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Bell className="text-purple-400" size={20} />
                  <span className="text-white">Notificações</span>
                </div>
                <div className={`w-12 h-6 rounded-full transition-colors ${notifications ? 'bg-purple-500' : 'bg-gray-600'} relative`}>
                  <div className={`absolute top-1 ${notifications ? 'right-1' : 'left-1'} w-4 h-4 bg-white rounded-full transition-all`}></div>
                </div>
              </button>

              <button 
                onClick={() => setDarkTheme(!darkTheme)}
                className="w-full flex items-center justify-between bg-white/5 rounded-xl p-3 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Palette className="text-purple-400" size={20} />
                  <span className="text-white">Tema Escuro</span>
                </div>
                <div className={`w-12 h-6 rounded-full transition-colors ${darkTheme ? 'bg-purple-500' : 'bg-gray-600'} relative`}>
                  <div className={`absolute top-1 ${darkTheme ? 'right-1' : 'left-1'} w-4 h-4 bg-white rounded-full transition-all`}></div>
                </div>
              </button>

              <button 
                onClick={() => setReminders(!reminders)}
                className="w-full flex items-center justify-between bg-white/5 rounded-xl p-3 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <AlertCircle className="text-purple-400" size={20} />
                  <span className="text-white">Lembretes</span>
                </div>
                <div className={`w-12 h-6 rounded-full transition-colors ${reminders ? 'bg-purple-500' : 'bg-gray-600'} relative`}>
                  <div className={`absolute top-1 ${reminders ? 'right-1' : 'left-1'} w-4 h-4 bg-white rounded-full transition-all`}></div>
                </div>
              </button>

              <button 
                onClick={() => alert('Configurações de privacidade em desenvolvimento')}
                className="w-full flex items-center justify-between bg-white/5 rounded-xl p-3 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Shield className="text-purple-400" size={20} />
                  <span className="text-white">Privacidade</span>
                </div>
                <ChevronRight className="text-gray-500" size={20} />
              </button>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-purple-500/20">
            <h3 className="text-white font-semibold mb-4">Conquistas</h3>
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {[1, 2, 3, 4, 5, 6].map((badge) => (
                <div key={badge} className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#9C27B0] to-[#4A148C] flex items-center justify-center">
                  <Star className="text-white" size={28} />
                </div>
              ))}
            </div>
          </div>

          <button className="w-full bg-red-500/20 border border-red-500/30 text-red-400 font-semibold py-4 rounded-2xl hover:bg-red-500/30 transition-colors">
            Sair da Conta
          </button>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Reports Screen
  if (currentScreen === 'reports') {
    return (
      <div className="min-h-screen bg-[#0D0D0D] p-6 pb-24">
        <button 
          onClick={() => setCurrentScreen('dashboard')}
          className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Voltar
        </button>

        <div className="mb-6">
          <Activity className="text-orange-400 mb-4" size={48} />
          <h1 className="text-3xl font-bold text-white mb-2">Relatórios Semanais</h1>
          <p className="text-gray-400">Análise de desempenho e insights</p>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-[#9C27B0] to-[#4A148C] rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4">Resumo da Semana</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-purple-200 text-sm mb-1">Produtividade</p>
                <p className="text-3xl font-bold text-white">87%</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-purple-200 text-sm mb-1">Tarefas</p>
                <p className="text-3xl font-bold text-white">42/50</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-purple-200 text-sm mb-1">Foco</p>
                <p className="text-3xl font-bold text-white">28h</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-purple-200 text-sm mb-1">Streak</p>
                <p className="text-3xl font-bold text-white">14d</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-purple-500/20">
            <h3 className="text-white font-semibold mb-4">Progresso Semanal</h3>
            <div className="space-y-3">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, index) => (
                <div key={day} className="flex items-center space-x-3">
                  <span className="text-gray-400 text-sm w-8">{day}</span>
                  <div className="flex-1 bg-white/10 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-[#9C27B0] to-[#4A148C] rounded-full h-3 transition-all"
                      style={{ width: `${[60, 85, 90, 75, 95, 88, 70][index]}%` }}
                    ></div>
                  </div>
                  <span className="text-white text-sm font-medium w-10 text-right">
                    {[60, 85, 90, 75, 95, 88, 70][index]}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-purple-500/20">
            <h3 className="text-white font-semibold mb-4">Insights e Sugestões</h3>
            <div className="space-y-3">
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                <div className="flex items-start">
                  <TrendingUp className="text-green-400 mr-3 mt-1" size={20} />
                  <div>
                    <p className="text-green-400 font-medium mb-1">Excelente!</p>
                    <p className="text-gray-300 text-sm">Sua produtividade aumentou 12% esta semana</p>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                <div className="flex items-start">
                  <Zap className="text-yellow-400 mr-3 mt-1" size={20} />
                  <div>
                    <p className="text-yellow-400 font-medium mb-1">Dica</p>
                    <p className="text-gray-300 text-sm">Tente fazer pausas mais frequentes para manter o foco</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-start">
                  <Target className="text-blue-400 mr-3 mt-1" size={20} />
                  <div>
                    <p className="text-blue-400 font-medium mb-1">Meta</p>
                    <p className="text-gray-300 text-sm">Você está a 8 tarefas de bater seu recorde mensal!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return null;
}
