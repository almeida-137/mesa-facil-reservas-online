
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Phone } from "lucide-react";
import ReservationForm from "@/components/ReservationForm";

const PublicReservation = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  // Mock restaurant data
  const restaurant = {
    name: "Restaurante Demo",
    address: "Rua das Flores, 123 - Centro",
    phone: "(11) 3333-4444",
    openHours: "Ter-Dom: 18h às 23h",
    logo: null
  };

  const handleReservationSubmit = (data: any) => {
    console.log("Nova reserva:", data);
    setSubmittedData(data);
    setShowConfirmation(true);
  };

  if (showConfirmation && submittedData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-green-600">Reserva Confirmada!</CardTitle>
            <CardDescription>
              Sua reserva foi registrada com sucesso
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg text-left">
              <h4 className="font-semibold mb-2">Detalhes da Reserva:</h4>
              <p><strong>Nome:</strong> {submittedData.customerName}</p>
              <p><strong>Data:</strong> {submittedData.date}</p>
              <p><strong>Horário:</strong> {submittedData.time}</p>
              <p><strong>Pessoas:</strong> {submittedData.people}</p>
              {submittedData.notes && (
                <p><strong>Observações:</strong> {submittedData.notes}</p>
              )}
            </div>
            <div className="text-sm text-gray-600">
              <p>Em breve você receberá uma confirmação via WhatsApp ou telefone.</p>
              <p className="mt-2">Aguardamos você no <strong>{restaurant.name}</strong>!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Restaurant Header */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              {restaurant.logo ? (
                <img src={restaurant.logo} alt={restaurant.name} className="w-full h-full object-cover rounded-full" />
              ) : (
                <Calendar className="w-10 h-10 text-white" />
              )}
            </div>
            <CardTitle className="text-3xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {restaurant.name}
            </CardTitle>
            <CardDescription className="text-lg">
              Faça sua reserva online de forma rápida e fácil
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                <span className="text-sm">{restaurant.address}</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5 text-orange-500" />
                <span className="text-sm">{restaurant.phone}</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-5 h-5 text-orange-500" />
                <span className="text-sm">{restaurant.openHours}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reservation Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Reserve sua Mesa</CardTitle>
            <CardDescription className="text-center">
              Preencha os dados abaixo para garantir sua mesa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReservationForm 
              onSubmit={handleReservationSubmit}
              isManual={false}
            />
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>Powered by <span className="font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Mesa Fácil</span></p>
        </div>
      </div>
    </div>
  );
};

export default PublicReservation;
