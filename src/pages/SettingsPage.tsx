
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { Save, Clock, MapPin, Phone, Mail, Users, Shield, Bell, Palette, Globe } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SettingsPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // Mock settings - replace with Supabase data
  const [settings, setSettings] = useState({
    restaurantName: user?.restaurant_name || '',
    restaurantSlug: user?.restaurant_slug || '',
    description: 'Restaurante familiar com ambiente aconchegante e pratos tradicionais.',
    address: 'Rua das Flores, 123 - Centro',
    phone: '(11) 3333-4444',
    email: user?.email || '',
    openTime: '11:00',
    closeTime: '23:00',
    reservationDuration: 120,
    allowOnlineReservations: true,
    requireConfirmation: true,
    maxAdvanceDays: 30,
    minAdvanceHours: 2,
    whatsappNotifications: true,
    emailNotifications: false,
    smsNotifications: false
  });

  const profileCompletion = 85; // percentage

  const handleSave = async () => {
    setLoading(true);
    // TODO: Save to Supabase
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleChange = (field: string, value: string | number | boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">⚙️ Configurações</h1>
          <p className="text-gray-600">Personalize sua experiência no Mesa Fácil</p>
        </div>
        <Button 
          onClick={handleSave}
          disabled={loading}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
        >
          <Save className="w-4 h-4 mr-2" />
          {loading ? '💾 Salvando...' : '💾 Salvar Tudo'}
        </Button>
      </div>

      {/* Profile Completion */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-100 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-blue-800">🎯 Completude do Perfil</h3>
              <p className="text-blue-600">Complete seu perfil para melhor experiência</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-700">{profileCompletion}%</p>
              <p className="text-blue-600 text-sm">completo</p>
            </div>
          </div>
          <Progress value={profileCompletion} className="mb-2" />
          <p className="text-sm text-blue-600">Faltam apenas {100 - profileCompletion}% para completar!</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="restaurant" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="restaurant">🏪 Restaurante</TabsTrigger>
          <TabsTrigger value="reservations">📅 Reservas</TabsTrigger>
          <TabsTrigger value="notifications">🔔 Notificações</TabsTrigger>
          <TabsTrigger value="security">🔒 Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="restaurant" className="space-y-6">
          {/* Restaurant Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                🏪 Informações do Restaurante
              </CardTitle>
              <CardDescription>
                Dados que aparecerão na página pública de reservas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="restaurantName">Nome do Restaurante</Label>
                  <Input
                    id="restaurantName"
                    value={settings.restaurantName}
                    onChange={(e) => handleChange('restaurantName', e.target.value)}
                    placeholder="Ex: Restaurante do João"
                  />
                </div>
                <div>
                  <Label htmlFor="restaurantSlug">🔗 Link Público</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      /r/
                    </span>
                    <Input
                      id="restaurantSlug"
                      value={settings.restaurantSlug}
                      onChange={(e) => handleChange('restaurantSlug', e.target.value)}
                      className="rounded-l-none"
                      placeholder="meu-restaurante"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">📝 Descrição</Label>
                <Textarea
                  id="description"
                  value={settings.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={3}
                  placeholder="Descreva seu restaurante..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="address" className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    📍 Endereço
                  </Label>
                  <Input
                    id="address"
                    value={settings.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    placeholder="Rua, número, bairro"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    📞 Telefone
                  </Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Operating Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                🕐 Horário de Funcionamento
              </CardTitle>
              <CardDescription>
                Configure os horários em que aceita reservas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="openTime">🌅 Abertura</Label>
                  <Input
                    id="openTime"
                    type="time"
                    value={settings.openTime}
                    onChange={(e) => handleChange('openTime', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="closeTime">🌙 Fechamento</Label>
                  <Input
                    id="closeTime"
                    type="time"
                    value={settings.closeTime}
                    onChange={(e) => handleChange('closeTime', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="reservationDuration">⏱️ Duração da Reserva (min)</Label>
                  <Input
                    id="reservationDuration"
                    type="number"
                    value={settings.reservationDuration}
                    onChange={(e) => handleChange('reservationDuration', Number(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reservations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                📅 Configurações de Reserva
              </CardTitle>
              <CardDescription>
                Controle como as reservas funcionam no seu restaurante
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <Label htmlFor="allowOnlineReservations">🌐 Aceitar Reservas Online</Label>
                      <p className="text-sm text-gray-600">Permite que clientes façam reservas pela página pública</p>
                    </div>
                    <Switch
                      id="allowOnlineReservations"
                      checked={settings.allowOnlineReservations}
                      onCheckedChange={(checked) => handleChange('allowOnlineReservations', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <div>
                      <Label htmlFor="requireConfirmation">✅ Exigir Confirmação</Label>
                      <p className="text-sm text-gray-600">Reservas ficam pendentes até confirmação manual</p>
                    </div>
                    <Switch
                      id="requireConfirmation"
                      checked={settings.requireConfirmation}
                      onCheckedChange={(checked) => handleChange('requireConfirmation', checked)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="maxAdvanceDays">📅 Reserva Antecipada (dias)</Label>
                    <Input
                      id="maxAdvanceDays"
                      type="number"
                      value={settings.maxAdvanceDays}
                      onChange={(e) => handleChange('maxAdvanceDays', Number(e.target.value))}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="minAdvanceHours">⏰ Antecedência Mínima (horas)</Label>
                    <Input
                      id="minAdvanceHours"
                      type="number"
                      value={settings.minAdvanceHours}
                      onChange={(e) => handleChange('minAdvanceHours', Number(e.target.value))}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                🔔 Preferências de Notificação
              </CardTitle>
              <CardDescription>
                Configure como você deseja ser notificado sobre eventos importantes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <Label>📱 Notificações WhatsApp</Label>
                    <p className="text-sm text-gray-600">Receba alertas de novas reservas via WhatsApp</p>
                  </div>
                  <Switch
                    checked={settings.whatsappNotifications}
                    onCheckedChange={(checked) => handleChange('whatsappNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <Label>📧 Notificações por E-mail</Label>
                    <p className="text-sm text-gray-600">Receba alertas de novas reservas por e-mail</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleChange('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div>
                    <Label>💬 Notificações SMS</Label>
                    <p className="text-sm text-gray-600">Receba alertas importantes via SMS</p>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => handleChange('smsNotifications', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                🔒 Segurança da Conta
              </CardTitle>
              <CardDescription>
                Mantenha sua conta segura com essas configurações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">📧 E-mail da Conta</h4>
                  <p className="text-sm text-gray-600 mb-2">{user?.email}</p>
                  <Button variant="outline" size="sm">
                    ✏️ Alterar E-mail
                  </Button>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">🔑 Senha</h4>
                  <p className="text-sm text-gray-600 mb-2">Última alteração: 15 dias atrás</p>
                  <Button variant="outline" size="sm">
                    🔄 Alterar Senha
                  </Button>
                </div>

                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-medium mb-2 text-red-800">⚠️ Zona de Perigo</h4>
                  <p className="text-sm text-red-600 mb-3">Ações irreversíveis para sua conta</p>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                      📥 Exportar Dados
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                      🗑️ Excluir Conta
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
