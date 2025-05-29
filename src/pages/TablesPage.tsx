import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plus, Edit, Trash2, Users, TrendingUp, Clock, CheckCircle, Eye } from 'lucide-react';
import NewTableModal from '@/components/NewTableModal';
import TableOrderModal from '@/components/TableOrderModal';

const TablesPage = () => {
  const [showNewTableModal, setShowNewTableModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState<any>(null);

  // Mock data - replace with Supabase data
  const [tables, setTables] = useState([
    { id: 1, name: 'Mesa 1', capacity: 4, status: 'available', sector: 'interno' },
    { id: 2, name: 'Mesa 2', capacity: 2, status: 'occupied', sector: 'interno', revenue: 85.50 },
    { id: 3, name: 'Mesa 3', capacity: 6, status: 'available', sector: 'externo' },
    { id: 4, name: 'Mesa 4', capacity: 4, status: 'reserved', sector: 'vip' },
    { id: 5, name: 'Mesa 5', capacity: 8, status: 'available', sector: 'externo' },
    { id: 6, name: 'Mesa 6', capacity: 4, status: 'occupied', sector: 'interno', revenue: 142.30 },
    { id: 7, name: 'Mesa 7', capacity: 2, status: 'available', sector: 'balcao' },
    { id: 8, name: 'Mesa 8', capacity: 6, status: 'reserved', sector: 'vip' },
  ]);

  const occupiedTables = tables.filter(t => t.status === 'occupied').length;
  const reservedTables = tables.filter(t => t.status === 'reserved').length;
  const availableTables = tables.filter(t => t.status === 'available').length;
  const occupancyRate = Math.round(((occupiedTables + reservedTables) / tables.length) * 100);

  const getStatusBadge = (status: string) => {
    const variants = {
      available: 'bg-green-100 text-green-800',
      occupied: 'bg-red-100 text-red-800',
      reserved: 'bg-yellow-100 text-yellow-800'
    };
    
    const labels = {
      available: 'Disponível',
      occupied: 'Ocupada',
      reserved: 'Reservada'
    };

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getTableAvatar = (table: any) => {
    if (table.status === 'occupied') {
      if (table.revenue && table.revenue > 100) return '😍'; // Mesa VIP
      return '😊'; // Mesa feliz
    }
    if (table.status === 'reserved') return '⏰';
    return '🍽️'; // Mesa disponível
  };

  const getSectorIcon = (sector: string) => {
    const icons = {
      interno: '🏠',
      externo: '🌳',
      vip: '⭐',
      balcao: '🥤'
    };
    return icons[sector as keyof typeof icons] || '🍽️';
  };

  const handleCreateTable = (newTable: any) => {
    setTables(prev => [...prev, newTable]);
  };

  const handleTableClick = (table: any) => {
    setSelectedTable(table);
    setShowOrderModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">🪑 Gestão de Mesas</h1>
          <p className="text-gray-600">Controle inteligente das suas mesas</p>
        </div>
        <Button 
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
          onClick={() => setShowNewTableModal(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Mesa
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Mesas Disponíveis</p>
                <p className="text-2xl font-bold text-green-700">{availableTables}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-medium">Mesas Ocupadas</p>
                <p className="text-2xl font-bold text-red-700">{occupiedTables}</p>
              </div>
              <Users className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-amber-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 text-sm font-medium">Reservadas</p>
                <p className="text-2xl font-bold text-yellow-700">{reservedTables}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Taxa de Ocupação</p>
                <p className="text-2xl font-bold text-blue-700">{occupancyRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
            <Progress value={occupancyRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Goal Card */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">🎯 Meta do Dia</h3>
              <p className="text-purple-100">Ocupação de 85% das mesas</p>
              <div className="mt-2">
                <Progress value={occupancyRate} className="bg-purple-400" />
                <p className="text-sm mt-1">Faltam {Math.max(0, 85 - occupancyRate)}% para atingir a meta</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{occupancyRate}%</p>
              <p className="text-purple-200">de 85%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tables.map((table) => (
          <Card key={table.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => handleTableClick(table)}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg flex items-center">
                  <span className="text-2xl mr-2">{getTableAvatar(table)}</span>
                  🪑 {table.name}
                </CardTitle>
                {getStatusBadge(table.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                  <Users className="w-4 h-4 mr-2" />
                  {table.capacity} pessoas
                </div>
                
                <div className="flex items-center text-sm text-gray-600 bg-blue-50 p-2 rounded-lg">
                  <span className="mr-2">{getSectorIcon(table.sector)}</span>
                  {table.sector.charAt(0).toUpperCase() + table.sector.slice(1)}
                </div>

                {table.revenue && (
                  <div className="flex items-center text-sm text-green-600 bg-green-50 p-2 rounded-lg">
                    <span className="mr-2">💰</span>
                    R$ {table.revenue.toFixed(2)}
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={(e) => e.stopPropagation()}>
                    <Edit className="w-3 h-3 mr-1" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={(e) => e.stopPropagation()}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>

                {table.status === 'occupied' && (
                  <Button size="sm" className="w-full bg-gradient-to-r from-blue-500 to-blue-600">
                    <Eye className="w-3 h-3 mr-1" />
                    👀 Ver Comandas
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <NewTableModal 
        isOpen={showNewTableModal}
        onClose={() => setShowNewTableModal(false)}
        onCreateTable={handleCreateTable}
      />

      <TableOrderModal 
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        table={selectedTable}
      />
    </div>
  );
};

export default TablesPage;
