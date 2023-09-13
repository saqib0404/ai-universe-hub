const loadCards = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/ai/tools")
    const data = await res.json();
    displayCards(data.data.tools);
}
const displayCards = (cards) => {
    const cardsContainer = document.getElementById("cards");

    cards.forEach(element => {

        const card = document.createElement("div");
        const featuresList = document.createElement("ul");

        let count = 1
        element?.features?.forEach(item => {
            const featureItem = document.createElement("li");
            featureItem.innerText = `${count}. ${item}`;
            featuresList.appendChild(featureItem);
            count++
        });
        console.log(element);
        card.innerHTML = `
    <div class="card bg-base-100 shadow-xl">
        <figure><img src="${element?.image}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">Features</h2>
                <ul id="features" class="mb-2">
                ${featuresList.outerHTML}
            </ul>
                <hr>
                <div class="flex justify-between items-end">
                    <div>
                        <h2 class="font-semibold text-2xl py-1"> ${element.name}</h2>
                        <p>${element?.published_in}</p>
                    </div>
                    <button onclick="loadSingleCard(${element?.id})" class="btn btn-sm btn-primary">Details</button>
                </div>
            </div>
    </div>
    `
        cardsContainer.appendChild(card)
    });
}

const loadSingleCard = async (id) => {
    if (id.toString().length !== 2) id = "0" + id
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    displaySingleCard(data.data)
}

const displaySingleCard = card => {
    console.log(card);
    cardModal.showModal();
    const modal = document.getElementById("modal");
    modal.innerHTML = `
    <div class=" flex justify-between items-center gap-8 mx-8">
    <div class="border-2 border-pink-200 bg-pink-50 py-8 px-4">
    <h2 class="font-semibold mb-2">${card?.description}</h2>
    <div class= "grid grid-cols-3 gap-4">

    </div>
    <h3 class="font-semibold">Features:</h3>
    <ul>

    </ul>
</div>

<div>
    <img src="${card?.logo}" alt="">
</div>
    </div>
<div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button, it will close the modal -->
                        <button class="btn btn-accent">Close</button>
                    </form>
                </div>
    `
}


loadCards()