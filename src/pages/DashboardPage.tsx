
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, ChefHat, Clock, TrendingUp } from 'lucide-react';

const DashboardPage = () => {
  // Mock data - replace with real data from Supabase
  const stats = {
    todayReservations: 8,
    totalTables: 12,
    occupancyRate: 75,
    pendingReservations: 3
  };

  const recentReservations = [
    {
      id: 1,
      customerName: 'João Silva',
      phone: '(11) 99999-9999',
      tableNumber: 5,
      date: '2024-01-15',
      time: '19:30',
      guests: 4,
      status: 'confirmed'
    },
    {
      id: 2,
      customerName: 'Maria Santos',
      phone: '(11) 88888-8888',
      tableNumber: 3,
      date: '2024-01-15',
      time: '20:00',
      guests: 2,
      status: 'pending'
    },
    {
      id: 3,
      customerName: 'Pedro Costa',
      phone: '(11) 77777-7777',
      tableNumber: 8,
      date: '2024-01-15',
      time: '20:30',
      guests: 6,
      status: 'confirmed'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    
    const labels = {
      confirmed: 'Confirmada',
      pending: 'Pendente',
      cancelled: 'Cancelada'
    };

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visão geral do seu restaurante</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reservas Hoje</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayReservations}</div>
            <p className="text-xs text-muted-foreground">
              +2 desde ontem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Mesas</CardTitle>
            <ChefHat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTables}</div>
            <p className="text-xs text-muted-foreground">
              Todas configuradas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Ocupação</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.occupancyRate}%</div>
            <p className="text-xs text-muted-foreground">
              Média semanal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReservations}</div>
            <p className="text-xs text-muted-foreground">
              Aguardando confirmação
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reservations */}
      <Card>
        <CardHeader>
          <CardTitle>Reservas Recentes</CardTitle>
          <CardDescription>
            Últimas reservas do seu restaurante
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReservations.map((reservation) => (
              <div key={reservation.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="font-semibold">{reservation.customerName}</h4>
                      <p className="text-sm text-gray-600">{reservation.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Mesa {reservation.tableNumber}</p>
                      <p className="text-sm text-gray-600">{reservation.guests} pessoas</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{reservation.date}</p>
                      <p className="text-sm text-gray-600">{reservation.time}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(reservation.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Ações Rápidas</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-gray-600">• Adicionar nova reserva manual</p>
            <p className="text-sm text-gray-600">• Confirmar reservas pendentes</p>
            <p className="text-sm text-gray-600">• Verificar disponibilidade de mesas</p>
            <p className="text-sm text-gray-600">• Gerenciar configurações do restaurante</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Dicas</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-gray-600">• Configure horários de funcionamento</p>
            <p className="text-sm text-gray-600">• Compartilhe seu link público</p>
            <p className="text-sm text-gray-600">• Confirme reservas rapidamente</p>
            <p className="text-sm text-gray-600">• Monitore sua taxa de ocupação</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
