//sort first table 
function sortTable1(z) {
    var table, rows;
    var switching, shouldSwitch;

    table = document.getElementById("table1");
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;
        for (var i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            var x = rows[i].getElementsByTagName("td")[z];
            var y = rows[i + 1].getElementsByTagName("td")[z];

            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {

                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {

            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;

        }
    }
}

//sort second table 
function sortTable2(z) {
    var table, rows;
    var switching, shouldSwitch;

    table = document.getElementById("table2");
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;
        for (var i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            var x = rows[i].getElementsByTagName("td")[z];
            var y = rows[i + 1].getElementsByTagName("td")[z];

            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {

                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {

            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;

        }
    }
}

//first load
function loadTableData() {
    $.ajax({
        url: 'http://localhost:3000/phones',
        type: 'get',
        dataType: "json",
        success: function(data) {
            var tableData = "";
            $.each(data, function(key, value) {
                tableData += "<tr>";
                tableData += "<td>" + value.brand + "</td>";
                tableData += "<td>" + value.model + "</td>";
                tableData += "<td>" + value.os + "</td>";
                tableData += "<td><figure><img src=\"" + value.image + "\">" + "</figure></td>";
                tableData += "<td>" + value.screensize + "</td>";
                tableData += "</tr>";
            });
            $('#table1').append(tableData);
        }
    });
}

//insert after submit
function insertTableData() {
    $("#submit").click(function(e) {
        clearTable();
        $.ajax({
            url: 'http://localhost:3000/phones',
            type: "GET",
            dataType: "json",
            success: function(data) {
                var tableData = "";
                $.each(data, function(key, value) {
                    tableData += "<tr>";
                    tableData += "<td>" + value.brand + "</td>";
                    tableData += "<td>" + value.model + "</td>";
                    tableData += "<td>" + value.os + "</td>";
                    tableData += "<td><figure><img src=\"" + value.image + "\">" + "</figure></td>";
                    tableData += "<td>" + value.screensize + "</td>";
                    tableData += "</tr>";
                });
                $('#table1').append(tableData);
            }
        });
    });
}

//submit form
function submitFormData() {
    $("#submit").click(function(e) {
        var info = {
            brand: $("#brand").val(),
            model: $("#model").val(),
            os: $("#os").val(),
            image: $("#image").val(),
            screensize: $("#screensize").val()
        }
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "http://localhost:3000/phones",
            dataType: "json",
            data: info,
            success: function() {
                alert("submitted");
            }
        });
    });
}

//submit form2(update)
function updateData() {
    $("#submit2").click(function(e) {
        var info = {
            brand: $("#brand").val(),
            model: $("#model").val(),
            os: $("#os").val(),
            image: $("#image").val(),
            screensize: $("#screensize").val(),
            id: $("#id").val()
        }
        $.ajax({
            type: "PUT",
            url: "http://localhost:3000/update",
            dataType: "json",
            data: info,
            success: function() {
                alert("submitted");
            }
        });
    });
}

//delete data
function deleteData() {
    $('#submit3').click(function() {
        var info = { id: $('#id').val() }
        $.ajax({
            url: 'http://localhost:3000/delete',
            type: "DELETE",
            dataType: "json",
            data: info,
            success: function(data) {
                alert(data);
            }
        });
        clearTable();
    });
}

//delete all data
function reset() {
    $('#reset').click(function() {
        $.ajax({
            url: 'http://localhost:3000/reset',
            type: "DELETE",
            dataType: "json",
            success: function(data) {
                alert(data);
            }
        });
        clearTable();
    });
}

//delete all rows in HTML
function clearTable() {
    var table = document.getElementById("table1");
    for (var i = table.rows.length - 1; i > 1; i--) {
        table.deleteRow(i);
    }
}

$(document).ready(function() {
    submitFormData();
    updateData();
    deleteData();
    loadTableData();
    insertTableData();
    reset();
})