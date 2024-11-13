let szam;
szam=1;
let meret;
let difficulty;
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("akBt").addEventListener("click", function () {
        let sor = document.getElementById("sor").value;
        let oszlop = document.getElementById("oszlop").value;
        let hova = document.getElementById("ak");
        akGeneral(sor, oszlop, hova);
    })
})
var akLogika = [];
function akGeneral(sor, oszlop, hova) {
    szam = 0;
    hova.innerHTML = "";
    akLogika = [];
    for (let i = 0; i < sor; i++) {
        let sorElem = document.createElement("div");
        sorElem.classList.add("sor");
        akLogika.push([]);
        for (let j = 0; j < oszlop; j++) {
            let oszlopElem = document.createElement("div");
            oszlopElem.classList.add("oszlop");
            oszlopElem.dataset.x = i;
            oszlopElem.dataset.y = j;
            oszlopElem.addEventListener("click", egyfel);
            sorElem.appendChild(oszlopElem);
            akLogika[i].push(0);
            //akLogika.addEventListener("click", function(){ alert("Hello World!"); });
            oszlopElem.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                oszlopElem.style.backgroundColor = "orange";
                oszlopElem.innerHTML = "&#x1F6A9";
            });
        }
        hova.appendChild(sorElem);
    }
    difficulty = document.getElementById("nehezseg").value;
    console.log(difficulty);
    diff(difficulty);
    logika(akLogika, difficulty);
}

function logika(akL, arany) {
    let x = akL.length;
    let y = akL[0].length;
    let akna = Math.floor(x * y * arany);
    let db = 0;
    meret = x*y;
    console.log(meret);
    while (db < akna) {
        let hx = Math.floor(Math.random() * x);
        let hy = Math.floor(Math.random() * y);
        if (akL[hx][hy] != "A") {
            akL[hx][hy] = "A";
            db++;
        }
    }
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            if (akL[i][j] != "A") {
                akL[i][j] = korulotte(i, j, akL, x, y);
            }
        }

    }
    console.log(akL);
}
function korulotte(x, y, akL, mx, my) {
    let db = 0;
    for (let i = (x > 0 ? x - 1 : 0); i < (x == mx - 1 ? x + 1 : x + 2); i++) {
        for (let j = (y > 0 ? y - 1 : 0); j < (y == my - 1 ? y + 1 : y + 2); j++) {
            if (akL[i][j] == "A") {
                db++;
            }
        }
    }
    return db;
}

function diff(difficulty)
{
    let a = 1;
    let b = 0.1
    for (let i = 0; i < 4; i++) {
        if (difficulty>b) {
            a=a+5;
        }
        b=b+0.1;
    }
    for (let i = 0; i < 3; i++) {
        if (difficulty>b) {
            a=a-5;
        }
        b=b+0.1;
    }
    document.getElementById("sor").value=a;
    document.getElementById("oszlop").value=a;
}

function egyfel() {
    let elem = akLogika[this.dataset.x][this.dataset.y];
    let a = this;
    szam++;
    console.log(szam);
    if (elem != "A") {
        a.style.backgroundColor = "green";
        a.innerHTML = elem;
        
        if(szam>meret-(meret*difficulty))
        {
            felfed();
            alert("YOU WIN!");
        }
    }
    else if (elem == "A") {
        a.style.backgroundColor = "red";
        felfed();
        alert("YOU LOSE");
    }
}

function felfed() {
    let terulet = document.getElementById("ak");
    for (let i = 0; i < terulet.children.length; i++) {
        for (let j = 0; j < terulet.children[i].children.length; j++) {
            if (akLogika[i][j] == "A" && terulet.children[i].children[j].style.backgroundColor == "orange") {

                terulet.children[i].children[j].innerHTML = "&#x1F4A3;";
            }
            else {
                if (akLogika[i][j] == "A" && terulet.children[i].children[j].style.backgroundColor != "orange") {

                    terulet.children[i].children[j].innerHTML = "&#x1F4A3;";
                    terulet.children[i].children[j].style.backgroundColor = "red";
                }
                else if (akLogika[i][j] != "A" && terulet.children[i].children[j].style.backgroundColor == "green") {

                    terulet.children[i].children[j].style.backgroundColor = "yellowgreen";
                }
                else {
                    terulet.children[i].children[j].style.backgroundColor = "yellow";
                    terulet.children[i].children[j].innerHTML = akLogika[i][j];
                }
            }


            terulet.children[i].children[j].removeEventListener("click", egyfel);
        }
    }
    
}

