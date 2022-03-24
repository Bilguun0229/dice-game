// Тоглогчийн ээлжийг хадгалах хувьсагч, нэгдүгээр тоглогчийн 0, хоёрдугаар тоглогчийг 1 гэж тэмдэглэе.
var activePlayer = 0;
// Тоглогчдын цуглуулсан оноог хадгалах хувьсагч
var scores = [0, 0];
// Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
var roundScore = 0;
// Шооны аль нэг талаараа буусныг хадгалах хувьсагч хэрэгтэй, 1-6 гэсэн утгыг энэ хувьсагчид санамсаргүйгээр үүсгэж өгнө.
var diceNumber=Math.floor(Math.random() * 6)+1;
// Програм эхлэхэд бэлдэе
document.getElementById("score-0").textContent = '0';
document.getElementById("score-1").textContent = '0';
document.getElementById("current-0").textContent = '0';
document.getElementById("current-1").textContent = 0;
var diceDom = document.querySelector(".dice");
diceDom.style.display = "none";
// Шоог шидэх эвент листенер
document.querySelector(".btn-roll").addEventListener("click", function() {
    // 1-6 доторх санамсаргүй нэг тоо гаргаж ана
    var diceNumber = Math.floor(Math.random()*6)+1;
    // Шооны зургийг вэб дээр гаргаж ирнэ.
    diceDom.style.display = "block";
    // буусан санамсаргүй тоонд харгалзах шооны зургийг веб дээр гаргаж ирнэ.
    diceDom.src = 'dice-'+diceNumber + ".png"
    // буусан тоог 1 ээс ялгаатай бол идэхтэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ.
    if(diceNumber !==1) {
        // 1ээс ялгаатай тоо буулаа. буусан тоглогчид нэмж өгнө.
        roundScore = roundScore + diceNumber;
        document.getElementById("current-" +activePlayer).textContent = roundScore
    }else {
        switchToNextPlayer();
    }
}) ;
// hold товчны эвент листенер
document.querySelector('.btn-hold').addEventListener('click', function() {
    // Уг тоглогчийн ээлж цуглуулсан ээлжний оноог глобал оноон дээр нь нэмж өгнө
    // if (activePlayer== 0){
    //     scores[0] = scores[0] + roundScore;
    // }else {
    //     scores[1] = scores[1] + roundScore;
    // }
    scores[activePlayer] =  scores[activePlayer] + roundScore;
   // дэлгэц дээр оноог нь өөрчилнө
   document.getElementById('score-'+ activePlayer).textContent =scores[activePlayer];
    // уг тоглогч хожсон эсэхийг (оноон нь 100- их эсэх)  шалгах
    if(scores[activePlayer] >= 20) {
        // ялагч гэсэн текстийг нэрний оронд гаргана
        document.getElementById("name-" +activePlayer).textContent = "Winner!!!"
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      
    }else{
        switchToNextPlayer();
    }
 
   

    // Ээлжийн оноог нь 0 болгоно
    roundScore = 0;
    document.getElementById("current-" + activePlayer).textContent = '0' ;
    // Тоглогчийн ээлжийг солино.
    switchToNextPlayer()
});
// энэ функц нь тоглох ээлжийг дараачийэ тоглогч руу шилжүүлэх
function switchToNextPlayer() {
//  Энэ тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгонон
roundScore = 0;
document.getElementById("current-" +activePlayer).textContent = 0;
// тоглогчийн ээлжийг нөгөө тоглогч руу шилжүүлнэ.
// Хэрэв идэвхтэй тоглогч нь 0 байвал идэхтэй тоглогчийг 1болго
// үгүй бол Хэрэв идэвхтэй тоглогч нь 0 байвал идэхтэй тоглогчийг 0болго
activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
 // if(activePlayer ===0) {
//     activePlayer = 1;
// }else {
//     activePlayer = 0;
// }
// улаан цэгийг шилжүүлэх
document.querySelector('.player-0-panel').classList.toggle("active");
document.querySelector('.player-1-panel').classList.toggle("active");

// шоог түр алга болгох
diceDom.style.display = "none"
}

// шинэ тоглоом эхлүүлэх товчний листенер
document.querySelector('.btn-new').addEventListener('click', function(){
    
})