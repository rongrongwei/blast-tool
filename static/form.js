// This script handles requests to backend

$(document).ready(function () {
    $("form").submit(function (event) {
        $("#result").html(""); // clear any previous results table
        $("#errorMessage").html(""); // clear any previous error message
        $(".spinnerSubmit").show().css("display","block"); // start spinner 

        let seqData = {
            seq: $("#blast").val(),  // value is a string
        };
        
        $.ajax({
            type: "POST",
            url: "/blastQuery",
            data: seqData,
            dataType: "Text",
            statusCode: {
                400: function() {
                    $("#errorMessage").html(getErrorMessage(400));
                },
                500: function() {
                    $("#errorMessage").html(getErrorMessage(500));
                }
              },
            complete: function () {
                $(".spinnerSubmit").hide().css("display", "none");
            }

        }).done(function (data) {
            jsonData = JSON.parse(data);
            let table = tableMaker(jsonData);
            $("#result").html(table);
            $("#spinner").hide();
        });
        event.preventDefault();
    });
});

// turning flask result into table
function tableMaker(jsonBlast) {
    let header_keys = [
        "Hit_num",
        "Hit_def",
        "Hit_len",
        "Hit_accession",
        "Hit_id"
    ];

    // let table = document.createElement("table");
    // create table header
    let tableHeader = "<thead><tr>"
    for (const key of header_keys) {
        tableHeader += "<th scope=\"col\">";
        tableHeader += key;
        tableHeader += "</th>";
    }
    tableHeader += "</tr></thead>";

    // create table body
    tableBody = "<tbody>";
    for (const blastItem of jsonBlast) {
        tableBody += "<tr>";
        for (const key of header_keys) {
            if (key == "Hit_num") {
                tableBody += "<th scope=\"row\">" + blastItem[key] + "</th>";
            }
            else if (key == "Hit_accession"){
                tableBody += "<td><a target=\"_blank\" rel=\"noopener noreferrer\" href=\"https://www.ncbi.nlm.nih.gov/nucleotide/" + blastItem[key] + "\">"+ blastItem[key] + "</a></td>";
            }
            else{
                tableBody += "<td>" + blastItem[key] + "</td>";
            }
        }
        tableBody += "</tr>";
    }
    tableBody += "</tbody>";
    let table = "<table class=\"table table-hover\">";
    table += tableHeader;
    table += tableBody;
    table += "</table>";
    return table;
}

function getErrorMessage(status) {
    if (status == 400) {
        return `<div class="alert alert-danger alert-dismissible fade show">
        <strong>Error!</strong> Submitted text was not in valid FASTA format.`
    }
    if (status == 500) {
        return `<div class="alert alert-danger alert-dismissible fade show">
        <strong>Error!</strong> There was a server error (500).`
    }
}

