
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Clock, DollarSign, Plus, Minus } from 'lucide-react';

interface TableOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  table: any;
}

const TableOrderModal = ({ isOpen, onClose, table }: TableOrderModalProps) => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      items: [
        { name: 'Bruschetta Tradicional', quantity: 2, price: 18.90 },
        { name: 'Refrigerante', quantity: 1, price: 6.50 }
      ],
      total: 44.30,
      customer: 'Cliente 1',
      startTime: '19:30'
    }
  ]);

  const [newOrderItems, setNewOrderItems] = useState<any[]>([]);

  const menuItems = [
    { id: 1, name: 'Bruschetta Tradicional', price: 18.90, category: 'Entradas' },
    { id: 2, name: 'Risotto de Camarão', price: 45.90, category: 'Pratos Principais' },
    { id: 3, name: 'Refrigerante', price: 6.50, category: 'Bebidas' },
    { id: 4, name: 'Combo Burger + Batata', price: 32.90, category: 'Combos', isCombo: true }
  ];

  const addItemToOrder = (item: any) => {
    const existingItem = newOrderItems.find(orderItem => orderItem.id === item.id);
    if (existingItem) {
      setNewOrderItems(prev => 
        prev.map(orderItem => 
          orderItem.id === item.id 
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        )
      );
    } else {
      setNewOrderItems(prev => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const removeItemFromOrder = (itemId: number) => {
    setNewOrderItems(prev => 
      prev.map(item => 
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const newOrderTotal = newOrderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tableTotal = orders.reduce((sum, order) => sum + order.total, 0) + newOrderTotal;

  const getTableAvatar = () => {
    if (tableTotal > 100) return '😍'; // Mesa VIP
    if (orders.length > 0) return '😊'; // Mesa feliz
    return '🍽️'; // Mesa normal
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span className="text-2xl">{getTableAvatar()}</span>
            <span>🪑 {table?.name} - Comandas</span>
            <Badge className={tableTotal > 100 ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}>
              {tableTotal > 100 ? '⭐ VIP' : '😊 Ativa'}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Gerencie os pedidos e comandas desta mesa
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">📋 Comandas Ativas</TabsTrigger>
            <TabsTrigger value="new-order">➕ Novo Pedido</TabsTrigger>
            <TabsTrigger value="summary">💰 Resumo</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>👤 {order.customer}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">
                        <Clock className="w-3 h-3 mr-1" />
                        {order.startTime}
                      </Badge>
                      <Badge className="bg-green-100 text-green-800">
                        R$ {order.total.toFixed(2)}
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                        <span>{item.quantity}x {item.name}</span>
                        <span className="font-medium">R$ {(item.quantity * item.price).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline" size="sm">Editar</Button>
                    <Button variant="outline" size="sm" className="text-green-600">
                      💳 Fechar Conta
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="new-order" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>🍽️ Cardápio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {menuItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-2 border rounded hover:bg-gray-50">
                      <div>
                        <p className="font-medium">{item.isCombo ? '🎯 ' : ''}{item.name}</p>
                        <p className="text-sm text-gray-600">{item.category}</p>
                        <p className="text-green-600 font-bold">R$ {item.price.toFixed(2)}</p>
                      </div>
                      <Button size="sm" onClick={() => addItemToOrder(item)}>
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>🛒 Pedido Atual</CardTitle>
                </CardHeader>
                <CardContent>
                  {newOrderItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Nenhum item adicionado</p>
                  ) : (
                    <div className="space-y-2">
                      {newOrderItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center bg-blue-50 p-2 rounded">
                          <div>
                            <span>{item.quantity}x {item.name}</span>
                            <p className="text-sm text-gray-600">R$ {(item.quantity * item.price).toFixed(2)}</p>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => removeItemFromOrder(item.id)}>
                            <Minus className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between font-bold">
                          <span>Total:</span>
                          <span className="text-green-600">R$ {newOrderTotal.toFixed(2)}</span>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 mt-4">
                        🎉 Enviar Pedido
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="summary">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="text-2xl mr-2">{getTableAvatar()}</span>
                  💰 Resumo da Mesa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <Users className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm text-blue-600">Comandas Ativas</p>
                    <p className="text-xl font-bold text-blue-700">{orders.length}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <DollarSign className="w-6 h-6 mx-auto mb-2 text-green-600" />
                    <p className="text-sm text-green-600">Total Consumido</p>
                    <p className="text-xl font-bold text-green-700">R$ {tableTotal.toFixed(2)}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                    <p className="text-sm text-purple-600">Tempo na Mesa</p>
                    <p className="text-xl font-bold text-purple-700">45 min</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button className="w-full" variant="outline">
                    📄 Imprimir Conta
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-green-600">
                    💳 Finalizar e Fechar Mesa
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default TableOrderModal;
