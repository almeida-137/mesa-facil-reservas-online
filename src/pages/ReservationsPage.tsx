
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Plus, Search, Phone, Clock, Users, Calendar, TrendingUp, CheckCircle } from 'lucide-react';

const ReservationsPage = () => {
  // Mock data - replace with Supabase data
  const [reservations, setReservations] = useState([
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
    },
    {
      id: 4,
      customerName: 'Ana Oliveira',
      phone: '(11) 66666-6666',
      tableNumber: 2,
      date: '2024-01-16',
      time: '18:00',
      guests: 2,
      status: 'cancelled'
    },
    {
      id: 5,
      customerName: 'Carlos Mendes',
      phone: '(11) 55555-5555',
      tableNumber: 1,
      date: '2024-01-15',
      time: '21:00',
      guests: 3,
      status: 'pending'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const confirmedReservations = reservations.filter(r => r.status === 'confirmed').length;
  const pendingReservations = reservations.filter(r => r.status === 'pending').length;
  const totalGuests = reservations.filter(r => r.status !== 'cancelled').reduce((sum, r) => sum + r.guests, 0);
  const conversionRate = Math.round((confirmedReservations / (confirmedReservations + pendingReservations)) * 100);

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

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📅 Central de Reservas</h1>
          <p className="text-gray-600">Gerencie todas as reservas de forma inteligente</p>
        </div>
        <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
          <Plus className="w-4 h-4 mr-2" />
          Nova Reserva
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Confirmadas</p>
                <p className="text-2xl font-bold text-green-700">{confirmedReservations}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-amber-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 text-sm font-medium">Pendentes</p>
                <p className="text-2xl font-bold text-yellow-700">{pendingReservations}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Total de Pessoas</p>
                <p className="text-2xl font-bold text-blue-700">{totalGuests}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Taxa de Conversão</p>
                <p className="text-2xl font-bold text-purple-700">{conversionRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
            <Progress value={conversionRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Achievement Card */}
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">🏆 Meta Semanal</h3>
              <p className="text-indigo-100">50 reservas confirmadas</p>
              <div className="mt-2">
                <Progress value={(confirmedReservations / 50) * 100} className="bg-indigo-400" />
                <p className="text-sm mt-1">{confirmedReservations} de 50 reservas</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{confirmedReservations}</p>
              <p className="text-indigo-200">reservas</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="🔍 Buscar por nome ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">📋 Todos os status</SelectItem>
                <SelectItem value="pending">⏰ Pendentes</SelectItem>
                <SelectItem value="confirmed">✅ Confirmadas</SelectItem>
                <SelectItem value="cancelled">❌ Canceladas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reservations List */}
      <div className="space-y-4">
        {filteredReservations.map((reservation) => (
          <Card key={reservation.id} className="hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between md:justify-start md:space-x-4">
                    <h3 className="font-semibold text-lg">👤 {reservation.customerName}</h3>
                    {getStatusBadge(reservation.status)}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                    <div className="flex items-center bg-gray-50 p-2 rounded-lg">
                      <Phone className="w-4 h-4 mr-2" />
                      {reservation.phone}
                    </div>
                    <div className="flex items-center bg-gray-50 p-2 rounded-lg">
                      <Calendar className="w-4 h-4 mr-2" />
                      {reservation.date} às {reservation.time}
                    </div>
                    <div className="flex items-center bg-gray-50 p-2 rounded-lg">
                      <Users className="w-4 h-4 mr-2" />
                      Mesa {reservation.tableNumber} - {reservation.guests} pessoas
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {reservation.status === 'pending' && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      ✅ Confirmar
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    ✏️ Editar
                  </Button>
                  {reservation.status !== 'cancelled' && (
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      ❌ Cancelar
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReservations.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhuma reserva encontrada</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReservationsPage;
