const itemCodeRegEx = /^(I00)[0-9]{1,3}$/;
const itemNameRegEx = /^[A-z ]{3,20}$/;
const itemQuantityRegEx = /^[0-9/A-z. ,]{1,}$/;
const itemPriceRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

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
    saveItem();
    $('#txtCode,#txtItemName,#txtQuantity,#txtPrice').val("");
    generateItemCode();
    checkIfValid();
    clearAllItems();
});

$("#btnsearch").click(function () {

});

$("#btnUpdated").click(function () {

});

$("#itemDelete").click(function () {

});

function generateItemCode() {
    try {
        let lastItemId = itemDB[itemDB.length - 1].getCode();
        let newItemCode = parseInt(lastItemId.substring(1, 4)) + 1;
        if (newItemCode < 10) {
            $("#txtCode").val("I00" + newItemCode);
        } else if (newItemCode < 100) {
            $("#txtCode").val("I0" + newItemCode);
        } else {
            $("#txtCode").val("I" + newItemCode);
        }
    } catch (e) {
        $("#txtCode").val("I001");
    }
}

loadingMethord();
function loadingMethord () {
    generateItemCode();
}

/*function searchItem() {
    for (var i=0;i<itemDB.length;i++) {
        if ($('#txtSearchItemCode').val() == itemDB[i].getCode()) {
            $("#txtCode").val(itemDB[i].getCode());
            $("#txtItemName").val(itemDB[i].getName());
            $("#txtQuantity").val(itemDB[i].getQty());
            $("#txtPrice").val(itemDB[i].getPrice());
        } else {
            alert("Invalid Code , Try again");
            $("#txtItemName").focus();
        }
    }
/!*    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].code == id) {
            return itemDB[i];
        }
    }*!/
}*/

$("#btnClosed").click(function () {
    $('#txtCode,#txtItemName,#txtQuantity,#txtPrice').val("");
    generateItemCode();
});

function clearAllItems() {
    $('#txtCode,#txtItemName,#txtQuantity,#txtPrice').val("");
    $('#txtCode,#txtItemName,#txtQuantity,#txtPrice').css('border', '2px solid #ced4da');
    $('#txtCode').focus();
    $("#btnSaveAndUpdate").attr('disabled', true);
    loadAllItems();
    $("#lblItemCode,#lblItemName,#lblItemQuantity,#lblItemPrice").text("");
    generateItemCode();
}

$('#txtCode,#txtItemName,#txtQuantity,#txtPrice').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});

$('#txtCode,#txtItemName,#txtQuantity,#txtPrice').on('blur', function () {
    formValid();
});

//focusing events
$("#txtCode").on('keyup', function (eventOb) {
    setButtons();
    if (eventOb.key == "Enter") {
        checkIfValid();
        var typedItemCode = $("#txtCode").val();
        var srcItem = searchItemFromCode(typedItemCode);
        $("#txtCode").val(srcItem.getItemCode());
        $("#txtItemName").val(srcItem.getItemName());
        $("#txtQuantity").val(srcItem.getItemQuantity());
        $("#txtPrice").val(srcItem.getItemPrice());
    }
});

$("#txtItemName").on('keyup', function (eventOb) {
    setButtons();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtQuantity").on('keyup', function (eventOb) {
    setButtons();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtPrice").on('keyup', function (eventOb) {
    setButtons();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});


$("#btnSaveAndUpdate").attr('disabled', true);

function Valid() {
    var itemCode = $("#txtCode").val();
    $("#txtCode").css('border', '2px solid green');
    $("#lblItemCode").text("");
    if (itemCodeRegEx.test(itemCode)) {
        var itemName = $("#txtItemName").val();
        if (itemNameRegEx.test(itemName)) {
            $("#txtItemName").css('border', '2px solid green');
            $("#lblItemName").text("");
            var itemQuantity = $("#txtQuantity").val();
            if (itemQuantityRegEx.test(itemQuantity)) {
                var itemPrice = $("#txtPrice").val();
                var resp = itemPriceRegEx.test(itemPrice);
                    $("#txtQuantity").css('border', '2px solid green');
                    $("#lblItemQuantity").text("");
                        if (resp) {
                            $("#txtPrice").css('border', '2px solid green');
                            $("#lblItemPrice").text("");
                                return true;
                } else {
                    $("#txtPrice").css('border', '2px solid red');
                    $("#lblItemPrice").text("Item Price is a required field : Pattern 100.00 or 100");
                    return false;
                }
            } else {
                $("#txtQuantity").css('border', '2px solid red');
                $("#lblItemQuantity").text("Item Quantity is a required field : Mimum 7");
                return false;
            }
        } else {
            $("#txtItemName").css('border', '2px solid red');
            $("#lblItemName").text("Item Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#txtCode").css('border', '2px solid red');
        $("#lblItemCode").text("Item Code is a required field : Pattern I00");
        return false;
    }
}

function checkIfValid() {
        $("#txtItemName").focus();
        var itemName = $("#txtItemName").val();
        if (itemNameRegEx.test(itemName)) {
            $("#txtQuantity").focus();
            var itemQuantity = $("#txtQuantity").val();
            if (itemQuantityRegEx.test(itemQuantity)) {
                $("#txtPrice").focus();
                var itemPrice = $("#txtPrice").val();
                var resp = itemPriceRegEx.test(itemPrice);
                if (resp) {
                    let res = confirm("Do you really need to add this Item..?");
                    if (res) {
                        saveItem();
                        clearAll();
                    }
                } else {
                    $("#txtPrice").focus();
                }
            } else {
                $("#txtQuantity").focus();
            }
        } else {
            $("#txtItemName").focus();
        }
}

function setButtons() {
    let c = Valid();
    if (c) {
        $("#btnSaveAndUpdate").attr('disabled', false);
    } else {
        $("#btnSaveAndUpdate").attr('disabled', true);
    }
}
