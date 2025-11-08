import { useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import SidebarContent from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Dashboard } from '@/components/views/Dashboard';
import { Kanban } from '@/components/views/Kanban';
import { ListView } from '@/components/views/List';
import { CalendarView } from '@/components/views/Calendar';
import { TeamView } from '@/components/views/TeamView';
import { ReportsView } from '@/components/views/Reports';
import { useTasks } from '@/hooks/useTasks';
import { useTeam } from '@/hooks/useTeam';
import type { Task, NewTask } from '@/types/types';

const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedProject, setSelectedProject] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const handleCreateTask = (newTask: NewTask) => {
    createTask(newTask);
    setShowNewTaskDialog(false);
  };
          
          return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r border-gray-200 fixed h-screen">
        <SidebarContent 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        <Header 
          currentPage={currentPage}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Page Content */}
        <main className="p-6">
          {currentPage === 'dashboard' && (
            <Dashboard
              stats={stats}
              tasks={tasks}
              getDaysUntilDue={getDaysUntilDue}
              showNewTaskDialog={showNewTaskDialog}
              setShowNewTaskDialog={setShowNewTaskDialog}
              onCreateTask={handleCreateTask}
            />
          )}

          {currentPage === 'kanban' && (
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
          )}

          {currentPage === 'list' && (
            <ListView
              tasks={tasks}
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
              getDaysUntilDue={getDaysUntilDue}
              showNewTaskDialog={showNewTaskDialog}
              setShowNewTaskDialog={setShowNewTaskDialog}
              onCreateTask={handleCreateTask}
            />
          )}

          {currentPage === 'calendar' && (
            <CalendarView
              tasks={tasks}
              getTasksForDay={getTasksForDay}
              getDaysUntilDue={getDaysUntilDue}
            />
          )}

          {currentPage === 'team' && (
            <TeamView
              teamMembers={teamMembers}
              teamStats={teamStats}
            />
          )}

          {currentPage === 'reports' && (
            <ReportsView
              stats={stats}
              tasks={tasks}
              teamMembers={teamMembers}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
