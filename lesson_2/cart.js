window.addEventListener('load', () => {
  loadItems();
});

const cart = [];  // empty cart on first load

function loadItems() {

  const itemsContainer = document.getElementById("items-container");

  items.forEach(item => {

    const element = createCard(item);
    itemsContainer.appendChild(element);

    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 0,
      total: 0
    })

  });

  const cartTable = document.getElementById("cart-table-body");

  cart.forEach(entry => {

    const element = createTableRow(entry);
    cartTable.appendChild(element)

  })

}

function createCard(item) {

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

  const nameCol = createTableColumn(entry.name);
  const priceCol = createTableColumn(entry.price);
  const quantityCol = createTableColumn(entry.quantity);
  quantityCol.id = "card-row-" + entry.id + "-quantity";
  const totalCol = createTableColumn(entry.total);
  totalCol.id = "card-row-" + entry.id + "-total";

  row.appendChild(nameCol);
  row.appendChild(priceCol);
  row.appendChild(quantityCol);
  row.appendChild(totalCol);

  return row;

}

function createTableColumn(innerText) {

  const col = document.createElement("td");
  col.className += "border px-4 py-2";
  col.innerText = innerText;
  return col;

}

function addToCart(event) {

  const itemId = event.target.dataset.id;
  const cartRow = cart.find(item => item.id === itemId);
  cartRow.quantity += 1;
  cartRow.total = cartRow.price * cartRow.quantity;

  updateCart();

}

function updateCart() {

  cart.forEach(entry => {

    const quantityCol = document.getElementById("card-row-" + entry.id + "-quantity");
    quantityCol.innerText = entry.quantity;

    const totalCol = document.getElementById("card-row-" + entry.id + "-total");
    totalCol.innerText = entry.total;

  });

  const cartTotalEl = document.getElementById("cart-total");
  cartTotalEl.innerText = cart.reduce((prev, next) => prev + next.total, 0);

}
