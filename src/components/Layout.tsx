import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import {
  LayoutDashboard,
  Trello,
  List,
  Calendar,
  Users,
  BarChart3,
  Book
} from 'lucide-react';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/kanban', label: 'Kanban', icon: Trello },
  { path: '/list', label: 'Lista', icon: List },
  { path: '/calendar', label: 'Calendário', icon: Calendar },
  { path: '/team', label: 'Equipe', icon: Users },
  { path: '/reports', label: 'Relatórios', icon: BarChart3 }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Contabilidade
        </h1>
        <p className="text-sm text-gray-600 mt-1">Gestão de Projetos</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Precisa de ajuda?</h3>
          <p className="text-sm text-gray-600 mb-3">
            Acesse nossa documentação completa
          </p>
          <Button variant="outline" size="sm" className="w-full">
            <Book className="h-4 w-4 mr-2" /> Ver Documentação
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex lg:w-64 fixed h-screen">
        <Sidebar />
      </aside>

      {/* Sidebar Mobile */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Conteúdo Principal */}
      <div className="flex-1 lg:ml-64 flex flex-col">
        <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} currentPage={''} />
        <main className="p-6 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
