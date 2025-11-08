import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { Dashboard } from './components/views/Dashboard';
import { Kanban } from './components/views/Kanban';
import { ListView } from './components/views/List';
import { CalendarView } from './components/views/Calendar';
import { TeamView } from './components/views/Team';
import { ReportsView } from '@/components/views/Reports';
import { useTasks } from '@/hooks/useTasks';
import { useTeam } from '@/hooks/useTeam';
import type { Task, NewTask } from '@/types/types';
import { useState } from 'react';

export default function App() {
  const [selectedProject, setSelectedProject] = useState('all');
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);

  const {
    tasks,
    draggedTask,
    stats,
    createTask,
    handleDragStart,
    handleDrop,
    handleDragEnd,
    getTasksByStatus,
    getDaysUntilDue,
    getTasksForDay
  } = useTasks();

  const { teamMembers, teamStats } = useTeam();

  const handleCreateTask = (newTask: NewTask) => {
    createTask(newTask);
    setShowNewTaskDialog(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragStartWrapper = (e: React.DragEvent, task: Task) => {
    handleDragStart(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDropWrapper = (e: React.DragEvent, newStatus: Task['status']) => {
    e.preventDefault();
    handleDrop(newStatus);
  };

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route
            path="/dashboard"
            element={
              <Dashboard
                stats={stats}
                tasks={tasks}
                getDaysUntilDue={getDaysUntilDue}
                showNewTaskDialog={showNewTaskDialog}
                setShowNewTaskDialog={setShowNewTaskDialog}
                onCreateTask={handleCreateTask}
              />
            }
          />

          <Route
            path="/kanban"
            element={
              <Kanban
                tasks={tasks}
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
                draggedTask={draggedTask}
                handleDragStart={handleDragStartWrapper}
                handleDragEnd={handleDragEnd}
                handleDragOver={handleDragOver}
                handleDrop={handleDropWrapper}
                getTasksByStatus={getTasksByStatus}
                getDaysUntilDue={getDaysUntilDue}
                showNewTaskDialog={showNewTaskDialog}
                setShowNewTaskDialog={setShowNewTaskDialog}
                onCreateTask={handleCreateTask}
              />
            }
          />

          <Route
            path="/list"
            element={
              <ListView
                tasks={tasks}
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
                getDaysUntilDue={getDaysUntilDue}
                showNewTaskDialog={showNewTaskDialog}
                setShowNewTaskDialog={setShowNewTaskDialog}
                onCreateTask={handleCreateTask}
              />
            }
          />

          <Route
            path="/calendar"
            element={
              <CalendarView
                tasks={tasks}
                getTasksForDay={getTasksForDay}
                getDaysUntilDue={getDaysUntilDue}
              />
            }
          />

          <Route
            path="/team"
            element={<TeamView teamMembers={teamMembers} teamStats={teamStats} />}
          />

          <Route
            path="/reports"
            element={
              <ReportsView stats={stats} tasks={tasks} teamMembers={teamMembers} />
            }
          />

          <Route
            path="*"
            element={
              <div className="text-center text-gray-600 mt-20">
                <h2 className="text-2xl font-semibold">Página não encontrada</h2>
                <p className="mt-2">Verifique a URL ou volte ao painel principal.</p>
              </div>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
