
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Printer, Clock, AlertTriangle, CheckCircle, ChefHat, Coffee, ShoppingBag } from 'lucide-react';

const PrintOrdersPage = () => {
  const [printHistory, setPrintHistory] = useState([
    {
      id: 1,
      orderNumber: '#001',
      table: 'Mesa 5',
      sector: 'cozinha',
      items: ['2x Hambúrguer Especial', '1x Batata Frita'],
      printedAt: '19:45',
      status: 'printed'
    },
    {
      id: 2,
      orderNumber: '#002',
      table: 'Mesa 3',
      sector: 'bar',
      items: ['3x Refrigerante', '1x Suco Natural'],
      printedAt: '19:40',
      status: 'printed'
    }
  ]);

  const [pendingOrders] = useState([
    {
      id: 1,
      orderNumber: '#003',
      table: 'Mesa 8',
      sector: 'cozinha',
      items: ['1x Pizza Margherita', '2x Refrigerante'],
      createdAt: '19:50',
      waitTime: 8,
      priority: 'normal'
    },
    {
      id: 2,
      orderNumber: '#004',
      table: 'Mesa 2',
      sector: 'bar',
      items: ['2x Cerveja', '1x Porção Batata'],
      createdAt: '19:45',
      waitTime: 13,
      priority: 'urgent'
    },
    {
      id: 3,
      orderNumber: '#005',
      table: 'Mesa 6',
      sector: 'balcao',
      items: ['1x Combo Família', '3x Refrigerante'],
      createdAt: '19:52',
      waitTime: 6,
      priority: 'normal'
    }
  ]);

  const handlePrint = (order: any) => {
    // Simular impressão
    console.log('Imprimindo pedido:', order);
    
    // Criar conteúdo para impressão
    const printContent = `
      <div style="font-family: monospace; padding: 20px;">
        <h2>PEDIDO ${order.orderNumber}</h2>
        <hr>
        <p><strong>Mesa:</strong> ${order.table}</p>
        <p><strong>Setor:</strong> ${order.sector.toUpperCase()}</p>
        <p><strong>Horário:</strong> ${order.createdAt}</p>
        <hr>
        <h3>ITENS:</h3>
        ${order.items.map((item: string) => `<p>• ${item}</p>`).join('')}
        <hr>
        <p style="text-align: center;">*** MESA FÁCIL ***</p>
      </div>
    `;
    
    // Abrir janela de impressão
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    }

    // Adicionar ao histórico
    const newHistoryItem = {
      id: Date.now(),
      orderNumber: order.orderNumber,
      table: order.table,
      sector: order.sector,
      items: order.items,
      printedAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: 'printed'
    };
    
    setPrintHistory(prev => [newHistoryItem, ...prev]);
  };

  const getSectorIcon = (sector: string) => {
    switch (sector) {
      case 'cozinha': return <ChefHat className="w-4 h-4" />;
      case 'bar': return <Coffee className="w-4 h-4" />;
      case 'balcao': return <ShoppingBag className="w-4 h-4" />;
      default: return <Printer className="w-4 h-4" />;
    }
  };

  const getSectorColor = (sector: string) => {
    switch (sector) {
      case 'cozinha': return 'bg-red-100 text-red-800';
      case 'bar': return 'bg-blue-100 text-blue-800';
      case 'balcao': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadge = (priority: string, waitTime: number) => {
    if (waitTime > 10 || priority === 'urgent') {
      return <Badge className="bg-red-100 text-red-800 animate-pulse">🚨 Urgente</Badge>;
    }
    return <Badge className="bg-green-100 text-green-800">✅ Normal</Badge>;
  };

  const filterOrdersBySector = (sector: string) => {
    return pendingOrders.filter(order => order.sector === sector);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">🖨️ Impressão de Pedidos</h1>
          <p className="text-gray-600">Gerencie a impressão por setor e acompanhe o histórico</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-lg">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span>🔄 Atualização automática</span>
        </div>
      </div>

      {/* Métricas de Impressão */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-medium">Cozinha</p>
                <p className="text-2xl font-bold text-red-700">{filterOrdersBySector('cozinha').length}</p>
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
                <p className="text-2xl font-bold text-blue-700">{filterOrdersBySector('bar').length}</p>
              </div>
              <Coffee className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Balcão</p>
                <p className="text-2xl font-bold text-green-700">{filterOrdersBySector('balcao').length}</p>
              </div>
              <ShoppingBag className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Total Hoje</p>
                <p className="text-2xl font-bold text-purple-700">{printHistory.length}</p>
              </div>
              <Printer className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pendentes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pendentes">📋 Pedidos Pendentes</TabsTrigger>
          <TabsTrigger value="historico">📜 Histórico de Impressões</TabsTrigger>
        </TabsList>

        <TabsContent value="pendentes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {getSectorIcon(order.sector)}
                        {order.orderNumber}
                      </CardTitle>
                      <p className="text-sm text-gray-600">{order.table}</p>
                    </div>
                    <div className="space-y-1">
                      <Badge className={getSectorColor(order.sector)}>
                        {order.sector.toUpperCase()}
                      </Badge>
                      {getPriorityBadge(order.priority, order.waitTime)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm font-medium mb-2">Itens:</p>
                      {order.items.map((item, index) => (
                        <p key={index} className="text-sm text-gray-700">• {item}</p>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {order.waitTime} min atrás
                      </div>
                      <span>📅 {order.createdAt}</span>
                    </div>

                    {order.waitTime > 10 && (
                      <div className="flex items-center gap-2 text-red-600 bg-red-50 p-2 rounded-lg">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-sm">Pedido com mais de 10 min!</span>
                      </div>
                    )}

                    <Button 
                      onClick={() => handlePrint(order)}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
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

        <TabsContent value="historico" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {printHistory.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {getSectorIcon(item.sector)}
                        {item.orderNumber}
                      </CardTitle>
                      <p className="text-sm text-gray-600">{item.table}</p>
                    </div>
                    <div className="space-y-1">
                      <Badge className={getSectorColor(item.sector)}>
                        {item.sector.toUpperCase()}
                      </Badge>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Impresso
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm font-medium mb-2">Itens:</p>
                      {item.items.map((itemName, index) => (
                        <p key={index} className="text-sm text-gray-700">• {itemName}</p>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Printer className="w-3 h-3" />
                        Impresso às {item.printedAt}
                      </div>
                    </div>
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
