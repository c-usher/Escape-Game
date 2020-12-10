class Character {
  constructor(hp, dmg, name) {
    this.hp = hp;
    this.sp = 100;
    this.dmg = dmg;
    this.name = name;
  }

  attack(enemy) {
    enemy.hp -= this.dmg;
    this.sp -= 10;
  }

  drawCard() {
    const $li = $("<li>")
      .addClass("card")
      .on("click", (event) => {
        event.currentTarget.remove();
        $(".maze-image").remove();
        chosenDirection();
        hero.drawCard();
      })
      .append($randomDirectionCard())
      .appendTo($hand);
  }
}

const mazeImages = [
  "defaultImages/hallwayOne.jpg",
  "defaultImages/hallwayTwo.jpg",
  "defaultImages/hallwayThree.jpg",
  "defaultImages/battleImageOne.jpg",
  "defaultImages/battleImageTwo.jpg",
  "defaultImages/battleImageThree.jpg"
];
const directionCards = [
  "defaultImages/pointUpCard.png", //Forward
  "defaultImages/pointingRightCard.png", //Right
  "defaultImages/pointingLeftCard.png", //Left
];
const currentMazeImage = [];
const enemyInCombat = [];
const enemyGraveyard = [];
let hero = '';



const $hand = $("#hand");
const $mainScreen = $("#main-screen");
const $startScreen = $("#start-screen");
const $gameOverScreen = $("#game-over-screen");
const $startButton = $("#start-button");
const $attackButton = $("#attack-button");
const $runButton = $("#run-button"); //take away energy can only run 4 times.
const $restartButton = $('#restart-button');
const $combatButtonBox = $("#combat-button-box");
const $bossBattleImage = $("<img>").attr("src", "defaultImages/bossBattleImage.jpeg");
const $gameOverImage = $("<img>").attr("src", "defaultImages/gameOverImage.jpg");

const $randomDirectionCard = () =>
  $("<img>").attr(
    "src",
    directionCards[Math.floor(Math.random() * directionCards.length)]
  );

const chosenDirection = () => {
  const mazeImage = mazeImages[Math.floor(Math.random() * mazeImages.length)];
  $(".died").hide();
  $(".killedHim").hide();
  const $randomMazeImage = $("<img>")
    .attr("src", mazeImage)
    .addClass("maze-image");
  currentMazeImage.unshift(mazeImage);
  $($mainScreen).append($randomMazeImage);
  if (currentMazeImage.length === 2) {
    currentMazeImage.pop();
  }

  if (
    currentMazeImage[0] === mazeImages[3] ||
    currentMazeImage[0] === mazeImages[4] ||
    currentMazeImage[0] === mazeImages[5]
  ) {
    generateEnemy();
    combat();
  } else {
    $combatButtonBox.hide();
    $(".attacked").text("");
  }

  if (enemyGraveyard.length === 6) {
    $mainScreen.append($bossBattleImage);
    generateEnemy();
    combat();
  }
};

const createHand = () => {
  $hand.show();
  for (cards of directionCards) {
    const $li = $("<li>")
      .addClass("card")
      .on("click", (event) => {
        event.currentTarget.remove();
        $(".maze-image").remove();
        chosenDirection();
        hero.drawCard();
      })
      .append($randomDirectionCard())
      .appendTo($hand);
  }
  
};

const generateEnemy = () => {
  const enemy = new Character(100, 5, "enemy");
  enemyInCombat.unshift(enemy);
}

const generateHero = () => {
   hero = new Character(100, 5, "Cody");
}

const combat = () => {
  $combatButtonBox.show();
  $hand.hide()
  $(".attacked").text('Your Being Attacked!').appendTo($combatButtonBox);
  enemyInCombat[0].attack(hero);
  if (hero.hp <= 0) {
    $("<h1>").text("You Died!").addClass("died").appendTo($gameOverScreen);
    $combatButtonBox.hide();
    $('.maze-image').hide();
    $hand.children().remove();
    $restartButton.show();
    $gameOverImage.appendTo($gameOverScreen);
    $gameOverScreen.show();

  }
  if (enemyInCombat[0].hp <= 0) {
    for (index of enemyInCombat) {
      enemyGraveyard.push(index);
    };
    enemyInCombat.pop();
    $("<h1>").text("You Killed Him!").addClass("killedHim").appendTo($mainScreen);
  }
};

$startButton.on("click", () => {
  $startScreen.hide();
  generateHero();
  createHand();
  chosenDirection();
});

$attackButton.on("click", () => {
  hero.attack(enemyInCombat[0]);
  combat();
});

$restartButton.on("click", () => {
  $gameOverScreen.hide();
  $startScreen.show();
  
})


$(() => {
  $combatButtonBox.hide();
  $restartButton.hide();


});
