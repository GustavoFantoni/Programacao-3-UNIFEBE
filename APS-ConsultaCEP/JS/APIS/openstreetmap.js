class openstreetmap {
    async getStreet(lat, lon) {
        let response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        let obj = await response.json();
        return obj.address.postcode || "error";
    }
}