import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Clock, TrendingUp, Users, FileText, AlertCircle } from 'lucide-react';
import type { Task, TeamMember, Stats } from '@/types/types';
import { statusConfig } from '@/constants/constants';

interface ReportsViewProps {
  stats: Stats;
  tasks: Task[];
  teamMembers: TeamMember[];
}

export const ReportsView = ({ stats, tasks, teamMembers }: ReportsViewProps) => {
  return (
    <div className="space-y-6">
      {/* Reports Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Relatórios e Análises</h2>
            <p className="text-gray-600 mt-1">Acompanhe métricas e performance da equipe</p>
          </div>
          <div className="flex items-center space-x-2">
            <Select defaultValue="month">
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Última Semana</SelectItem>
                <SelectItem value="month">Último Mês</SelectItem>
                <SelectItem value="quarter">Último Trimestre</SelectItem>
                <SelectItem value="year">Último Ano</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <Badge className="bg-green-100 text-green-700">+12%</Badge>
            </div>
            <p className="text-sm text-gray-600">Taxa de Conclusão</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {Math.round((stats.completed / stats.total) * 100)}%
            </p>
            <p className="text-xs text-gray-500 mt-2">vs. mês anterior</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <Badge className="bg-red-100 text-red-700">-5%</Badge>
            </div>
            <p className="text-sm text-gray-600">Tempo Médio</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">3.2d</p>
            <p className="text-xs text-gray-500 mt-2">por tarefa</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <Badge className="bg-green-100 text-green-700">+8%</Badge>
            </div>
            <p className="text-sm text-gray-600">Produtividade</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">87%</p>
            <p className="text-xs text-gray-500 mt-2">média da equipe</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <Badge className="bg-blue-100 text-blue-700">Estável</Badge>
            </div>
            <p className="text-sm text-gray-600">Clientes Ativos</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">24</p>
            <p className="text-xs text-gray-500 mt-2">empresas</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks by Status */}
        <Card className="border border-gray-200 shadow-md bg-white">
          <CardHeader>
            <CardTitle>Distribuição de Tarefas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    <span className="text-sm text-gray-600">Pendentes</span>
                  </div>
                  <span className="text-sm font-semibold">{stats.pending}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gray-400 h-2 rounded-full"
                    style={{ width: `${(stats.pending / stats.total) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    <span className="text-sm text-gray-600">Em Andamento</span>
                  </div>
                  <span className="text-sm font-semibold">{stats.inProgress}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(stats.inProgress / stats.total) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm text-gray-600">Em Revisão</span>
                  </div>
                  <span className="text-sm font-semibold">
                    {tasks.filter(t => t.status === 'revisao').length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${(tasks.filter(t => t.status === 'revisao').length / stats.total) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-600"></div>
                    <span className="text-sm text-gray-600">Concluídas</span>
                  </div>
                  <span className="text-sm font-semibold">{stats.completed}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tasks by Priority */}
        <Card className="border border-gray-200 shadow-md bg-white">
          <CardHeader>
            <CardTitle>Tarefas por Prioridade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-600"></div>
                    <span className="text-sm text-gray-600">Urgente</span>
                  </div>
                  <span className="text-sm font-semibold">
                    {tasks.filter(t => t.priority === 'urgente').length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: `${(tasks.filter(t => t.priority === 'urgente').length / stats.total) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-orange-600"></div>
                    <span className="text-sm text-gray-600">Alta</span>
                  </div>
                  <span className="text-sm font-semibold">
                    {tasks.filter(t => t.priority === 'alta').length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-600 h-2 rounded-full"
                    style={{ width: `${(tasks.filter(t => t.priority === 'alta').length / stats.total) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    <span className="text-sm text-gray-600">Média</span>
                  </div>
                  <span className="text-sm font-semibold">
                    {tasks.filter(t => t.priority === 'media').length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(tasks.filter(t => t.priority === 'media').length / stats.total) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    <span className="text-sm text-gray-600">Baixa</span>
                  </div>
                  <span className="text-sm font-semibold">
                    {tasks.filter(t => t.priority === 'baixa').length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gray-400 h-2 rounded-full"
                    style={{ width: `${(tasks.filter(t => t.priority === 'baixa').length / stats.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Performance */}
      <Card className="border border-gray-200 shadow-md bg-white">
        <CardHeader>
          <CardTitle>Performance da Equipe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Membro</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Concluídas</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Em Andamento</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Produtividade</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {teamMembers.map(member => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center text-white text-sm font-bold">
                          {member.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{member.name}</p>
                          <p className="text-xs text-gray-500">{member.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge className="bg-green-100 text-green-700">
                        {member.tasksCompleted}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge className="bg-blue-100 text-blue-700">
                        {member.tasksInProgress}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              member.productivity >= 90 ? 'bg-green-600' :
                              member.productivity >= 75 ? 'bg-blue-600' :
                              'bg-orange-600'
                            }`}
                            style={{ width: `${member.productivity}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">
                          {member.productivity}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge className={member.status === 'ativo' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}>
                        {member.status === 'ativo' ? 'Ativo' : 'Férias'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border border-gray-200 shadow-md bg-white">
        <CardHeader>
          <CardTitle>Atividade Recente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.slice(0, 5).map((task) => (
              <div key={task.id} className="flex items-center space-x-4 pb-4 border-b border-gray-100 last:border-0">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  task.status === 'concluido' ? 'bg-green-100' :
                  task.status === 'em-andamento' ? 'bg-blue-100' :
                  task.status === 'revisao' ? 'bg-yellow-100' :
                  'bg-gray-100'
                }`}>
                  {task.status === 'concluido' ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : task.status === 'em-andamento' ? (
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  ) : task.status === 'revisao' ? (
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                  ) : (
                    <Clock className="h-5 w-5 text-gray-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{task.title}</p>
                  <p className="text-sm text-gray-600">
                    {task.assignee} • {task.client}
                  </p>
                </div>
                <Badge className={statusConfig[task.status].color}>
                  {statusConfig[task.status].label}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

