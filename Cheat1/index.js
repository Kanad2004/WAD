const products = [
  {
    image: "https://via.placeholder.com/50",
    name: "Wireless Headphones",
    price: "₹7,999",
    description: "Noise-cancelling over-ear headphones.",
  },
  {
    image: "https://via.placeholder.com/50",
    name: "Smartwatch",
    price: "₹12,999",
    description: "Fitness tracking smartwatch.",
  },
  {
    image: "https://via.placeholder.com/50",
    name: "Gaming Mouse",
    price: "₹2,499",
    description: "Ergonomic gaming mouse.",
  },
  {
    image: "https://via.placeholder.com/50",
    name: "Laptop Stand",
    price: "₹1,999",
    description: "Adjustable aluminium stand.",
  },
  {
    image: "https://via.placeholder.com/50",
    name: "Bluetooth Speaker",
    price: "₹4,999",
    description: "Portable speaker with deep bass.",
  },
  {
    image: "https://via.placeholder.com/50",
    name: "USB-C Hub",
    price: "₹3,499",
    description: "Multi-port USB-C adapter.",
  },
  {
    image: "https://via.placeholder.com/50",
    name: "Wireless Keyboard",
    price: "₹5,999",
    description: "Slim wireless keyboard.",
  },
  {
    image: "https://via.placeholder.com/50",
    name: "External SSD",
    price: "₹9,999",
    description: "1TB portable SSD.",
  },
  {
    image: "https://via.placeholder.com/50",
    name: "Webcam",
    price: "₹6,499",
    description: "1080p HD webcam.",
  },
  {
    image: "https://via.placeholder.com/50",
    name: "Gaming Chair",
    price: "₹14,999",
    description: "Ergonomic gaming chair.",
  },
  {
    image: "https://via.placeholder.com/50",
    name: "Monitor",
    price: "₹19,999",
    description: "27-inch 4K monitor.",
  },
  {
    image: "https://via.placeholder.com/50",
    name: "Power Bank",
    price: "₹2,999",
    description: "20000mAh fast-charging power bank.",
  },
];

const itemsPerPage = 10;
let currentPage = 1;

function displayProducts(page) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedProducts = products.slice(start, end);

  const tbody = document.getElementById("productTable");
  tbody.innerHTML = ""; // Clear existing rows

  paginatedProducts.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${product.image}" alt="${product.name}" /></td>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.description}</td>
    `;
    tbody.appendChild(row);
  });

  const totalPages = Math.ceil(products.length / itemsPerPage);
  document.getElementById(
    "pageInfo"
  ).textContent = `Page ${page} of ${totalPages}`;
  document.getElementById("prevPage").disabled = page === 1;
  document.getElementById("nextPage").disabled = page === totalPages;
}

document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayProducts(currentPage);
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  const totalPages = Math.ceil(products.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayProducts(currentPage);
  }
});
displayProducts(currentPage);
