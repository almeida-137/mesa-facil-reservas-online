
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChefHat, Calendar, Users, Smartphone, CreditCard, Shield } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Mesa Fácil
            </h1>
          </div>
          <div className="space-x-2">
            <Button variant="outline" asChild>
              <Link to="/login">Entrar</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              <Link to="/register">Começar Grátis</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Gerencie as reservas do seu{' '}
          <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            restaurante
          </span>{' '}
          de forma simples
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Substitua planilhas, papéis e WhatsApp por um sistema completo de reservas online. 
          Evite overbooking e organize melhor seu atendimento.
        </p>
        <div className="space-x-4">
          <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
            <Link to="/register">Começar Teste Grátis</Link>
          </Button>
          <Button variant="outline" size="lg">
            Ver Demo
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">Funcionalidades</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Gestão de Reservas</h4>
              <p className="text-gray-600">
                Controle completo das reservas com status, horários e capacidade das mesas.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Smartphone className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Página Pública</h4>
              <p className="text-gray-600">
                Link único para seus clientes fazerem reservas online 24/7.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Controle de Mesas</h4>
              <p className="text-gray-600">
                Gerencie suas mesas, capacidade e evite overbooking automaticamente.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <CreditCard className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Pagamento Seguro</h4>
              <p className="text-gray-600">
                Cobrança recorrente mensal via Stripe. Cancele quando quiser.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Dados Seguros</h4>
              <p className="text-gray-600">
                Seus dados e de seus clientes protegidos com criptografia.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <ChefHat className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Multi-tenant</h4>
              <p className="text-gray-600">
                Cada restaurante tem seus dados completamente isolados.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">Planos</h3>
        <div className="max-w-md mx-auto">
          <Card className="border-orange-200 shadow-lg">
            <CardContent className="p-8 text-center">
              <h4 className="text-2xl font-bold mb-2">Plano Único</h4>
              <div className="text-4xl font-bold text-orange-600 mb-4">
                R$ 29<span className="text-lg text-gray-500">/mês</span>
              </div>
              <ul className="text-left space-y-2 mb-6">
                <li>✅ Reservas ilimitadas</li>
                <li>✅ Gestão de mesas</li>
                <li>✅ Página pública personalizada</li>
                <li>✅ Dashboard completo</li>
                <li>✅ Suporte por email</li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600" asChild>
                <Link to="/register">Começar Teste Grátis</Link>
              </Button>
              <p className="text-sm text-gray-500 mt-2">7 dias grátis, cancele quando quiser</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">Mesa Fácil</h1>
          </div>
          <p className="text-gray-400">
            © 2024 Mesa Fácil. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
