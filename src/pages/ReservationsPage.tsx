
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Filter, Phone, Clock, Users } from 'lucide-react';

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
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

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
          <h1 className="text-3xl font-bold text-gray-900">Reservas</h1>
          <p className="text-gray-600">Gerencie todas as reservas do seu restaurante</p>
        </div>
        <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
          <Plus className="w-4 h-4 mr-2" />
          Nova Reserva
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por nome ou telefone..."
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
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="confirmed">Confirmadas</SelectItem>
                <SelectItem value="cancelled">Canceladas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reservations List */}
      <div className="space-y-4">
        {filteredReservations.map((reservation) => (
          <Card key={reservation.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between md:justify-start md:space-x-4">
                    <h3 className="font-semibold text-lg">{reservation.customerName}</h3>
                    {getStatusBadge(reservation.status)}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      {reservation.phone}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {reservation.date} às {reservation.time}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Mesa {reservation.tableNumber} - {reservation.guests} pessoas
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {reservation.status === 'pending' && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Confirmar
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                  {reservation.status !== 'cancelled' && (
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      Cancelar
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
            <p className="text-gray-500">Nenhuma reserva encontrada</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReservationsPage;
