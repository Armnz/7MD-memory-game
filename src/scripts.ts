type Card = {
  id: number;
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const cards: Card[] = [];
let selectedCard: Card | null = null;

// Initializes the game
function initializeGame(): void {
  const cardColors = ['pink', 'orange', 'indigo', 'pink', 'orange', 'indigo'];

  cards.splice(0, cards.length, ...cardColors.map((color, index) => ({
    id: index,
    color,
    isFlipped: false,
    isMatched: false,
  })));

  shuffleCards();
  renderCards();
}

// Shuffles the cards array
function shuffleCards(): void {
  for (let i = cards.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

// Renders the cards on the game board
function renderCards(): void {
  const gameBoard = document.getElementById('game-board');
  if (gameBoard) {
    gameBoard.innerHTML = '';
    cards.forEach((card, index) => {
      const cardElement = document.createElement('div');
      cardElement.className = 'card';
      cardElement.dataset.index = index.toString();
      cardElement.style.backgroundColor = card.isFlipped || card.isMatched ? card.color : 'grey';
      cardElement.addEventListener('click', () => handleCardClick(index));
      gameBoard.appendChild(cardElement);
    });
  }
}

// Handles clicking on a card
function handleCardClick(index: number): void {
  const clickedCard = cards[index];

  if (!clickedCard.isFlipped && clickedCard !== selectedCard) {
    clickedCard.isFlipped = true;
    renderCards();

    if (selectedCard && selectedCard.color === clickedCard.color) {
      clickedCard.isMatched = true;
      selectedCard.isMatched = true;
      selectedCard = null;
    } else if (selectedCard) {
      setTimeout(() => {
        selectedCard.isFlipped = false;
        clickedCard.isFlipped = false;
        selectedCard = null;
        renderCards();
      }, 1000);
    } else {
      selectedCard = clickedCard;
    }
  }

  if (checkWin()) {
    displayWinner();
  }
}

// Checks if all cards are matched
function checkWin(): boolean {
  return cards.every((card) => card.isMatched);
}

// Displays a winner message
function displayWinner(): void {
  alert('Congratulations! You won the game.');
}

// Resets the game to its initial state
function resetGame(): void {
  selectedCard = null;
  initializeGame();
}

// Expose resetGame to global scope if using modules or strict mode
window.resetGame = resetGame;

// Start the game
initializeGame();
