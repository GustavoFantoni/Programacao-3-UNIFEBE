// Ajustes responsividade MAPA ------------------------------------------

const areaMapa = document.getElementById("areaMapa");
const areaConteudo = document.getElementById("conteudo");

window.addEventListener("load", verificarTela);
window.addEventListener("resize", verificarTela);

function verificarTela() {
    if (window.innerWidth < 992) {
        areaMapa.classList.add("d-none");

        if (!document.querySelector(".openMap")) {
            const buttonOpenMap = document.createElement("button");
            buttonOpenMap.classList.add("openMap");
            buttonOpenMap.style.cssText = `
                position: fixed;
                bottom: 10px;
                right: 10px;
                background-color: blue;
                color: white;
                border-radius: 10px;
                width: fit-content;
                padding: 8px 12px;
                display: flex;
                align-items: center;
                gap: 5px;
                border: none;
                cursor: pointer;
                z-index: 2;
            `;

            buttonOpenMap.innerHTML = '<i class="bi bi-geo-alt"></i> Abrir Mapa';

            areaConteudo.appendChild(buttonOpenMap);

            buttonOpenMap.addEventListener("click", () => {
                if (areaMapa.classList.contains("d-none")) {
                    areaMapa.classList.remove("d-none");
                    areaMapa.style.cssText = `
                        position: absolute;
                        height: 98vh;
                        width: 98vw;
                        bottom: 1vh;
                        z-index: 1;
                        top: 1vh;
                        left: 1vw;
                        right: 1vh;
                        background: white;
                    `;
                    buttonOpenMap.innerHTML = '<i class="bi bi-geo-alt"></i> Fechar Mapa';
                } else {
                    areaMapa.classList.add("d-none");
                    buttonOpenMap.innerHTML = '<i class="bi bi-geo-alt"></i> Abrir Mapa';
                }
            });
        }
    } else {
        areaMapa.classList.remove("d-none");
        areaMapa.style.cssText = "height: 600px; background-color: rgb(196, 196, 255);";
        const existingButton = document.querySelector(".openMap");
        if (existingButton) {
            existingButton.remove();
        }
    }
}
// Ajustes responsividade MAPA ------------------------------------------
const hoje = new Date();
const diaSemana = hoje.getDay();

const elementoDiaSemana = document.getElementById(diaSemana);
elementoDiaSemana.style.cssText = `
    background-color: #fff;
    color: rgb(58, 58, 58);
    height: 100%;
    font-weight: 500;
    position: relative;
    padding: 10px;
    display: flex;
    align-items: center;
    z-index: 0;
  
`;

const triangulo = document.createElement("div");
elementoDiaSemana.appendChild(triangulo);

function ajustarTriangulo() {
    if (window.innerWidth < 992) {
        triangulo.style.cssText = `
            content: "";
            position: absolute;
            top: -32px;
            left: 20px;
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid white;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            transform: rotate(90deg);
            pointer-events: none;
        `;
    }else {
        triangulo.style.cssText = `
            content: "";
            position: absolute;
            top: 50%;
            left: -44px;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid white;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            pointer-events: none;
        `;
    }
}

ajustarTriangulo();
window.addEventListener("resize", ajustarTriangulo);
