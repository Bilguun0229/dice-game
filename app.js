// Бүх газарт ашиглагдах глобал хувьсагчдыг энд зарлая
// Тоглоом дууссан эсэхийг хадгалах төлөвийн хувьсагч
var isNewGame;
// Аль тоглогч шоо шидэх вэ гэдгийг энд хадгална
var activePlayer;

// Хоёр тоглогчийн цуглуулсан оноонууд
var scores;

// Идэвхтэй тоглогчийн цуглуулж байгаа ээлжийн оноо
var roundScore;

//Шооны зургийг үзүүлэх элементийг ДОМ-оос хайж олоод хадгалъя
var diceDom = document.querySelector(".dice");

// Тоглоомыг эхлүүлнэ
initGame();

// Тоглоогмийг шинээр эхлэхэд бэлтгэнэ.
function initGame() {
  // Тоглоом эхэллээ гэдэг төлөвт оруулна.
  isNewGame = true;
  // Тоглогчийн ээлжийг хадгалах хувьсагч, нэгдүгэээр тоглогчийг 0, хоёрдугаар тоглогчийг 1 гэж тэмдэглэе.
  activePlayer = 0;

  // Тоглогчийн цуглуулсан оноог хадглах хувьсагч
  scores = [0, 0];

  // Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
  roundScore = 0;

  // Програм эхлэхэд бэлтгэе
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // Тоглогчдийн нэрийг буцааж гаргах
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");

  diceDom.style.display = "none";
}

// Шоог шидэх эвент листенер
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (isNewGame == true){
  // 1 - 6 доторх санамсаргүй нэг тоо гаргаж авна.
  var diceNumber = Math.floor(Math.random() * 6) + 1;

  // шооны зургийг веб дээр гаргаж иргэ
  diceDom.style.display = "block";

  // Буусан санамсаргүй тоонд харгалзах шооны зургийг веб дээр гаргаж ирнэ.
  diceDom.src = "dice-" + diceNumber + ".png";

  // Буусан тоо нь 1 ээс ялгаатай бол идэхтэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ.
  if (diceNumber !== 1) {
    // 1-ээс ялгаатай тоо буулаа.Буусан тоог тоглогчид нэмж өгнө.
    roundScore = roundScore + diceNumber;
    document.getElementById("current-" + activePlayer).textContent = roundScore;
  } else {
    // 1 буусан тул тоглогчийн ээлжийн энэ хэсэгт сольж өгнө
    switchToNextPlayer();
  }
} else {
  alert('Тоглоом дуусcан байна.New Game Товчийг дарж шинээр эхэлнэ үү!!!')
}
});

// HOLD товчны эвент листенер
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (isNewGame== true){
    // Уг тоглогчийн цуглуулсан ээлжийн оноог глобаль оноон дээр нь нэмж өгнө.
  scores[activePlayer] = scores[activePlayer] + roundScore;

  // Дэлгэцэн дээр оноог нь өөрчилнө
  document.getElementById("score-" + activePlayer).textContent =
    scores[activePlayer];

  // Уг тоглогч хожсон эсэхийг (оноо нь 100-с их эсэх )шалгах
  if (scores[activePlayer] >= 40) {
    // Тоглоомийн дууссан төлөвт оруулана.
    isNewGame = false;
    // Ялагч гэсэн текстийг нэрийн оронд гаргана
    document.getElementById("name-" + activePlayer).textContent = "WINNER!!!";
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");
  } else {
    // Тоглогчийн ээлжийг солино
    switchToNextPlayer();
  }
  }else {
    alert('Тоглоом дуусcан байна.New Game Товчийг дарж шинээр эхэлнэ үү!!!')
  }
});

// Энэ функц нь тоглох ээлжийг дараачийн тоглогч руу шилжүүлдэг
function switchToNextPlayer() {
  // Энэ тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоно
  roundScore = 0;
  document.getElementById("current-" + activePlayer).textContent = 0;

  // Тоглогчийн ээлжийг нөгөө тоглогч руу шилжүүлнэ
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  // Улаан цэгийг шилжүүлэх
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // Шоог түр алга болгоно
  diceDom.style.display = "none";
}

// New Game буюу Шинэ тоглоом эхлүүлэх товчний эвент листенер
document.querySelector(".btn-new").addEventListener("click", initGame);