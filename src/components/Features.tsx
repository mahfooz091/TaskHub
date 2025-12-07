export default function Features() {
  const items = [
    { title: "Fast Setup", desc: "Scaffold projects quickly with modern tooling." },
    { title: "Secure Payments", desc: "Safe and verified reward payouts (₹5–₹10)." },
    { title: "Mobile Friendly", desc: "Work from anywhere — responsive UI and mobile support." },
  ];

  return (
    <section id="features" className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it) => (
            <div key={it.title} className="p-6 bg-white rounded-2xl shadow">
              <h3 className="text-xl font-semibold mb-2">{it.title}</h3>
              <p className="text-gray-600">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
