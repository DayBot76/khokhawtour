// const e = require("express");

var map1 = L.map('map1', {
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


// Stamen_Watercolor.addTo(map1);
// Esri_WorldImagery.addTo(map2);

// overLayer
// var mkวัดพระธาตุ = L.marker([18.577394968424464, 99.00819606864812]);
// var mkข้าวมันไก่ = L.marker([18.576713590392455, 99.00696225246553]);
// var mkวัดจามเทวี = L.marker([18.584561064569517, 98.99645283426538]);
// var mkวัดพระยืน = L.marker([18.57984240996906, 99.02014210465904]);
// var mkวัดสันป่ายางหลวง = L.marker([18.589604999135542, 99.01155903567584]);
// var mkวัดมหาวันวรมหาวิหาร = L.marker([18.582591856081677, 99.00307667820039]);
// var mkวัดดอยติ = L.marker([18.551311827419163, 99.05226231696709]);
// var mkวัดพระคงฤาษี = L.marker([18.58836539385207, 99.0082410011061]);
// var mkวัดอุโมงค์ = L.marker([18.66907019718137, 99.03484308524507]);
// var mkวัดพระพุทธบาทพระธาตุอินทร์แขวน = L.marker([18.48515973558617, 99.03086795558744]);
// var mkวัดสวนดอก = L.marker([18.590793236301746, 99.00994462386541]);
// var mkวัดป่าพุทธพจน์ศรีหริภุญชัย = L.marker([18.561992190867215, 98.98951691968539]);
// var mkวัดสุพรรณรังษี = L.marker([18.579566288813655, 99.00702638041112]);
// var road = L.polyline([[18.576072889161978, 99.00919385039408],
// [18.578289908561224, 99.00908656203181],
// [18.5785644915419, 99.00742359241877]
// ], { color: "lightgreen" })


// var amphoe = L.tileLayer.wms("http://rti2dss.com:8080/geoserver/wms?", {
//     layers: "th:amphoe_4326",
//     format: "image/png",
//     transparent: true,
// })
// var temple = L.tileLayer.wms("https://fdfd-202-28-250-94.ap.ngrok.io/api/getdata/tour", {
//     layers: "public.tour_point_4326",
//     format: "st_geom('POINT')",
//     transparent: true,
// })

// layer control
var baseLayer = {
    "แผนที่ OSM": osm1.addTo(map1),
    "แผนที่ ESRI": Esri_WorldImagery,
    // "แผนที่ Stadia": Stadia_Outdoors
}
var overLayer = {
    // "ขอบเขตอำเภอ": amphoe,
    // "temple": temple,
}

L.control.layers(baseLayer, overLayer).addTo(map1)

// var api = "https://f964-202-28-250-94.ap.ngrok.io";

// axios.get(api).then(data => {
//     console.log(data.data.data)

//     data.data.data.forEach(x => {
//         // if (x.type_2 = "วัด") {
//         //     L.marker([x.lat, x.lng]).addTo(map1).bindPopup(x.name)
//         // }
//         // console.log(JSON.stringify(myURL));
//         // myURL = document.getElementById("api");
//         L.marker([x.lat, x.lng]).addTo(map1).bindPopup(`${x.name} <img src = "${x.picture} " width="300"> <br>
//             <button class="btn btn-success" onclick="sendData('${x.name}', '${x.description}', '${x.picture}')">Read</button>
//             <button class="btn btn-info" onclick="findRoute(${x.lat}, ${x.lng})">findroute</button>`)
//         //
//         // console.log(x.lat, x.lng)
//     })
// })

// function rmLyr() {
//     map1.eachLayer(lyr => {
//         if (lyr.options.name == 'marker') {
//             map1.removeLayer(lyr)
//         }
//     })
// }

// https://383b-202-28-250-94.ap.ngrok.io/api/getdata/tour

var api_t = url + "/api/getdata/tour"

axios.get(api_t).then(data => {
    console.log(data.data.data)

    data.data.data.forEach(x => {
        // if (x.type_2 = "วัด") {
        //     L.marker([x.lat, x.lng]).addTo(map1).bindPopup(x.name)
        // }
        // console.log(JSON.stringify(myURL));
        // myURL = document.getElementById("api");
        const icon1 = L.icon({
            iconUrl: "https://cdn-icons-png.flaticon.com/512/3430/3430012.png",
            iconSize: [32, 32],
            iconAnchor: [12, 37],
            popupAnchor: [5, -30]
        });
        L.marker([x.lat, x.lng], { name: "marker1", icon: icon1 }).addTo(map1).bindPopup(`${x.name} <img src = "${x.picture} " width="300"> <br>
            <button class="btn btn-success" onclick="sendData('${x.name}', '${x.description}', '${x.picture}', '${x.source}')">ข้อมูล</button>
            <button class="btn btn-info" onclick="findRoute(${x.lat}, ${x.lng})">ค้นหาเส้นทาง</button>`)
        //
        // console.log(x.lat, x.lng)
    })
})
//  var api = "http://localgost:3000/api/getdata/restaurant"
var api_r = url + "/api/getdata/restaurant"
axios.get(api_r).then(data => {
    console.log(data.data.data)

    data.data.data.forEach(x => {
        // if (x.type_2 = "วัด") {
        //     L.marker([x.lat, x.lng]).addTo(map1).bindPopup(x.name)
        // }
        // console.log(JSON.stringify(myURL));
        // myURL = document.getElementById("api");
        const icon2 = L.icon({
            iconUrl: "https://cdn-icons-png.flaticon.com/512/3170/3170733.png",
            iconSize: [32, 32],
            iconAnchor: [12, 37],
            popupAnchor: [5, -30]
        });
        L.marker([x.lat, x.lng], { name: "marker2", icon: icon2 }).addTo(map1).bindPopup(`${x.name} <img src = "${x.picture} " width="300px"> <br>
            <button class="btn btn-success" onclick="sendData('${x.name}', '${x.description}', '${x.picture}', '${x.source}')">ข้อมูล</button>
            <button class="btn btn-info" onclick="findRoute(${x.lat}, ${x.lng})">ค้นหาเส้นทาง</button>`)
        //
        // console.log(x.lat, x.lng)
    })
})


var api_h = url + "/api/getdata/hostel"
axios.get(api_h).then(data => {
    console.log(data.data.data)

    data.data.data.forEach(x => {
        // if (x.type_2 = "วัด") {
        //     L.marker([x.lat, x.lng]).addTo(map1).bindPopup(x.name)
        // }
        // console.log(JSON.stringify(myURL));
        // myURL = document.getElementById("api");
        const icon3 = L.icon({
            iconUrl: "https://cdn-icons-png.flaticon.com/512/594/594106.png",
            iconSize: [32, 32],
            iconAnchor: [12, 37],
            popupAnchor: [5, -30]
        });

        L.marker([x.lat, x.lng], { name: "marker3", icon: icon3 }).addTo(map1).bindPopup(`${x.name} <img src = "${x.picture} " width="300"> <br>
            <button class="btn btn-success" onclick="sendData('${x.name}', '${x.description}', '${x.picture}', '${x.source}')">ข้อมูล</button>
            <button class="btn btn-info" onclick="findRoute(${x.lat}, ${x.lng})">ค้นหาเส้นทาง</button>`)
        //
        // console.log(x.lat, x.lng)
    })
})

var t_title = ""
var t_content = ""
var t_img = ""
var t_source = ""
function sendData(title, content, img, source) {
    // console.log(title, content, img)
    document.getElementById("t_title").innerText = title;
    document.getElementById("t_content").innerHTML = content;
    document.getElementById("t_img").src = img;
    document.getElementById("t_source").innerText = source;
}

var routingControl = null;
function findRoute(a, b) {
    routingControl = L.Routing.control({
        waypoints: [
            L.latLng(start.lat, start.lng), //gps
            L.latLng(a, b)  // tour point
        ]
    }).addTo(map1)
}

// GPS
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
    gps.addTo(map1).bindPopup("คุณอยู่ที่นี่").openPopup();
}

map1.locate({ setView: true, maxZoom: 15 });

map1.on('locationfound', onLocationFound);


function getpoint() {
    rmLyr();
    $.get("/api/getdata").done(r => {
        r.data.forEach(i => {

            console.log(i)
            L.marker([i.lng, i.lat], { name: "marker" }).addTo(map1)

        })
    })
}

// getpoint();


// var st = ""
// function getstour() {
//     map1.eachLayer(r => {
//         // console.log(r)
//         if (r.options.markerName) {
//             map1.removeLayer(r)
//         }
//     })

//     let st = document.getElementById("st")
//     // console.log(st)
//     // var api_st = url + "/api/getbyrote/" + st;

//     axios.get(url + '/api/getbyrote/' + st).then(i => {
//         // console.log(i.data.data)
//         i.data.forEach(r => {
//             // console.log(r)
//             L.marker([r.lat, r.lng], { markerName: "marker" }).addTo(map1).bindPopup(`${r.name}`)
//         })
//     })
// }
