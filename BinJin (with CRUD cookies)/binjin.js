//GLOBAL VARIABLES
var orderCookiePage;
var currentNumberOfCookies;

const makeOrder = async (
  customer_name,
  contact_number,
  total_payment,
  reference_number,
  branch_location,
  pickup_time,
  cookiesList
) => {
  fetch("http://localhost/BinJinCookies/includes/orders/create.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      order_customer_name: customer_name,
      order_contact_number: contact_number,
      order_total_payment: total_payment,
      order_reference_number: reference_number,
      order_branch_location: branch_location,
      order_pickup_time: pickup_time,
      cookies: cookiesList,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return true;
    })
    .catch((error) => {
      console.error("Error:", error);
      return false;
    });
};

function setNums(x) {
  currentNumberOfCookies = 0;
  if (x == 3) {
    orderCookiePage = 3;
  } else if (x == 6) {
    orderCookiePage = 6;
  } else {
    orderCookiePage = 12;
  }
}

function openPageOrderNow() {
  window.location.href = "orderNowPage.html";
}
function openPage(x) {
  if (x == 3) {
    window.location.href = "3-pack-checkout.html";
  } else if (x == 6) {
    window.location.href = "6-pack-checkout.html";
  } else {
    window.location.href = "12-pack-checkout.html";
  }
}

function openClassicInfo() {
  window.location.href = "classicInfo.html";
}
function returnToLandingPage() {
  window.location.href = "index.html";
}

function openReceipt(){
  console.log("openReceipt called"); 
  document.querySelector(".receipt-Modal").style.display = "block";
  document.querySelector(".modal-overlay").style.display = "block";
  document.querySelector(".cartModal").style.display = "none";
}


function closeReceipt(){
  window.location.href = "index.html";
  document.querySelector(".receipt-Modal").style.display = "none";
  document.querySelector(".modal-overlay").style.display = "none";
  
}
function showModal() {
  document.querySelector(".modal").style.display = "block";
  document.querySelector(".modal-overlay").style.display = "block";
  document.querySelector(".cartModal").style.display = "none";
}

function hideModal() {
  document.querySelector(".modal").style.display = "none";
  document.querySelector(".modal-overlay").style.display = "none";
}

function handleOrder() {
  const customerName = document.getElementById("customer-name");
  const contactNumber = document.getElementById("contact-number");
  const paymentReference = document.getElementById("payment-reference");
  const branchLocation = document.getElementById("branch-location");
  const pickupTime = document.getElementById("pickup-time");
  const cookies = ["Classic", "Classic", "Oatmeal"]; //iformat niyo ng ganito yung cookies
  // "Classic"
  // "Peanut"
  // "Oatmeal"
  // "Smores"
  // "Pink Sugar"
  // "Choco Straw"
  // "Lemon"
  // "Berries"


  const success = makeOrder(
    customerName.value,
    contactNumber.value,
    200, 
    paymentReference.value,
    branchLocation.value,
    pickupTime.value,
    cookies
  );

  if (success) {
    alert("Order successfully placed!");
    hideModal();
  } else {
    alert("Error placing order. Please try again.");
  }
}

function showCart() {
  if (orderCookiePage - currentNumberOfCookies != 0) {
    alert(
      "Please Select " +
        (orderCookiePage - currentNumberOfCookies) +
        " more cookies"
    );
  } else {
    document.querySelector(".cartModal").style.display = "block";
    document.querySelector(".modal-overlay").style.display = "block";
  }
}
function showCart1() {
  document.querySelector(".cartModal").style.display = "block";
  document.querySelector(".modal-overlay").style.display = "block";
}

function hideCart() {
  document.querySelector(".cartModal").style.display = "none";
  document.querySelector(".modal-overlay").style.display = "none";
}
function print_nSelectCookies() {
  if (orderCookiePage - currentNumberOfCookies == 0) {
    document.getElementById("nSelecCookies").innerHTML =
      "Your box is complete! Click Add to Cart";
  } else {
    document.getElementById("nSelecCookies").innerHTML =
      "Select " + (orderCookiePage - currentNumberOfCookies) + " more cookies";
  }
}
function add(cookie) {
  if (cookie == 0) {
    if (currentNumberOfCookies != orderCookiePage) {
      currentNumberOfCookies = currentNumberOfCookies + 1;
      const num = document.getElementById("numCookie0");
      num.value = parseInt(num.value) + 1;
    }
  } else if (cookie == 1) {
    if (currentNumberOfCookies != orderCookiePage) {
      currentNumberOfCookies = currentNumberOfCookies + 1;
      const num = document.getElementById("numCookie1");
      num.value = parseInt(num.value) + 1;
    }
  } else if (cookie == 2) {
    if (currentNumberOfCookies != orderCookiePage) {
      currentNumberOfCookies = currentNumberOfCookies + 1;
      const num = document.getElementById("numCookie2");
      num.value = parseInt(num.value) + 1;
    }
  } else if (cookie == 3) {
    if (currentNumberOfCookies != orderCookiePage) {
      currentNumberOfCookies = currentNumberOfCookies + 1;
      const num = document.getElementById("numCookie3");
      num.value = parseInt(num.value) + 1;
    }
  } else if (cookie == 4) {
    if (currentNumberOfCookies != orderCookiePage) {
      currentNumberOfCookies = currentNumberOfCookies + 1;
      const num = document.getElementById("numCookie4");
      num.value = parseInt(num.value) + 1;
    }
  } else if (cookie == 5) {
    if (currentNumberOfCookies != orderCookiePage) {
      currentNumberOfCookies = currentNumberOfCookies + 1;
      const num = document.getElementById("numCookie5");
      num.value = parseInt(num.value) + 1;
    }
  } else if (cookie == 6) {
    if (currentNumberOfCookies != orderCookiePage) {
      currentNumberOfCookies = currentNumberOfCookies + 1;
      const num = document.getElementById("numCookie6");
      num.value = parseInt(num.value) + 1;
    }
  } else {
    if (currentNumberOfCookies != orderCookiePage) {
      currentNumberOfCookies = currentNumberOfCookies + 1;
      const num = document.getElementById("numCookie7");
      num.value = parseInt(num.value) + 1;
    }
  }
}
function sub(cookie) {
  if (cookie == 0) {
    if (document.getElementById("numCookie0").value != 0) {
      currentNumberOfCookies = currentNumberOfCookies - 1;
      const num = document.getElementById("numCookie0");
      num.value = parseInt(num.value) - 1;
      print_nSelectCookies;
    }
  } else if (cookie == 1) {
    if (document.getElementById("numCookie1").value != 0) {
      currentNumberOfCookies = currentNumberOfCookies - 1;
      const num = document.getElementById("numCookie1");
      num.value = parseInt(num.value) - 1;
      print_nSelectCookies;
    }
  } else if (cookie == 2) {
    if (document.getElementById("numCookie2").value != 0) {
      currentNumberOfCookies = currentNumberOfCookies - 1;
      const num = document.getElementById("numCookie2");
      num.value = parseInt(num.value) - 1;
      document.getElementById("nSelectCookies").innerHTML =
        "choose " + (orderCookiePage - currentNumberOfCookies);
    }
  } else if (cookie == 3) {
    if (document.getElementById("numCookie3").value != 0) {
      currentNumberOfCookies = currentNumberOfCookies - 1;
      const num = document.getElementById("numCookie3");
      num.value = parseInt(num.value) - 1;
      document.getElementById("nSelectCookies").innerHTML =
        "choose " + (orderCookiePage - currentNumberOfCookies);
    }
  } else if (cookie == 4) {
    if (document.getElementById("numCookie4").value != 0) {
      currentNumberOfCookies = currentNumberOfCookies - 1;
      const num = document.getElementById("numCookie4");
      num.value = parseInt(num.value) - 1;
      document.getElementById("nSelectCookies").innerHTML =
        "choose " + (orderCookiePage - currentNumberOfCookies);
    }
  } else if (cookie == 5) {
    if (document.getElementById("numCookie5").value != 0) {
      currentNumberOfCookies = currentNumberOfCookies - 1;
      const num = document.getElementById("numCookie5");
      num.value = parseInt(num.value) - 1;
      document.getElementById("nSelectCookies").innerHTML =
        "choose " + (orderCookiePage - currentNumberOfCookies);
    }
  } else if (cookie == 6) {
    if (document.getElementById("numCookie6").value != 0) {
      currentNumberOfCookies = currentNumberOfCookies - 1;
      const num = document.getElementById("numCookie6");
      num.value = parseInt(num.value) - 1;
      document.getElementById("nSelectCookies").innerHTML =
        "choose " + (orderCookiePage - currentNumberOfCookies);
    }
  } else {
    if (document.getElementById("numCookie7").value != 0) {
      currentNumberOfCookies = currentNumberOfCookies - 1;
      const num = document.getElementById("numCookie7");
      num.value = parseInt(num.value) - 1;
      document.getElementById("nSelecCookies").innerHTML =
        "choose " + (orderCookiePage - currentNumberOfCookies);
    }
  }
}
