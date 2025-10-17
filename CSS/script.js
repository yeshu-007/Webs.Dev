// let oldcost=document.getElementById("listprice")
// var newcost=document.getElementById("saleprice")

// var discountedPrice=oldcost.textContent -(oldcost.textContent*5)/100
// console.log(discountedPrice)
// newcost.textContent= discountedPrice


var buttonElement = document.getElementById("apply-discount");

buttonElement.addEventListener("click", function() {

    let oldcostElement = document.getElementById("listprice");
    let oldcost = oldcostElement.textContent;
    console.log(oldcost);

    let discountvalue = document.getElementById("discount").valueAsNumber;
    console.log(discountvalue);

    let newcostElement = document.getElementById("saleprice");
    console.log(newcostElement);

    let salepriceValue = oldcost.replace("₹", "");
    console.log(salepriceValue);

    let finalPrice = parseFloat(salepriceValue) - (parseFloat(salepriceValue) * discountvalue) / 100;
    console.log(finalPrice);

    newcostElement.textContent = "₹" + finalPrice;

});
