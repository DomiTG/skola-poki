import { useState, useEffect } from 'react';

type Card = string;

const PexesoGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);

  const cardTexts: Card[] = ['A', 'B', 'C', 'D', 'E', 'F']; // Texts for the cards

  const shuffleCards = (array: Card[]): Card[] => {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    const initializeGame = () => {
      const doubledCards = cardTexts.concat(cardTexts);
      const shuffledCards = shuffleCards(doubledCards);
      setCards(shuffledCards);
    };
    initializeGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (disabled) return;
    if (flipped.length === 0) {
      setFlipped([index]);
    } else {
      setDisabled(true);
      setFlipped([flipped[0], index]);
      if (cards[flipped[0]] === cards[index]) {
        setSolved([...solved, flipped[0], index]);
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-zinc-900">
        <div className="absolute top-0 left-0 right-0 p-4 bg-gray-800 text-center">
            <h1 className="text-3xl font-bold">POKI CLONE</h1>
        </div>
        <div className="grid grid-cols-4 gap-1">
            {cards.map((card, index) => (
                <div
                key={index}
                className={`w-24 h-24 m-2 bg-blue-500 cursor-pointer rounded-lg ${
                    flipped.includes(index) || solved.includes(index) ? 'opacity-100' : 'opacity-100'
                }`}
                onClick={() => handleCardClick(index)}
                >
                {flipped.includes(index) || solved.includes(index) ? (
                    <div className="flex justify-center items-center w-full h-full">
                    <p className="text-zinc-900 text-lg font-semibold">{card}</p>
                    </div>
                ) : null}
                </div>
            ))}
        </div>
    </div>
  );
};

export default PexesoGame;
