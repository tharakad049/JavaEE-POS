$("#btnSaveCustomer").click(function () {
    var data = $("#customerForm").serialize();
    $.ajax({
        url: "customer",
        method: "POST",
        data: data,
        success: function (res) {
            if (res.status == 200) {
                alert(res.message);
                loadAllCustomers();
            } else {
                alert(res.data);
            }

        },
        error: function (ob, textStatus, error) {
            console.log(ob);
            console.log(textStatus);
            console.log(error);
        }
    });
});

$("#btnGetAllCustomers").click(function () {
    loadAllCustomers();
});

$("#btnDeleteCustomer").click(function () {
    let customerID = $("#cusID").val();

    $.ajax({
        url: "customer?CusID=" + customerID,
        method: "DELETE",
        success: function (res) {
            console.log(res);
            if (res.status == 200) {
                alert(res.message);
                loadAllCustomers();
            } else if (res.status == 400) {
                alert(res.data);
            } else {
                alert(res.data);
            }

        },
        error: function (ob, status, t) {
            console.log(ob);
            console.log(status);
            console.log(t);
        }
    });
});

//Update customer
$("#btnUpdateCustomer").click(function () {

    var cusOb = {
        id: $("#cusID").val(),
        name: $("#cusName").val(),
        address: $("#cusAddress").val(),
        salary: $("#cusSalary").val()
    }

    $.ajax({
        url: "customer",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(cusOb),
        success: function (res) {
            if (res.status == 200) {
                alert(res.message);
                loadAllCustomers();
            } else if (res.status == 400) {
                alert(res.message);
            } else {
                alert(res.data);
            }
        },
        error: function (ob,) {
            console.log(ob);
        }
    });
});


loadAllCustomers();

//Methods
function loadAllCustomers() {
    $("#tblCustomerJson").empty();
    $.ajax({
        url: "customer",
        method: "GET",
        success: function (resp) {
            for (const customer of resp.data) {
                let row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.salary}</td></tr>`;
                $("#tblCustomerJson").append(row);
            }
            bindClickEvents();
        }
    });

}
function bindClickEvents() {
    $("#tblCustomerJson>tr").click(function () {
        //Get values from the selected row
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let salary = $(this).children().eq(3).text();

        $("#cusID").val(id);
        $("#cusName").val(name);
        $("#cusAddress").val(address);
        $("#cusSalary").val(salary);
    });
}