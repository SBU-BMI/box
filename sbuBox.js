console.log('sbuBox.js loaded')

sbuBox=function(){ // ini
    sbuBox.pick();
}

sbuBox.div = document.getElementById("sbuBoxDiv")

sbuBox.pick=function(){ // File Picker
    $('<h4><li> Load data</li></h4>').appendTo(sbuBox.div)
    $('<div id="box-select" data-link-type="direct" data-multiselect="YOUR_MULTISELECT" data-client-id="a53f4scaqiknm468ae9v4w0irxi8a0o3"></div>').appendTo(sbuBox.div)
    $.getScript("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/xlsx.core.min.js")
    $.getScript("https://app.box.com/js/static/select.js").then(function(){
        $(document).ready(function(){
            var boxSelect = new BoxSelect();
            // Register a success callback handler
            boxSelect.success(function(response) {
                //console.log(response);
                sbuBox.pickRead(response)
            });
            // Register a cancel callback handler
            boxSelect.cancel(function() {
                console.log("The user clicked cancel or closed the popup");
            });
        });
    })
    4
}

sbuBox.readxlsx=function(url,fun){
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

sbuBox.pickRead=function(response){ // Read file picked 
    x = response
    $('<pre>loaded: <ol>'+x.map(function(xi){return '<li>'+xi.name+'</li>'}).join('')+'</ol>We can read and analyse this data ... should we ?</pre>').appendTo(sbuBox.div)
    $('<h4><li> Analysis</li>...</h4>').appendTo(sbuBox.div)
    // sbu.readxlsx(x[1].url,function(x){lala=x,console.log('done')})
    // $.get(x[0].url).then(function(x){lala = x;console.log('done')})
}


sbuBox() // ini