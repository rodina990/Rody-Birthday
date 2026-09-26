const song = document.getElementById("birthdaySong");
const musicToggle = document.getElementById("musicToggle");
const musicText = document.getElementById("musicText");
const screens = [...document.querySelectorAll(".screen")];
const toast = document.getElementById("toast");

let musicStarted = false;
let candleCount = 0;

function startMusic(){
  if(musicStarted) return;
  song.volume = 0.62;
  song.play().then(()=>{
    musicStarted = true;
    document.body.classList.add("music-on");
    musicText.textContent = "Playing";
  }).catch(()=>{});
}

function showScreen(id){
  screens.forEach(s => s.classList.toggle("active", s.id === id));
  window.scrollTo({top:0, behavior:"smooth"});
  if(id === "message") typeMessage();
  if(id === "final") burst(55);
}

document.addEventListener("click", (e)=>{
  const next = e.target.closest(".next");
  if(next){
    startMusic();
    showScreen(next.dataset.next);
  }
});

musicToggle.addEventListener("click", ()=>{
  if(song.paused){
    song.play().then(()=>{
      musicStarted = true;
      document.body.classList.add("music-on");
      musicText.textContent = "Playing";
    }).catch(()=>{});
  }else{
    song.pause();
    document.body.classList.remove("music-on");
    musicText.textContent = "Play";
  }
});

document.querySelector(".right").addEventListener("click", ()=>{
  startMusic();
  showScreen("countdown");
});

const wrong = document.querySelector(".wrong");
wrong.addEventListener("click", ()=>{
  wrong.classList.remove("shake");
  void wrong.offsetWidth;
  wrong.classList.add("shake");
  const msg = document.getElementById("wrongMsg");
  msg.classList.add("show");
  setTimeout(()=>msg.classList.remove("show"),1200);
});

function updateCountdown(){
  const target = new Date("2026-09-29T00:00:00+03:00").getTime();
  const now = Date.now();
  let diff = Math.max(0, target-now);
  const d = Math.floor(diff/86400000); diff%=86400000;
  const h = Math.floor(diff/3600000); diff%=3600000;
  const m = Math.floor(diff/60000); diff%=60000;
  const s = Math.floor(diff/1000);
  document.getElementById("days").textContent=String(d).padStart(2,"0");
  document.getElementById("hours").textContent=String(h).padStart(2,"0");
  document.getElementById("minutes").textContent=String(m).padStart(2,"0");
  document.getElementById("seconds").textContent=String(s).padStart(2,"0");
}
updateCountdown(); setInterval(updateCountdown,1000);

document.querySelectorAll(".candle").forEach(c=>{
  c.addEventListener("click", ()=>{
    if(c.classList.contains("off")) return;
    c.classList.add("off");
    candleCount++;
    burst(20);
    if(candleCount===1) document.getElementById("wishHint").textContent="Two more... ♡";
    if(candleCount===2) document.getElementById("wishHint").textContent="One last candle... ✦";
    if(candleCount===3){
      document.getElementById("wishHint").textContent="Wish made. Birthday magic unlocked! ✨";
      document.getElementById("cakeNext").classList.remove("hidden");
      burst(80);
    }
  });
});

const titleText = "Happy Birthday, Rody! ♡";
const bodyText = "I hope this new year of your life brings you soft days, beautiful surprises, genuine smiles, and a hundred little reasons to be happy. Today is yours — enjoy every second of it. ✨";

async function typeMessage(){
  const title = document.getElementById("typeTitle");
  const body = document.getElementById("typedMessage");
  if(title.dataset.done) return;
  title.dataset.done="1"; title.textContent="";
  body.textContent="";
  for(const ch of titleText){title.textContent+=ch; await sleep(55)}
  for(const ch of bodyText){body.textContent+=ch; await sleep(17)}
}
function sleep(ms){return new Promise(r=>setTimeout(r,ms))}

document.querySelectorAll(".mood-buttons button").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const result=document.getElementById("moodResult");
    result.textContent = btn.dataset.mood + " — obviously, you deserve all three. ♡";
    burst(65);
  });
});

document.getElementById("replay").addEventListener("click",()=>{
  candleCount=0;
  document.querySelectorAll(".candle").forEach(c=>c.classList.remove("off"));
  document.getElementById("cakeNext").classList.add("hidden");
  document.getElementById("wishHint").textContent="Three taps... then the magic starts ✨";
  document.getElementById("typeTitle").removeAttribute("data-done");
  showScreen("home");
  startMusic();
});

function burst(amount=35){
  const symbols=["♡","✦","✧","♢","♛","♥","★"];
  for(let i=0;i<amount;i++){
    const el=document.createElement("span");
    el.textContent=symbols[Math.floor(Math.random()*symbols.length)];
    el.style.position="fixed";
    el.style.left=(50+Math.random()*20-10)+"%";
    el.style.top=(48+Math.random()*10-5)+"%";
    el.style.zIndex=100;
    el.style.pointerEvents="none";
    el.style.color=["#ff6eaf","#ffb1d4","#ffd6e9","#ffffff"][Math.floor(Math.random()*4)];
    el.style.fontSize=(12+Math.random()*22)+"px";
    const dx=(Math.random()*2-1)*360;
    const dy=120+Math.random()*420;
    el.animate([
      {transform:"translate(-50%,-50%) scale(.4) rotate(0deg)",opacity:1},
      {transform:`translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1.15) rotate(${Math.random()*540-270}deg)`,opacity:0}
    ],{duration:900+Math.random()*900,easing:"cubic-bezier(.2,.7,.2,1)"});
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),1900);
  }
}

const symbols=["♡","✦","✧","♢","♛","♥","★"];
const particles=document.getElementById("particles");
for(let i=0;i<34;i++){
  const p=document.createElement("span");
  p.className="particle";
  p.textContent=symbols[Math.floor(Math.random()*symbols.length)];
  p.style.left=Math.random()*100+"%";
  p.style.animationDuration=(8+Math.random()*12)+"s";
  p.style.animationDelay=(-Math.random()*15)+"s";
  p.style.fontSize=(8+Math.random()*16)+"px";
  particles.appendChild(p);
}
