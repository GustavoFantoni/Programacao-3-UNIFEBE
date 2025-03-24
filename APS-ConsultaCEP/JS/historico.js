class historico {
    constructor() {
        let listaStr = localStorage.listaHistorico;
        this.listaHistorico = listaStr ? JSON.parse(listaStr) : [];
    }

    inserir(obj) {
        this.listaHistorico.push(obj);
        localStorage.listaHistorico = JSON.stringify(this.listaHistorico);
        this.exibir();
    }

    exibir() {
        const container = document.getElementById("container-history");
        container.innerHTML = "";

        this.listaHistorico.forEach(item => {
            const cardHTML = `
                <div class="card-history" onclick="recuperaHistorico(${item.cep.replace(/-/g, "")})">
                    <div class="img-box"></div>
                    <div class="textBox">
                        <div class="text-area">
                            <p class="title-card">${item.cep} </p>
                            <span class="hour">${item.uf}</span>
                        </div>
                        <p class="p">${item.localidade}, ${item.logradouro}</p> 
                    </div>
                </div>
            `;
            container.innerHTML += cardHTML;
        });
    }

    verificaCep(obj) {
        const cepExiste = this.listaHistorico.some(item => item.cep == obj.cep);
        if (!cepExiste) {
            this.inserir(obj);
        }
    }

    recuperarLista() {
        this.exibir();
    }
}

function recuperaHistorico(cep) {
    let input = document.getElementById("input");
    input.value = cep
    popularInfoCep(cep)
}
