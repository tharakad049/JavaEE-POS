$("#orderCustomerName").attr('disabled', true);
$("#orderCustomerTp").attr('disabled', true);
$("#orderCustomerSalary").attr('disabled', true);

$("#txtSelectItemName").attr('disabled', true);
$("#txtSelectItemPrice").attr('disabled', true);
$("#txtSelectQTYOnHand").attr('disabled', true);


generateOrderID();

$("#txtOrderID").on('keyup',function () {
    if ($("#txtOrderID").val()==''){
        generateOrderID();
    }
});

function generateOrderID() {
    $.ajax({
        url:"http://localhost:8080/pos/order?option=GenerateOid",
        method:'GET',
        success:function (resp) {
            if (resp.status == 200) {
                $("#txtOrderID").val(resp.data.oId);
            } else {
                alert(resp.data);
            }
        }

    });
}

$("#btnOrderCusSearch").click(function () {
    $.ajax({
        url: "http://localhost:8080/pos/customer?option=SelectCustomer=" + $("#btnOrderCusSearch option:selected").text(),
        method: "GET",
        success: function (response) {
            $("#orderCustomerName").val(response.name);
            $("#orderCustomerAddress").val(response.address);
            $("#orderCustomerSalary").val(response.salary);
        },
        error: function (ob, statusText, error) {
            alert("No Such Customer");
        }
    });
});


function clearAll(){

    $("#txtOrderID").val('');
    $("#txtDate").val('');
    $("#orderCustomerID").val('');
    $("#orderCustomerID").css('border', '');
    $("#orderCustomerName").val('');
    $("#orderCustomerName").css('border', '');
    $("#orderCustomerTp").val('');
    $("#orderCustomerTp").css('border', '');
    $("#orderCustomerAddress").val('');
    $("#orderCustomerSalary").css('border', '');
    $("#txtSelectItemCode").val('');
    $("#txtSelectItemDescription").val('');
    $("#txtSelectItemPrice").val('');
    $("#txtSelectQTYOnHand").val('');
    $("#txtQty").val('');
    $("#total").text("00.00");
    $("#subtotal").text("00.00");
    $("#txtCash").val('');
    $("#txtDiscount").val('');
    $("#txtBalance").val('');

    $("#orderTable").empty();

}
updateDate();
function updateDate() {
    let d = new Date();
    let dd = d.toISOString().split("T")[0].split("-");
    $("#txtDate").val(dd[0]+"-"+dd[1]+"-"+dd[2]);
}
