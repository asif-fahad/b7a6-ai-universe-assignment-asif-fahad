const loadMyAI = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
    const data = await res.json();
    // console.log(data);
    showAllCards(data);
};
loadMyAI();

const showAllCards = (cards) => {
    // console.log(cards.data.tools[0])
    const cardsContainer = document.getElementById('cards-container');
    // console.log(cards)
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
        <small class="text-muted"><i class="fa-regular fa-calendar"></i> ${card.published_in}</small>
        <button onclick="fetchModalDetail('${card.id}')" class="btn btn-danger opacity-25 rounded-5" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></button>
     </div>
    </div>
    </div>
    `;
        cardsContainer.appendChild(cardDiv);
    });
}

const fetchModalDetail = (id) => {
    let url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => showModalDetail(data.data));
};

const showModalDetail = (modalDetail) => {
    console.log(modalDetail)
    document.getElementById('modal-body').innerHTML = `
    <div class="row row-cols-1 row-cols-md-3 g-4 d-flex justify-content-center">
                <div class="col">
                  <div class="card">
                    <div class="card-body bg-danger p-2 text-dark bg-opacity-10">
                      <h5 class="card-title">${modalDetail.description}</h5>
                      <div class="d-flex gap-1">
                        <div class="border bg-white text-success">
                        ${modalDetail.pricing[0].price}
                        ${modalDetail.pricing[0].plan}
                        </div>
                        <div class="border bg-white text-primary-emphasis">
                        ${modalDetail.pricing[1].price}
                        ${modalDetail.pricing[1].plan}
                        </div>
                        <div class="border bg-white text-danger-emphasis">
                        ${modalDetail.pricing[2].price}
                        ${modalDetail.pricing[2].plan}
                        </div>
                      </div>
                      <div class="d-flex">
                        <div>
                        <h5>Features</h5>
                        <ul>
                            <li>${modalDetail.features[1].feature_name}</li>
                            <li>${modalDetail.features[2].feature_name}</li>
                            <li>${modalDetail.features[3].feature_name}</li>
                        </ul>
                        </div>
                        <div>
                        <h5>Integrations</h5>
                        <ul>
                            <li>${modalDetail.integrations[0]}</li>
                            <li>${modalDetail.integrations[1]}</li>
                            <li>${modalDetail.integrations[2]}</li>
                        </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card">
                  
                    <img id="modal-img" src="${modalDetail.image_link[0]}" class="card-img-top" alt="...">
                    <div class="fs-6 fw-light text-white bg-danger position-absolute top-0 end-0">${modalDetail.accuracy.score} accuracy</div>
                    <div class="card-body text-center">
                      <h5 class="card-title">${modalDetail.input_output_examples[0].input}
                      </h5>
                      <p class="card-text">${modalDetail.input_output_examples[0].output}</p>
                    </div>
                  </div>
                </div>
                </div>
              </div>
    `

}