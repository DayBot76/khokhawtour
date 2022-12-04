var map2 = L.map('map2', {
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
    "แผนที่ OSM": osm1.addTo(map2),
    "แผนที่ ESRI": Esri_WorldImagery,
    "แผนที่ Stadia": Stadia_Outdoors
}
var overLayer = {
    "ขอบเขตอำเภอ": amphoe
}

L.control.layers(baseLayer, overLayer).addTo(map2)

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
    gps.addTo(map2).bindPopup("คุณอยู่ที่นี่").openPopup();
}

map2.locate({ setView: true, maxZoom: 15 });

map2.on('locationfound', onLocationFound);

var api = "http://localhost:3000/api/getdata";

// axios.get(api).then(data => {
//     // console.log(data.data.data)
//     if (mk1, mk2) {
//         L.marker([mk1, mk]).addTo(map2).bindPopup(`<button class="btn btn-info" onclick="findRoute(${mk1}, ${mk2})">findRoute</button>`)
//     }

//     // data.data.data.forEach(x => {
//     //     L.marker([x.lat, x.lng]).addTo(map2).bindPopup(`<button class="btn btn-info" onclick="findRoute(${x.lat}, ${x.lng})">findRoute</button>`).openPopup()

//     // })
// })

// overLayer
var mk1 = L.marker([18.5772326100573, 99.0084580821394]);
var mk2 = L.marker([18.5813560992137, 99.0060822613796]);
var mk3 = L.marker([18.578796052012, 99.0050257186179]);
var mk4 = L.marker([18.57984240996906, 99.02014210465904]);
var mk5 = L.marker([18.5818036696129, 98.9961264974014]);
var mk6 = L.marker([18.5790818512229, 99.0034356974014]);
var mk7 = L.marker([18.5875818488626, 99.0078137158609]);
var mk8 = L.marker([18.5880982030909, 99.0112352181395]);
var mk9 = L.marker([18.586900795195, 99.017741139729]);
var mk10 = L.marker([18.5763673450028, 99.0197370532202]);

// var overLayer = {
//     "วัดพระธาตุ": mk1.addTo(map2).bindPopup("วัดพระธาตุ").openPopup(),
//     "ข้าวมันไก่": mk2.addTo(map2).bindPopup("ข้าวมันไก่"),
//     "วัดจามเทวี": mk3.addTo(map2).bindPopup("วัดจามเทวี"),
//     "วัดพระยืน": mk4.addTo(map2).bindPopup("วัดพระยืน"),
//     "วัดสันป่ายางหลวง": mk5.addTo(map2).bindPopup("วัดสันป่ายางหลวง"),
//     "วัดมหาวันวรมหาวิหาร": mk6.addTo(map2).bindPopup("วัดมหาวันวรมหาวิหาร"),
//     "วัดดอยติ": mk7.addTo(map2).bindPopup("วัดดอยติ"),
//     "วัดพระคงฤาษี": mk8.addTo(map2).bindPopup("วัดพระคงฤาษี"),
//     "วัดอุโมงค์": mk9.addTo(map2).bindPopup("วัดอุโมงค์"),
//     "วัดพระพุทธบาทพระธาตุอินทร์แขวน": mk10.addTo(map2).bindPopup("วัดพระพุทธบาทพระธาตุอินทร์แขวน"),
//     "ขอบเขตอำเภอ": amphoe
// }

// function findRoute(a, b) {
//     if (mk1, mk2, mk3, mk4, mk5, mk6, mk7, mk7, mk8, mk9, mk10) {
//         L.marker([lat, lng]).addTo(map2).bindPopup(`<button class="btn btn-info" onclick="findRoute(${mk.lat}, ${mk.lng})">findRoute</button>`).openPopup()
//     }

// }

var routingControl = "null";
function fuindRoute(a, b) {
    routingControl = L.Routing.control({
        waypoints: [
            L.latLng(start.lat, start.lng), //gps
            L.latLng(mk1),  // tour point
            L.latLng(mk2),
            L.latLng(mk3),
            L.latLng(mk4),
            L.latLng(mk5),
            L.latLng(mk6),
            L.latLng(mk7),
            L.latLng(mk8),
            L.latLng(mk9),
            L.latLng(mk10)
        ]
    }).addTo(map2)
}
var url = "https://b702-202-28-250-113.ap.ngrok.io"
var api = "https://9398-202-28-250-94.ap.ngrok.io/api/getdata";
var api2 = "https://9398-202-28-250-94.ap.ngrok.io/api/getdata2";

axios.get(url + "/api/getdata2").then(data => {
    console.log(data.data.data)

    data.data.data.forEach(x => {
        if (x.id = 10) {
            const icon1 = L.icon({
                iconUrl: "https://cdn-icons-png.flaticon.com/512/3099/3099073.png",
                iconSize: [32, 32],
                iconAnchor: [12, 37],
                popupAnchor: [5, -30]
            });
            //     L.marker([x.lat, x.lng]).addTo(map1).bindPopup(x.name)
            L.marker([x.lat, x.lng], { name: "marker1", icon: icon1 }).addTo(map2).bindPopup(`${x.name} <img src = "${x.picture} " width="300" > <br>
        <button class="btn btn-info" onclick="findRoute(${x.lat}, ${x.lng})">นำทาง</button>`).openPopup()
        }
        // console.log(JSON.stringify(myURL));
        // myURL = document.getElementById("api");

        //
        // console.log(x.lat, x.lng)
    })
})

// var routingControl = null;
// function findRoute(lat, lng) {
//     routingControl = L.Routing.control({
//         waypoints: [
//             L.latLng(start.lat, start.lng), //gps
//             L.latLng(lat, lng)  // tour point
//         ]
//     }).addTo(map2)
// }

function findRoute(lat, lng) {
    L.Routing.control({
        waypoints: [
            L.latLng(start.lat, start.lng),
            L.latLng(18.5772326100573, 99.0084580821394),
            L.latLng(18.5798156104866, 99.0068693613797),
            L.latLng(18.578796052012, 99.0050257186179),
            L.latLng(18.5748957564695, 99.0041923974013),
            L.latLng(18.5818036696129, 98.9961264974014),
            L.latLng(18.5790818512229, 99.0034356974014),
            L.latLng(18.5875818488626, 99.0078137158609),
            L.latLng(18.5880982030909, 99.0112352181395),
            L.latLng(18.586900795195, 99.017741139729),
            L.latLng(18.5763673450028, 99.0197370532202),
            L.latLng(18.5770173354496, 99.0113147224758),
        ]
    }).addTo(map2);
}
// var mk1 = L.marker([]);
