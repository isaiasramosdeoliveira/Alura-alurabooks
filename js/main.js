const list = document.querySelector(".content-books")
const btns = document.querySelector(".content-btns")
const button = btns.querySelectorAll(".btns-button")
const totalPayable = document.querySelector(".menu_total")

let dice = []
let filterDice = []
let total = 0
let status = ''
async function loadBooks() {
    const res = await fetch("https://guilhermeonrails.github.io/casadocodigo/livros.json")
    dice = await res.json()
    displayBooks(dice);
}
loadBooks()

for (let i = 0; i < 3; i++) {
    button[i].addEventListener("click", (e) => {
        const active = e.target;
        list.innerHTML = ''
        filterDice = dice.filter((value) => {
            return value.categoria === active.dataset.type;
        })
        console.log(filterDice);
        displayBooks(filterDice);
        total = filterDice.reduce((total, value) => {
            return total + value.preco;
        }, 0)
        totalPayable.innerHTML = `R$ ${total.toFixed(2)}`
    })
}

function displayBooks(dice) {
    dice = dice.sort((a, b) => a.preco - b.preco)
    dice.forEach(value => {
        value.quantidade === 0 ? status = 'disabled'
        : status = ''
        list.innerHTML += `
        <div class = "book ${status}"> 
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