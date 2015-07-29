console.log('sbuBox.js loaded')

sbu=function(){ // ini
    sbu.pick();
}

sbu.div = document.getElementById("sbuBoxDiv")

sbu.pick=function(){ // File Picker
    $('<div id="box-select" data-link-type="direct" data-multiselect="YOUR_MULTISELECT" data-client-id="a53f4scaqiknm468ae9v4w0irxi8a0o3"></div>').appendTo(sbu.div)
    $.getScript("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/xlsx.core.min.js")
    $.getScript("https://app.box.com/js/static/select.js").then(function(){
        $(document).ready(function(){
            var boxSelect = new BoxSelect();
            // Register a success callback handler
            boxSelect.success(function(response) {
                //console.log(response);
                sbu.pickRead(response)
            });
            // Register a cancel callback handler
            boxSelect.cancel(function() {
                console.log("The user clicked cancel or closed the popup");
            });
        });
    })
    4
}

sbu.readxlsx=function(url,fun){
    var oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function(e) {
      var arraybuffer = oReq.response;

      /* convert data to binary string */
      var data = new Uint8Array(arraybuffer);
      var arr = new Array();
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");

      /* Call XLSX */
      var workbook = XLSX.read(bstr, {type:"binary"});

      /* DO SOMETHING WITH workbook HERE */
      fun(workbook)
    }

    oReq.send();
}

sbu.pickRead=function(response){ // Read file picked 
    x = response
}


sbu() // ini