// API Key de Google Maps (Reemplázala con la tuya)
const GOOGLE_MAPS_API_KEY = "AIzaSyAPGd6YugcQP6Sxj9lgPwPejKD-vWDkFMY";
var address = "Calle 13 # 100-50, Bogotá, Colombia"; // Dirección de prueba

// Esperar a que el SDK de Zoho CRM esté listo
ZOHO.embeddedApp.on("PageLoad", function(data) {
    console.log("Widget cargado con datos:", data);
    
    // Obtener la dirección desde el CRM
    // var direccion = ZDK.Page.getField("Direccion").getValue();
    
    // if (direccion) {
    //     geocodeAddress(direccion);
    // } else {
    //     console.log("No hay dirección disponible. Usando dirección de prueba.");
        
    // }
});

ZOHO.embeddedApp.init();

// Función para obtener coordenadas de una dirección
function geocodeAddress(address) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.status === "OK") {
                const location = data.results[0].geometry.location;
                initMap(location.lat, location.lng);
            } else {
                console.error("Error en la geocodificación:", data.status);
            }
        })
        .catch(error => console.error("Error en la solicitud a la API de Google Maps:", error));
}

// Función global para inicializar Google Maps
window.initMap = function(lat = 4.6097, lng = -74.0817) {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: lat, lng: lng },
        zoom: 15
    });
    
    new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        title: "Ubicación"
    });
};
