"use client";

const mockRaffles = [
  {
    id: "1",
    title: "Holo Charizard - 1st Edition",
    image: "https://images.pokemontcg.io/base1/4_hires.png",
    entriesLeft: 12,
    totalEntries: 50,
    price: "0.01 ETH",
    timeLeft: "3h 24m",
  },
  {
    id: "2",
    title: "Mint Condition GameBoy Color",
    image: "https://i.imgur.com/7zUw6Jz.png",
    entriesLeft: 7,
    totalEntries: 20,
    price: "0.005 ETH",
    timeLeft: "1h 12m",
  },
];

export default function RafflesPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-green-400">
        Browse Raffles
      </h1>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {mockRaffles.map((raffle) => (
          <div
            key={raffle.id}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-green-400/40 transition"
          >
            <img
              src={raffle.image}
              alt={raffle.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{raffle.title}</h2>
              <p className="text-sm mb-1">
                🎟 {raffle.entriesLeft}/{raffle.totalEntries} tickets left
              </p>
              <p className="text-sm mb-1">⏰ {raffle.timeLeft} remaining</p>
              <p className="text-sm mb-4">💰 {raffle.price} per ticket</p>
              <button className="w-full bg-green-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-green-500 transition">
                Enter Raffle
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
