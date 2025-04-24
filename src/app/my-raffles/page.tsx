"use client";

const mockMyRaffles = [
  {
    id: "1",
    title: "Holo Charizard - 1st Edition",
    status: "pending",
    image: "https://images.pokemontcg.io/base1/4_hires.png",
  },
  {
    id: "2",
    title: "Pikachu Plush",
    status: "lost",
    image: "https://i.imgur.com/NZtGSkO.png",
  },
  {
    id: "3",
    title: "GameBoy Color - Lime Green",
    status: "won",
    image: "https://i.imgur.com/7zUw6Jz.png",
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "pending":
      return <span className="text-yellow-400">⏳ Awaiting Draw</span>;
    case "won":
      return <span className="text-green-400 font-semibold">🏆 You Won!</span>;
    case "lost":
      return <span className="text-gray-400">❌ Not Won</span>;
    default:
      return null;
  }
}

export default function MyRaffles() {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-green-400">
        My Raffles
      </h1>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {mockMyRaffles.map((raffle) => (
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
              <p className="mb-3">{getStatusBadge(raffle.status)}</p>

              {raffle.status === "won" && (
                <button className="w-full bg-green-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-green-500 transition">
                  🎁 Claim Prize
                </button>
              )}

              {raffle.status === "pending" && (
                <button
                  className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold cursor-not-allowed"
                  disabled
                >
                  Waiting...
                </button>
              )}

              {raffle.status === "lost" && (
                <button
                  className="w-full bg-gray-700 text-gray-300 px-4 py-2 rounded-lg font-semibold cursor-default"
                  disabled
                >
                  Better Luck Next Time
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
