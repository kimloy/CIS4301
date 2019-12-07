getLatin();

var LatinDrop = " ";
var test = "";

    function getLatin()
    {
        $.get("/latin", function(sqlData){
            if(!sqlData)
            {
                console.log("No data received");
            }
            console.log("Received data");
            // for(var i = 0; i < sqlData.length; i++)
            //     showLatin(sqlData[i].GENUS + " " + sqlData[i].SPECIES);
            showLatin(sqlData)
        });
    }

    function showLatin(data)
    {

        var LatinMenu = "";
         for(var i = 0; i<data.length; i++)
         {
            LatinMenu += "<a class=\"dropdown-item\" href=\"#\">" + data[i].COMNAME + "</a>\n";
             // $("#LatinDropDownMenu").each(function(){
             //     $(this).wrapInner(LatinMenu);
             // })
        }
        $("#LatinDropDownMenu").append(LatinMenu);
        $('.dropdown-menu a').click(function(){
            $('#selected').text($(this).text());
        });
    }

    function getDropSelected(){
        LatinDrop = document.getElementById('selected').innerText;
        console.log(LatinDrop);
        var data = {};
        data.dd = LatinDrop;
        data = JSON.stringify(data);
        $.ajax({
            url: "/postDrop",
            type: "POST",
            data: data,
            dataType: "json",
            cache: false,
            contentType: "application/json; charset=utf-8",
            complete: function() {
                //called when complete
                console.log('process complete');
            },
            success: function(data) {
                console.log('success');
                console.log(JSON.stringify(data));
            },
            error: function(error) {
                console.log(error);
            }
        });
    }


