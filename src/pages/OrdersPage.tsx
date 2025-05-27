
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, DollarSign, ChefHat } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const OrdersPage = () => {
  // Mock data - replace with Supabase data
  const [orders, setOrders] = useState([
    {
      id: 1,
      tableNumber: 5,
      customerName: 'Mesa 5',
      items: [
        { name: 'Bruschetta Tradicional', quantity: 2, price: 18.90 },
        { name: 'Risotto de Camarão', quantity: 1, price: 45.90 }
      ],
      total: 83.70,
      status: 'received',
      createdAt: '2024-01-15T19:30:00',
      estimatedTime: 25
    },
    {
      id: 2,
      tableNumber: 3,
      customerName: 'Mesa 3',
      items: [
        { name: 'Refrigerante Lata', quantity: 2, price: 6.50 }
      ],
      total: 13.00,
      status: 'preparing',
      createdAt: '2024-01-15T19:15:00',
      estimatedTime: 5
    },
    {
      id: 3,
      tableNumber: 8,
      customerName: 'Mesa 8',
      items: [
        { name: 'Bruschetta Tradicional', quantity: 1, price: 18.90 },
        { name: 'Refrigerante Lata', quantity: 3, price: 6.50 }
      ],
      total: 38.40,
      status: 'ready',
      createdAt: '2024-01-15T19:00:00',
      estimatedTime: 0
    }
  ]);

  const [activeOrders, setActiveOrders] = useState([
    {
      tableNumber: 5,
      orders: [
        { id: 1, total: 83.70, status: 'received' },
        { id: 4, total: 25.50, status: 'preparing' }
      ],
      totalConsumed: 109.20,
      startTime: '19:30'
    },
    {
      tableNumber: 3,
      orders: [
        { id: 2, total: 13.00, status: 'preparing' }
      ],
      totalConsumed: 13.00,
      startTime: '19:15'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const variants = {
      received: 'bg-blue-100 text-blue-800',
      preparing: 'bg-yellow-100 text-yellow-800',
      ready: 'bg-green-100 text-green-800',
      delivered: 'bg-gray-100 text-gray-800'
    };
    
    const labels = {
      received: 'Recebido',
      preparing: 'Em preparo',
      ready: 'Pronto',
      delivered: 'Entregue'
    };

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const updateOrderStatus = (orderId: number, newStatus: string) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getTimeElapsed = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMinutes = Math.floor((now.getTime() - created.getTime()) / (1000 * 60));
    return diffMinutes;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pedidos</h1>
          <p className="text-gray-600">Acompanhe todos os pedidos em tempo real</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>Atualização automática</span>
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Pedidos Ativos</TabsTrigger>
          <TabsTrigger value="tables">Consumo por Mesa</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.filter(order => order.status !== 'delivered').map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Mesa {order.tableNumber}</CardTitle>
                      <p className="text-sm text-gray-600">
                        Pedido #{order.id} • {getTimeElapsed(order.createdAt)}min atrás
                      </p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.quantity}x {item.name}</span>
                          <span>R$ {(item.quantity * item.price).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>R$ {order.total.toFixed(2)}</span>
                      </div>
                    </div>

                    {order.estimatedTime > 0 && (
                      <div className="flex items-center text-sm text-orange-600">
                        <Clock className="w-4 h-4 mr-1" />
                        {order.estimatedTime} min restantes
                      </div>
                    )}

                    <div className="flex space-x-2">
                      {order.status === 'received' && (
                        <Button 
                          size="sm" 
                          className="flex-1 bg-yellow-600 hover:bg-yellow-700"
                          onClick={() => updateOrderStatus(order.id, 'preparing')}
                        >
                          <ChefHat className="w-3 h-3 mr-1" />
                          Iniciar Preparo
                        </Button>
                      )}
                      
                      {order.status === 'preparing' && (
                        <Button 
                          size="sm" 
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          onClick={() => updateOrderStatus(order.id, 'ready')}
                        >
                          Marcar Pronto
                        </Button>
                      )}
                      
                      {order.status === 'ready' && (
                        <Button 
                          size="sm" 
                          className="flex-1 bg-gray-600 hover:bg-gray-700"
                          onClick={() => updateOrderStatus(order.id, 'delivered')}
                        >
                          Marcar Entregue
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tables" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeOrders.map((table) => (
              <Card key={table.tableNumber}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Mesa {table.tableNumber}</span>
                    <Badge variant="outline">{table.orders.length} pedidos</Badge>
                  </CardTitle>
                  <CardDescription>
                    Iniciado às {table.startTime}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      {table.orders.map((order) => (
                        <div key={order.id} className="flex justify-between items-center text-sm">
                          <span>Pedido #{order.id}</span>
                          <div className="flex items-center space-x-2">
                            <span>R$ {order.total.toFixed(2)}</span>
                            {getStatusBadge(order.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t pt-2">
                      <div className="flex justify-between items-center font-semibold text-lg">
                        <span>Total Consumido:</span>
                        <span className="text-green-600">R$ {table.totalConsumed.toFixed(2)}</span>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      <DollarSign className="w-3 h-3 mr-1" />
                      Fechar Conta
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrdersPage;
