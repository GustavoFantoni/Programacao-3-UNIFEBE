function limitarCaracteres(input) {
    input.value = input.value.replace(/\D/g, '');

    if (input.value.length > 8) {
      input.value = input.value.slice(0, 8); 
    }

    if (input.value.length === 8) {
        popularInfoCep(input.value);
    }
  }

function verificarEnter(event, input) {
    if (event.key === "Enter") {
        popularInfoCep(input.value);
    }
  }

async function popularInfoCep(cep) {
    let c = new consultaCep();
    let obj = await c.getCep(cep);
    mostrarInfos(obj);
}

async function popularInfoCepGeo(cep) {
    console.log("geo")
    let c = new consultaCep();
    let obj = await c.getCep(cep);
    mostrarInfos(obj);
}

async function obterCep() {
    if("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async function(posicao) {
            let o = new openstreetmap();
            let cep = await o.getStreet(posicao.coords.latitude, posicao.coords.longitude)
            if (cep != "error") {
                popularInfoCepGeo(cep);
            } else {
                popularInfoCep("01001-000");
            }
        })
    }
}

function getGeolocalizacao() {
    navigator.geolocation.getCurrentPosition(obterCep, () => {
        console.log("Erro ao obter geolocalização!");
        popularInfoCep("01001-000")
    });
}

window.onload = () => {
    getGeolocalizacao();
}

function mostrarInfos(obj) {


    m.inserir(obj)


    let list = ["cep", "logradouro", "bairro", "localidade", "uf", "ddd"];
    
    for (let i of list) {
        let a = document.getElementById(i);
        if (a && obj[i]) { 
            a.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    node.remove();
                }
            });
            a.appendChild(document.createTextNode(" " + obj[i]));
        }
    }
}