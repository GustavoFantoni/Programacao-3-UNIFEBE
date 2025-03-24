
const cardsData = [
    { title: "Histórico 1", hour: "10:30 AM", description: "Descrição do histórico 1" },
    { title: "Histórico 2", hour: "14:00 PM", description: "Descrição do histórico 2" },
    { title: "Histórico 3", hour: "18:45 PM", description: "Descrição do histórico 3" },
    { title: "Histórico 1", hour: "10:30 AM", description: "Descrição do histórico 1" },
    { title: "Histórico 2", hour: "14:00 PM", description: "Descrição do histórico 2" },
    { title: "Histórico 3", hour: "18:45 PM", description: "Descrição do histórico 3" },
    { title: "Histórico 1", hour: "10:30 AM", description: "Descrição do histórico 1" },
    { title: "Histórico 2", hour: "14:00 PM", description: "Descrição do histórico 2" },
    { title: "Histórico 3", hour: "18:45 PM", description: "Descrição do histórico 3" }
];

function gerarCards() {
    const container = document.getElementById("container-history");
    container.innerHTML = ""; 

    cardsData.forEach(card => {
        const cardHTML = `
            <div class="card-history">
                <div class="img-box"></div>
                <div class="textBox">
                    <div class="text-area">
                        <p class="title-card">${card.title}</p>
                        <span class="hour">${card.hour}</span>
                    </div>
                    <p class="p">${card.description}</p>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}

gerarCards(); 
