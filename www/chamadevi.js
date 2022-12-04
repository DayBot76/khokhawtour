var map4 = L.map('map4', {
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

// layer control
var baseLayer = {
    "แผนที่ OSM": osm1.addTo(map4),
    "แผนที่ ESRI": Esri_WorldImagery,
    "แผนที่ Stadia": Stadia_Outdoors
}
var overLayer = {
    "ขอบเขตอำเภอ": amphoe
}

L.control.layers(baseLayer, overLayer).addTo(map4)

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
    gps.addTo(map4).bindPopup("คุณอยู่ที่นี่").openPopup();
}

map4.locate({ setView: true, maxZoom: 15 });

map4.on('locationfound', onLocationFound);

// var api = "http://localhost:3000/api/getdata";


var mk1 = L.marker([18.580018925901, 99.0095100109756]);
var mk2 = L.marker([18.5818036696129, 98.9961264974014]);
var mk3 = L.marker([18.5763673450028, 99.0197370532202]);

var routingControl = "null";
function fuindRoute(a, b) {
    routingControl = L.Routing.control({
        waypoints: [
            L.latLng(start.lat, start.lng), //gps
            L.latLng(mk1),  // tour point
            L.latLng(mk2),
            L.latLng(mk3),
            L.latLng(mk4),
        ]
    }).addTo(map4)
}


var api4 = "https://engrids.soc.cmu.ac.th/p4000/api/getdata4";

axios.get(api4).then(data => {
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
            L.marker([x.lat, x.lng], { name: "marker1", icon: icon1 }).addTo(map4).bindPopup(`${x.name} <img src = "${x.picture} " width="300" > <br>
        <button class="btn btn-info" onclick="findRoute(${x.lat}, ${x.lng})">นำทาง</button>,`).openPopup()
        }

    })
})

function findRoute(lat, lng) {
    L.Routing.control({
        waypoints: [
            L.latLng(start.lat, start.lng),
            L.latLng(18.580018925901, 99.0095100109756),
            L.latLng(18.5818036696129, 98.9961264974014),
            L.latLng(18.5763673450028, 99.0197370532202),
        ]
    }).addTo(map4);
}
// var mk1 = L.marker([]);
