let user1Choice = '';
let user2Choice = '';
let round = 1;
let user1Wins = 0;
let user2Wins = 0;

const user1ChoiceElements = document.querySelectorAll('.user1 .choice');
const user2ChoiceElements = document.querySelectorAll('.user2 .choice');
const user1ChoiceText = document.getElementById('user1-choice');
const user2ChoiceText = document.getElementById('user2-choice');
const gameResult = document.getElementById('game-result');
const resetButton = document.getElementById('reset-btn');

user1ChoiceElements.forEach(choice => {
    choice.addEventListener('click', () => {
        user1Choice = choice.dataset.choice;
        user1ChoiceText.textContent = `User 1 chose: ${user1Choice}`;
        if (user2Choice) {
            playRound();
        }
    });
});

user2ChoiceElements.forEach(choice => {
    choice.addEventListener('click', () => {
        user2Choice = choice.dataset.choice;
        user2ChoiceText.textContent = `User 2 chose: ${user2Choice}`;
        if (user1Choice) {
            playRound();
        }
    });
});

function playRound() {
    const result = determineWinner(user1Choice, user2Choice);
    if (result === 'User 1 wins!') {
        user1Wins++;
    } else if (result === 'User 2 wins!') {
        user2Wins++;
    }

    updateGameResult(result);
    round++;

    if (round > 10) {
        endGame();
    } else {
        user1Choice = '';
        user2Choice = '';
        user1ChoiceText.textContent = 'Choose your move!';
        user2ChoiceText.textContent = 'Choose your move!';
    }
}

function determineWinner(choice1, choice2) {
    if (choice1 === choice2) {
        return "It's a tie!";
    }
    if (
        (choice1 === 'stone' && choice2 === 'scissors') ||
        (choice1 === 'paper' && choice2 === 'stone') ||
        (choice1 === 'scissors' && choice2 === 'paper')
    ) {
        return 'User 1 wins!';
    }
    return 'User 2 wins!';
}

function updateGameResult(result) {
    gameResult.textContent = result;
}

function endGame() {
    let finalResult = '';
    if (user1Wins > user2Wins) {
        finalResult = 'User 1 is the overall winner!';
    } else if (user2Wins > user1Wins) {
        finalResult = 'User 2 is the overall winner!';
    } else {
        finalResult = "It's a tie!";
    }

    gameResult.textContent = finalResult;
    resetButton.style.display = 'inline-block';
}

resetButton.addEventListener('click', () => {
    round = 1;
    user1Wins = 0;
    user2Wins = 0;
    gameResult.textContent = 'Waiting for players...';
    resetButton.style.display = 'none';
    user1ChoiceText.textContent = 'Choose your move!';
    user2ChoiceText.textContent = 'Choose your move!';
});
