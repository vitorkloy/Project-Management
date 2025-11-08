import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Users2, CheckCircle, TrendingUp, ListTodo, MoreVertical, FileText, Calendar } from 'lucide-react';
import type { TeamMember } from '@/types/types';

interface TeamViewProps {
  teamMembers: TeamMember[];
  teamStats: {
    total: number;
    active: number;
    averageProductivity: number;
    totalTasksInProgress: number;
  };
}

export const TeamView = ({ teamMembers, teamStats }: TeamViewProps) => {
  return (
    <div className="space-y-6">
      {/* Team Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Equipe</h2>
            <p className="text-gray-600 mt-1">Gerencie os membros da equipe contábil</p>
          </div>
          <Button className="bg-linear-to-r text-white from-blue-600 to-cyan-600">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Membro
          </Button>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total de Membros</p>
                <p className="text-2xl font-bold text-gray-900">{teamStats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Ativos</p>
                <p className="text-2xl font-bold text-gray-900">{teamStats.active}</p>
              </div>
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Produtividade Média</p>
                <p className="text-2xl font-bold text-gray-900">{teamStats.averageProductivity}%</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <ListTodo className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tarefas em Andamento</p>
                <p className="text-2xl font-bold text-gray-900">{teamStats.totalTasksInProgress}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map(member => (
          <Card key={member.id} className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-linear-to-r from-blue-600 to-cyan-600 flex items-center justify-center text-white text-xl font-bold">
                    {member.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.role}</p>
                    <Badge className={member.status === 'ativo' ? 'bg-green-100 text-green-700 mt-1' : 'bg-orange-100 text-orange-700 mt-1'}>
                      {member.status === 'ativo' ? 'Ativo' : 'Férias'}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <FileText className="h-4 w-4" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{member.phone}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Produtividade</span>
                  <span className="font-semibold text-gray-900">{member.productivity}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      member.productivity >= 90 ? 'bg-green-600' :
                      member.productivity >= 75 ? 'bg-blue-600' :
                      'bg-orange-600'
                    }`}
                    style={{ width: `${member.productivity}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{member.tasksCompleted}</p>
                  <p className="text-xs text-gray-600">Concluídas</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{member.tasksInProgress}</p>
                  <p className="text-xs text-gray-600">Em Andamento</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-600 mb-2">Especialidades:</p>
                <div className="flex flex-wrap gap-1">
                  {member.specialties.map((specialty, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
                Membro desde {new Date(member.joinDate).toLocaleDateString('pt-BR')}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

