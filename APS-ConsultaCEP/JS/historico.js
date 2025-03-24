class historico {
    constructor() {
        this.listaHistorico = [];
    }

    inserir(obj) {
        this.listaHistorico.push(obj);
        localStorage.listaHistorico = JSON.stringify(this.listaHistorico); // Salva como JSON
        // this.exibir();
    }

    // exibir() {
    //     let lista = document.getElementById("ListaNomes");
    //     lista.innerHTML = "";
    //     this.listaHistorico.forEach(item => {
    //         let li = document.createElement('li');
    //         li.textContent = `${item.cep} - ${item.localidade}, ${item.uf}`; // Personalize a exibição
    //         lista.appendChild(li);
    //     });
    // }

    recuperarLista() {
        let listaStr = localStorage.listaHistorico;
        if (listaStr) {
            this.listaHistorico = JSON.parse(listaStr); 
        }
        // this.exibir();
    }
}

var m = new historico();
window.onload = () => {
    m.recuperarLista();
};
