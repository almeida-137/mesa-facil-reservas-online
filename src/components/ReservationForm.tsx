
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ReservationFormProps {
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  isManual: boolean;
}

const ReservationForm = ({ onSubmit, onCancel, isManual }: ReservationFormProps) => {
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    date: "",
    time: "",
    people: "2",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handlePhoneChange = (value: string) => {
    // Simple phone mask for Brazilian numbers
    const cleaned = value.replace(/\D/g, '');
    let formatted = cleaned;
    
    if (cleaned.length >= 11) {
      formatted = cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (cleaned.length >= 7) {
      formatted = cleaned.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
    } else if (cleaned.length >= 3) {
      formatted = cleaned.replace(/(\d{2})(\d+)/, '($1) $2');
    }
    
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  // Generate time slots (restaurant hours: 18:00 to 23:00)
  const timeSlots = [];
  for (let hour = 18; hour <= 23; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeSlots.push(time);
    }
  }

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="customerName">Nome Completo *</Label>
          <Input
            id="customerName"
            value={formData.customerName}
            onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
            required
            placeholder="Digite seu nome completo"
          />
        </div>
        
        <div>
          <Label htmlFor="phone">Telefone/WhatsApp *</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            required
            placeholder="(11) 99999-9999"
            maxLength={15}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="date">Data da Reserva *</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            min={today}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="time">Horário *</Label>
          <Select 
            value={formData.time} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, time: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o horário" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="people">Número de Pessoas *</Label>
          <Select 
            value={formData.people} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, people: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1,2,3,4,5,6,7,8,9,10].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? 'pessoa' : 'pessoas'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="notes">Observações</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="Alguma observação especial? (opcional)"
          rows={3}
        />
      </div>

      <div className={`flex gap-3 ${isManual ? 'justify-end' : 'justify-center'}`}>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button 
          type="submit" 
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-8"
        >
          {isManual ? 'Adicionar Reserva' : 'Confirmar Reserva'}
        </Button>
      </div>
    </form>
  );
};

export default ReservationForm;
