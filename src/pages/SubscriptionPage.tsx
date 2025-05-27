
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Check, CreditCard, AlertCircle, Crown } from 'lucide-react';

const SubscriptionPage = () => {
  const { subscribed, checkSubscription } = useAuth();
  const [loading, setLoading] = useState(false);

  // Mock subscription data - replace with Stripe integration
  const subscriptionData = {
    status: subscribed ? 'active' : 'inactive',
    plan: 'Mesa Fácil Pro',
    price: 'R$ 49,90',
    nextBilling: '2024-02-15',
    paymentMethod: '**** **** **** 1234'
  };

  const features = [
    'Reservas ilimitadas',
    'Gestão completa de mesas',
    'Página pública personalizada',
    'Dashboard em tempo real',
    'Suporte prioritário',
    'Relatórios avançados',
    'Integração WhatsApp (em breve)',
    'App mobile (em breve)'
  ];

  const handleSubscribe = async () => {
    setLoading(true);
    // TODO: Integrate with Stripe Checkout
    setTimeout(() => {
      setLoading(false);
      checkSubscription();
    }, 2000);
  };

  const handleManageBilling = () => {
    // TODO: Redirect to Stripe customer portal
    console.log('Redirect to billing portal');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Assinatura</h1>
        <p className="text-gray-600">Gerencie sua assinatura do Mesa Fácil</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Current Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Status da Assinatura
              {subscribed ? (
                <Badge className="bg-green-100 text-green-800">
                  <Check className="w-3 h-3 mr-1" />
                  Ativo
                </Badge>
              ) : (
                <Badge className="bg-red-100 text-red-800">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Inativo
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {subscribed ? (
              <>
                <div>
                  <p className="text-sm text-gray-600">Plano Atual</p>
                  <p className="font-semibold">{subscriptionData.plan}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Valor Mensal</p>
                  <p className="font-semibold text-2xl text-green-600">{subscriptionData.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Próxima Cobrança</p>
                  <p className="font-semibold">{subscriptionData.nextBilling}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Forma de Pagamento</p>
                  <p className="font-semibold">{subscriptionData.paymentMethod}</p>
                </div>
                <Button 
                  onClick={handleManageBilling}
                  variant="outline" 
                  className="w-full"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Gerenciar Cobrança
                </Button>
              </>
            ) : (
              <div className="text-center py-6">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Assinatura Inativa</h3>
                <p className="text-gray-600 mb-4">
                  Para continuar usando o Mesa Fácil, você precisa ativar sua assinatura.
                </p>
                <Button 
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  {loading ? 'Processando...' : 'Ativar Assinatura'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Plan Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Crown className="w-5 h-5 mr-2 text-yellow-500" />
              Mesa Fácil Pro
            </CardTitle>
            <CardDescription>
              Tudo que você precisa para gerenciar seu restaurante
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">R$ 49,90</p>
                <p className="text-sm text-gray-600">por mês</p>
                <p className="text-xs text-gray-500 mt-2">
                  Cancele a qualquer momento
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Billing History */}
      {subscribed && (
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Cobrança</CardTitle>
            <CardDescription>
              Últimas faturas da sua assinatura
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { date: '15/01/2024', amount: 'R$ 49,90', status: 'Pago' },
                { date: '15/12/2023', amount: 'R$ 49,90', status: 'Pago' },
                { date: '15/11/2023', amount: 'R$ 49,90', status: 'Pago' },
              ].map((invoice, index) => (
                <div key={index} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-semibold">{invoice.date}</p>
                    <p className="text-sm text-gray-600">Mesa Fácil Pro</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{invoice.amount}</p>
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      {invoice.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SubscriptionPage;
