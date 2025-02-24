class ManipuladorLista {
    constructor() {
        this.listaDeNomes = [];
    }

    inserir() {
        let cpNome = document.getElementById("cpNome");
        if(cpNome.value != '') {
            this.listaDeNomes.push(cpNome.value);

            let nomesStr = this.listaDeNomes.join('#'); // transforma a lista em str, delimitando por ";"

            localStorage.listaDeNomes = nomesStr;
            
            cpNome.value = '';

            this.exibir()
        }
    }

    exibir() {
        let lista = document.getElementById("ListaNomes");
        lista.innerHTML = "";
        for(let i = 0; i < this.listaDeNomes.length; i++) {
            let item = document.createElement('li');
            item.innerHTML = this.listaDeNomes[i];
            lista.appendChild(item);
        }
    }

    recuperarLista() {
        let listaStr = localStorage.listaDeNomes;
        if(listaStr != 'undefined'){
            this.listaDeNomes = listaStr.split("#");
        }
        this.exibir();
    }
}
var m = new ManipuladorLista();
window.onload = () => {
    m.recuperarLista();
}
