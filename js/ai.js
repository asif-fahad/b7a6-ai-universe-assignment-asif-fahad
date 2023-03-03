// fetch('https://openapi.programming-hero.com/api/ai/tools')
//   .then(response => response.json())
//   .then(data => showAllCards(data))

const loadMyAI = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
    const data = await res.json();
    console.log(data);
    showAllCards(data);
};
loadMyAI();

const showAllCards = (cards) => {
    console.log(cards.data.tools[0])
    const cardsContainer = document.getElementById('cards-container');

    cards.data.tools.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('col');
    cardDiv.innerHTML = `
    <div class="card h-100 p-3">
     <img src="${card.image}" class="card-img-top img-fluid" alt="...">
     <h5>Features</h5>
     <ol>
     <li>${card.features[0]}</li>
     <li>${card.features[1]}</li>
     <li>${card.features[2]}</li>
     </ol>
    <div class="card-body">
     <hr>
    </div>
    <div>
     <h5 class="card-title">${card.name}</h5>
     <div class="d-flex justify-content-between">
        <small class="text-muted"><i class="fa-regular fa-calendar"></i>${card.published_in}</small>
        <button class="btn btn-danger opacity-25 rounded-5"><i class="fa-solid fa-arrow-right"></i></button>
     </div>
    </div>
    </div>
    `;
        cardsContainer.appendChild(cardDiv);
    });

    
} 