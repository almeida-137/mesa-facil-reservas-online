
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { Check, CreditCard, AlertCircle, Crown, Star, Zap, Rocket, Users, Calendar, BarChart3 } from 'lucide-react';

const SubscriptionPage = () => {
  const { subscribed, checkSubscription } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('pro');

  // Mock subscription data - replace with Stripe integration
  const subscriptionData = {
    status: subscribed ? 'active' : 'inactive',
    plan: 'Mesa Fácil Pro',
    price: 'R$ 49,90',
    nextBilling: '2024-02-15',
    paymentMethod: '**** **** **** 1234'
  };

  const plans = [
    {
      id: 'basic',
      name: 'Mesa Fácil Basic',
      price: 29.90,
      icon: Star,
      color: 'from-blue-500 to-blue-600',
      features: [
        'Até 20 reservas por mês',
        'Gestão básica de mesas',
        'Página pública simples',
        'Dashboard básico',
        'Suporte por email',
        'Cardápio digital básico',
        'Até 2 categorias no cardápio'
      ],
      limits: {
        reservations: 20,
        tables: 10,
        orders: 50
      }
    },
    {
      id: 'pro',
      name: 'Mesa Fácil Pro',
      price: 49.90,
      icon: Crown,
      color: 'from-orange-500 to-red-500',
      popular: true,
      features: [
        'Reservas ilimitadas',
        'Gestão completa de mesas',
        'Página pública personalizada',
        'Dashboard avançado',
        'Suporte prioritário',
        'Cardápio digital completo',
        'Categorias ilimitadas',
        'Gestão de pedidos',
        'Relatórios básicos'
      ],
      limits: {
        reservations: 'Ilimitadas',
        tables: 50,
        orders: 'Ilimitados'
      }
    },
    {
      id: 'enterprise',
      name: 'Mesa Fácil Enterprise',
      price: 99.90,
      icon: Rocket,
      color: 'from-purple-500 to-indigo-600',
      features: [
        'Tudo do plano Pro',
        'Multi-restaurantes',
        'API personalizada',
        'Integração WhatsApp',
        'App mobile dedicado',
        'Suporte 24/7',
        'Relatórios avançados',
        'Analytics detalhados',
        'Backup automático',
        'Treinamento personalizado'
      ],
      limits: {
        reservations: 'Ilimitadas',
        tables: 'Ilimitadas',
        orders: 'Ilimitados'
      }
    }
  ];

  const handleSubscribe = async (planId: string) => {
    setLoading(true);
    setSelectedPlan(planId);
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

  const currentPlanUsage = {
    reservations: 45,
    tables: 8,
    orders: 234
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">💎 Escolha seu Plano</h1>
        <p className="text-gray-600 text-lg">Encontre o plano perfeito para o seu restaurante</p>
      </div>

      {/* Current Status */}
      {subscribed && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-green-800">✅ Plano Ativo</h3>
                <p className="text-green-600">{subscriptionData.plan} - {subscriptionData.price}/mês</p>
                <p className="text-sm text-green-600">Próxima cobrança: {subscriptionData.nextBilling}</p>
              </div>
              <Button 
                onClick={handleManageBilling}
                variant="outline" 
                className="border-green-300 text-green-700 hover:bg-green-50"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Gerenciar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Usage Statistics */}
      {subscribed && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">📅 Reservas este mês</span>
                <Calendar className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-blue-600">{currentPlanUsage.reservations}</div>
              <Progress value={75} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">🪑 Mesas cadastradas</span>
                <Users className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-600">{currentPlanUsage.tables}</div>
              <Progress value={16} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">🍽️ Pedidos processados</span>
                <BarChart3 className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-2xl font-bold text-purple-600">{currentPlanUsage.orders}</div>
              <Progress value={85} className="mt-2" />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <Card 
              key={plan.id} 
              className={`relative hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                plan.popular ? 'border-2 border-orange-400 shadow-lg' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1">
                    🔥 Mais Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className={`text-center pb-4 bg-gradient-to-r ${plan.color} text-white rounded-t-lg`}>
                <Icon className="w-12 h-12 mx-auto mb-2" />
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold">R$ {plan.price.toFixed(2)}</div>
                <p className="text-sm opacity-90">por mês</p>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Plan Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Plan Limits */}
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-sm mb-2">📊 Limites do plano:</h4>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div>📅 Reservas: {plan.limits.reservations}</div>
                      <div>🪑 Mesas: {plan.limits.tables}</div>
                      <div>🍽️ Pedidos: {plan.limits.orders}</div>
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={loading && selectedPlan === plan.id}
                    className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 transition-opacity`}
                  >
                    {loading && selectedPlan === plan.id ? (
                      '⏳ Processando...'
                    ) : subscribed && plan.id === 'pro' ? (
                      '✅ Plano Atual'
                    ) : (
                      `🚀 Escolher ${plan.name.split(' ')[2]}`
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Billing History */}
      {subscribed && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              💳 Histórico de Cobrança
            </CardTitle>
            <CardDescription>
              Últimas faturas da sua assinatura
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { date: '15/01/2024', amount: 'R$ 49,90', status: 'Pago', plan: 'Pro' },
                { date: '15/12/2023', amount: 'R$ 49,90', status: 'Pago', plan: 'Pro' },
                { date: '15/11/2023', amount: 'R$ 29,90', status: 'Pago', plan: 'Basic' },
              ].map((invoice, index) => (
                <div key={index} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-semibold">📅 {invoice.date}</p>
                    <p className="text-sm text-gray-600">Mesa Fácil {invoice.plan}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">{invoice.amount}</p>
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      ✅ {invoice.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* FAQ Section */}
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100">
        <CardHeader>
          <CardTitle>❓ Perguntas Frequentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div>
              <strong>🔄 Posso mudar de plano a qualquer momento?</strong>
              <p className="text-gray-600">Sim! Você pode fazer upgrade ou downgrade do seu plano quando quiser.</p>
            </div>
            <div>
              <strong>💳 Quais formas de pagamento aceitam?</strong>
              <p className="text-gray-600">Aceitamos cartão de crédito, débito e PIX através da Stripe.</p>
            </div>
            <div>
              <strong>🔒 Meus dados estão seguros?</strong>
              <p className="text-gray-600">Sim! Utilizamos criptografia de ponta e seguimos as melhores práticas de segurança.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionPage;
