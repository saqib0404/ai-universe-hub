const loadCards = async (showMore) => {
    const res = await fetch("https://openapi.programming-hero.com/api/ai/tools")
    const data = await res.json();
    if (showMore) {
        document.getElementById("show-more").classList.add("hidden")
        return displayCards(data.data.tools);
    }
    displayCards(data.data.tools.splice(0, 6));
}
const displayCards = (cards) => {
    const cardsContainer = document.getElementById("cards");

    cardsContainer.innerHTML = ``
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
    
    cardModal.showModal();
    const modal = document.getElementById("modal");
    modal.innerHTML = `
    <div class=" flex justify-between items-center gap-8 mx-8">
    <div class="border-2 border-pink-200 bg-pink-50 py-8 px-4">
    <h2 class="font-semibold mb-2">${card?.description}</h2>
    <div class= "grid grid-cols-3 gap-4">
        <p class="text-green-500 py-4 px-2 bg-white">${card?.pricing[0].plan} ${card?.pricing[0].price}</p>
        <p  class="text-orange-500 py-4 px-2 bg-white">${card?.pricing[1].plan} ${card?.pricing[1].price}</p>
        <p  class="text-pink-500 py-4 px-2 bg-white">${card?.pricing[2].plan} ${card?.pricing[2].price}</p>
    </div>
    <div class="my-5">
        <div>   
            <h3 class="text-xl font-semibold">Features:</h3>
            <ul class="">
                <li class="text-sm">${card?.features[1]?.feature_name}</li>
                <li class="text-sm">${card?.features[2]?.feature_name}</li>
                <li class="text-sm">${card?.features[3]?.feature_name}</li>
            </ul>
        </div>
    </div>
</div>

<div>
    <img src="${card?.image_link[0]}" alt="">
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