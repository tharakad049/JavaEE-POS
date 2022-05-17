$("#btnSaveAndUpdate").click(function () {
    var data = $("#itemForm").serialize();
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
    $('#txtCode,#txtItemName,#txtQuantity,#txtPrice').val("");
    clearAllItems();
});

$("#btnsearch").click(function () {

});

$("#btnUpdated").click(function () {

});

$("#itemDelete").click(function () {

});

$("#btnClosed").click(function () {
    $('#txtCode,#txtItemName,#txtQuantity,#txtPrice').val("");
});

function clearAllItems() {
    $('#txtCode,#txtItemName,#txtQuantity,#txtPrice').val("");
    $('#txtCode,#txtItemName,#txtQuantity,#txtPrice').css('border', '2px solid #ced4da');
    $('#txtCode').focus();
    $("#lblItemCode,#lblItemName,#lblItemQuantity,#lblItemPrice").text("");
}