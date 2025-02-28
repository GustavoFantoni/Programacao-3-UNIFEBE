var geocoder;

function initMap() {
    
    geocoder = new google.maps.Geocoder();

    
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -26.89, lng: -48.78 }, 
        zoom: 10
    });

    
    var marker = new google.maps.Marker({
        position: map.getCenter(),
        map: map,
        draggable: true 
    });

    
    map.addListener('click', function(event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();

        
        marker.setPosition(event.latLng);

        
        document.getElementById('lat').textContent = lat.toFixed(6);
        document.getElementById('lng').textContent = lng.toFixed(6);

        
        geocodeLatLng(lat, lng);
    });

    
    marker.addListener('dragend', function(event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        geocodeLatLng(lat, lng);
    });
}

function geocodeLatLng(lat, lng) {
    var latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };
    
    
    geocoder.geocode({ 'location': latlng }, function(results, status) {
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
