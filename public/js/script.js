const savedTheme = localStorage.getItem("theme");
const body = document.body;
const nav = document.getElementById("nav");
const btn = document.getElementById("test_btn");

document.body.dataset.bsTheme = savedTheme || "light";

if (savedTheme === "dark") {
  nav.className = "navbar navbar-expand-lg navbar-light bg-dark";
  btn.innerHTML =
    '<i class="bi bi-sun-fill me-4" style="font-size: 30px; color: white;"></i>';
} else {
  nav.className = "navbar navbar-expand-lg navbar-light bg-light";
  btn.innerHTML =
    '<i class="bi bi-moon-fill me-4" style="font-size: 30px; color:  #032942;"></i>';
}

btn.addEventListener("click", () => {
  const body = document.body;
  const nav = document.getElementById("nav");

  if (body.dataset.bsTheme === "light") {
    body.dataset.bsTheme = "dark";
    nav.className = "navbar navbar-expand-lg navbar-light bg-dark";
    btn.innerHTML =
      '<i class="bi bi-sun-fill me-4" style="font-size: 30px; color: white;"></i>';
    localStorage.setItem("theme", "dark");
  } else {
    body.dataset.bsTheme = "light";
    nav.className = "navbar navbar-expand-lg navbar-light bg-light";
    btn.innerHTML =
      '<i class="bi bi-moon-fill me-4" style="font-size: 30px; color:  #032942;"></i>';
    localStorage.setItem("theme", "light");
  }
});

const qty = document.getElementById("qty");
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const item_qty = +document.getElementById("stock").value;

plus.addEventListener("click", () => {
  qty.value = +qty.value + 1;
  const qty_diff = item_qty - qty.value;
  if (qty_diff < 0) {
    document.getElementById("availability").innerHTML = "Out of stock";
    document.getElementById("availability").style.color = "red";
  } else {
    document.getElementById("availability").innerHTML = "Available";
    document.getElementById("availability").style.color = "green";
  }
});
minus.addEventListener("click", () => {
  qty.value -= 1;
  const qty_diff = item_qty - qty.value;

  if (qty_diff < 0) {
    document.getElementById("availability").innerHTML = "Out of stock";
    document.getElementById("availability").style.color = "red";
  } else {
    document.getElementById("availability").innerHTML = "Available";
    document.getElementById("availability").style.color = "green";
  }
});

qty.addEventListener("change", () => {
  const qty_diff = item_qty - qty.value;
  if (qty_diff < 0) {
    document.getElementById("availability").innerHTML = "Out of stock";
    document.getElementById("availability").style.color = "red";
  } else {
    document.getElementById("availability").innerHTML = "Available";
    document.getElementById("availability").style.color = "green";
  }
});
