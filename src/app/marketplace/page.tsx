// src/app/marketplace/page.tsx
"use client";

const mockListings = [
  {
    id: "1",
    title: "Sealed Booster Box - Jungle",
    image: "https://i.imgur.com/3gw1uXs.png",
    ticketsLeft: 30,
    totalTickets: 100,
    price: "0.02 ETH",
    endsIn: "5h 13m",
  },
  {
    id: "2",
    title: "Rare PSA 9 Pikachu Illustrator",
    image: "https://i.imgur.com/nO3M8Oi.png",
    ticketsLeft: 5,
    totalTickets: 10,
    price: "0.05 ETH",
    endsIn: "48m",
  },
];

export default function Marketplace() {
  return (
    <div className="min-h-screen bg-dark text-light px-6 py-10">
      <h1 className="text-4xl font-extrabold text-primary text-center mb-10">
        Marketplace
      </h1>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {mockListings.map((item) => (
          <div
            key={item.id}
            className="bg-light rounded-xl overflow-hidden shadow-md hover:shadow-primary/40 transition"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4 text-mid">
              <h2 className="text-xl font-bold mb-2 text-dark">{item.title}</h2>
              <p className="text-sm mb-1">
                🎟 {item.ticketsLeft}/{item.totalTickets} tickets left
              </p>
              <p className="text-sm mb-1">⏰ Ends in {item.endsIn}</p>
              <p className="text-sm mb-4">💰 {item.price} per ticket</p>
              <button className="w-full bg-secondary hover:bg-primary text-light px-4 py-2 rounded-lg font-semibold transition">
                Enter Raffle
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
