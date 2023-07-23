window.addEventListener("load", () => {
  const chars = [];
  const phElem = document.getElementById("phrase");

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  async function getChars() {
    for (let i = 2; i < 6; i++) {
      await fetch(`http://ccdb.hemiola.com/characters/strokes/${i}`).then((r) => r.json()).then((d) => {
        d.forEach((c) => chars.push(c.string));
      })
    }
  }

  function makePhrase() {
    if (!chars) return;
    phElem.innerHTML = "";
    for (let i = 0; i < 4; i++) {
      let x = chars[getRandomInt(0, chars.length)];
      phElem.innerHTML = phElem.innerText.includes(x) ? i-=1 : phElem.innerHTML + x;
    }
  }
  
  phElem.addEventListener('click', makePhrase);
  getChars().then(() => makePhrase());
});