function login(e) {
  e.preventDefault();
  const user = document.getElementById("username").value;
  localStorage.setItem("user", user);
  window.location.href = "order.html";
}

function submitOrder(e) {
  e.preventDefault();

  const user = localStorage.getItem("user");
  const menu = document.getElementById("menu").value;
  const qty = document.getElementById("qty").value;
  const orderId = "MVC-" + Math.floor(Math.random() * 10000);

  const order = { user, menu, qty, orderId };
  localStorage.setItem("lastOrder", JSON.stringify(order));

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  window.location.href = "receipt.html";
}

if (document.getElementById("receipt")) {
  const order = JSON.parse(localStorage.getItem("lastOrder"));
  document.getElementById("receipt").innerHTML = `Name: ${order.user}<br>
     Menu: ${order.menu}<br>
     Qty: ${order.qty}<br>
     Order ID: <b>${order.orderId}</b>`;
}

if (document.getElementById("adminList")) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const list = document.getElementById("adminList");

  orders.forEach((o) => {
    const li = document.createElement("li");
    li.textContent = `${o.orderId} - ${o.user} - ${o.menu} (${o.qty})`;
    list.appendChild(li);
  });
}
