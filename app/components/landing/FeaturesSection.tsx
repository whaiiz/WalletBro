"use client";

export function FeaturesSection() {
  const features = [
    {
      icon: "💰",
      title: "Expense Management",
      description: "Categorize and track all your expenses with ease",
    },
    {
      icon: "📊",
      title: "Detailed Reports",
      description: "View charts and spending stats in real time",
    },
    {
      icon: "🎯",
      title: "Financial Goals",
      description: "Set and track personalized savings goals",
    },
    {
      icon: "🔒",
      title: "Premium Security",
      description: "End-to-end encryption to protect your data",
    },
    {
      icon: "📱",
      title: "Offline Access",
      description: "Use the app even without an internet connection",
    },
    {
      icon: "🔄",
      title: "Sync",
      description: "Sync your data across all your devices",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Key Features
            </h2>
            <p className="text-gray-400 text-lg">
              Everything you need to have full control of your finances
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
