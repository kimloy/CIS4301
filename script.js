getLatin();

var LatinDrop = " ";
var test = "";
var editName = "";
var editPerson  = "";
var editLocation = "";
var editSighted = "";

$(document).ready(function(){
    $("#myTable").on('click', '#editBut', function(){
        var $row = $(this).closest("tr");
        editName = $row.find(".name").text();
        editPerson = $row.find(".person").text();
        editLocation = $row.find(".location").text();
        editSighted = $row.find(".sighted").text();
    });

    $('#editModal').on('show.bs.modal', function(e){
       $("#editFlowerName").val(editName);
       $("#editPerson").val(editPerson);
       $("#editLocation").val(editLocation);
       $("#editSighted").val(editSighted);
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

    function sendEdit()
    {
        var editName = $("#editFlowerName").val().trim();
        var editPerson = $("#editPerson").val().trim();
        var editLocation = $("#editLocation").val().trim();
        var editSighted = $("#editSighted").val().trim();

        var data = {};
        data.NAME = editName;
        data.PERSON = editPerson;
        data.LOCATION = editLocation;
        data.SIGHTED = editSighted;
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

