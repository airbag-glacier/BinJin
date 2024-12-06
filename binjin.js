//GLOBAL VARIABLES
var orderCookiePage;
var currentNumberOfCookies;
const cookies3 = [];
const cookies6 = [];
const cookies12 = [];
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
  fetch("http://localhost/BinJin/includes/orders/create.php", {
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
  window.location.href = "peanutInfo.html";
}
function openOatmealInfo() {
  window.location.href = "oatmealInfo.html";
}
function openSmoresInfo() {
  window.location.href = "smoresInfo.html";
}
function openPinkSugarInfo() {
  window.location.href = "pinkInfo.html";
}
function openChocoStrawInfo() {
  window.location.href = "chocoInfo.html";
}
function openLemonInfo() {
  window.location.href = "lemonInfo.html";
}
function openBerriesInfo() {
  window.location.href = "berriesInfo.html";
}
function returnToLandingPage() {
  window.location.href = "index.html";
}

function openReceipt() {
  console.log("openReceipt called");
  document.querySelector(".receipt-Modal").style.display = "block";
  document.querySelector(".modal-overlay").style.display = "block";
  document.querySelector(".cartModal").style.display = "none";
  displayReceiptModal();
  disablBtnAddSub();
}

function closeReceipt() {
  window.location.href = "index.html";
  document.querySelector(".receipt-Modal").style.display = "none";
  document.querySelector(".modal-overlay").style.display = "none";
  removeAllBoxes();
  enableBtnAddSub();
}
function showModal() {
  const allBoxes = JSON.parse(localStorage.getItem("allBoxes"))
  if(allBoxes.length == 0){
    customAlert("You cannot proceed with the transaction, your cart is empty");
  }else{
    document.querySelector(".modal").style.display = "block";
    document.querySelector(".modal-overlay").style.display = "block";
    document.querySelector(".cartModal").style.display = "none";
    clearCookiesImage();
    disablBtnAddSub();
  }
}

function hideModal() {
  document.querySelector(".modal").style.display = "none";
  document.querySelector(".modal-overlay").style.display = "none";
  enableBtnAddSub();
}
function displayReceiptModal() {
  const customerName = document.getElementById("customer-name").value;
  const contactNumber = document.getElementById("contact-number").value;
  const referenceNumber = document.getElementById("payment-reference").value;
  const branchLocation = document.getElementById("branch-location").value;
  const pickupTime = document.getElementById("pickup-time").value;

  const allBoxes = JSON.parse(localStorage.getItem("allBoxes")) || [];

  let totalPayment = 0;

  for (let i = 0; i < allBoxes.length; i++) {
    if (allBoxes[i].boxType === 3) {
      totalPayment += 100;
    } else if (allBoxes[i].boxType === 6) {
      totalPayment += 190;
    } else {
      totalPayment += 380;
    }
  }

  let receiptText = `Customer Details:\n`;
  receiptText += `Name: ${customerName}\n`;
  receiptText += `Contact Number: ${contactNumber}\n`;
  receiptText += `Reference Number: ${referenceNumber}\n`;
  receiptText += `Branch Location: ${branchLocation}\n`;
  receiptText += `Pickup Time: ${pickupTime}\n\n`;
  receiptText += `Total Payment: ${totalPayment}\n\n`;

  receiptText += `Order Details:\n`;
  if (allBoxes.length === 0) {
    receiptText += `No boxes added to the order.\n`;
  } else {
    allBoxes.forEach((box, index) => {
      receiptText += `Box ${index + 1} (${box.boxType}-pack):\n`;
      box.cookies.forEach((cookie, cookieIndex) => {
        receiptText += `  ${cookieIndex + 1}. ${cookie}\n`;
      });
      receiptText += `\n`;
    });
  }

  const receiptTextarea = document.getElementById("txReceipt");
  receiptTextarea.value = receiptText;

  document.querySelector(".receipt-Modal").style.display = "block";
  document.querySelector(".modal-overlay").style.display = "block";
}

function handleOrder() {
  const customerName = document.getElementById("customer-name");
  const contactNumber = document.getElementById("contact-number");
  const paymentReference = document.getElementById("payment-reference");
  const branchLocation = document.getElementById("branch-location");
  const pickupTime = document.getElementById("pickup-time");

  const cookies = [];

  const cart = JSON.parse(localStorage.getItem("allBoxes"));

  // Loop over each box in the data
  cart.forEach((box) => {
    if (Array.isArray(box.cookies)) {
      cookies.push(...box.cookies);
    }
  });

  let totalPayment = 0;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].boxType === 3) {
      totalPayment += 100;
    } else if (cart[i].boxType === 6) {
      totalPayment += 190;
    } else {
      totalPayment += 380;
    }
  }

  //iformat niyo ng ganito yung cookies
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
    totalPayment,
    paymentReference.value,
    branchLocation.value,
    pickupTime.value,
    cookies
  );

  if (success) {
    customAlert("Order successfully placed!");
    hideModal();
  } else {
    customAlert("Error placing order. Please try again.");
  }
}

function showCart() {
  if (orderCookiePage - currentNumberOfCookies != 0) {
    const msg =  "Please Select " +(orderCookiePage - currentNumberOfCookies) +" more cookies"
    customAlert(msg);

  } else {
    displayAllCookies();
    storeCookiesOnAdd();
    showCart1();
    clearCookiesImage();
    disablBtnAddSub();
  }
}
function showCart1() {
  document.querySelector(".cartModal").style.display = "block";
  document.querySelector(".modal-overlay").style.display = "block";
  displayAllCookies();
  disablBtnAddSub();
}

function hideCart() {
  document.querySelector(".cartModal").style.display = "none";
  document.querySelector(".modal-overlay").style.display = "none";
  enableBtnAddSub();
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
  const counts = Array.from(
    { length: 8 },
    (_, i) => parseInt(document.getElementById(`numCookie${i}`).value) || 0
  );

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

  const totalCookies = counts.reduce((sum, count) => sum + count, 0);

  if (totalCookies !== orderCookiePage) {
    msg = `Please ensure you select exactly ${orderCookiePage} cookies. You selected ${totalCookies}.`;

    customAlert(msg);
    return;
  }

  let allBoxes = JSON.parse(localStorage.getItem("allBoxes")) || [];

  const newBox = { boxType: orderCookiePage, cookies: [] };
  counts.forEach((count, index) => {
    for (let i = 0; i < count; i++) {
      newBox.cookies.push(cookieTypes[index]);
    }
  });

  allBoxes.push(newBox);

  localStorage.setItem("allBoxes", JSON.stringify(allBoxes));

  counts.forEach((_, i) => {
    document.getElementById(`numCookie${i}`).value = 0;
  });

  currentNumberOfCookies = 0;

  customAlert("Cookies successfully added to the cart!");
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

  if (selectedCookies.length > 0) {
    const cookieOptions = [
      "Classic",
      "Peanut",
      "Oatmeal",
      "Smores",
      "Pink Sugar",
      "Choco Straw",
      "Lemon",
      "Berries",
    ];

    const cookieIndex = selectedCookies.lastIndexOf(cookieOptions[cookie]);
    if (cookieIndex !== -1) {
      selectedCookies.splice(cookieIndex, 1); 
    }

    localStorage.setItem(
      `cookies${orderCookiePage}`,
      JSON.stringify(selectedCookies)
    );
  } else {
    console.log("No cookies to remove.");
  }
}
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
  if (boxIndex > -1 && boxIndex < allBoxes.length) {
    allBoxes.splice(boxIndex, 1);
  }
  localStorage.setItem("allBoxes", JSON.stringify(allBoxes));
  displayAllCookies();
}

function displayCookieInBox(orderCookiePage, cookie, func) {
  const imgCookies = [
    "images/classic.png", // Classic
    "images/peanut.png", // Peanut
    "images/oatmeal.png", // Oatmeal
    "images/smores.png", // Smores
    "images/pink.png", // Pink Sugar
    "images/chocoStraw.png", // Choco Straw
    "images/lemon.png", // Lemon
    "images/berry.png", // Berries
  ];

  const boxContainer = document.getElementById(`boxContainer${orderCookiePage}`);
  if (!boxContainer) {
    console.error(`Box container not found: boxContainer${orderCookiePage}`);
    return;
  }

  if (func === "+") {
    const imgElement = document.createElement("img");
    imgElement.src = imgCookies[cookie];
    imgElement.alt = `Cookie ${cookie + 1}`;
    imgElement.className = "cookie-image";
    imgElement.id = "cookie-image";
    boxContainer.appendChild(imgElement);

  } else if (func === "-") {
    const cookiesInBox = Array.from(boxContainer.children);
    const indexToRemove = cookiesInBox.findIndex(
      (img) => img.src.includes(imgCookies[cookie])
    );
    if (indexToRemove !== -1) {
      cookiesInBox[indexToRemove].remove();
    }
  }
}
function clearCookiesImage(){
  for(i=0;i<orderCookiePage;i++){
    const cookieImage = document.getElementById("cookie-image");
    cookieImage.remove(); 
    document.getElementById("nSelecCookies").innerHTML =
      "Select " + (orderCookiePage - currentNumberOfCookies) + " more cookies";
  }
}

function add(cookie) {
  var func = "+";
  if (cookie == 0) {
    if (currentNumberOfCookies != orderCookiePage) {
      currentNumberOfCookies = currentNumberOfCookies + 1;
      const num = document.getElementById("numCookie0");
      num.value = parseInt(num.value) + 1;
      displayCookieInBox(orderCookiePage, cookie, func);
    }
  } else if (cookie == 1) {
    if (currentNumberOfCookies != orderCookiePage) {
      currentNumberOfCookies = currentNumberOfCookies + 1;
      const num = document.getElementById("numCookie1");
      num.value = parseInt(num.value) + 1;
      displayCookieInBox(orderCookiePage, cookie, func);
    }
  } else if (cookie == 2) {
    if (currentNumberOfCookies != orderCookiePage) {
      currentNumberOfCookies = currentNumberOfCookies + 1;
      const num = document.getElementById("numCookie2");
      num.value = parseInt(num.value) + 1;
      displayCookieInBox(orderCookiePage, cookie, func);
    }
  } else if (cookie == 3) {
    if (currentNumberOfCookies != orderCookiePage) {
      currentNumberOfCookies = currentNumberOfCookies + 1;
      const num = document.getElementById("numCookie3");
      num.value = parseInt(num.value) + 1;
      displayCookieInBox(orderCookiePage, cookie, func);
    }
  } else if (cookie == 4) {
    if (currentNumberOfCookies != orderCookiePage) {
      currentNumberOfCookies = currentNumberOfCookies + 1;
      const num = document.getElementById("numCookie4");
      num.value = parseInt(num.value) + 1;
      displayCookieInBox(orderCookiePage, cookie, func);
    }
  } else if (cookie == 5) {
    if (currentNumberOfCookies != orderCookiePage) {
      currentNumberOfCookies = currentNumberOfCookies + 1;
      const num = document.getElementById("numCookie5");
      num.value = parseInt(num.value) + 1;
      displayCookieInBox(orderCookiePage, cookie, func);
    }
  } else if (cookie == 6) {
    if (currentNumberOfCookies != orderCookiePage) {
      currentNumberOfCookies = currentNumberOfCookies + 1;
      const num = document.getElementById("numCookie6");
      num.value = parseInt(num.value) + 1;
      displayCookieInBox(orderCookiePage, cookie, func);
    }
  } else {
    if (currentNumberOfCookies != orderCookiePage) {
      currentNumberOfCookies = currentNumberOfCookies + 1;
      const num = document.getElementById("numCookie7");
      num.value = parseInt(num.value) + 1;
      displayCookieInBox(orderCookiePage, cookie, func);
    }
  }
}
function sub(cookie) {
  var func = "-";
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
  displayCookieInBox(orderCookiePage, cookie, func);
}

function removeAllBoxes(){
  localStorage.removeItem("allBoxes");
}

function nonEmpty(){
  const customerName = document.getElementById("customer-name");
  const contactNumber = document.getElementById("contact-number");
  const paymentReference = document.getElementById("payment-reference");
  const branchLocation = document.getElementById("branch-location");
  const pickupTime = document.getElementById("pickup-time");
  if(customerName.value.length < 0 ||
    contactNumber.value.length < 10 ||
    paymentReference.value.length < 0 ||
    branchLocation.value.length <0 ||
    pickupTime.value.length < 0
  ){
    customAlert("Please fill-up all the information to complete the transaction");
  }else{
    hideModal(); handleOrder(); openReceipt();
  }
}

//this function is temporary displaying a custom alert dialog box
function customAlertDialogBox(imageSrc, paragraphText, id){
  const alertBox = document.createElement("div");

  if(id){
      alertBox.id = id;
      alertBox.className = "customAlert";
  }

  const imgElement = document.createElement("img");
  imgElement.className = "imgBinjin"
  imgElement.src = imageSrc;
  imgElement.alt = "Binjin";

  const textDivElement = document.createElement("div");
  textDivElement.className = "alertTextDiv";

  const paragraphElement = document.createElement("p");
  paragraphElement.textContent = paragraphText;
  paragraphElement.className = "alertMsg";
  paragraphElement.id = "alertMsg";

  const btnElement = document.createElement("button");
  btnElement.textContent = "Okay";
  btnElement.className = "btnOkay";
  btnElement.id = "btnOkay";
  btnElement.addEventListener("click", closeAlertBox);

  alertBox.appendChild(imgElement);
  alertBox.appendChild(textDivElement);
  textDivElement.appendChild(paragraphElement);
  textDivElement.appendChild(btnElement);

  document.body.appendChild(alertBox)

  document.getElementById("btnOkay").onclick = "closeAlertBox()";
  }

  function customAlert(msg){
      const alertBox = document.getElementById("alertBox");
      document.querySelector(".modal-overlay").style.display = "block";
      if (alertBox){
          
      }else{
          customAlertDialogBox("images/binjin.png", msg, "alertBox");
          disablBtnAddSub();
      }
  }
  function disablBtnAddSub(){
      if(document.querySelector(".modal-overlay").style.display == "block"){
        for (let i = 0; i<8;i++){
        document.getElementById(`btnCookie${i}Add`).disabled = "true";
        document.getElementById(`btnCookie${i}`).disabled = "true";
      }
    }
    
  }
  function enableBtnAddSub(){
    if(document.querySelector(".modal-overlay").style.display == "none"){
      for (let i = 0; i<8;i++){
            document.getElementById(`btnCookie${i}Add`).removeAttribute("disabled");
            document.getElementById(`btnCookie${i}`).removeAttribute("disabled");
          }
    }
    
  }

  function closeAlertBox(openedModal){
      const alertBox = document.getElementById("alertBox");
      var subString = "Please Select ";
      const fullString = document.getElementById("alertMsg");
      var varfullstring = fullString.textContent;
      if (alertBox) {
        enableBtnAddSub()
        alertBox.remove();
        if(varfullstring.includes(subString)){
          document.querySelector(".modal-overlay").style.display = "none";
          enableBtnAddSub();
        }
      } else {
          console.error("Alert box not found!");
      }
  }

  // FAQ
  function expandRectangle(element) {
    // Get the associated question for the clicked FAQ item
    const question = element.querySelector('.question1, .question2, .question3, .question4, .question5');
    let newText = element.querySelector('.new-text'); // Check if new text is already present

    // If the new text does not exist, create it
    if (!newText) {
        newText = document.createElement('span');  // Create a new span element
        newText.classList.add('new-text');  // Add the class for styling the new text

        // Customize the answer text for each FAQ
        if (element.classList.contains('faq1')) {
        newText.textContent = " - Our cookies are made from the finest ingredients, with unique flavors.";
        } else if (element.classList.contains('faq2')) {
        newText.textContent = " - We’re open Monday to Saturday from 9:00 AM to 7:00 PM.";
        } else if (element.classList.contains('faq3')) {
        newText.textContent = " - Absolutely! We accept custom orders for events such as birthdays and weddings.";
        } else if (element.classList.contains('faq4')) {
        newText.textContent = " - To keep our cookies fresh, we only offer pickup options.";
        } else if (element.classList.contains('faq5')) {
        newText.textContent = " - Yes, all our cookies are baked fresh daily to guarantee top quality and taste.";
        }

        question.appendChild(newText);  // Append the new text to the question
    }
    
    // Toggle visibility of the new text (answer)
    newText.style.display = newText.style.display === 'block' ? 'none' : 'block';

    // Rotate the arrow to indicate the change
    const arrow = element.querySelector('img');
    if (arrow) {
        arrow.classList.toggle('rotate');  // Toggle rotation class
    }
    }

