
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays, Clock, MapPin, Phone, Users, ChefHat } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PublicReservationPage = () => {
  const { restaurantSlug } = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Mock restaurant data - replace with Supabase query
  const restaurant = {
    name: 'Restaurante Demo',
    description: 'Restaurante familiar com ambiente aconchegante e pratos tradicionais.',
    address: 'Rua das Flores, 123 - Centro',
    phone: '(11) 3333-4444',
    openTime: '11:00',
    closeTime: '23:00'
  };

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: '2'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Save reservation to Supabase
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Reserva enviada!",
        description: "Sua reserva foi enviada com sucesso. Aguarde a confirmação do restaurante.",
      });
      
      // Reset form
      setFormData({
        customerName: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        guests: '2'
      });
    }, 1500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateTimeSlots = () => {
    const slots = [];
    const start = 11; // 11:00
    const end = 22; // 22:00
    
    for (let hour = start; hour <= end; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      if (hour < end) {
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
      }
    }
    
    return slots;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Restaurant Header */}
          <Card className="mb-8">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <ChefHat className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl">{restaurant.name}</CardTitle>
              <CardDescription className="text-lg">{restaurant.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">{restaurant.address}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">{restaurant.phone}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">{restaurant.openTime} às {restaurant.closeTime}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reservation Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarDays className="w-5 h-5 mr-2" />
                Fazer Reserva
              </CardTitle>
              <CardDescription>
                Preencha os dados abaixo para fazer sua reserva
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerName">Nome Completo *</Label>
                    <Input
                      id="customerName"
                      value={formData.customerName}
                      onChange={(e) => handleChange('customerName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="date">Data *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Horário *</Label>
                    <Select value={formData.time} onValueChange={(value) => handleChange('time', value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o horário" />
                      </SelectTrigger>
                      <SelectContent>
                        {generateTimeSlots().map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="guests">Número de Pessoas *</Label>
                    <Select value={formData.guests} onValueChange={(value) => handleChange('guests', value)} required>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-2" />
                              {num} {num === 1 ? 'pessoa' : 'pessoas'}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Informações Importantes:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Sua reserva será confirmada pelo restaurante</li>
                    <li>• Você receberá um contato em até 1 hora</li>
                    <li>• Cancelamentos devem ser feitos com 2 horas de antecedência</li>
                    <li>• Tolerância de 15 minutos para chegada</li>
                  </ul>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg py-6"
                >
                  {loading ? 'Enviando reserva...' : 'Fazer Reserva'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PublicReservationPage;
