class HistoricoCalculos {
    constructor() {
        this.listaHistorico = [];
        if (localStorage.listaHistorico) {
            this.listaHistorico = localStorage.listaHistorico.split('#');
        }
    }

    inserir(calculo) {
        if (calculo != "") {
            this.listaHistorico.push(calculo);
            let charStr = this.listaHistorico.join('#');
            localStorage.listaHistorico = charStr;
            this.exibir();
        }
    }

    exibir() {
        let list = document.getElementById("list-history");
        list.innerHTML = "";
        for (let i = 0; i < this.listaHistorico.length; i++) {
            let item = document.createElement("li");
            item.id = "item" + i;
            item.innerHTML = this.listaHistorico[i];
            list.appendChild(item);
        }
    }

    recuperarLista() {
        let listaStr = localStorage.listaHistorico;
        if (listaStr != 'undefined') {
            this.listaHistorico = listaStr.split("#");
        }
        this.exibir();
    }
}

let historico = new HistoricoCalculos();
window.onload = () => {
    historico.recuperarLista();
}

const operadores = ['+', '-', '*', '/'];


document.getElementById("list-history").addEventListener("click", (event) => {
    if (event.target.tagName === "LI") { 
        montaEquacao('RecuperaValor', event.target.textContent);
    }
});

function montaEquacao(char, valor = "") { // valor = "" só vai ser usado para recuperar valor do histórico quando clicar
    let caractere = document.getElementById("characters");

    if (caractere.value.includes("Erro")){
        caractere.value = ""
    }

    switch (char) {
        case 'RESET':
            caractere.value = "";
            break;

        case '.':
            let ultimoNumero = caractere.value.split(/[\+\-\*\/]/).pop(); // o regex pega o último número após o último operador
            if (!ultimoNumero.includes('.') && ultimoNumero.length > 0) {
                caractere.value += ".";
            }
            break;

        case 'DEL':
            caractere.value = caractere.value.slice(0, - 1);
            break;

        case 0:
            let partes = caractere.value.split(".");
            if (partes.length > 1) {
                caractere.value += "0";
            } else {
                if ( !caractere.value.startsWith("0")) {
                    caractere.value += "0";
                }
            }
            break;

        case 'RecuperaValor':

            caractere.value = valor;
            break;

        case '=':
           
        try {
            const temOperador = operadores.some(op => caractere.value.includes(op)); // Verifica se contém um operador
            const ultimoChar = caractere.value.slice(-1);
            const ultimoEhOperador = operadores.includes(ultimoChar);
            
            const regex = /^(?!.*\.\d*\.)[0-9+\-*/.]+$/; // rejeita qualquer coisa sem ser números de 0- 9 e os operadores padrões
           // const regex = /^[0-9\-\+\.\/*]+$/;
            if (!regex.test(caractere.value)) {
                caractere.value = "Erro: caracteres inválidos!";
                caractere.style.fontSize = "15px";
            } 

            else if (!temOperador) {
                caractere.value = 'Erro: Sem operador';
                caractere.style.fontSize = "15px";
            } 

            else if (ultimoEhOperador) {
                caractere.value = "Erro: Último caractere não pode ser um operador";
                caractere.style.fontSize = "15px";
            } 

            else {
                const resultado = eval(caractere.value); 
                historico.inserir(caractere.value);
                caractere.value = resultado;
                caractere.style.fontSize = "30px";
            }
            
        } catch (error) {
            caractere.value = 'Erro no cálculo';
        }
            break;
        default:
            const UltimoChar = caractere.value.slice(-1);
            if (operadores.includes(char) && operadores.includes(UltimoChar)) {
                return;
            }
            caractere.value += char;
            break;
    }
}


