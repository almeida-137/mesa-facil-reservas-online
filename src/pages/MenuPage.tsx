
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Plus, Edit, Trash2, Search, ChefHat, DollarSign, Image, TrendingUp, Star, Eye } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MenuPage = () => {
  // Mock data - replace with Supabase data
  const [categories, setCategories] = useState([
    { id: 1, name: 'Entradas', itemCount: 8 },
    { id: 2, name: 'Pratos Principais', itemCount: 12 },
    { id: 3, name: 'Bebidas', itemCount: 15 },
    { id: 4, name: 'Sobremesas', itemCount: 6 }
  ]);

  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: 'Bruschetta Tradicional',
      description: 'Pão italiano tostado com tomate, manjericão e azeite',
      price: 18.90,
      categoryId: 1,
      category: 'Entradas',
      available: true,
      image: null,
      views: 45,
      orders: 12
    },
    {
      id: 2,
      name: 'Risotto de Camarão',
      description: 'Risotto cremoso com camarões frescos e aspargos',
      price: 45.90,
      categoryId: 2,
      category: 'Pratos Principais',
      available: true,
      image: null,
      views: 89,
      orders: 28
    },
    {
      id: 3,
      name: 'Refrigerante Lata',
      description: 'Coca-Cola, Guaraná, Fanta - 350ml',
      price: 6.50,
      categoryId: 3,
      category: 'Bebidas',
      available: true,
      image: null,
      views: 156,
      orders: 67
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const totalItems = menuItems.length;
  const availableItems = menuItems.filter(item => item.available).length;
  const totalViews = menuItems.reduce((sum, item) => sum + item.views, 0);
  const totalOrders = menuItems.reduce((sum, item) => sum + item.orders, 0);
  const conversionRate = totalViews > 0 ? Math.round((totalOrders / totalViews) * 100) : 0;

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.categoryId.toString() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getAvailabilityBadge = (available: boolean) => {
    return (
      <Badge className={available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
        {available ? '✅ Disponível' : '❌ Indisponível'}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">🍽️ Cardápio Digital</h1>
          <p className="text-gray-600">Gerencie seus pratos de forma inteligente</p>
        </div>
        <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
          <Plus className="w-4 h-4 mr-2" />
          Novo Item
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Total de Itens</p>
                <p className="text-2xl font-bold text-blue-700">{totalItems}</p>
              </div>
              <ChefHat className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Disponíveis</p>
                <p className="text-2xl font-bold text-green-700">{availableItems}</p>
              </div>
              <Star className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Visualizações</p>
                <p className="text-2xl font-bold text-purple-700">{totalViews}</p>
              </div>
              <Eye className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium">Taxa de Conversão</p>
                <p className="text-2xl font-bold text-orange-700">{conversionRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
            </div>
            <Progress value={conversionRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Performance Card */}
      <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">🎯 Meta de Performance</h3>
              <p className="text-emerald-100">Conversão de 25% do cardápio</p>
              <div className="mt-2">
                <Progress value={conversionRate} className="bg-emerald-400" />
                <p className="text-sm mt-1">{conversionRate}% de conversão atual</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{totalOrders}</p>
              <p className="text-emerald-200">pedidos hoje</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="items" className="space-y-4">
        <TabsList>
          <TabsTrigger value="items">🍽️ Itens do Cardápio</TabsTrigger>
          <TabsTrigger value="categories">📂 Categorias</TabsTrigger>
        </TabsList>

        <TabsContent value="items" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="🔍 Buscar por nome ou descrição..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">📋 Todas as categorias</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id.toString()}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Menu Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">📂 {item.category}</p>
                    </div>
                    {getAvailabilityBadge(item.available)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                      <Image className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    
                    {/* Performance metrics */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-blue-50 p-2 rounded text-center">
                        <p className="font-medium text-blue-700">{item.views}</p>
                        <p className="text-blue-600">👀 visualizações</p>
                      </div>
                      <div className="bg-green-50 p-2 rounded text-center">
                        <p className="font-medium text-green-700">{item.orders}</p>
                        <p className="text-green-600">🛒 pedidos</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-lg font-bold text-green-600 bg-green-50 p-2 rounded-lg">
                      <DollarSign className="w-4 h-4 mr-1" />
                      R$ {item.price.toFixed(2)}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-3 h-3 mr-1" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">📂 Categorias</h2>
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Nova Categoria
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Card key={category.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-lg">📂 {category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-2xl font-bold text-gray-700">{category.itemCount}</p>
                      <p className="text-sm text-gray-600">itens</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-3 h-3 mr-1" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-3 h-3" />
                      </Button>
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

export default MenuPage;
