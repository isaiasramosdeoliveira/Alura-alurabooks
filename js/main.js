const list = document.querySelector(".content-books")
const btns = document.querySelector(".content-btns")
const button = btns.querySelectorAll(".btns-button")

let dice = []
let filterDice = []

async function loadBooks() {
    const res = await fetch("https://guilhermeonrails.github.io/casadocodigo/livros.json")
    dice = await res.json()
    displayBooks(dice);
}
loadBooks()

function discount(value) {
    const dice = value - (value * 0.3)
    return dice
}

for (let i = 0; i < 3; i++) {
    button[i].addEventListener("click", (e) => {
        const active = e.target;
        list.innerHTML = ''
        filterDice = dice.filter((value) => {
            return value.categoria === active.dataset.type;
        })
        console.log(filterDice);
        displayBooks(filterDice);
    })
}

function displayBooks(dice) {
    dice.forEach(value => {
        const newValue = discount(value.preco)
        list.innerHTML += `
        <div class = "book"> 
            <img src = "${value.imagem}"
        alt = "${value.alt}" > 
            <div class = "describe"> 
                <h4> ${value.titulo} </h4>
                <p>${value.autor}</p> 
                <span>${value.preco}</span>
                <button>Ver mais</button> 
            </div>
        </div>
        `
    })
}