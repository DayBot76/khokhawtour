var map5 = L.map('map5', {
    // center: [18.576805118946563, 99.00678522666357],
    zoom: 17
});

// baseLayer
var osm1 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { attribution: "day" }
);

var osm2 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { attribution: "day" }
);

var Stadia_Outdoors = L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
var amphoe = L.tileLayer.wms("http://rti2dss.com:8080/geoserver/wms?", {
    layers: "th:amphoe_4326",
    format: "image/png",
    transparent: true,
})

// var url = "https://8f70-202-28-250-94.ap.ngrok.io"

// layer control
var baseLayer = {
    "แผนที่ OSM": osm1.addTo(map5),
    "แผนที่ ESRI": Esri_WorldImagery,
    "แผนที่ Stadia": Stadia_Outdoors
}
var overLayer = {
    "ขอบเขตอำเภอ": amphoe
}

L.control.layers(baseLayer, overLayer).addTo(map5)

var start = "";
function onLocationFound(e) {
    console.log(e);
    const icon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/3006/3006872.png",
        iconSize: [45, 45],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });
    start = e.latlng;
    var radius = e.accuracy;
    var gps = L.marker(e.latlng, { name: "start", draggable: true, icon: icon });
    gps.addTo(map5).bindPopup("คุณอยู่ที่นี่").openPopup();
}

map5.locate({ setView: true, maxZoom: 15 });

map5.on('locationfound', onLocationFound);

// var api = "http://localhost:3000/api/getdata";


var mk1 = L.marker([18.5790818512229, 99.0034356974014]);

var routingControl = "null";
function fuindRoute(a, b) {
    routingControl = L.Routing.control({
        waypoints: [
            L.latLng(start.lat, start.lng), //gps
            L.latLng(mk1),  // tour point

        ]
    }).addTo(map5)
}

var url = "https://b702-202-28-250-113.ap.ngrok.io"
// var api5 = "https://f964-202-28-250-94.ap.ngrok.io/api/getdata5";

axios.get(url + "/api/getdata5").then(data => {
    console.log(data.data.data)

    data.data.data.forEach(x => {
        if (x.id = 10) {
            const icon1 = L.icon({
                iconUrl: "https://cdn-icons-png.flaticon.com/512/3430/3430012.png",
                iconSize: [32, 32],
                iconAnchor: [12, 37],
                popupAnchor: [5, -30]
            });
            //     L.marker([x.lat, x.lng]).addTo(map1).bindPopup(x.name)
            L.marker([x.lat, x.lng], { name: "marker1", icon: icon1 }).addTo(map5).bindPopup(`${x.name} <img src = "${x.picture} " width="300" > <br>
        <button class="btn btn-info" onclick="findRoute(${x.lat}, ${x.lng})">นำทาง</button>,`).openPopup()
        }

    })
})

function findRoute(lat, lng) {
    L.Routing.control({
        waypoints: [
            L.latLng(start.lat, start.lng),
            L.latLng(18.5790818512229, 99.0034356974014),
        ]
    }).addTo(map5);
}
// var mk1 = L.marker([]);