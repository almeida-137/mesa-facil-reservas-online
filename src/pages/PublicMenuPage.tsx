
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ChefHat, 
  ShoppingCart, 
  Plus, 
  Minus, 
  DollarSign, 
  Clock,
  Phone,
  MapPin
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PublicMenuPage = () => {
  const { restaurantSlug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock restaurant data
  const restaurant = {
    name: 'Restaurante Demo',
    description: 'Restaurante familiar com ambiente aconchegante',
    address: 'Rua das Flores, 123 - Centro',
    phone: '(11) 3333-4444'
  };

  // Mock menu data
  const [categories] = useState([
    { id: 1, name: 'Entradas', items: [] },
    { id: 2, name: 'Pratos Principais', items: [] },
    { id: 3, name: 'Bebidas', items: [] },
    { id: 4, name: 'Sobremesas', items: [] }
  ]);

  const [menuItems] = useState([
    {
      id: 1,
      name: 'Bruschetta Tradicional',
      description: 'Pão italiano tostado com tomate, manjericão e azeite',
      price: 18.90,
      categoryId: 1,
      available: true,
      image: null
    },
    {
      id: 2,
      name: 'Risotto de Camarão',
      description: 'Risotto cremoso com camarões frescos e aspargos',
      price: 45.90,
      categoryId: 2,
      available: true,
      image: null
    },
    {
      id: 3,
      name: 'Refrigerante Lata',
      description: 'Coca-Cola, Guaraná, Fanta - 350ml',
      price: 6.50,
      categoryId: 3,
      available: true,
      image: null
    },
    {
      id: 4,
      name: 'Tiramisu',
      description: 'Sobremesa italiana com café e mascarpone',
      price: 22.90,
      categoryId: 4,
      available: true,
      image: null
    }
  ]);

  const [cart, setCart] = useState<{[key: number]: number}>({});
  const [tableNumber, setTableNumber] = useState('');
  const [showCart, setShowCart] = useState(false);

  const addToCart = (itemId: number) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removeFromCart = (itemId: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = menuItems.find(i => i.id === parseInt(itemId));
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };

  const getCartItemCount = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  const submitOrder = () => {
    if (!tableNumber) {
      toast({
        title: "Mesa obrigatória",
        description: "Por favor, informe o número da sua mesa",
        variant: "destructive"
      });
      return;
    }

    if (getCartItemCount() === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione itens ao seu pedido",
        variant: "destructive"
      });
      return;
    }

    // TODO: Send order to backend
    toast({
      title: "Pedido enviado!",
      description: `Seu pedido da Mesa ${tableNumber} foi enviado para a cozinha`,
    });

    setCart({});
    setShowCart(false);
  };

  const getItemsByCategory = (categoryId: number) => {
    return menuItems.filter(item => item.categoryId === categoryId && item.available);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{restaurant.name}</h1>
                <p className="text-sm text-gray-600">Cardápio Digital</p>
              </div>
            </div>
            
            <Button
              onClick={() => setShowCart(true)}
              className="relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Carrinho
              {getCartItemCount() > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-600 text-white px-2 py-1 text-xs">
                  {getCartItemCount()}
                </Badge>
              )}
            </Button>
          </div>

          {/* Table Number Input */}
          <div className="mt-4 max-w-sm">
            <Input
              placeholder="Número da mesa (ex: 5)"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="text-center font-medium"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Restaurant Info */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid md:grid-cols-2 gap-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <MapPin className="w-4 h-4 text-gray-600" />
                <span className="text-sm">{restaurant.address}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Phone className="w-4 h-4 text-gray-600" />
                <span className="text-sm">{restaurant.phone}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Categories */}
        <div className="space-y-8">
          {categories.map((category) => {
            const categoryItems = getItemsByCategory(category.id);
            if (categoryItems.length === 0) return null;

            return (
              <div key={category.id}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{category.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryItems.map((item) => (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                            <div className="flex items-center mt-2 text-lg font-bold text-green-600">
                              <DollarSign className="w-4 h-4 mr-1" />
                              R$ {item.price.toFixed(2)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          {cart[item.id] ? (
                            <div className="flex items-center space-x-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="font-medium">{cart[item.id]}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addToCart(item.id)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          ) : (
                            <Button
                              onClick={() => addToCart(item.id)}
                              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Adicionar
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md max-h-[80vh] overflow-hidden">
            <CardHeader>
              <CardTitle>Seu Pedido - Mesa {tableNumber || '?'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              {Object.entries(cart).map(([itemId, quantity]) => {
                const item = menuItems.find(i => i.id === parseInt(itemId));
                if (!item) return null;

                return (
                  <div key={itemId} className="flex justify-between items-center">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">{quantity}x R$ {item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span>{quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addToCart(item.id)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                );
              })}
              
              {getCartItemCount() === 0 && (
                <p className="text-center text-gray-500 py-8">Seu carrinho está vazio</p>
              )}
            </CardContent>
            
            {getCartItemCount() > 0 && (
              <div className="border-t p-4 space-y-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>R$ {getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setShowCart(false)} className="flex-1">
                    Continuar
                  </Button>
                  <Button onClick={submitOrder} className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    Enviar Pedido
                  </Button>
                </div>
              </div>
            )}
            
            {getCartItemCount() === 0 && (
              <div className="border-t p-4">
                <Button variant="outline" onClick={() => setShowCart(false)} className="w-full">
                  Fechar
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default PublicMenuPage;
