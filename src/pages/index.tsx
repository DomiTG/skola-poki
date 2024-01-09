import React from 'react';

interface Game {
  id: number;
  name: string;
  image: string;
  url?: string;
}

const games: Game[] = [
  {
    id: 1,
    name: 'Piškvorky',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Tic-tac-toe_5.png',
    url: '/piskvorky',
  },
  {
    id: 2,
    name: 'Pexeso',
    image: 'https://makra.cz/64100-large_default/pexeso-domacnost.jpg',
    url: '/pexeso',
  },
  {
    id: 3,
    name: 'Bomb It',
    image: '//www.superhry.cz/cnt_img/005/5523_340.webp?1',
  },
  {
    id: 4,
    name: "Habbo Clicker",
    image: "//www.superhry.cz/cnt_img/017/17113_340.webp"
  },
  {
    id: 5,
    name: "Wormate.io",
    image: "//www.superhry.cz/cnt_img/013/13091_340.webp"
  },
  {
    id: 6,
    name: "Mini Royale",
    image: "//www.superhry.cz/cnt_img/018/18075_340.webp?2"
  }
];

const GameList: React.FC<{ games: Game[] }> = ({ games }) => {
  return (
    <div className="grid grid-cols-1 gap-4 bg-zinc-900 p-8 md:grid-cols-2 lg:grid-cols-3">
      {games.map((game) => (
        <div
          key={game.id}
          className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md transition duration-300 transform hover:scale-105"
          onClick={() => window.open(game.url ?? '#')}
        >
          <img src={game.image} alt={game.name} className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity flex items-center justify-center">
            <p className="text-white text-lg font-bold">{game.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const HomePage: React.FC = () => {
  return (
    <div className='min-h-screen flex flex-col text-white bg-zinc-900 p-16'>
      <nav className="absolute top-0 left-0 right-0 p-4 bg-gray-800 text-center mb-8">
        <h1 className="text-3xl font-bold">POKI CLONE</h1>
      </nav>
      <h1 className="text-3xl font-bold mt-8">SEZNAM HER</h1>
      <p className="mb-8 text-zinc-300">Vyber si hru a hraj!</p>
      <GameList games={games} />
      <footer className="mt-auto text-center text-zinc-300">
        <p>
          Created by{' '}
          <a
            href="https://codebydomi.cz"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Domi
          </a>
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
