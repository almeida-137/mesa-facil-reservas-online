
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RestaurantSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    restaurantName: "Restaurante Demo",
    logo: "",
    numberOfTables: "10",
    openTime: "18:00",
    closeTime: "23:00",
    maxReservationsPerSlot: "3",
    reservationButtonText: "Reserve sua Mesa",
    confirmationMessage: "Obrigado! Sua reserva foi registrada com sucesso. Em breve entraremos em contato para confirmar.",
    whatsappNotifications: true,
    emailNotifications: false
  });

  const publicUrl = `${window.location.origin}/reserva-demo`;

  const handleSave = () => {
    // In a real app, this would save to database
    toast({
      title: "Configurações salvas!",
      description: "As alterações foram aplicadas com sucesso.",
    });
  };

  const copyPublicUrl = () => {
    navigator.clipboard.writeText(publicUrl);
    toast({
      title: "Link copiado!",
      description: "O link público foi copiado para a área de transferência.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Public Link Card */}
      <Card>
        <CardHeader>
          <CardTitle>Link Público para Reservas</CardTitle>
          <CardDescription>
            Compartilhe este link com seus clientes para que possam fazer reservas online
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input value={publicUrl} readOnly className="flex-1" />
            <Button variant="outline" onClick={copyPublicUrl}>
              <Copy className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.open(publicUrl, '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Este é o link que seus clientes usarão para fazer reservas. Você pode compartilhar via WhatsApp, redes sociais ou colocar no seu site.
          </p>
        </CardContent>
      </Card>

      {/* Restaurant Information */}
      <Card>
        <CardHeader>
          <CardTitle>Informações do Restaurante</CardTitle>
          <CardDescription>
            Configure as informações básicas do seu restaurante
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="restaurantName">Nome do Restaurante</Label>
            <Input
              id="restaurantName"
              value={settings.restaurantName}
              onChange={(e) => setSettings(prev => ({ ...prev, restaurantName: e.target.value }))}
            />
          </div>
          
          <div>
            <Label htmlFor="logo">URL da Logo (opcional)</Label>
            <Input
              id="logo"
              value={settings.logo}
              onChange={(e) => setSettings(prev => ({ ...prev, logo: e.target.value }))}
              placeholder="https://exemplo.com/logo.png"
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="numberOfTables">Número de Mesas</Label>
              <Input
                id="numberOfTables"
                type="number"
                value={settings.numberOfTables}
                onChange={(e) => setSettings(prev => ({ ...prev, numberOfTables: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="maxReservations">Reservas por Horário</Label>
              <Input
                id="maxReservations"
                type="number"
                value={settings.maxReservationsPerSlot}
                onChange={(e) => setSettings(prev => ({ ...prev, maxReservationsPerSlot: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Operating Hours */}
      <Card>
        <CardHeader>
          <CardTitle>Horário de Funcionamento</CardTitle>
          <CardDescription>
            Defina os horários disponíveis para reservas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="openTime">Horário de Abertura</Label>
              <Input
                id="openTime"
                type="time"
                value={settings.openTime}
                onChange={(e) => setSettings(prev => ({ ...prev, openTime: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="closeTime">Horário de Fechamento</Label>
              <Input
                id="closeTime"
                type="time"
                value={settings.closeTime}
                onChange={(e) => setSettings(prev => ({ ...prev, closeTime: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customization */}
      <Card>
        <CardHeader>
          <CardTitle>Personalização</CardTitle>
          <CardDescription>
            Customize as mensagens exibidas aos seus clientes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="buttonText">Texto do Botão de Reserva</Label>
            <Input
              id="buttonText"
              value={settings.reservationButtonText}
              onChange={(e) => setSettings(prev => ({ ...prev, reservationButtonText: e.target.value }))}
            />
          </div>
          
          <div>
            <Label htmlFor="confirmationMessage">Mensagem de Confirmação</Label>
            <Textarea
              id="confirmationMessage"
              value={settings.confirmationMessage}
              onChange={(e) => setSettings(prev => ({ ...prev, confirmationMessage: e.target.value }))}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notificações</CardTitle>
          <CardDescription>
            Configure como você deseja ser notificado sobre novas reservas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Notificações por WhatsApp</Label>
              <p className="text-sm text-gray-600">Receba alertas de novas reservas via WhatsApp</p>
            </div>
            <Switch
              checked={settings.whatsappNotifications}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, whatsappNotifications: checked }))}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>Notificações por E-mail</Label>
              <p className="text-sm text-gray-600">Receba alertas de novas reservas por e-mail</p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSave}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
        >
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
};

export default RestaurantSettings;
