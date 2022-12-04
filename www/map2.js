
var map6 = L.map('map6', {
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

var url = "https://engrids.soc.cmu.ac.th/p4000"

// layer control
var baseLayer = {
    "แผนที่ OSM": osm1.addTo(map6),
    "แผนที่ ESRI": Esri_WorldImagery,
    // "แผนที่ Stadia": Stadia_Outdoors
}
var overLayer = {
    // "ขอบเขตอำเภอ": amphoe,
    // "temple": temple,
}

L.control.layers(baseLayer, overLayer).addTo(map6)

//  GPS
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
    var gps = L.marker(e.latlng, { name: "start", draggable: true, icon: icon },);
    gps.addTo(map6).bindPopup("คุณอยู่ที่นี่").openPopup();
}

map6.locate({ setView: true, maxZoom: 15 });

map6.on('locationfound', onLocationFound);


// map6.on('click', (e) => {
//     // console.log(e.latlng)
//     axios.get(url + `/api/getbygps/${e.latlng.lng}/${e.latlng.lat}/:dis`).then(r => {
//         console.log(r)

//     })
// })


map6.on('click', (e) => {
    // console.log(e.latlng)
    var pdis = document.getElementById("pdis").value
    console.log(pdis)
    getpoint(e.latlng.lat, e.latlng.lng, pdis)
    // var popLocation = e.latlng;
    // var popup = L.popup()
    //     .setLatLng(popLocation)
    //     .setContent('<p>Hello world!<br />This is a nice popup.</p>')
    //     .openOn(map6);
})

function getpoint(lat, lng, pdis) {
    const icon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/1301/1301472.png",
        iconSize: [32, 32],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });
    rmLyr()
    L.circle([lat, lng], { radius: pdis, name: "marker" }).addTo(map6);
    // L.circle([50.5, 30.5], { radius: pdis }).addTo(map6);
    axios.get(url + `/api/getbygps/${lng}/${lat}/${pdis}`).then(r => {
        var arr = r.data.data
        arr.forEach(i => {
            console.log(i)
            var marker = L.marker([i.lat, i.lng], { name: "marker", icon: icon })
            marker.addTo(map6)
            marker.bindPopup(`<b>${i.name} </b> <br><br> <img src="${i.picture} " width="300" <br>
            `)
        })
    })
}

// var d_title = ""
// var d_content = ""
// var d_img = ""
// var d_source = ""
// function sendData(title, content, img, source) {
//     // console.log(title, content, img)
//     document.getElementById("d_title").innerText = title;
//     document.getElementById("d_content").innerHTML = content;
//     document.getElementById("d_img").src = img;
//     document.getElementById("d_source").innerText = source;
// }

function rmLyr() {
    map6.eachLayer(lyr => {
        if (lyr.options.name == 'marker') {
            map6.removeLayer(lyr)
        }
    })
}

// ---------------
const x = document.getElementById("getLocation");



function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var pdis = document.getElementById("pdis").value
    // x.innerHTML = "Longitude: " + position.coords.longitude +
    //     "<br> Latitude: " + position.coords.latitude;
    getpoint(position.coords.latitude, position.coords.longitude, pdis)
}



