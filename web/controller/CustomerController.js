const cusIDRegEx = /^(C00)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{3,20}$/;
const cusTpRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

$("#btnSave").click(function () {
    var data = $("#customerForm").serialize();
    $.ajax({
        url: "customer",
        method: "POST",
        data:data,
        success: function (res) {
            if (res.status == 200){
                alert(res.message);
            }else{
                alert(res.data);
            }
        },
        error:function (ob, textStatus, error) {
            console.log(ob);
            console.log(textStatus);
            console.log(error);
        }
    });
    generateCustomerId();
    loadAllCustomers();
    checkIfValided();
    clearAll();
});

$("#btnSearch").click(function () {

});

$("#btnUpdate").click(function () {

});

$("#customerDelete").click(function () {

});
loadAllCustomers();
function loadAllCustomers(){
            $("#customerTable").empty();
            $.ajax({
                url: "customer",
                method: "GET",
                success: function (resp) {
                    for (const customer of resp.data){
                        let row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.tp}</td><td>${customer.salary}</td></tr>`;
                        $("#customerTable").append(row);
                    }
                    bindClickEvents();
                }
            });
}

function bindClickEvents(){
    $("#customerTable>tr").click(function () {
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let tp = $(this).children().eq(2).text();
        let salary = $(this).children().eq(3).text();

        $("#lblcusid").val(id);
        $("#lblcusname").val(name);
        $("#lblcustp").val(tp);
        $("#lblcussalary").val(salary);

    });
}

function generateCustomerId() {
    try {
        let lastCustId = customerDB[customerDB.length - 1].getId();
        let newCustId = parseInt(lastCustId.substring(1, 4)) + 1;
        if (newCustId < 10) {
            $("#txtId").val("C00" + newCustId);
        } else if (newCustId < 100) {
            $("#txtId").val("C0" + newCustId);
        } else {
            $("#txtId").val("C" + newCustId);
        }
    } catch (e) {
        $("#txtId").val("C001");
    }
}

/*function searchCustomer() {
    console.log("Searc")
    for (var i=0;i<customerDB.length;i++){
        if($('#txtSearchCusID').val()==customerDB[i].getId()){
            $("#txtId").val(customerDB[i].getId())
            $("#txtName").val(customerDB[i].getName());
            $("#txtTp").val(customerDB[i].getTp());
            $("#txtSalary").val(customerDB[i].getSalary());
        }else{
            alert("Invalid ID , Try again");
            $("#txtName").focus();
        }
    }
/!*    $("#btnSave").attr('disabled', true);
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].id == id) {
            return customerDB[i];
        }
    }*!/
}*/

OpenLoadFunction();

function OpenLoadFunction(){
    generateCustomerId();

}

function clearAll() {
    $('#txtId,#txtName,#txtTp,#txtSalary').val("");
    $('#txtId,#txtName,#txtTp,#txtSalary').css('border', '2px solid red');
    $('#txtId').focus();
    $("#btnSave").attr('disable', true);
    loadAllCustomers();
    $("#lblcusid,#lblcusname,#lblcustp,#lblcussalary").text("");
    generateCustomerId();
}

$("#btnClose").click(function () {
    $('#txtId,#txtName,#txtTp,#txtSalary').val("");
    clearAll();
    generateCustomerId();
});

// search customer
$("#btnSearch").click(function () {
    clearAll();
});


$('#txtId,#txtName,#txtTp,#txtSalary').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault();
    }
});

$('#txtId,#txtName,#txtTp,#txtSalary').on('blur', function () {
    formValid();
});

//focusing events
$("#txtId").on('keyup', function (eventOb) {
    setButton();
});

$("#txtName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValided();
    }
});

$("#txtTp").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValided();
    }
});

$("#txtSalary").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValided();
    }
});


$("#btnSave").attr('disabled', true);

function formValid() {
    var cusID = $("#txtId").val();
    $("#txtId").css('border', '2px solid green');
    $("#lblcusid").text("");
    if (cusIDRegEx.test(cusID)) {
        var cusName = $("#txtName").val();
        if (cusNameRegEx.test(cusName)) {
            $("#txtName").css('border', '2px solid green');
            $("#lblcusname").text("");
            var cusTp = $("#txtTp").val();
            if (cusTpRegEx.test(cusTp)) {
                var cusSalary = $("#txtSalary").val();
                var sly = cusSalaryRegEx.test(cusSalary);
                $("#txtTp").css('border', '2px solid green');
                $("#lblcustp").text("");
                if (sly) {
                    $("#txtSalary").css('border', '2px solid green');
                    $("#lblcussalary").text("");
                    return true;
                } else {
                    $("#txtSalary").css('border', '2px solid red');
                    $("#lblcussalary").text("Cus Salary is a required field : Pattern 100.00 or 100");
                    return false;
                }
            } else {
                $("#txtTp").css('border', '2px solid red');
                $("#lblcustp").text("Cus Tp is a required field : Mimum 7");
                return false;
            }
        } else {
            $("#txtName").css('border', '2px solid red');
            $("#lblcusname").text("Cus Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#txtId").css('border', '2px solid red');
        $("#lblcusid").text("Cus ID is a required field : Pattern C00");
        return false;
    }
}

function checkIfValided() {
        $("#txtName").focus();
        var cusName = $("#txtName").val();
        if (cusNameRegEx.test(cusName)) {
            $("#txtTp").focus();
            var cusTp = $("#txtTp").val();
            if (cusTpRegEx.test(cusTp)) {
                $("#txtSalary").focus();
                var cusSalary = $("#txtSalary").val();
                var sly = cusSalaryRegEx.test(cusSalary);
                if (sly) {
                    let con = confirm("Do you really need to add this Customer..?");
                    if (con) {
                        saveCustomer();
                        clearAll();
                    }
                } else {
                    $("#txtSalary").focus();
                }
            } else {
                $("#txtTp").focus();
            }
        } else {
            $("#txtName").focus();
        }
}

function setButton() {
    let b = formValid();
    if (b) {
        $("#btnSave").attr('disabled', false);
    } else {
        $("#btnSave").attr('disabled', true);
    }
}