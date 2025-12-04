"use client";

export function FeaturesSection() {
  const features = [
    {
      icon: "💰",
      title: "Gestão de Despesas",
      description: "Categorize e acompanhe todas as suas despesas com facilidade",
    },
    {
      icon: "📊",
      title: "Relatórios Detalhados",
      description: "Visualize gráficos e estatísticas do seu gastos em tempo real",
    },
    {
      icon: "🎯",
      title: "Metas Financeiras",
      description: "Defina e acompanhe metas de poupança personalizadas",
    },
    {
      icon: "🔒",
      title: "Segurança Premium",
      description: "Encriptação de ponta a ponta para proteger seus dados",
    },
    {
      icon: "📱",
      title: "Acesso Offline",
      description: "Use a app mesmo sem conexão à internet",
    },
    {
      icon: "🔄",
      title: "Sincronização",
      description: "Sincronize seus dados em todos os seus dispositivos",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Funcionalidades Principais
          </h2>
          <p className="text-gray-400 text-lg">
            Tudo que você precisa para ter total controlo das suas finanças
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-gray-800 bg-gray-900/50 hover:bg-gray-900 hover:border-blue-500 transition-all"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
