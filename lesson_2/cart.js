window.addEventListener('load', () => {
  createElementForEachItem();
  createCart();
  createElementForEachCartEntry();
});


function createElementForEachItem() {
  const itemsContainer = document.getElementById("items-container");
  items.forEach(item => {
    const element = createItemElement(item);
    itemsContainer.appendChild(element);
  });
}

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

function createElementForEachCartEntry() {
  const cartTable = document.getElementById("cart-table-body");

  cart.forEach(entry => {

    const element = createTableRow(entry);
    cartTable.appendChild(element)

  })
}


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

function createTableRow(entry) {

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

function createTableCell(innerText) {

  const col = document.createElement("td");
  col.className += "border px-4 py-2";
  col.innerText = innerText;
  return col;

}

function addToCart(event) {
  const itemId = event.target.dataset.id;
  addItemToCartVariable(itemId);
  updateCartElements();
}

function addItemToCartVariable(itemId) {
  const cartRow = cart.find(item => item.id === itemId);
  cartRow.quantity += 1;
  cartRow.total = cartRow.price * cartRow.quantity;
}

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
