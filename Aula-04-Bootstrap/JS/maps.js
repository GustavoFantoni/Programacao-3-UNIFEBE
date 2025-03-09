    var geocoder;

    function initMap() {
        geocoder = new google.maps.Geocoder();
        var defaultLocation = { lat: -27.0985, lng: -48.9106 }; // Padrão - Brusque

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    var userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    loadMap(userLocation); 
                },
                function () {
                    loadMap(defaultLocation);
                }
            );
        } else {
            loadMap(defaultLocation);
        }
    }

    function loadMap(centerLocation) {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: centerLocation,
            zoom: 10
        });

        var marker = new google.maps.Marker({
            position: centerLocation,
            map: map,
            draggable: true
        });

        document.getElementById('lat').textContent = centerLocation.lat.toFixed(6);
        document.getElementById('lng').textContent = centerLocation.lng.toFixed(6);

        geocodeLatLng(centerLocation.lat, centerLocation.lng);
        getClima(centerLocation.lat, centerLocation.lng);

        map.addListener('click', function (event) {
            var lat = event.latLng.lat();
            var lng = event.latLng.lng();
            marker.setPosition(event.latLng);
            document.getElementById('lat').textContent = lat.toFixed(6);
            document.getElementById('lng').textContent = lng.toFixed(6);
            geocodeLatLng(lat, lng);
            getClima(lat, lng);
        });

        marker.addListener('dragend', function (event) {
            var lat = event.latLng.lat();
            var lng = event.latLng.lng();
            document.getElementById('lat').textContent = lat.toFixed(6);
            document.getElementById('lng').textContent = lng.toFixed(6);
            geocodeLatLng(lat, lng);
            getClima(lat, lng);
        });
    }

    function geocodeLatLng(lat, lng) {
        var latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };
        geocoder.geocode({ 'location': latlng }, function (results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    var address = results[0].address_components;
                    var city = '';
                    var state = '';

                    for (var i = 0; i < address.length; i++) {
                        if (address[i].types.includes("locality")) {  
                            city = address[i].long_name;
                        }
                        if (address[i].types.includes("administrative_area_level_1")) {  
                            state = address[i].long_name;
                        }
                        if (address[i].types.includes("administrative_area_level_2")) {  
                            city = address[i].long_name;
                        }
                        if (address[i].types.includes("sublocality")) {  
                            city = address[i].long_name;
                        }
                    }

                    document.getElementById('city').textContent = city || 'Cidade não encontrada';
                    document.getElementById('state').textContent = state || 'Estado não encontrado';
                } else {
                    window.alert('Nenhum resultado encontrado para as coordenadas fornecidas.');
                }
            } else {
                window.alert('Geocoding falhou devido a: ' + status);
            }
        });
    }

    async function getClima(lat, long) {
        let o = new OpenWeather(lat, long);
        let objClima = await o.getClima();
        
        let clima = document.getElementById("temperatura");
        let sensacao = document.getElementById("sensacao");
        let icone = document.getElementById("icone");
        let pressao = document.getElementById("pressao");
        let umidade = document.getElementById("umidade");
        let min = document.getElementById("min");
        let max = document.getElementById("max");

        clima.innerHTML = Math.round(objClima.main.temp) + "°"; 
        sensacao.innerHTML = "Sensação de " + Math.round(objClima.main.feels_like) + "°";

        let icon = objClima.weather[0].icon;
        icone.src = `icons/${icon}.png`;

        pressao.innerHTML = objClima.main.pressure;
        umidade.innerHTML = objClima.main.humidity;
        min.innerHTML = Math.round(objClima.main.temp_min) + "°";
        max.innerHTML =  Math.round(objClima.main.temp_max) + "°";

    }

    window.initMap = initMap;
