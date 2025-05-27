
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { Save, Clock, MapPin, Phone, Mail } from 'lucide-react';

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
    minAdvanceHours: 2
  });

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
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600">Configure as informações do seu restaurante</p>
      </div>

      <div className="grid gap-6">
        {/* Restaurant Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informações do Restaurante</CardTitle>
            <CardDescription>
              Dados básicos que aparecerão na página pública de reservas
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
                />
              </div>
              <div>
                <Label htmlFor="restaurantSlug">Link Público</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    /r/
                  </span>
                  <Input
                    id="restaurantSlug"
                    value={settings.restaurantSlug}
                    onChange={(e) => handleChange('restaurantSlug', e.target.value)}
                    className="rounded-l-none"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={settings.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="address" className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Endereço
                </Label>
                <Input
                  id="address"
                  value={settings.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone" className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Telefone
                </Label>
                <Input
                  id="phone"
                  value={settings.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
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
              Horário de Funcionamento
            </CardTitle>
            <CardDescription>
              Configure os horários em que aceita reservas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="openTime">Horário de Abertura</Label>
                <Input
                  id="openTime"
                  type="time"
                  value={settings.openTime}
                  onChange={(e) => handleChange('openTime', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="closeTime">Horário de Fechamento</Label>
                <Input
                  id="closeTime"
                  type="time"
                  value={settings.closeTime}
                  onChange={(e) => handleChange('closeTime', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="reservationDuration">Duração da Reserva (min)</Label>
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

        {/* Reservation Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Configurações de Reserva</CardTitle>
            <CardDescription>
              Controle como as reservas funcionam no seu restaurante
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="allowOnlineReservations">Aceitar Reservas Online</Label>
                <p className="text-sm text-gray-600">Permite que clientes façam reservas pela página pública</p>
              </div>
              <Switch
                id="allowOnlineReservations"
                checked={settings.allowOnlineReservations}
                onCheckedChange={(checked) => handleChange('allowOnlineReservations', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="requireConfirmation">Exigir Confirmação</Label>
                <p className="text-sm text-gray-600">Reservas ficam pendentes até confirmação manual</p>
              </div>
              <Switch
                id="requireConfirmation"
                checked={settings.requireConfirmation}
                onCheckedChange={(checked) => handleChange('requireConfirmation', checked)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="maxAdvanceDays">Reserva com Antecedência (dias)</Label>
                <Input
                  id="maxAdvanceDays"
                  type="number"
                  value={settings.maxAdvanceDays}
                  onChange={(e) => handleChange('maxAdvanceDays', Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="minAdvanceHours">Antecedência Mínima (horas)</Label>
                <Input
                  id="minAdvanceHours"
                  type="number"
                  value={settings.minAdvanceHours}
                  onChange={(e) => handleChange('minAdvanceHours', Number(e.target.value))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button 
            onClick={handleSave}
            disabled={loading}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
          >
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Salvando...' : 'Salvar Configurações'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
