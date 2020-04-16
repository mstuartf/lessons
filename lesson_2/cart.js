window.addEventListener('load', () => {
  createElementForEachItem();
  createCart();
  createElementForEachCartEntry();
});

// this function should loop through the items variable using the forEach function
// and create a new element for each item using the createItemElement
// and then append the new element to the items container element using the appendChild function
function createElementForEachItem() {
  const itemsContainer = document.getElementById("items-container");
  items.forEach(item => {
    const element = createItemElement(item);
    itemsContainer.appendChild(element);
  });
}

// this function should loop through the items variable using the forEach function
// and create a new cart entry variable for each item
// this variable should be an object with properties: id, name, price, quantity, total
// each variable should be added to the cart array variable using the push function
function createCart() {
  items.forEach(item => {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 0,
      total: 0
    })

  });
}

// this function should loop through the cart variable using the forEach function
// and create a new element for each entry using the createCartElement
// and then append the new element to the cart table element using the appendChild function
function createElementForEachCartEntry() {
  const cartTable = document.getElementById("cart-table-body");
  cart.forEach(entry => {
    const element = createCartElement(entry);
    cartTable.appendChild(element)
  })
}


// this function should create and return a new HTML element for an item
// the element should be a div styled as a card containing a title, an image, a price and an Add to cart button
function createItemElement(item) {

  const card = document.createElement("div");
  card.className += "shadow p-4 flex flex-col items-center bg-white";

  const title = document.createElement("div");
  title.className += "text-md text-gray-700 pb-4";
  title.innerText = item.name;
  card.appendChild(title);

  const img = document.createElement("img");
  img.className += "h-48 w-48";
  img.src = item.img;
  card.appendChild(img);

  const footer = document.createElement("div");
  footer.className += "grid grid-cols-2 gap-2 w-full text-center pt-4";

  const price = document.createElement("div");
  price.className += "text-md text-gray-700 flex items-center justify-center";
  price.innerText = "£" + item.price;
  footer.appendChild(price);

  const button = document.createElement("button");
  button.className += "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
  button.innerText = "Add to cart";
  button.setAttribute('data-id', item.id);
  button.addEventListener("click", addToCart);
  footer.appendChild(button);

  card.appendChild(footer);

  return card;

}

// this function should create and return a new HTML element for a cart entry
// the element should be a table row containing 4 cells: name, price, quantity and total
function createCartElement(entry) {

  const row = document.createElement("tr");
  row.id = "cart-row-" + entry.id;

  const nameCol = createTableCell(entry.name);
  const priceCol = createTableCell(entry.price);
  const quantityCol = createTableCell(entry.quantity);
  quantityCol.id = "card-row-" + entry.id + "-quantity";
  const totalCol = createTableCell(entry.total);
  totalCol.id = "card-row-" + entry.id + "-total";

  row.appendChild(nameCol);
  row.appendChild(priceCol);
  row.appendChild(quantityCol);
  row.appendChild(totalCol);

  return row;

}


// this function should create and return a table cell element with the correct classes and set its innerText
function createTableCell(innerText) {
  const col = document.createElement("td");
  col.className += "border px-4 py-2";
  col.innerText = innerText;
  return col;
}


// this function is called when the user clicks an add to cart button
// it should call addItemToCartVariable with the item ID and then call updateCartElements to update the view
function addToCart(event) {
  const itemId = event.target.dataset.id;
  addItemToCartVariable(itemId);
  updateCartElements();
}


// this function should find the cart entry with the matching ID
// then it should increase the entry's quantity by 1 and recalculate its total
function addItemToCartVariable(itemId) {
  const cartRow = cart.find(item => item.id === itemId);
  cartRow.quantity += 1;
  cartRow.total = cartRow.price * cartRow.quantity;
}

// this function should loop through each cart entry and find its quantity and total cells in the cart table
// it should update the cells' values
// then it should find the cart total cell and set it to the sum of all cart entry totals
function updateCartElements() {

  cart.forEach(entry => {

    const quantityCol = document.getElementById("card-row-" + entry.id + "-quantity");
    quantityCol.innerText = entry.quantity;

    const totalCol = document.getElementById("card-row-" + entry.id + "-total");
    totalCol.innerText = entry.total;

  });

  const cartTotalEl = document.getElementById("cart-total");
  cartTotalEl.innerText = cart.reduce((prev, next) => prev + next.total, 0);

}
