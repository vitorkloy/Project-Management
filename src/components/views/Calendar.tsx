import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Task } from '@/types/types';
import { useCalendar } from '@/hooks/useCalendar';

interface CalendarViewProps {
  tasks: Task[];
  getTasksForDay: (date: Date) => Task[];
  getDaysUntilDue: (dueDate: string) => number;
}

export const CalendarView = ({ tasks, getTasksForDay, getDaysUntilDue }: CalendarViewProps) => {
  const {
    currentMonth,
    getDaysInMonth,
    formatMonthYear,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    isToday,
    isCurrentMonth
  } = useCalendar();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 capitalize">
          {formatMonthYear(currentMonth)}
        </h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={goToToday}>
            Hoje
          </Button>
          <div className="flex items-center space-x-1">
            <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={goToNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
          <div key={day} className="bg-gray-100 p-3 text-center">
            <span className="text-sm font-semibold text-gray-700">{day}</span>
          </div>
        ))}

        {getDaysInMonth(currentMonth).map((date, index) => {
          const dayTasks = date ? getTasksForDay(date) : [];
          const isCurrentDay = date && isToday(date);
          const isThisMonth = date && isCurrentMonth(date);

          return (
            <div
              key={index}
              className={`bg-white min-h-[120px] p-2 ${
                !date ? 'bg-gray-50' : ''
              } ${isCurrentDay ? 'ring-2 ring-blue-500 ring-inset' : ''}`}
            >
              {date && (
                <>
                  <div className={`text-sm font-semibold mb-2 ${
                    isCurrentDay 
                      ? 'bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center'
                      : !isThisMonth 
                        ? 'text-gray-400' 
                        : 'text-gray-900'
                  }`}>
                    {date.getDate()}
                  </div>
                  <div className="space-y-1">
                    {dayTasks.slice(0, 3).map(task => {
                      const daysUntil = getDaysUntilDue(task.dueDate);
                      const isOverdue = daysUntil < 0 && task.status !== 'concluido';
                      
                      return (
                        <div
                          key={task.id}
                          className={`text-xs p-1.5 rounded cursor-pointer hover:shadow-md transition-shadow ${
                            task.status === 'concluido'
                              ? 'bg-green-100 text-green-800 border border-green-300'
                              : isOverdue
                                ? 'bg-red-100 text-red-800 border border-red-300'
                                : task.priority === 'urgente'
                                  ? 'bg-red-100 text-red-700 border border-red-200'
                                  : task.priority === 'alta'
                                    ? 'bg-orange-100 text-orange-700 border border-orange-200'
                                    : 'bg-blue-100 text-blue-700 border border-blue-200'
                          }`}
                          title={`${task.title}\n${task.client}\nResponsável: ${task.assignee}`}
                        >
                          <div className="font-semibold truncate flex items-center gap-1">
                            {task.status === 'concluido' && (
                              <CheckCircle className="h-3 w-3 flex-shrink-0" />
                            )}
                            {isOverdue && task.status !== 'concluido' && (
                              <AlertCircle className="h-3 w-3 flex-shrink-0" />
                            )}
                            {task.title}
                          </div>
                          <div className="text-[10px] opacity-80 truncate mt-0.5">
                            {task.client}
                          </div>
                        </div>
                      );
                    })}
                    {dayTasks.length > 3 && (
                      <div className="text-xs text-gray-600 font-semibold p-1">
                        +{dayTasks.length - 3} mais
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
          <span className="text-gray-700">Concluída</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
          <span className="text-gray-700">Atrasada</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-orange-100 border border-orange-200 rounded"></div>
          <span className="text-gray-700">Alta Prioridade</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
          <span className="text-gray-700">Normal</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
            {new Date().getDate()}
          </div>
          <span className="text-gray-700">Hoje</span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3">Resumo do Mês</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-blue-600">
              {tasks.filter(t => {
                const taskDate = new Date(t.dueDate);
                return taskDate.getMonth() === currentMonth.getMonth() &&
                       taskDate.getFullYear() === currentMonth.getFullYear();
              }).length}
            </div>
            <div className="text-sm text-gray-600">Total no mês</div>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-600">
              {tasks.filter(t => {
                const taskDate = new Date(t.dueDate);
                return t.status === 'concluido' &&
                       taskDate.getMonth() === currentMonth.getMonth() &&
                       taskDate.getFullYear() === currentMonth.getFullYear();
              }).length}
            </div>
            <div className="text-sm text-gray-600">Concluídas</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-orange-600">
              {tasks.filter(t => {
                const taskDate = new Date(t.dueDate);
                return t.status !== 'concluido' &&
                       taskDate.getMonth() === currentMonth.getMonth() &&
                       taskDate.getFullYear() === currentMonth.getFullYear();
              }).length}
            </div>
            <div className="text-sm text-gray-600">Pendentes</div>
          </div>
          <div className="bg-red-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-red-600">
              {tasks.filter(t => {
                const taskDate = new Date(t.dueDate);
                const daysUntil = getDaysUntilDue(t.dueDate);
                return daysUntil < 0 && 
                       t.status !== 'concluido' &&
                       taskDate.getMonth() === currentMonth.getMonth() &&
                       taskDate.getFullYear() === currentMonth.getFullYear();
              }).length}
            </div>
            <div className="text-sm text-gray-600">Atrasadas</div>
          </div>
        </div>
      </div>
    </div>
  );
};

