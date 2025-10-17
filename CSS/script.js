

var discbuttonElement = document.getElementById("apply-discount");

discbuttonElement.addEventListener("click", function() {
 
    let oldcostElement = document.getElementById("listprice");
    let oldcost = oldcostElement.textContent;

    let discountvalue = document.getElementById("discount").valueAsNumber;

    let newcostElement = document.getElementById("saleprice");
    
    let salepriceValue = oldcost.replace("₹", "");

    let finalPrice = parseFloat(salepriceValue) - (parseFloat(salepriceValue) * discountvalue) / 100;

    newcostElement.textContent = "₹" + finalPrice;

});



