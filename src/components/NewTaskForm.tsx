import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import type { NewTask } from '@/types/types';
import { useState } from 'react';

interface NewTaskFormProps {
  onClose: () => void;
  onSubmit: (task: NewTask) => void;
}

export const NewTaskForm = ({ onClose, onSubmit }: NewTaskFormProps) => {
  const [newTask, setNewTask] = useState<NewTask>({
    title: '',
    description: '',
    client: '',
    assignee: '',
    priority: 'media',
    dueDate: '',
    tags: []
  });

  const handleSubmit = () => {
    onSubmit(newTask);
    setNewTask({
      title: '',
      description: '',
      client: '',
      assignee: '',
      priority: 'media',
      dueDate: '',
      tags: []
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Título</label>
        <Input
          placeholder="Ex: Escrituração Contábil - Janeiro"
          value={newTask.title}
          onChange={(e) => setNewTask({...newTask, title: e.target.value})}
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Descrição</label>
        <Textarea
          placeholder="Descreva os detalhes da tarefa..."
          value={newTask.description}
          onChange={(e) => setNewTask({...newTask, description: e.target.value})}
          rows={3}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Cliente</label>
          <Input
            placeholder="Nome do cliente"
            value={newTask.client}
            onChange={(e) => setNewTask({...newTask, client: e.target.value})}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Responsável</label>
          <Input
            placeholder="Nome do responsável"
            value={newTask.assignee}
            onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Prioridade</label>
          <Select value={newTask.priority} onValueChange={(value: NewTask['priority']) => setNewTask({...newTask, priority: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="baixa">Baixa</SelectItem>
              <SelectItem value="media">Média</SelectItem>
              <SelectItem value="alta">Alta</SelectItem>
              <SelectItem value="urgente">Urgente</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Data de Entrega</label>
          <Input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onClose} className='border border-gray-200 shadow-md hover:shadow-lg bg-white text-gray-600'>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} className="bg-linear-to-r text-white  from-blue-600 to-cyan-600">
          Criar Tarefa
        </Button>
      </div>
    </div>
  );
};

