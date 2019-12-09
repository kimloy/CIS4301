getLatin();

var LatinDrop = " ";
var test = "";
var editGenus = "";
var editSpecies  = "";
var editComname = "";

$(document).ready(function(){
    $("#myTable").on('click', '#editBut', function(){
        var $row = $(this).closest("tr");
        editComname = $row.find(".name").text();

        var x = getEdit(editComname);
        editSpecies = x[0].SPECIES;
        editGenus = x[0].GENUS;
    });

    $('#editModal').on('show.bs.modal', function(e){
        $("#editGenus").val(editGenus);
        $("#editSpecies").val(editSpecies);
        $("#editComname").val(editComname);
    });

});

    function getLatin()
    {
        $.get("/latin", function(sqlData){
            if(!sqlData)
            {
                console.log("No data received");
            }
            console.log("Received data");
            showLatin(sqlData)
        });
    }

    function showLatin(data)
    {

        var LatinMenu = "";
         for(var i = 0; i<data.length; i++)
         {
            LatinMenu += "<a class=\"dropdown-item\" href=\"#\">" + data[i].COMNAME + "</a>\n";
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
                makeTable(data);
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

    function makeTable(data)
    {
        document.getElementById("myTable").innerHTML = "";
        var editButton = '<button type="button" class="btn btn-outline-info" id = "editBut" data-toggle="modal" data-target="#editModal">Edit</button>'
        var deleteButton = '<button type="button" class="btn btn-outline-danger">Delete</button>'
        var table = document.getElementById('myTable');
        for(var i = 0; i<data.length; i++)
        {
            var row = `<tr> 
                                    <td class = "name">${data[i].NAME}</td>
                                    <td class = "person"> ${data[i].PERSON}</td>
                                    <td class = "location">${data[i].LOCATION}</td>
                                    <td class = "sighted">${data[i].SIGHTED}</td>
                                    <td>${editButton}</td>
                                    <td>${deleteButton}</td>
                                </tr>`
            table.innerHTML += row;
        }
    }

    function getEdit(ComName)
    {
        var data = {};
        data.COMNAME = ComName;
        data = JSON.stringify(data);
        var returnData = "";
        $.ajax({
            url: "/getFlower",
            type: "POST",
            data: data,
            async: false,
            dataType: "json",
            cache: false,
            contentType: "application/json; charset=utf-8",
            complete: function() {
                //called when complete
                console.log('process complete');
            },
            success: function(data) {
                console.log('success');
                console.log(data);
                returnData = data;
            },
            error: function(error) {
                console.log(error);
            }
        });
        return returnData;
    }

    function editModal()
    {
        $('#editModal').on('show.bs.modal', function(e){
            $("#editGenus").val(editGenus);
            $("#editSpecies").val(editSpecies);
            $("#editComname").val(editComname);
        });
    }



    function sendEdit()
    {
        var editGenus = $("#editGenus").val().trim();
        var editSpecies = $("#editSpecies").val().trim();
        var editComname = $("#editComname").val().trim();

        var data = {};
        data.GENUS = editGenus;
        data.SPECIES = editSpecies;
        data.COMNAME = editComname;
        data = JSON.stringify(data);

        $.ajax({
            url: "/editData",
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

