const form = $("form");
form.submit(function (e){
    e.preventDefault()
    console.log("Submit")
    SendBillett()
    ClearTable();
    Blank()
    setTimeout(HentAlleBilletter, 100);

})

function ClearTable() {
    $(".tableinsert").remove();
}
function ClearArray() {
    $.post("/DeleteBilletter", function (data){
    })
}
function Blank() {
    form.find("Input").not('[type="submit"]').val("");
    form.children("Select").val("");
}

function SendBillett() {
 Billett = {
     "film": document.getElementById("film").value,
     "antall": document.getElementById("antall").value,
     "fornavn": document.getElementById("fornavn").value,
     "etternavn": document.getElementById("etternavn").value,
     "telefonNr": document.getElementById("telefonnr").value,
     "epost": document.getElementById("epost").value,
 }
 console.log(Billett)
$.post("/PostBillett",Billett, function (data){
})
}

function UpdateBillett(innId) {
    Billett = {
        "uid" : innId,
        "film": document.getElementById("film").value,
        "antall": document.getElementById("antall").value,
        "fornavn": document.getElementById("fornavn").value,
        "etternavn": document.getElementById("etternavn").value,
        "telefonNr": document.getElementById("telefonnr").value,
        "epost": document.getElementById("epost").value,
    }
    console.log(Billett)
    $.post("/UpdateBillett",Billett, function (data){
    })
    ClearTable();
    Blank()
    setTimeout(HentAlleBilletter, 100);
}


function FormaterData(BilletterArray) {
    for (const Obj in BilletterArray) {
        let HTMLBuild = "";
        let Keys = Object.keys(BilletterArray[Obj]);
        for (let i = 0; i < Keys.length; i++) {
            console.log(BilletterArray[Obj][Keys[i]]);
            HTMLBuild += "<td>" + BilletterArray[Obj][Keys[i]] + "</td>";
        }
        console.log(BilletterArray[Obj].uid)
        HTMLBuild = "<tr>" + HTMLBuild +
            "<td><button onclick='SlettBillett(" + BilletterArray[Obj].uid + ")' class='btn btn-outline-danger'>Delete</button>" +
            "<button onclick='UpdateBillett(" + BilletterArray[Obj].uid + ")' class='btn btn-outline-warning'>Edit</button></td>" + "</tr>";


        $("#allebilletter").append(HTMLBuild);
        $("#allebilletter tr:last").addClass("tableinsert");
    }
    /* We go through all Elements within BilletterArray and then iterate through their keys and build the HTML string
    We then append it to the table in HTML with the id "#allebilletter" and since append inserts it at the end
    I give the class with the jquery selector tr:last, whilst being a child of "#allebilletter"*/
}
function HentAlleBilletter(){
    $.get("/GetBilletter", function (data) {
        FormaterData(data)
        console.log(data)
})
}
function SlettBillett(id) {
    $.post("/DeleteBillett", {id: id}, function (data) {
    });
    ClearTable();
    Blank()
    setTimeout(HentAlleBilletter, 100);
}
