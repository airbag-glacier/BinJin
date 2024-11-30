//GLOBAL VARIABLES
var orderCookiePage;
var currentNumberOfCookies;
const cookies3 = [];
const cookies6 = [];
const cookies12 =[];
const cartLIst = [];

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
  orderCookiePage = x;

  // Reset all input fields for cookie counts
  for (let i = 0; i < 8; i++) {
    document.getElementById(`numCookie${i}`).value = 0;
  }

  print_nSelectCookies();
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
function openPeanutInfo() {
  window.location.href = "classicInfo.html";
}
function openOatmealInfo() {
  window.location.href = "classicInfo.html";
}
function openSmoresInfo() {
  window.location.href = "classicInfo.html";
}
function openPinkSugarInfor() {
  window.location.href = "classicInfo.html";
}
function openChocoStrawInfo() {
  window.location.href = "classicInfo.html";
}
function openLemonInfo() {
  window.location.href = "classicInfo.html";
}
function openBerriesInfo() {
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
    displayAllCookies();
    storeCookiesOnAdd();
    showCart1();
  }
}
function showCart1() {
  document.querySelector(".cartModal").style.display = "block";
  document.querySelector(".modal-overlay").style.display = "block";
  displayAllCookies();
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
// Store cookies by box type
function storeCookiesOnAdd() {
  // Retrieve the cookie counts from the input fields
  const counts = Array.from({ length: 8 }, (_, i) =>
    parseInt(document.getElementById(`numCookie${i}`).value) || 0
  );

  // Define the cookie types
  const cookieTypes = [
    "Classic",
    "Peanut",
    "Oatmeal",
    "Smores",
    "Pink Sugar",
    "Choco Straw",
    "Lemon",
    "Berries",
  ];

  // Calculate the total number of cookies selected
  const totalCookies = counts.reduce((sum, count) => sum + count, 0);

  // Check if the total matches the box size
  if (totalCookies !== orderCookiePage) {
    alert(
      `Please ensure you select exactly ${orderCookiePage} cookies. You selected ${totalCookies}.`
    );
    return;
  }

  // Retrieve existing boxes from localStorage
  let allBoxes = JSON.parse(localStorage.getItem("allBoxes")) || [];

  // Create a new box and add cookies based on counts
  const newBox = { boxType: orderCookiePage, cookies: [] };
  counts.forEach((count, index) => {
    for (let i = 0; i < count; i++) {
      newBox.cookies.push(cookieTypes[index]);
    }
  });

  // Add the new box to the list
  allBoxes.push(newBox);

  // Update localStorage with the modified allBoxes array
  localStorage.setItem("allBoxes", JSON.stringify(allBoxes));

  // Reset the input fields
  counts.forEach((_, i) => {
    document.getElementById(`numCookie${i}`).value = 0;
  });

  // Reset the current number of cookies
  currentNumberOfCookies = 0;

  alert("Cookies successfully added to the cart!");
}


function removeCookie(cookie) {
  let selectedCookies;

  if (orderCookiePage === 3) {
    selectedCookies = cookies3;
  } else if (orderCookiePage === 6) {
    selectedCookies = cookies6;
  } else {
    selectedCookies = cookies12;
  }

  // Ensure we have cookies to remove
  if (selectedCookies.length > 0) {
    const cookieOptions = [
      "Classic", "Peanut", "Oatmeal", "Smores",
      "Pink Sugar", "Choco Straw", "Lemon", "Berries"
    ];

    // Remove the specific cookie from the array
    const cookieIndex = selectedCookies.lastIndexOf(cookieOptions[cookie]);
    if (cookieIndex !== -1) {
      selectedCookies.splice(cookieIndex, 1); // Remove the cookie
    }

    // Update localStorage
    localStorage.setItem(`cookies${orderCookiePage}`, JSON.stringify(selectedCookies));
  } else {
    console.log("No cookies to remove.");
  }
}

// Display cookies grouped by box type
function displayAllCookies() {
  const allBoxes = JSON.parse(localStorage.getItem("allBoxes")) || [];
  const modalList = document.getElementById("cartList");
  modalList.innerHTML = "";

  if (allBoxes.length === 0) {
    modalList.innerHTML = "<li>No boxes added yet.</li>";
    return;
  }

  allBoxes.forEach((box, boxIndex) => {
    const boxItem = document.createElement("li");
    boxItem.textContent = `Box Type: ${box.boxType}-pack`;

    const cookieList = document.createElement("ul");
    box.cookies.forEach((cookie) => {
      const cookieItem = document.createElement("li");
      cookieItem.textContent = cookie;
      cookieList.appendChild(cookieItem);
    });

    boxItem.appendChild(cookieList);

    const deleteLink = document.createElement("a");
    deleteLink.href = "#";
    deleteLink.textContent = "Delete Box";
    deleteLink.style.color = "red";
    deleteLink.style.marginLeft = "10px";
    deleteLink.addEventListener("click", (e) => {
      e.preventDefault();
      deleteBox(boxIndex);
    });

    boxItem.appendChild(deleteLink);
    modalList.appendChild(boxItem);
  });
}


function deleteBox(boxIndex) {
  let allBoxes = JSON.parse(localStorage.getItem("allBoxes")) || [];

  // Remove the box at the specified index
  if (boxIndex > -1 && boxIndex < allBoxes.length) {
    allBoxes.splice(boxIndex, 1);
  }

  // Update localStorage
  localStorage.setItem("allBoxes", JSON.stringify(allBoxes));

  // Refresh the displayed list
  displayAllCookies();
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
      removeCookie(cookie);
    }
  } else if (cookie == 1) {
    if (document.getElementById("numCookie1").value != 0) {
      currentNumberOfCookies = currentNumberOfCookies - 1;
      const num = document.getElementById("numCookie1");
      num.value = parseInt(num.value) - 1;
      removeCookie(cookie);
    }
  } else if (cookie == 2) {
    if (document.getElementById("numCookie2").value != 0) {
      currentNumberOfCookies = currentNumberOfCookies - 1;
      const num = document.getElementById("numCookie2");
      num.value = parseInt(num.value) - 1;
        removeCookie(cookie);
    }
  } else if (cookie == 3) {
    if (document.getElementById("numCookie3").value != 0) {
      currentNumberOfCookies = currentNumberOfCookies - 1;
      const num = document.getElementById("numCookie3");
      num.value = parseInt(num.value) - 1;
        removeCookie(cookie);
    }
  } else if (cookie == 4) {
    if (document.getElementById("numCookie4").value != 0) {
      currentNumberOfCookies = currentNumberOfCookies - 1;
      const num = document.getElementById("numCookie4");
      num.value = parseInt(num.value) - 1;
        removeCookie(cookie);
    }
  } else if (cookie == 5) {
    if (document.getElementById("numCookie5").value != 0) {
      currentNumberOfCookies = currentNumberOfCookies - 1;
      const num = document.getElementById("numCookie5");
      num.value = parseInt(num.value) - 1;
        removeCookie(cookie);
    }
  } else if (cookie == 6) {
    if (document.getElementById("numCookie6").value != 0) {
      currentNumberOfCookies = currentNumberOfCookies - 1;
      const num = document.getElementById("numCookie6");
      num.value = parseInt(num.value) - 1;
        removeCookie(cookie);
    }
  } else {
    if (document.getElementById("numCookie7").value != 0) {
      currentNumberOfCookies = currentNumberOfCookies - 1;
      const num = document.getElementById("numCookie7");
      num.value = parseInt(num.value) - 1;
        removeCookie(cookie);
    }
  }
  print_nSelectCookies();
}
