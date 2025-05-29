
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts";
import { 
  Calendar, 
  Clock, 
  User, 
  TrendingUp, 
  DollarSign, 
  ChefHat, 
  Star,
  Target,
  Award,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  // Mock data para demonstração
  const weeklyData = [
    { day: "Seg", reservas: 12, pedidos: 28, receita: 850 },
    { day: "Ter", reservas: 15, pedidos: 32, receita: 920 },
    { day: "Qua", reservas: 18, pedidos: 38, receita: 1100 },
    { day: "Qui", reservas: 22, pedidos: 45, receita: 1250 },
    { day: "Sex", reservas: 28, pedidos: 52, receita: 1450 },
    { day: "Sáb", reservas: 35, pedidos: 65, receita: 1650 },
    { day: "Dom", reservas: 25, pedidos: 48, receita: 1200 },
  ];

  const chartConfig = {
    reservas: {
      label: "Reservas",
      color: "#FF6B35",
    },
    pedidos: {
      label: "Pedidos",
      color: "#F7931E",
    },
    receita: {
      label: "Receita",
      color: "#FFD23F",
    },
  };

  // Mock das próximas reservas
  const nextReservations = [
    {
      id: 1,
      customerName: "João Silva",
      time: "19:00",
      people: 4,
      table: "Mesa 5"
    },
    {
      id: 2,
      customerName: "Maria Santos",
      time: "19:30",
      people: 2,
      table: "Mesa 2"
    },
    {
      id: 3,
      customerName: "Pedro Costa",
      time: "20:00",
      people: 6,
      table: "Mesa 8"
    }
  ];

  // Mock dos pedidos ativos
  const activeOrders = [
    {
      id: 1,
      table: "Mesa 3",
      items: ["Salmão Grelhado", "Vinho Tinto"],
      status: "Em preparo",
      time: "5 min"
    },
    {
      id: 2,
      table: "Mesa 7",
      items: ["Pizza Margherita", "Coca-Cola"],
      status: "Pronto",
      time: "1 min"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header com saudação */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Bem-vindo de volta! 👋</h1>
            <p className="text-orange-100 mt-1">Aqui está o que está acontecendo no seu restaurante hoje</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-orange-100">Hoje</div>
            <div className="text-2xl font-bold">{new Date().toLocaleDateString('pt-BR')}</div>
          </div>
        </div>
      </div>

      {/* Cards de métricas principais - Gamificados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-emerald-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Receita Hoje</CardTitle>
            <div className="bg-green-500 p-2 rounded-full">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">R$ 1.650</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +15% vs ontem
            </div>
            <div className="mt-2">
              <Badge className="bg-green-500 text-white">🎯 Meta 85%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Reservas Hoje</CardTitle>
            <div className="bg-blue-500 p-2 rounded-full">
              <Calendar className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">35</div>
            <div className="flex items-center text-xs text-blue-600 mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8% vs semana passada
            </div>
            <div className="mt-2">
              <Badge className="bg-blue-500 text-white">🔥 Recorde!</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Pedidos Ativos</CardTitle>
            <div className="bg-purple-500 p-2 rounded-full">
              <ChefHat className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-800">12</div>
            <div className="flex items-center text-xs text-purple-600 mt-1">
              <Clock className="w-3 h-3 mr-1" />
              Tempo médio: 18min
            </div>
            <div className="mt-2">
              <Badge className="bg-purple-500 text-white">⚡ Rápido</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-yellow-100 border-amber-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-700">Satisfação</CardTitle>
            <div className="bg-amber-500 p-2 rounded-full">
              <Star className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-800">4.8</div>
            <div className="flex items-center text-xs text-amber-600 mt-1">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Baseado em 127 avaliações
            </div>
            <div className="mt-2">
              <Badge className="bg-amber-500 text-white">⭐ Excelente</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seção de conquistas e metas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span>Conquistas</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">🏆 Primeiro Milhão</span>
              <Badge className="bg-white/20 text-white">Desbloqueado</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">🎯 100 Reservas/Dia</span>
              <Badge className="bg-white/20 text-white">85/100</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">⭐ 5 Estrelas</span>
              <Badge className="bg-white/20 text-white">Em progresso</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-orange-600" />
              <span>Metas do Mês</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Receita</span>
                <span>R$ 8.200 / R$ 10.000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Reservas</span>
                <span>420 / 500</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '84%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Satisfação</span>
                <span>4.8 / 5.0</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-purple-600" />
              <span>Ações Rápidas</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link to="/admin/reservations">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                📅 Ver Reservas
              </Button>
            </Link>
            <Link to="/admin/orders">
              <Button className="w-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600">
                🍽️ Gerenciar Pedidos
              </Button>
            </Link>
            <Link to="/admin/menu">
              <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                📋 Editar Cardápio
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos e listas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance da Semana</CardTitle>
            <CardDescription>Reservas e pedidos dos últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="reservas" fill="var(--color-reservas)" radius={4} />
                  <Bar dataKey="pedidos" fill="var(--color-pedidos)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximas Reservas</CardTitle>
            <CardDescription>Reservas confirmadas para hoje</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nextReservations.map((reservation) => (
                <div key={reservation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-500 text-white p-2 rounded-full">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium">{reservation.customerName}</p>
                      <p className="text-sm text-gray-600">{reservation.table} • {reservation.people} pessoas</p>
                    </div>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">{reservation.time}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pedidos ativos */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Pedidos Ativos</CardTitle>
            <CardDescription>Pedidos em preparo e prontos para servir</CardDescription>
          </div>
          <Link to="/admin/orders">
            <Button variant="outline">Ver Todos</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-500 text-white p-2 rounded-full">
                    <ChefHat className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium">{order.table}</p>
                    <p className="text-sm text-gray-600">{order.items.join(", ")}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={order.status === "Pronto" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                    {order.status}
                  </Badge>
                  <span className="text-sm text-gray-500">{order.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
