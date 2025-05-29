
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Printer, Clock, ChefHat, Filter } from 'lucide-react';

const PrintOrdersPage = () => {
  const [selectedSector, setSelectedSector] = useState('all');
  
  const [orders] = useState([
    {
      id: 1,
      tableNumber: 5,
      items: [
        { name: 'Bruschetta Tradicional', quantity: 2, sector: 'cozinha' },
        { name: 'Risotto de Camarão', quantity: 1, sector: 'cozinha' }
      ],
      sector: 'cozinha',
      createdAt: '2024-01-15T19:30:00',
      status: 'pending'
    },
    {
      id: 2,
      tableNumber: 3,
      items: [
        { name: 'Caipirinha', quantity: 2, sector: 'bar' },
        { name: 'Cerveja Long Neck', quantity: 3, sector: 'bar' }
      ],
      sector: 'bar',
      createdAt: '2024-01-15T19:25:00',
      status: 'pending'
    },
    {
      id: 3,
      tableNumber: 8,
      items: [
        { name: 'Café Expresso', quantity: 2, sector: 'balcao' }
      ],
      sector: 'balcao',
      createdAt: '2024-01-15T19:20:00',
      status: 'printed'
    }
  ]);

  const [printHistory] = useState([
    {
      id: 1,
      tableNumber: 2,
      items: ['Pizza Margherita', 'Refrigerante'],
      sector: 'cozinha',
      printedAt: '2024-01-15T19:10:00'
    },
    {
      id: 2,
      tableNumber: 6,
      items: ['Mojito', 'Whisky Sour'],
      sector: 'bar',
      printedAt: '2024-01-15T19:05:00'
    }
  ]);

  const filteredOrders = selectedSector === 'all' 
    ? orders 
    : orders.filter(order => order.sector === selectedSector);

  const pendingOrders = orders.filter(order => order.status === 'pending').length;

  const getSectorBadge = (sector: string) => {
    const variants = {
      cozinha: 'bg-red-100 text-red-800',
      bar: 'bg-blue-100 text-blue-800',
      balcao: 'bg-green-100 text-green-800'
    };
    
    const labels = {
      cozinha: '🍳 Cozinha',
      bar: '🍹 Bar',
      balcao: '☕ Balcão'
    };

    return (
      <Badge className={variants[sector as keyof typeof variants]}>
        {labels[sector as keyof typeof labels]}
      </Badge>
    );
  };

  const getTimeElapsed = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMinutes = Math.floor((now.getTime() - created.getTime()) / (1000 * 60));
    return diffMinutes;
  };

  const handlePrintOrder = (orderId: number) => {
    // Simular impressão
    const printContent = orders.find(order => order.id === orderId);
    if (printContent) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Pedido #${orderId} - Mesa ${printContent.tableNumber}</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; }
                .item { margin: 5px 0; }
                .total { border-top: 1px solid #000; margin-top: 10px; padding-top: 10px; font-weight: bold; }
              </style>
            </head>
            <body>
              <div class="header">
                <h2>MESA FÁCIL</h2>
                <p>Pedido #${orderId} - Mesa ${printContent.tableNumber}</p>
                <p>${getSectorBadge(printContent.sector).props.children}</p>
                <p>${new Date().toLocaleString()}</p>
              </div>
              <div class="items">
                ${printContent.items.map(item => `
                  <div class="item">${item.quantity}x ${item.name}</div>
                `).join('')}
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const handlePrintAll = () => {
    const pendingOrdersList = orders.filter(order => order.status === 'pending' && 
      (selectedSector === 'all' || order.sector === selectedSector));
    
    if (pendingOrdersList.length > 0) {
      pendingOrdersList.forEach(order => handlePrintOrder(order.id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">🖨️ Central de Impressão</h1>
          <p className="text-gray-600">Gerencie a impressão de pedidos por setor</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-orange-100 text-orange-800 px-3 py-2">
            📋 {pendingOrders} pedidos pendentes
          </Badge>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-medium">Cozinha</p>
                <p className="text-2xl font-bold text-red-700">
                  {orders.filter(o => o.sector === 'cozinha' && o.status === 'pending').length}
                </p>
              </div>
              <ChefHat className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Bar</p>
                <p className="text-2xl font-bold text-blue-700">
                  {orders.filter(o => o.sector === 'bar' && o.status === 'pending').length}
                </p>
              </div>
              <div className="text-2xl">🍹</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Balcão</p>
                <p className="text-2xl font-bold text-green-700">
                  {orders.filter(o => o.sector === 'balcao' && o.status === 'pending').length}
                </p>
              </div>
              <div className="text-2xl">☕</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Total Pendente</p>
                <p className="text-2xl font-bold text-purple-700">{pendingOrders}</p>
              </div>
              <Printer className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">🚀 Ações Rápidas</h3>
              <p className="text-orange-100">Imprima todos os pedidos pendentes de uma vez</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="secondary" onClick={handlePrintAll}>
                <Printer className="w-4 h-4 mr-2" />
                🖨️ Imprimir Todos ({filteredOrders.filter(o => o.status === 'pending').length})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="pending" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="pending">📋 Pedidos Pendentes</TabsTrigger>
            <TabsTrigger value="history">📜 Histórico</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">🏠 Todos os setores</option>
              <option value="cozinha">🍳 Cozinha</option>
              <option value="bar">🍹 Bar</option>
              <option value="balcao">☕ Balcão</option>
            </select>
          </div>
        </div>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOrders.filter(order => order.status === 'pending').map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">🪑 Mesa {order.tableNumber}</CardTitle>
                      <p className="text-sm text-gray-600">
                        📋 Pedido #{order.id} • ⏰ {getTimeElapsed(order.createdAt)}min atrás
                      </p>
                    </div>
                    {getSectorBadge(order.sector)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="space-y-1 bg-gray-50 p-3 rounded-lg">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>🍽️ {item.quantity}x {item.name}</span>
                        </div>
                      ))}
                    </div>
                    
                    {getTimeElapsed(order.createdAt) > 10 && (
                      <div className="flex items-center text-sm text-red-600 bg-red-50 p-2 rounded-lg">
                        <Clock className="w-4 h-4 mr-1" />
                        ⚠️ Pedido com mais de 10 min
                      </div>
                    )}

                    <Button 
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500"
                      onClick={() => handlePrintOrder(order.id)}
                    >
                      <Printer className="w-4 h-4 mr-2" />
                      🖨️ Imprimir Agora
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {printHistory.map((item) => (
              <Card key={item.id} className="opacity-75">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">🪑 Mesa {item.tableNumber}</CardTitle>
                      <p className="text-sm text-gray-600">
                        🖨️ Impresso às {new Date(item.printedAt).toLocaleTimeString()}
                      </p>
                    </div>
                    {getSectorBadge(item.sector)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      {item.items.map((itemName, index) => (
                        <div key={index} className="text-sm">
                          ✅ {itemName}
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      🔄 Reimprimir
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

export default PrintOrdersPage;
