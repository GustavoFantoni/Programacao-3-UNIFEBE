let infos = document.getElementById("areaInfos");

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
  let ultimoCep = ""; 
  let ultimoErro = "";
  
  async function popularInfoCep(cep) {
      if (ultimoCep && ultimoCep === cep) { 
          window.alert("Esse CEP já está sendo exibido!");
          return;
      }
  
      let c = new consultaCep();
      let obj = await c.getCep(cep);
  
      if (obj && !obj.erro) {
          mostrarInfos(obj);
          document.getElementById("cep").innerHTML = `
              <span class="d-flex align-items-end justify-content-end span-response">CEP </span> ${cep}`;
          ultimoCep = cep; 
          ultimoErro = "";
      } else {
          if (obj.mensagem !== ultimoErro) { 
              infos.style.display = "none";
              window.alert(obj.mensagem);
              ultimoErro = obj.mensagem; 
          }
      }
  }
  


async function obterCep() {
    if("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async function(posicao) {
            let o = new openstreetmap();
            let cep = await o.getStreet(posicao.coords.latitude, posicao.coords.longitude)
            if (cep != "error") {
                popularInfoCep(cep.replace(/-/g, ""));
            } else {
                popularInfoCep("01001000");
            }
        })
    }
}

function getGeolocalizacao() {
    navigator.geolocation.getCurrentPosition(obterCep, () => {
        console.log("Erro ao obter geolocalização!");
        popularInfoCep("01001000")
    });
}


function mostrarInfos(obj) {
    let m = new historico();
    m.verificaCep(obj);

    let list = ["cep", "logradouro", "bairro", "localidade", "uf", "ddd"];
    
    for (let i of list) {
        let flag = document.getElementById("flag");
        let a = document.getElementById(i);

        if (a) { 
            a.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    node.remove();
                }
            });

            let valor = obj[i] && obj[i].trim() !== "" ? obj[i] : "Sem informação";
            a.appendChild(document.createTextNode(" " + valor));

            flag.src = "flags/" + obj.uf + ".png";
            infos.style.display = "block";
        }
    }
}
