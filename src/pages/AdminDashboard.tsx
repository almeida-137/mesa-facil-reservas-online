
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Settings, Plus, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReservationForm from "@/components/ReservationForm";
import RestaurantSettings from "@/components/RestaurantSettings";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAddReservation, setShowAddReservation] = useState(false);

  // Mock data for reservations
  const [reservations, setReservations] = useState([
    {
      id: 1,
      customerName: "João Silva",
      phone: "(11) 99999-9999",
      date: "2024-05-28",
      time: "19:00",
      people: 4,
      status: "confirmed",
      notes: "Mesa próxima à janela"
    },
    {
      id: 2,
      customerName: "Maria Santos",
      phone: "(11) 88888-8888",
      date: "2024-05-28",
      time: "20:30",
      people: 2,
      status: "pending",
      notes: "Aniversário"
    },
    {
      id: 3,
      customerName: "Pedro Costa",
      phone: "(11) 77777-7777",
      date: "2024-05-29",
      time: "18:30",
      people: 6,
      status: "confirmed",
      notes: ""
    }
  ]);

  const getStatusBadge = (status: string) => {
    const variants = {
      confirmed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800"
    };
    
    const labels = {
      confirmed: "Confirmada",
      pending: "Pendente",
      cancelled: "Cancelada"
    };

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const updateReservationStatus = (id: number, newStatus: string) => {
    setReservations(prev => 
      prev.map(reservation => 
        reservation.id === id ? { ...reservation, status: newStatus } : reservation
      )
    );
  };

  const addReservation = (newReservation: any) => {
    const reservation = {
      id: Date.now(),
      ...newReservation,
      status: "confirmed"
    };
    setReservations(prev => [...prev, reservation]);
    setShowAddReservation(false);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reservas Hoje</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">+1 desde ontem</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Aguardando confirmação</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pessoas</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Para hoje</p>
          </CardContent>
        </Card>
      </div>

      {/* Reservations Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Reservas</CardTitle>
            <CardDescription>Gerencie todas as reservas do seu restaurante</CardDescription>
          </div>
          <Button 
            onClick={() => setShowAddReservation(true)}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Reserva
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reservations.map((reservation) => (
              <div key={reservation.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="font-semibold">{reservation.customerName}</h4>
                      <p className="text-sm text-gray-600">{reservation.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{reservation.date} - {reservation.time}</p>
                      <p className="text-sm text-gray-600">{reservation.people} pessoas</p>
                    </div>
                    {reservation.notes && (
                      <div>
                        <p className="text-sm text-gray-600">Obs: {reservation.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(reservation.status)}
                  <div className="space-x-1">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => updateReservationStatus(reservation.id, "confirmed")}
                      className="text-green-600 border-green-300 hover:bg-green-50"
                    >
                      Confirmar
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateReservationStatus(reservation.id, "cancelled")}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Mesa Fácil - Admin
            </h1>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="border-orange-300 text-orange-600 hover:bg-orange-50"
          >
            <Home className="w-4 h-4 mr-2" />
            Página Inicial
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex space-x-8">
          {/* Sidebar */}
          <div className="w-64 space-y-2">
            <Button
              variant={activeTab === "dashboard" ? "default" : "ghost"}
              className={`w-full justify-start ${activeTab === "dashboard" ? "bg-gradient-to-r from-orange-500 to-red-500" : ""}`}
              onClick={() => setActiveTab("dashboard")}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button
              variant={activeTab === "settings" ? "default" : "ghost"}
              className={`w-full justify-start ${activeTab === "settings" ? "bg-gradient-to-r from-orange-500 to-red-500" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "dashboard" && renderDashboard()}
            {activeTab === "settings" && <RestaurantSettings />}
          </div>
        </div>
      </div>

      {/* Add Reservation Modal */}
      {showAddReservation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Adicionar Reserva Manual</h3>
            <ReservationForm 
              onSubmit={addReservation}
              onCancel={() => setShowAddReservation(false)}
              isManual={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
