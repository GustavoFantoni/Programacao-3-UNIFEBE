document.addEventListener("DOMContentLoaded", function() {
    let areaHistorico = document.getElementById("container-history");
    let expandir = document.getElementById("expand");
    
    function ajustaAltura() {
    
        if (window.screen.height < 680) {
            expandir.style.display = "none";
        } else {
            expandir.style.display = "initial";
        }

        if (window.screen.width < 768) {
            areaHistorico.style.height = areaHistorico.style.height === "calc(100vh - 500px)" ? "calc(100vh - 440px)" : "90px"; 
        } else {
            areaHistorico.style.height = "calc(100vh - 200px)";
        }
    }
   
    ajustaAltura();

    expandir.addEventListener("click", () => {
        if (areaHistorico.offsetHeight > 90) {
            areaHistorico.style.height = "90px"; 
        } else {
            areaHistorico.style.height = "calc(100vh - 500px)";
        }
    });

    window.addEventListener("resize", function() {
        ajustaAltura();
    });  
});
