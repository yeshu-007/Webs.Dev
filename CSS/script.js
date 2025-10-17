
let q= document.getElementById("qty")
q.addEventListener("input", function() {
    let quantity = document.getElementById("qty").valueAsNumber;
    let salepriceText = document.getElementById("saleprice").textContent;
    let saleprice = parseFloat(salepriceText.replace("₹", ""));
    
    let total = quantity * saleprice;
    document.getElementById("total").textContent = "Total: ₹" + total.toFixed(2);
});

var discbuttonElement = document.getElementById("apply-discount");

discbuttonElement.addEventListener("click", function() {

    let bodyElement = document.body;

    let discountvalue = document.getElementById("discount").valueAsNumber;

    if (discountvalue >= 50) {
        bodyElement.style.backgroundColor = "#effb14ff";
    } else {
        bodyElement.style.backgroundColor = "#ffffff";
    }

    let oldcostElement = document.getElementById("listprice");
    let oldcost = oldcostElement.textContent;

    let newcostElement = document.getElementById("saleprice");

    let salepriceValue = oldcost.replace("₹", "");

    let finalPrice = parseFloat(salepriceValue) - (parseFloat(salepriceValue) * discountvalue) / 100;

    newcostElement.textContent = "₹" + finalPrice.toFixed(2);

    let qty = document.getElementById("qty").valueAsNumber;
    let total = qty * finalPrice;
    document.getElementById("total").textContent = "Total: ₹" + total.toFixed(2);
});

var cartButton = document.querySelector(".cart-btn");

cartButton.addEventListener("click", function() {

    var originalText = this.textContent;
    var originalBg = this.style.backgroundColor;

    this.textContent = "Added!";
    this.style.backgroundColor = "gray";

    setTimeout(() => {
        this.textContent = originalText;
        this.style.backgroundColor = originalBg;
    }, 1500);
});
