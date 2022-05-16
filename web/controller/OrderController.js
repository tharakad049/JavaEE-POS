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
}

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