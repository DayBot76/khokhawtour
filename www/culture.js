
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')
// console.log(id);
var url = "https://b702-202-28-250-113.ap.ngrok.io"

axios.get(url + '/api/getbyroute/' + id).then(r => {

    r.data.data.forEach(e => {
        // console.log(e);

        document.getElementById("disply").innerHTML += `<div class="row">
        <div class="col-sm-9" style="margin: auto; margin-top: 15px; ">
        <h1><b>${e.type_1}</b></h1>
            <div class="card">
                <div class="card-header">
                    <h3><b>${e.name}</b></h3>
                </div>
                <div class="card-body">
                
                    <div class="content">
                        <img class="img-fluid bordr" src="${e.picture}" 
                        style=" width:800px; margin-bottom: 20px; border-radius: 20px; ">
                        <br>
                        <br>
                        <h5> ${e.description}</h5>
                        <br>
                        <h6>ที่มา:
                            ${e.source}
                        </h6>
                        
                        <br>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <p></p>`

    });
})
