$("#orderCustomerName").attr('disabled', true);
$("#orderCustomerTp").attr('disabled', true);
$("#orderCustomerSalary").attr('disabled', true);

$("#txtSelectItemDescription").attr('disabled', true);
$("#txtSelectItemPrice").attr('disabled', true);
$("#txtSelectQTYOnHand").attr('disabled', true);


generateOrderID();

$("#txtOrderID").on('keyup',function () {
    if ($("#txtOrderID").val()==''){
        generateOrderID();
    }
});

function generateResOrderId() {
    if (orderDB.length!=0) {

        let lastrecord = orderDB[orderDB.length - 1].getOrderId();
        let split = lastrecord.split("-");
        let splitElement = ++split[1];
        if (splitElement < 10 && splitElement > 0) {
            let genarateId="O00-" + "00" + splitElement;

            return genarateId;
        } else if (splitElement > 99) {
            let genarateId="O00-" + splitElement;

            return genarateId;

        } else {

            let genarateId="O00-001";
            return genarateId;
        }
    }else{
        let genarateId="O00-001";
        return genarateId;

    }
}
function generateOrderID() {
    if (orderDB.length!=0) {
        let lastrecord = orderDB[orderDB.length - 1].getOrderId();
        let split = lastrecord.split("-");
        let splitElement = ++split[1];
        if (splitElement < 10 && splitElement > 0) {
            let genarateId="O00-" + "00" + splitElement;
            $("#txtOrderID").val(genarateId);

        } else if (splitElement > 99) {
            let genarateId="O00-" + splitElement
            $("#txtOrderID").val(genarateId);

        } else {
            let genarateId="O00-001"
            $("#txtOrderID").val(genarateId);

        }

    }else{
        let genarateId="O00-001"
        $("#txtOrderID").val(genarateId);

    }
/*    try {
        let lastOId = order[order.length - 1].getOrderId();
        let newOId = parseInt(lastOId.substring(1, 4)) + 1;
        if (newOId < 10) {
            $("#txtOrderID").val("O00" + newOId);
        } else if (newOId < 100) {
            $("#txtOrderID").val("O0" + newOId);
        } else {
            $("#txtOrderID").val("O" + newOId);
        }
    } catch (e) {
        $("#txtOrderID").val("O001");
    }*/

}
/*forOrder();
function forOrder(){
}*/


$("#txtSelectItemCode").on('keyup',function (e) {
    console.log(e.key);
    var existItem=0;
    if (e.key=="Enter") {
        var itemCode = $("#txtSelectItemCode").val();

        for (var i in itemDB) {
            $("#txtSelectItemDescription").attr('disabled', true);
            $("#txtSelectItemPrice").attr('disabled', true);
            $("#txtSelectQTYOnHand").attr('disabled', true);
            if (itemCode == itemDB[i].getCode()) {
                $("#txtSelectItemDescription").val(itemDB[i].getName());
                $("#txtSelectItemPrice").val(itemDB[i].getPrice());
                $("#txtSelectQTYOnHand").val(itemDB[i].getQty());
                $("#txtSelectItemDiscount").val(itemDB[i].getDiscount());
                alert("Item Has..!");
                existItem=1;
            }
        }
        if (existItem==0){
            $("#txtSelectItemDescription").val('');
            $("#txtSelectItemPrice").val('');
            $("#txtSelectQTYOnHand").val('');
            $("#txtSelectItemDiscount").val('');
            alert("No Such as Item..!");
        }
    }
});


$("#btnAddToTable").click(function () {
    var itemCode= $("#txtSelectItemCode").val();
    var itemName= $("#txtSelectItemDescription").val();
    var itemPrice= $("#txtSelectItemPrice").val();
    var qty=parseInt( $("#txtQty").val());
    var totalItemPrice=itemPrice*qty;
    var Oqty=parseInt($('#txtSelectQTYOnHand').val());
    if($('#txtQty').val()!="") {
        if (Oqty < qty) {
            alert("Not Available This QTY");
        } else {
            var itemExist = 0;
            for (var i in cartItems) {
                if (cartItems[i].getItemCode() == itemCode) {

                    var oldItemQty = cartItems[i].getItemQty();
                    var newItemQty = oldItemQty + qty;

                    cartItems[i].setItemQty(newItemQty);
                    cartItems[i].setItemPrice(itemPrice);
                    cartItems[i].setTotalItemPrice(totalItemPrice);
                    itemExist = 1;
                    loadCart();
                    break;
                }
            }
            if (itemExist == 0) {
                var orderCart = new OrderCart(itemCode, itemName, qty, itemPrice, totalItemPrice);
                cartItems.push(orderCart);
                qtyUpdate();
                loadCart();

            }
        }
    }else {
        alert("Please Enter Order Qty");
    }
});

function qtyUpdate() {
    let item;
    var itemQty=$('#txtSelectQTYOnHand').val();
    var orderQty=$('#txtQty').val();

    var updateQty=itemQty-orderQty;
    for (var i in itemDB){
        if($('#txtSearchItemCode').val()==itemDB[i].getCode()){
            item=itemDB[i];
            item.setQty(updateQty);
            $('#txtSelectQTYOnHand').val(item.getQty());
        }
    }
}

function loadCart(){
    var total=0;
    $("#orderTable").empty();
    cartItems.forEach(function (i) {
        let row = `<tr><td>${i.getItemCode()}</td><td>${i.getItemName()}</td><td>${i.getItemQty()}</td><td>${i.getItemPrice()}</td><td>${i.getTotalItemPrice()}</td></tr>`;
        total+=i.getTotalItemPrice();
        $("#orderTable").append(row);
    });

    $("#total").text('');
    $("#total").text(total);
    $("#subtotal").text('');
    $("#subtotal").text(total);

}


$("#txtCash,#txtDiscount").on('keyup',function (e) {
    console.log(e.key);
    keyPress();
});

function keyPress() {
    var total=$("#total").text();
    var subTotal=$("#subtotal").text();
    var cash= $("#txtCash").val();
    var discount=$("#txtDiscount").val();
    var itemFinallytotal= total-((discount/100)*total);
    $("#subtotal").text(itemFinallytotal);

    if (discount==''){
        $("#subtotal").text(total);
    }
    if (cash==''){
        $("#txtBalance").val('');
    }else{
        var balance=cash-itemFinallytotal;
        $("#txtBalance").val(balance);
    }
}

//customer search start
$("#btnOrderCusSearch").click(function () {
    let id = $("#orderCustomerID").val();
    var customerExist=0
    for (var i in customerDB){
        if (id==customerDB[i].getId()){
            $("#orderCustomerName").attr('disabled', true);
            $("#orderCustomerTp").attr('disabled', true);
            $("#orderCustomerSalary").attr('disabled', true);

            $("#orderCustomerName").val(customerDB[i].getName());
            $("#orderCustomerTp").val(customerDB[i].getTp());
            $("#orderCustomerSalary").val(customerDB[i].getSalary());
            customerExist=1;
            break;
        }
    }
    if (customerExist==0){
        alert("No Such as Customer ..!");
    }
});

$("#btnSubmitOrder").click(function () {
    let res=confirm("Place order?");
    if (res) {

        if (generateResOrderId() == $("#txtOrderID").val()) {

            var orderId = $("#txtOrderID").val();
            var custId = $("#orderCustomerID").val();
            var date = $("#txtDate").val();
            var cost = $("#subtotal").val();
            var discount = $("#txtDiscount").val();

            var order = new Order(orderId, custId, date, discount, cost);

            var orderDetailsArray = order.getOrderDetails();

            for (var i in cartItems) {
                orderDetailsArray.push(new OrderDetails(cartItems[i].getItemCode, cartItems[i].getItemName(), cartItems[i].getItemQty, cartItems[i].getItemPrice()));
            }

            console.log(orderDetailsArray[0]);
            orderDB.push(order);

            alert("order Placed Complete");
            clearAll();
            generateOrderID();

        } else {
            alert("Order Fail OrderId Incorrect");
            let res=confirm("Automatically reset order ID?");
            if (res){
                generateOrderID();
            }
        }

    }else {
        alert("order canceled");
    }
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

$("#txtOrderID").on('keyup',function () {
    if ($("#txtOrderID").val()==''){
        generateOrderID();
    }
});
$("#txtOrderID").on('keydown',function (event) {

    if (event.key=="Enter"){

        if (($("#txtOrderID").val())!=''){

            for (var order of orderDB){

                if (order.getOrderId()==($("#txtOrderID").val())){

                    $("#txtOrderID").val(order.getOrderId());
                    $("#txtDate").val(order.getOrderDate());
                    $("#orderCustomerID").val(order.getCusId());

                    for(var i of customerDB){
                        if (i.getId()==order.getCusId()){

                            $("#orderCustomerName").val(i.getName());
                            $("#orderCustomerTp").val(i.getTp());
                            $("#orderCustomerSalary").val(i.getSalary());
                            break;
                        }
                    }

                    $("#orderTable").empty();
                    for (var obj of (order.getOrderDetails())){
                        let row = `<tr><td>${obj.getItemId()}</td><td>${obj.getItemName()}</td><td>${obj.getItemQty()}</td><td>${obj.getItemUnitPrice()}</td><td>${obj.getItemUnitPrice()*obj.getItemQty()}</td></tr>`;
                        $("#orderTable").append(row);
                        $("#subtotal").val(order.getDiscount());
                    }
                    break;
                }
            }
        }
    }
});

updateDate();
function updateDate() {
    let now = new Date();
    let today = now.getDate()  + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();
    $("#txtDate").val(today);
}

/*
let fullTotal;
function generateOrderID() {
    try {
        let lastOId = ordersDB[ordersDB.length - 1].getOrderID();
        let newOId = parseInt(lastOId.substring(1, 4)) + 1;
        if (newOId < 10) {
            $("#txtOrderID").val("O00" + newOId);
        } else if (newOId < 100) {
            $("#txtOrderID").val("O0" + newOId);
        } else {
            $("#txtOrderID").val("O" + newOId);
        }
    } catch (e) {
        $("#txtOrderID").val("O001");
    }

}
forOrder();
function forOrder(){
    generateOrderID();
    loadCustIDs();
    loadItemIds();
}
/!*-------Customer Details---------------*!/
function loadCustIDs(){
    $("#cmbCustIDs").empty();
    var customer=getCustomers();
    var ids=document.getElementById("cmbCustIDs");
    for (var i in customer){
        var opt=document.createElement("option")
        opt.value=customer[i].getId();
        opt.text=customer[i].getId();
        ids.appendChild(opt);
    }
}

$("#cmbCustIDs").click(function () {
    let cus=searchCustomerId($('#cmbCustIDs').val());
    if(cus!=null){
        $('#orderCustomerName').val(cus.getName());
        $('#orderCustomerTp').val(cus.getTp());
        $('#orderCustomerSalary').val(cus.getSalary());
    }
});
function searchCustomerId(id) {
    for (var i in customerDB){
        if(customerDB[i].getId()==id) return customerDB[i];

    }
    return null;
}
function getCustomers() {
    return customerDB;
}

// --------Item Details--------------------------
function loadItemIds(){
    $("#cmbItemIDs").empty();
    var items=getItems();
    var ids=document.getElementById("cmbItemIDs");
    for (var i in items){
        var opt=document.createElement("option")
        opt.value=items[i].getItemCode();
        opt.text=items[i].getItemCode();
        ids.appendChild(opt);
    }
}
$("#cmbItemIDs").click(function () {
    let item=searchItemCode($('#cmbItemIDs').val());
    if(item!=null){
        $('#txtSelectItemDescription').val(item.getName());
        $('#txtSelectQTYOnHand').val(item.getQty());
        $('#txtSelectItemPrice').val(item.getPrice());
    }
});
function searchItemCode(id) {
    for (var i in itemDB){
        if(itemDB[i].getCode()==id) return itemDB[i];

    }
    return null;
}
function getItems() {
    return itemDB;
}

function qtyUpdate() {
    let item;
    var itemQty=$('#txtSelectQTYOnHand').val();
    var orderQty=$('#txtQty').val();

    var updateQty=itemQty-orderQty;
    for (var i in itemDB){
        if($('#cmbItemIDs').val()==itemDB[i].getCode()){
            item=itemDB[i];
            item.setQty(updateQty);
            $('#txtSelectQTYOnHand').val(item.getQty());
        }
    }
}


$("#btnAddToTable").click(function () {
    let qty=parseInt($('#txtSelectQTYOnHand').val());
    let Oqty=parseInt($('#txtQty').val());
    console.log(qty,Oqty);
    if($('#txtQty').val()!=""){
        if(qty<Oqty){
            alert("Not Available This QTY");
        }else{

            qtyUpdate();
            addToCart();
            loadCart();
            getTotal();
            $("#txtSelectItemDescription,#txtSelectItemPrice,#txtSelectQTYOnHand,#txtQty").val("")
        }
    }else{
        alert("Please Enter Order Qty");
    }



});
function addToCart(){
    let oId=$("#txtOrderID").val();
    let cName=$("#orderCustomerName").val();
    let iID=$("#cmbItemIDs").val();
    let iName=$("#txtSelectItemDescription").val();
    let iPrice=$("#txtSelectItemPrice").val();
    let orderQty=$("#txtQty").val();
    let total=iPrice*orderQty;
    fullTotal=total+fullTotal;

    for (let i=0;i<cartDb.length;i++){
        if(cartDb[i].getcartICode()==iID){
            var newQty=+cartDb[i].getcartOQty() + +orderQty;
            let newTotal=iPrice*newQty;
            cartDb[i].setcartOQty(newQty);
            cartDb[i].setTotal(newTotal);
            return;
        }
    }
    cartDb.push(new CartDTO(oId,cName,iID,iName,iPrice,orderQty,total));
}
function loadCart() {
    $("#orderTable").empty();
    for (var i of cartDb){
        let row=`<tr><td>${i.getCartOID()}</td><td>${i.getcartCName()}</td><td>${i.getcartICode()}</td><td>${i.getcartIName()}</td><td>${i.getcartIPrice()}</td><td>${i.getcartOQty()}</td><td>${i.getTotal()}</td></tr>`;
        $("#orderTable").append(row);
    }
}

function getTotal() {
    let tot = 0;
    $('#orderTable>tr').each(function () {
        tot = tot + parseFloat($($(this).children().get(6)).text());
        $('#total>span').text(tot).append('.00');

        if($('#txtDiscount').val()==""){

            $('#subtotal>span').text(tot).append('.00');
        }
    });
    t = tot;

}
$('#txtDiscount').on('keyup', function () {
    if ($('#txtDiscount').val() == '') {
        $('#subtotal>span').text('0.00');
    } else {
        let tot = parseFloat(t);
        let dis = tot/100 * parseFloat($('#txtDiscount').val());

        $('#subtotal>span').text(tot - dis).append('.00');
    }
});

// $("#addToCartTable>tr").click(function () {
//         console.log($(this).val());
//     });


function placeOrder() {

    if(saveOrder()){
        for (var i of cartDb){
            orderDetailsDb.push(new OrderDetailsDTO(i.getCartOID(),i.getcartICode(),i.getcartIPrice(),i.getcartOQty(),i.getTotal()));

        }
        alert("Successful")
    }

}
function saveOrder() {
    let oId=$("#txtOrderID").val();
    let cName=$("#orderCustomerName").val();
    let iPrice=$("#txtSelectItemPrice").val();
    let orderQty=$("#txtQty").val();
    let fullTotal=$("#total").text();
    let  date=$("#txtDate").val();
    console.log(oId,cName,fullTotal,date);

    return ordersDB.push(new OrderDTO(oId,cName,fullTotal,date));
}
$("#btnSubmitOrder").click(function () {
    placeOrder();
    generateOrderID();
    cartDb.splice(0,cartDb.length);
    $('#orderTable').empty();
    $("#txtSelectItemDescription,#txtSelectItemPrice,#txtSelectQTYOnHand,#txtQty,#orderCustomerSalary,#orderCustomerName,#orderCustomerTp").val("")
});

$("#txtCash").on('keyup', function (eventOb) {
    if (eventOb.key == "Enter") {
        let cash=parseFloat($('#txtCash').val());
        let total=$('#subtotal>span').text();
        console.log(cash,total)
        let balance=cash - total;

        $('#txtBalance').val(balance);
    }
});
*/
