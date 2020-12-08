const mazeImages = [
  "https://mir-s3-cdn-cf.behance.net/project_modules/disp/46c03419676595.562de69f28142.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/disp/1f1d1519676595.562de69f188fe.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/disp/214c6619676595.562de69f44825.jpg",
  "https://www.dsogaming.com/wp-content/uploads/2019/02/Negative-Atmosphere-1-1038x576.jpg",
  "https://www.relyonhorror.com/wp-content/uploads/2016/09/syndrome.jpg",
  "https://onlysp.escapistmagazine.com/wp-content/uploads/2016/08/Syndrome-Banner-800x400.jpg",
];
const directionCards = [
    "https://imgur.com/a/5JbNRsW",
    "https://imgur.com/a/I2iHUxq",
    "https://imgur.com/a/u9tEYjG"
];


const random = mazeImages[Math.floor(Math.random() * mazeImages.length)];
console.log(random);
// movement = (direction) => {

//     return mazeImages[Math.floor(math.random() * mazeImages.length)];

// }

$(() => {
    const $hand = $('#hand');
    const $randomMazeImage = $('<img>').attr('src', mazeImages[Math.floor(Math.random() * mazeImages.length)]);
    const movement = (direction) => {
        $($hand).append($randomMazeImage);
    };
    movement();

})




