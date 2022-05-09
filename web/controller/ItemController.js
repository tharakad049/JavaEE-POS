$("#btnSaveAndUpdate").click(function () {
    saveItem();
    //clearAllItems();
    loadAllItems();
    //updateItem();
    $('#txtCode,#txtItemName,#txtQuantity,#txtPrice').val("");
    generateItemCode();
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
/*    if (itemDB.length!=0) {
        let lastrecord = itemDB[itemDB.length - 1].code;
        let split = lastrecord.split("-");
        let splitElement = ++split[1];
        if (splitElement < 10 && splitElement > 0) {
            $("#txtCode").val("I00-" + "00" + splitElement);
        } else if (splitElement > 99) {
            $("#txtCode").val("I00-" + splitElement);
        } else {
            $("#txtCode").val("I00-001");
        }
    }else{
        $("#txtCode").val("I00-001");
    }*/
}

loadingMehtord();
function loadingMehtord() {
    generateItemCode();
}

$("#itemDelete").click(function (){
    let id=$('#txtCode').val();
    let option=confirm(`Do you want to delete ID:${id}`);
    if(option){
        let erase=deleteItem();
        if(erase){
            alert("Item Deleted");
        }else{
            alert("Failed Item Delete");
        }
    }
    $('#txtCode,#txtItemName,#txtQuantity,#txtPrice').val("");
    generateItemCode();
    loadAllItems();
/*    var itemCode= $("#txtSearchItemCode").val();
    for (var i in itemDB){
        if (itemCode==itemDB[i].code){
            itemDB.splice(i,1);
            loadAllItems();
            alert("Item Delete Complete");
            break;
        }
    }*/
});

function deleteItem() {
    let itemCode=$("#txtCode").val();
    let item;
    if(itemCode!=null){
        for(var i=0;i<itemDB.length;i++) {
            if (itemCode == itemDB[i].getCode()) {
                item = itemDB[i];
            }
        }
        let index=itemDB.indexOf(item);
        itemDB.splice(index,1);
        return true;
    }else{
        return false;
    }


}
function saveItem() {
    let itemCode = $("#txtCode").val();
    let itemName = $("#txtItemName").val();
    let itemQuantity = $("#txtQuantity").val();
    let itemPrice = $("#txtPrice").val();

    let item=new ItemDTO(itemCode,itemName,itemQuantity,itemPrice);
    itemDB.push(item);
/*    //create Object
    var itemObject = {
        code: itemCode,
        iName: itemName,
        quantity: itemQuantity,
        price: itemPrice
    };
    itemDB.push(itemObject);*/
}

function searchItem() {
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
/*    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].code == id) {
            return itemDB[i];
        }
    }*/
}

$("#btnUpdated").click(function () {
    console.log("Item Update Complete");
    updateItem();
    loadAllItems();
    $('#txtCode,#txtItemName,#txtQuantity,#txtPrice').val("");
    generateItemCode();
/*    for (var i in itemDB){
        if ($("#txtCode").val()==itemDB[i].code){
            $("#btnSave").attr('disabled', true);
            $("#txtItemName").val();
            $("#txtQuantity").val();
            $("#txtPrice").val();

            itemDB[i].name;
            itemDB[i].qty;
            itemDB[i].price;

            $("#btnSave").attr('disabled', true);
            clearAllItems();
            generateItemCode();
            updateItem();
            loadAllItems();
            alert("Item Update complete");
            break;
        }
    }*/
});

function updateItem(){
    let itemCode=$("#txtCode").val();
    let item;
    for(var i=0;i<itemDB.length;i++){
        if(itemCode==itemDB[i].getCode()){
            item=itemDB[i];
            item.setName($('#txtItemName').val());
            item.setQty($('#txtQuantity').val());
            item.setPrice($('#txtPrice').val());
        }
    }
/*    $("#itemTable>tr").on('dblclick',function (e) {
        $("#txtCode").val($(this).children(':eq(0)').text());
        $(" #txtCode").prop( "disabled", true );
        $(" #txtItemName").val($(this).children(':eq(1)').text());
        $(" #txtQuantity").val($(this).children(':eq(2)').text());
        $(" #txtPrice").val($(this).children(':eq(3)').text());
        $("#btnSave").attr('disabled', true);
    });
    $("#btnSave").attr('disabled', true);*/
}

function loadAllItems() {
    $("#itemTable").empty();
    // if (isAdded > 0) {

    for (var i of itemDB) {
        let row = `<tr><td>${i.getCode()}</td><td>${i.getName()}</td><td>${i.getQty()}</td><td>${i.getPrice()}</td></tr>`;
        $("#itemTable").append(row);
        $("#itemTable>tr").click(function () {


            $("#txtCode").val($(this).children(":eq(0)").text());
            $("#txtItemName").val($(this).children(":eq(1)").text());
            $("#txtQuantity").val($(this).children(":eq(2)").text());
            $("#txtPrice").val($(this).children(":eq(3)").text());
            clearItemField()
        });
    }
/*    $("#itemTable").empty();
    for (var i of itemDB) {
        let row = `<tr><td>${i.code}</td><td>${i.iName}</td><td>${i.quantity}</td><td>${i.price}</td></tr>`;
        $("#itemTable").append(row);
    }*/
}

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

// search customer
$("#btnsearch").click(function () {
    clearAllItems();
    searchItem();
/*    var searchID = $("#txtSearchItemCode").val();
    var response = searchItem(searchID);
    if (response) {
        $("#txtCode").val(response.code);
        $("#txtItemName").val(response.iName);
        $("#txtQuantity").val(response.quantity);
        $("#txtPrice").val(response.price);
    } else {
        clearAll();
        alert("No Such a Item");
    }*/
});

const itemCodeRegEx = /^(I00)[0-9]{1,3}$/;
const itemNameRegEx = /^[A-z ]{3,20}$/;
const itemQuantityRegEx = /^[0-9/A-z. ,]{1,}$/;
const itemPriceRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


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
/*    if (eventOb.key == "Enter") {
        checkIfValid();
    }

    if (eventOb.key == "Control") {
        var typedItemCode = $("#txtCode").val();
        var srcItem = searchItemFromCode(typedItemCode);
        $("#txtCode").val(srcItem.getItemCode());
        $("#txtItemName").val(srcItem.getItemName());
        $("#txtQuantity").val(srcItem.getItemQuantity());
        $("#txtPrice").val(srcItem.getItemPrice());
    }*/
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

$('#btnSaveAndUpdate').click(function () {
    checkIfValid();
});
