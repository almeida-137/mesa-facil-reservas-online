
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Minus, Users, DollarSign, Clock, Trash2 } from 'lucide-react';

interface TableOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  table: any;
}

const TableOrderModal = ({ open, onOpenChange, table }: TableOrderModalProps) => {
  const [comandas, setComandas] = useState([
    {
      id: 1,
      customerName: 'João Silva',
      items: [
        { id: 1, name: 'Hambúrguer Especial', price: 25.90, quantity: 1 },
        { id: 2, name: 'Refrigerante', price: 6.50, quantity: 2 }
      ],
      total: 38.90,
      startTime: '19:30'
    }
  ]);

  const [newCustomerName, setNewCustomerName] = useState('');

  const menuItems = [
    { id: 1, name: 'Hambúrguer Especial', price: 25.90, category: 'Pratos' },
    { id: 2, name: 'Pizza Margherita', price: 35.90, category: 'Pratos' },
    { id: 3, name: 'Refrigerante', price: 6.50, category: 'Bebidas' },
    { id: 4, name: 'Combo Família 🎯', price: 89.90, category: 'Combos', isCombo: true }
  ];

  const addComanda = () => {
    if (newCustomerName.trim()) {
      const newComanda = {
        id: Date.now(),
        customerName: newCustomerName,
        items: [],
        total: 0,
        startTime: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      setComandas([...comandas, newComanda]);
      setNewCustomerName('');
    }
  };

  const addItemToComanda = (comandaId: number, item: any) => {
    setComandas(prev => prev.map(comanda => {
      if (comanda.id === comandaId) {
        const existingItem = comanda.items.find(i => i.id === item.id);
        let newItems;
        
        if (existingItem) {
          newItems = comanda.items.map(i => 
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        } else {
          newItems = [...comanda.items, { ...item, quantity: 1 }];
        }
        
        const newTotal = newItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
        
        return { ...comanda, items: newItems, total: newTotal };
      }
      return comanda;
    }));
  };

  const getTableAvatar = () => {
    if (table?.status === 'occupied' && comandas.length > 0) {
      const totalValue = comandas.reduce((sum, c) => sum + c.total, 0);
      if (totalValue > 100) return '😍';
      return '😊';
    }
    return '🍽️';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-2xl">{getTableAvatar()}</span>
            {table?.name} - Comandas
          </DialogTitle>
          <DialogDescription>
            Gerencie os pedidos e comandas desta mesa
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="comandas" className="h-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="comandas">Comandas Ativas</TabsTrigger>
            <TabsTrigger value="novo-pedido">Novo Pedido</TabsTrigger>
          </TabsList>

          <TabsContent value="comandas" className="space-y-4 max-h-96 overflow-y-auto">
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Nome do cliente"
                value={newCustomerName}
                onChange={(e) => setNewCustomerName(e.target.value)}
              />
              <Button onClick={addComanda} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-1" />
                Nova Comanda
              </Button>
            </div>

            <div className="space-y-4">
              {comandas.map((comanda) => (
                <Card key={comanda.id} className="hover:shadow-lg transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {comanda.customerName}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-3 h-3" />
                          Iniciado às {comanda.startTime}
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        R$ {comanda.total.toFixed(2)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {comanda.items.length > 0 ? (
                      <div className="space-y-2">
                        {comanda.items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                            <span className="text-sm">{item.quantity}x {item.name}</span>
                            <span className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">Nenhum item adicionado</p>
                    )}
                    
                    <div className="mt-3 pt-3 border-t flex justify-between items-center">
                      <span className="font-semibold">Total: R$ {comanda.total.toFixed(2)}</span>
                      <Button size="sm" variant="outline" className="text-green-600">
                        <DollarSign className="w-3 h-3 mr-1" />
                        Fechar Conta
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="novo-pedido" className="space-y-4 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuItems.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-sm">
                        {item.name} {item.isCombo && '🎯'}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-green-600">
                        R$ {item.price.toFixed(2)}
                      </span>
                      <div className="flex gap-1">
                        {comandas.map((comanda) => (
                          <Button
                            key={comanda.id}
                            size="sm"
                            onClick={() => addItemToComanda(comanda.id, item)}
                            className="bg-orange-500 hover:bg-orange-600 text-xs px-2"
                          >
                            + {comanda.customerName.split(' ')[0]}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default TableOrderModal;
