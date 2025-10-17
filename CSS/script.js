

var discbuttonElement = document.getElementById("apply-discount");

discbuttonElement.addEventListener("click", function() {
 
    let bodyElement = document.getElementById("body");
    if (discountvalue.value>=50) {
        bodyElement.style.backgroundColor = "#effb14ff";
    }
    else {
        bodyElement.style.backgroundColor = "#ffffff";
    }
    let oldcostElement = document.getElementById("listprice");
    let oldcost = oldcostElement.textContent;

    let discountvalue = document.getElementById("discount").valueAsNumber;

    let newcostElement = document.getElementById("saleprice");
    
    let salepriceValue = oldcost.replace("₹", "");

    let finalPrice = parseFloat(salepriceValue) - (parseFloat(salepriceValue) * discountvalue) / 100;

    newcostElement.textContent = "₹" + finalPrice;

});




