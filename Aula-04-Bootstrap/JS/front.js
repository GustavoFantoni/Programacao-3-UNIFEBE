const areaMapa = document.getElementById("areaMapa");
const areaConteudo = document.getElementById("conteudo");

window.addEventListener("resize", () => {
    if (window.innerWidth < 992) {
        areaMapa.classList.add("d-none");


        if (!document.querySelector(".openMap")) {
            const buttonOpenMap = document.createElement("button");
            buttonOpenMap.classList.add("openMap");
            buttonOpenMap.textContent = "Open Map"; 

            areaConteudo.appendChild(buttonOpenMap);

            buttonOpenMap.addEventListener("click", () => {
                areaMapa.classList.remove("d-none");
                buttonOpenMap.remove(); 
            });
        }
    } else {
        areaMapa.classList.remove("d-none");

        // Remove o botão se a tela for maior que 992px
        const existingButton = document.querySelector(".openMap");
        if (existingButton) {
            existingButton.remove();
        }
    }
});
