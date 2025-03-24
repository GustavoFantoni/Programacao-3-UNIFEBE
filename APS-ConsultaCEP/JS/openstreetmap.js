class openstreetmap {
    async getStreet(lat, lon) {
        let response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        let obj = await response.json();
        console.log(obj.address.postcode)
        return obj.address.postcode || "error";
    }
}