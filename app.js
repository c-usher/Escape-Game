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
  "https://mir-s3-cdn-cf.behance.net/project_modules/disp/46c03419676595.562de69f28142.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/disp/1f1d1519676595.562de69f188fe.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/disp/214c6619676595.562de69f44825.jpg",
  "https://www.dsogaming.com/wp-content/uploads/2019/02/Negative-Atmosphere-1-1038x576.jpg", //Battle Background
  "https://www.relyonhorror.com/wp-content/uploads/2016/09/syndrome.jpg", //Battle Background
  "https://onlysp.escapistmagazine.com/wp-content/uploads/2016/08/Syndrome-Banner-800x400.jpg", //Battle Background
];
const directionCards = [
  "https://i.imgur.com/fJqvBNO.png", //Forward
  "https://i.imgur.com/XzulilU.png", //Right
  "https://i.imgur.com/VXorAnC.png", //Left
];
const currentMazeImage = [];
const enemyInCombat = [];
const enemyGraveyard = [];

const $hand = $("#hand");
const $mainScreen = $("#main-screen");
const $startScreen = $("#start-screen");
const $startButton = $("#start-button");
const $attackButton = $("#attack-button");
const $runButton = $("#run-button");
const $combatButtonBox = $("#combat-button-box");

const $randomDirectionCard = () =>
  $("<img>").attr(
    "src",
    directionCards[Math.floor(Math.random() * directionCards.length)]
  );

const chosenDirection = () => {
  const mazeImage = mazeImages[Math.floor(Math.random() * mazeImages.length)];
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
};

const createHand = () => {
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

const combat = () => {
  $combatButtonBox.show();
  $(".attacked").text('Your Being Attacked!');
  enemyInCombat[0].attack(hero);
  if (hero.hp <= 0) {
    alert("You Lose!")
  }
  if (enemyInCombat[0].hp <= 0) {
    for (index of enemyInCombat) {
      enemyGraveyard.push(index);
    };
    enemyInCombat.pop();
    alert("You Killed Him");
  }
};

const hero = new Character(100, 5, "Cody");

$startButton.on("click", () => {
  $startScreen.remove();
  createHand();
  chosenDirection();
});

$attackButton.on("click", () => {
  hero.attack(enemyInCombat[0]);
  combat();
});


$(() => {
  $combatButtonBox.hide();

});
