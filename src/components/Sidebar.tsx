import React from 'react';
import { Button } from '@/components/ui/button';
import { menuItems } from '@/constants/constants';

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  setMobileMenuOpen: (open: boolean) => void;
}

const SidebarContent: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, setMobileMenuOpen }) => (
  <div className="flex flex-col h-full">
    <div className="p-6 border-b border-gray-200">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
        ContaFlow
      </h1>
      <p className="text-sm text-gray-600 mt-1">Gestão de Projetos</p>
    </div>
    
    <nav className="flex-1 p-4 space-y-1">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => {
              setCurrentPage(item.id);
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </button>
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
          Ver Documentação
        </Button>
      </div>
    </div>
  </div>
);

export default SidebarContent;