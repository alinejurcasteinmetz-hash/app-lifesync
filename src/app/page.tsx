"use client";

import { useState, useEffect } from "react";
import { 
  Home, 
  Sun, 
  Moon, 
  Clock, 
  Heart, 
  Timer, 
  BookOpen, 
  Activity, 
  Target,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Zap,
  Award,
  Calendar
} from "lucide-react";

export default function LifeSync() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showWelcome) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D] overflow-hidden">
        <div 
          className={`text-center transition-all duration-1000 ${
            fadeIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[#9C27B0] to-[#4A148C] blur-3xl opacity-50 animate-pulse"></div>
            <Sparkles className="w-24 h-24 mx-auto relative text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#9C27B0] to-[#4A148C] bg-clip-text text-transparent">
            LifeSync
          </h1>
          <p className="text-xl text-gray-400">Sincronize sua vida com excelência</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#9C27B0] to-[#4A148C] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold">LifeSync</span>
            </div>
            <div className="flex items-center gap-6">
              <button className="text-gray-400 hover:text-white transition-colors">
                <Home className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Calendar className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Award className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-3">
            Bem-vindo de volta! 👋
          </h2>
          <p className="text-xl text-gray-400">
            Hoje é {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          <QuickActionCard
            icon={<Sun className="w-6 h-6" />}
            label="Check-in Matinal"
            gradient="from-orange-500 to-pink-500"
          />
          <QuickActionCard
            icon={<Moon className="w-6 h-6" />}
            label="Check-in Noturno"
            gradient="from-indigo-500 to-purple-500"
          />
          <QuickActionCard
            icon={<Timer className="w-6 h-6" />}
            label="Pomodoro"
            gradient="from-[#9C27B0] to-[#4A148C]"
          />
          <QuickActionCard
            icon={<Heart className="w-6 h-6" />}
            label="Diário de Humor"
            gradient="from-pink-500 to-rose-500"
          />
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={<Zap className="w-5 h-5" />}
            label="Streak Atual"
            value="12 dias"
            change="+2 esta semana"
            positive
          />
          <StatCard
            icon={<Target className="w-5 h-5" />}
            label="Tarefas Concluídas"
            value="8/12"
            change="67% completo"
            positive
          />
          <StatCard
            icon={<Clock className="w-5 h-5" />}
            label="Tempo Focado"
            value="3h 45min"
            change="+30min hoje"
            positive
          />
          <StatCard
            icon={<TrendingUp className="w-5 h-5" />}
            label="Produtividade"
            value="85%"
            change="+5% vs ontem"
            positive
          />
        </div>

        {/* Main Dashboard Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Today's Focus */}
          <DashboardCard
            title="Foco do Dia"
            icon={<Target className="w-5 h-5" />}
          >
            <div className="space-y-4">
              <TaskItem
                title="Finalizar relatório trimestral"
                priority="high"
                time="09:00 - 11:00"
              />
              <TaskItem
                title="Reunião com equipe de design"
                priority="medium"
                time="14:00 - 15:00"
              />
              <TaskItem
                title="Revisar código do projeto"
                priority="medium"
                time="16:00 - 17:30"
              />
            </div>
          </DashboardCard>

          {/* Health Overview */}
          <DashboardCard
            title="Saúde & Bem-estar"
            icon={<Activity className="w-5 h-5" />}
          >
            <div className="space-y-4">
              <HealthMetric
                label="Hidratação"
                current={6}
                target={8}
                unit="copos"
                color="from-blue-500 to-cyan-500"
              />
              <HealthMetric
                label="Sono"
                current={7.5}
                target={8}
                unit="horas"
                color="from-indigo-500 to-purple-500"
              />
              <HealthMetric
                label="Exercícios"
                current={30}
                target={45}
                unit="min"
                color="from-green-500 to-emerald-500"
              />
            </div>
          </DashboardCard>

          {/* Reading Progress */}
          <DashboardCard
            title="Rotina de Leitura"
            icon={<BookOpen className="w-5 h-5" />}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Atomic Habits</span>
                <span className="text-sm text-gray-500">Pág. 142/320</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#9C27B0] to-[#4A148C] rounded-full transition-all duration-500"
                  style={{ width: '44%' }}
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Meta diária: 20 páginas</span>
                <span className="text-[#9C27B0] font-semibold">15/20 hoje</span>
              </div>
            </div>
          </DashboardCard>

          {/* Achievements */}
          <DashboardCard
            title="Conquistas Recentes"
            icon={<Award className="w-5 h-5" />}
          >
            <div className="space-y-3">
              <AchievementBadge
                emoji="🔥"
                title="Semana Perfeita"
                description="7 dias consecutivos de check-ins"
              />
              <AchievementBadge
                emoji="📚"
                title="Leitor Dedicado"
                description="100 páginas lidas esta semana"
              />
              <AchievementBadge
                emoji="💪"
                title="Foco Máximo"
                description="5 sessões Pomodoro completas"
              />
            </div>
          </DashboardCard>
        </div>

        {/* Weekly Progress */}
        <DashboardCard
          title="Progresso Semanal"
          icon={<TrendingUp className="w-5 h-5" />}
        >
          <div className="grid grid-cols-7 gap-2 sm:gap-4">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, index) => (
              <div key={day} className="text-center">
                <div className="text-xs text-gray-500 mb-2">{day}</div>
                <div 
                  className={`h-24 sm:h-32 rounded-lg transition-all duration-300 ${
                    index <= 4 
                      ? 'bg-gradient-to-t from-[#9C27B0] to-[#4A148C] opacity-80 hover:opacity-100' 
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                />
                <div className="text-xs text-gray-400 mt-2">
                  {index <= 4 ? '✓' : '-'}
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </main>
    </div>
  );
}

// Component: Quick Action Card
function QuickActionCard({ 
  icon, 
  label, 
  gradient 
}: { 
  icon: React.ReactNode; 
  label: string; 
  gradient: string;
}) {
  return (
    <button className="group relative overflow-hidden rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-3 mx-auto`}>
        {icon}
      </div>
      <p className="text-sm font-medium text-center">{label}</p>
    </button>
  );
}

// Component: Stat Card
function StatCard({ 
  icon, 
  label, 
  value, 
  change, 
  positive 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  change: string; 
  positive: boolean;
}) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#9C27B0] to-[#4A148C] flex items-center justify-center">
          {icon}
        </div>
        <span className={`text-xs font-semibold ${positive ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </span>
      </div>
      <p className="text-2xl font-bold mb-1">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  );
}

// Component: Dashboard Card
function DashboardCard({ 
  title, 
  icon, 
  children 
}: { 
  title: string; 
  icon: React.ReactNode; 
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#9C27B0] to-[#4A148C] flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      {children}
    </div>
  );
}

// Component: Task Item
function TaskItem({ 
  title, 
  priority, 
  time 
}: { 
  title: string; 
  priority: 'high' | 'medium' | 'low'; 
  time: string;
}) {
  const priorityColors = {
    high: 'from-red-500 to-orange-500',
    medium: 'from-yellow-500 to-orange-500',
    low: 'from-green-500 to-emerald-500'
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-pointer">
      <div className={`w-1 h-12 rounded-full bg-gradient-to-b ${priorityColors[priority]}`} />
      <div className="flex-1">
        <p className="font-medium mb-1 group-hover:text-[#9C27B0] transition-colors">{title}</p>
        <p className="text-sm text-gray-400">{time}</p>
      </div>
      <div className="w-5 h-5 rounded border-2 border-white/20 group-hover:border-[#9C27B0] transition-colors" />
    </div>
  );
}

// Component: Health Metric
function HealthMetric({ 
  label, 
  current, 
  target, 
  unit, 
  color 
}: { 
  label: string; 
  current: number; 
  target: number; 
  unit: string; 
  color: string;
}) {
  const percentage = (current / target) * 100;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-gray-400">
          {current}/{target} {unit}
        </span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}

// Component: Achievement Badge
function AchievementBadge({ 
  emoji, 
  title, 
  description 
}: { 
  emoji: string; 
  title: string; 
  description: string;
}) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-pointer">
      <div className="text-3xl">{emoji}</div>
      <div className="flex-1">
        <p className="font-medium mb-1 group-hover:text-[#9C27B0] transition-colors">{title}</p>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      <Sparkles className="w-5 h-5 text-[#9C27B0] opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
