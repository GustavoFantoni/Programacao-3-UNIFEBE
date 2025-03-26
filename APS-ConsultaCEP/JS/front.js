document.addEventListener("DOMContentLoaded", function() {
    let areaHistorico = document.getElementById("container-history");
    let expandir = document.getElementById("expand");
    let scrollTimeout;
    function ajustaAltura() {
        if (window.screen.height < 680) {
            expandir.style.display = "none";
        } else {
            expandir.style.display = "initial";
        }

        if (window.innerWidth < 768) { 
           //areaHistorico.style.height = areaHistorico.style.height === "90px" ?  "90px" : "calc(100vh - 440px)"; 
            areaHistorico.style.height = areaHistorico.style.height === "calc(100vh - 500px)" ? "calc(100vh - 440px)" : "90px"; 
            areaHistorico.style.scrollBehavior = "smooth";
        } else {
            areaHistorico.style.maxHeight = "calc(100vh - 200px)";
            areaHistorico.style.overflow = "auto";
        }
    }

    function expandirHistorico() {
        if (areaHistorico.offsetHeight > 90) {
            areaHistorico.style.height = "90px"; 
        } else {
            areaHistorico.style.height = "calc(100vh - 500px)";
        }
    }




    function ajustarScroll() {
        if (window.innerWidth < 768) { 
            clearTimeout(scrollTimeout); 
            scrollTimeout = setTimeout(() => { 
                let larguraScroll = areaHistorico.clientWidth * 0.97;
                let scrollPosAtual = areaHistorico.scrollLeft;
    
                // Calcula a nova posição baseada em múltiplos exatos de larguraScroll
                let novoScrollPos = Math.round(scrollPosAtual / larguraScroll) * larguraScroll;
    
                // Garante que o scroll fique alinhado corretamente
                novoScrollPos = Math.max(0, Math.min(novoScrollPos, areaHistorico.scrollWidth - areaHistorico.clientWidth));
    
                areaHistorico.scrollTo({
                    left: novoScrollPos,
                    behavior: "smooth"
                });
            }, 40);
        }
    }
    


   
    ajustaAltura();

    expandir.addEventListener("click", expandirHistorico);
     
    window.addEventListener("resize", () => {
        ajustaAltura();
        if (window.innerWidth < 768) {
            expandirHistorico();
        } else {
            areaHistorico.style.height = "calc(100vh - 200px)";
        }
       
    });


    areaHistorico.addEventListener("scroll", ajustarScroll);
});
