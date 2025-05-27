
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, User, UserCheck } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Calendar,
      title: "Reservas Online",
      description: "Substitua o papel e WhatsApp por um sistema profissional"
    },
    {
      icon: Clock,
      title: "Gestão de Horários",
      description: "Configure horários de funcionamento e limite de reservas"
    },
    {
      icon: User,
      title: "Painel Administrativo",
      description: "Dashboard completo para gerenciar todas as reservas"
    },
    {
      icon: UserCheck,
      title: "Página Pública",
      description: "Link único para seus clientes fazerem reservas"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Mesa Fácil
            </h1>
          </div>
          <div className="space-x-3">
            <Button variant="outline" onClick={() => navigate('/reserva-demo')}>
              Ver Demo
            </Button>
            <Button 
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              onClick={() => navigate('/admin')}
            >
              Painel Admin
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
            Sistema de Reservas Online para Restaurantes
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Substitua reservas via papel, WhatsApp ou planilhas por um sistema profissional. 
            Perfeito para restaurantes de pequeno e médio porte.
          </p>
          <div className="space-x-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg px-8 py-3"
              onClick={() => navigate('/admin')}
            >
              Começar Agora
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-3 border-orange-300 text-orange-600 hover:bg-orange-50"
              onClick={() => navigate('/reserva-demo')}
            >
              Ver Página de Reserva
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4 text-gray-800">
            Tudo que seu restaurante precisa
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Uma solução completa para modernizar seu sistema de reservas
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 border-orange-100">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg text-gray-800">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Pronto para modernizar seu restaurante?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Configure seu sistema em minutos e comece a receber reservas online hoje mesmo
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="text-lg px-8 py-3 bg-white text-orange-600 hover:bg-gray-50"
            onClick={() => navigate('/admin')}
          >
            Acessar Painel Administrativo
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
