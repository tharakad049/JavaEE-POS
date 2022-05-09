$("#btnSave").click(function () {
    saveCustomer();
/*
    clearAll();
*/
    loadAllCustomers();
    $('#txtId,#txtName,#txtTp,#txtSalary').val("");

/*
    updateCustomer();
*/
    generateCustomerId();
});

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
/*    if (customerDB.length!=0) {
        let lastrecord = customerDB[customerDB.length - 1].id;
        let split = lastrecord.split("-");
        let splitElement = ++split[1];
        if (splitElement < 10 && splitElement > 0) {
            $("#txtId").val("C00-" + "00" + splitElement);
        } else if (splitElement > 99) {
            $("#txtId").val("C00-" + splitElement);

        } else {
            $("#txtId").val("C00-001");
        }
    }else{
        $("#txtId").val("C00-001");
    }*/
}

$("#customerDelete").click(function (){
    let id=$('#txtId').val();
    let option=confirm(`Do you want to delete ID:${id}`);
    if(option){
        let erase=deleteCustomer(id);
        if(erase){
            alert("Customer Deleted");
            $('#txtId,#txtName,#txtTp,#txtSalary').val("");
            generateCustomerId();
        }else {
            alert("Delete Failed , Try again");
        }
    }

    loadAllCustomers();
/*
    var custId= $("#txtSearchCusID").val();
    for (var i in customerDB){
        if (custId==customerDB[i].id){
            customerDB.splice(i,1);
            loadAllCustomers();
            alert("Customer Delete Complete");
            clearAll();
            break;
        }
    }
*/

});

function deleteCustomer(id){
    let customer;
    if(id!=null){
        for (var i=0;i<customerDB.length;i++){
            if(id==customerDB[i].getId()){
                customer=customerDB[i];
            }
        }
        let indexNumber=customerDB.indexOf(customer);
        customerDB.splice(indexNumber,1);
        return true;
    }else{
        return false;
    }

}

$("#btnUpdate").click(function () {
    console.log("Customer Update Complete");
    updateCustomer();
    loadAllCustomers();
    $('#txtId,#txtName,#txtTp,#txtSalary').val("");
    generateCustomerId();
/*    for (var i in customerDB){
        if ($("#txtId").val()==customerDB[i].id){

            $("#txtName").val();
            $("#txtTp").val();
            $("#txtSalary").val();

            customerDB[i].name;
            customerDB[i].tp;
            customerDB[i].salary;

            clearAll();
            generateCustomerId();
            loadAllCustomers();
            alert("Customer Update complete");
            break;
        }
    }*/
});

function saveCustomer() {
    let customerID = $("#txtId").val();
    let customerName = $("#txtName").val();
    let customerTp = $("#txtTp").val();
    let customerSalary = $("#txtSalary").val();
    var customer=new CustomerDTO(customerID, customerName, customerTp, customerSalary);

    customerDB.push(customer);
/*    generateCustomerId();
    //create Object

    var customerObject = {
        id: customerID,
        name: customerName,
        tp: customerTp,
        salary: customerSalary
    };

    customerDB.push(customerObject);*/
}

function searchCustomer() {
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
/*    $("#btnSave").attr('disabled', true);
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].id == id) {
            return customerDB[i];
        }
    }*/
}
OpenLoadFunction();

function OpenLoadFunction(){
    generateCustomerId();

}
function updateCustomer() {
/*    $("#customerTable>tr").on('dblclick',function (e) {
        $("#txtId").val($(this).children(':eq(0)').text());
        $(" #txtId").prop( "disabled", true );
        $(" #txtName").val($(this).children(':eq(1)').text());
        $(" #txtTp").val($(this).children(':eq(2)').text());
        $(" #txtSalary").val($(this).children(':eq(3)').text());
    });
    $("#btnSave").attr('disabled', true);*/

/*    let customerID = $('#txtId').val();
    let customerName = $("#txtName").val();
    let customerTp = $("#txtTp").val();
    let customerSalary = $("#txtSalary").val();
    for (var i=0;i<customerDB.length;i++){
        if(customerDB[i].getId()==$("#txtId").val()){
            var customer=customerDB[i];
            customer.setName(customerName);
            customer.setTp(customerTp);
            customer.setSalary(customerSalary)
        }
    }*/

    let cusId=$("#txtId").val();
    let customer;
    for(var i=0;i<customerDB.length;i++){
        if(cusId==customerDB[i].getId()){
            customer=customerDB[i];
            customer.setName($('#txtName').val());
            customer.setTp($('#txtTp').val());
            customer.setSalary($('#txtSalary').val());
        }
    }
}

function loadAllCustomers() {
    $("#customerTable").empty();
    // if (isAdded > 0) {

    for (var i of customerDB) {

        let row = `<tr><td>${i.getId()}</td><td>${i.getName()}</td><td>${i.getTp()}</td><td>${i.getSalary()}</td></tr>`;
        $("#customerTable").append(row);
        $("#customerTable>tr").click(function () {

            clearAll();
            $("#txtId").val($(this).children(":eq(0)").text());
            $("#txtName").val($(this).children(":eq(1)").text());
            $("#txtTp").val($(this).children(":eq(2)").text());
            $("#txtSalary").val($(this).children(":eq(3)").text());


        });

    }
/*    $("#customerTable").empty();
    for (var i of customerDB) {
        let row = `<tr><td>${i.id}</td><td>${i.name}</td><td>${i.tp}</td><td>${i.salary}</td></tr>`;
        $("#customerTable").append(row);
    }*/
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
    searchCustomer();

    /*    let id=$('#txtId').val();
        let option=confirm(`Do you want to delete ID:${id}`);
        if(option){
            let erase=deleteCustomer(id);
            if(erase){
                alert("Customer Deleted");
                $('#txtId,#txtName,#txtTp,#txtSalary').val("");
                generateCustomerId();
            }else {
                alert("Delete Failed , Try again");
            }
        }

        loadAllCustomers();*/
/*    var searchID = $("#txtSearchCusID").val();
    var response = searchCustomer(searchID);
    if (response) {
        $("#txtId").val(response.id);
        $("#txtName").val(response.name);
        $("#txtTp").val(response.tp);
        $("#txtSalary").val(response.salary);
    } else {
        clearAll();
        alert("No Such a Customer");
    }*/
});

const cusIDRegEx = /^(C00)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{3,20}$/;
const cusTpRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


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
/*    if (eventOb.key == "Enter") {
        checkIfValided();
    }

    if (eventOb.key == "Control") {
        var typedCustomerID = $("#txtId").val();
        var srcCustomer = searchCustomerFromId(typedCustomerID);
        $("#txtId").val(srcCustomer.getCustomerID());
        $("#txtName").val(srcCustomer.getCustomerName());
        $("#txtTp").val(srcCustomer.getCustomerTp());
        $("#txtSalary").val(srcCustomer.getCustomerSalary());
    }*/
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

$('#btnSave').click(function () {
    checkIfValided();
    clearAll();
});