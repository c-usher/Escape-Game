class Character {
  constructor(dmg, name) {
    this.hp = 100;
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
  "https://www.dsogaming.com/wp-content/uploads/2019/02/Negative-Atmosphere-1-1038x576.jpg",
  "https://www.relyonhorror.com/wp-content/uploads/2016/09/syndrome.jpg",
  "https://onlysp.escapistmagazine.com/wp-content/uploads/2016/08/Syndrome-Banner-800x400.jpg",
];
const directionCards = [
  "https://i.imgur.com/fJqvBNO.png", //Forward
  "https://i.imgur.com/XzulilU.png", //Right
  "https://i.imgur.com/VXorAnC.png", //Left
];

const $hand = $("#hand");
const $mainScreen = $("#main-screen");
const $startScreen = $("#start-screen");
const $startButton = $("#start-button");

const $randomDirectionCard = () =>
  $("<img>").attr(
    "src",
    directionCards[Math.floor(Math.random() * directionCards.length)]
  );

const chosenDirection = () => {
  const $randomMazeImage = $("<img>")
    .attr("src", mazeImages[Math.floor(Math.random() * mazeImages.length)])
    .addClass("maze-image");
  $($mainScreen).append($randomMazeImage);
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

const hero = new Character(5, "Cody");

$startButton.on("click", () => {
  $startScreen.remove();
  createHand();
  chosenDirection();
});

$(() => {});
