getLatin();
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
        console.log(data);
        var LatinMenu = "";
         for(var i = 0; i<data.length; i++)
         {
            LatinMenu += "<a class=\"dropdown-item\" href=\"#\">" + data[i].GENUS + " " + data[i].SPECIES + "</a>\n";
             // $("#LatinDropDownMenu").each(function(){
             //     $(this).wrapInner(LatinMenu);
             // })
        }
        $("#LatinDropDownMenu").append(LatinMenu);
        $('.dropdown-menu a').click(function(){
            $('#selected').text($(this).text());
        });
    }


