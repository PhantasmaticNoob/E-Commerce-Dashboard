const monthlyData = [
  { month: "Jan", sales: 4200000, profit: 410000, orders: 2840, units: 2270 },
  { month: "Feb", sales: 3900000, profit: 360000, orders: 2630, units: 2110 },
  { month: "Mar", sales: 4650000, profit: 475000, orders: 3160, units: 2540 },
  { month: "Apr", sales: 4400000, profit: 425000, orders: 2990, units: 2400 },
  { month: "May", sales: 5100000, profit: 540000, orders: 3410, units: 2780 },
  { month: "Jun", sales: 4900000, profit: 505000, orders: 3290, units: 2650 },
  { month: "Jul", sales: 5350000, profit: 575000, orders: 3580, units: 2910 },
  { month: "Aug", sales: 5700000, profit: 620000, orders: 3790, units: 3070 },
  { month: "Sep", sales: 5500000, profit: 565000, orders: 3670, units: 2950 },
  { month: "Oct", sales: 6250000, profit: 710000, orders: 4140, units: 3400 },
  { month: "Nov", sales: 6800000, profit: 805000, orders: 4490, units: 3720 },
  { month: "Dec", sales: 7400000, profit: 890000, orders: 4910, units: 4050 },
];

const categories = [
  { name: "Electronics", share: 0.29, profitShare: 0.25, units: 0.19, returned: 0.15, cancelled: 0.12 },
  { name: "Apparel", share: 0.24, profitShare: 0.22, units: 0.28, returned: 0.31, cancelled: 0.2 },
  { name: "Home & Kitchen", share: 0.2, profitShare: 0.2, units: 0.22, returned: 0.18, cancelled: 0.24 },
  { name: "Beauty", share: 0.15, profitShare: 0.18, units: 0.2, returned: 0.13, cancelled: 0.16 },
  { name: "Accessories", share: 0.12, profitShare: 0.15, units: 0.11, returned: 0.23, cancelled: 0.28 },
];

const products = [
  { name: "Wireless Bluetooth Headphones", share: 0.14 },
  { name: "Everyday Cotton T-Shirt", share: 0.12 },
  { name: "Smart Fitness Watch", share: 0.105 },
  { name: "Stainless Steel Water Bottle", share: 0.095 },
  { name: "LED Desk Lamp", share: 0.085 },
  { name: "Daily Hydration Face Serum", share: 0.075 },
  { name: "Cotton Bed Sheet Set", share: 0.07 },
  { name: "Portable Power Bank", share: 0.065 },
  { name: "Kitchen Storage Set", share: 0.06 },
  { name: "Classic Running Shoes", share: 0.055 },
];

const payments = [
  { name: "UPI", share: 0.38, profitShare: 0.38 },
  { name: "Credit / debit card", share: 0.28, profitShare: 0.27 },
  { name: "Cash on delivery", share: 0.22, profitShare: 0.2 },
  { name: "Net banking", share: 0.12, profitShare: 0.15 },
];

const fulfilment = [
  { name: "Amazon fulfilled", share: 0.68, profitShare: 0.7 },
  { name: "Seller fulfilled", share: 0.32, profitShare: 0.3 },
];

const states = [
  { name: "Maharashtra", share: 0.17, profitShare: 0.17, orderShare: 0.15 },
  { name: "Karnataka", share: 0.135, profitShare: 0.14, orderShare: 0.13 },
  { name: "Delhi", share: 0.12, profitShare: 0.12, orderShare: 0.115 },
  { name: "Uttar Pradesh", share: 0.105, profitShare: 0.1, orderShare: 0.12 },
  { name: "Tamil Nadu", share: 0.1, profitShare: 0.1, orderShare: 0.1 },
  { name: "Telangana", share: 0.085, profitShare: 0.09, orderShare: 0.08 },
  { name: "Gujarat", share: 0.075, profitShare: 0.08, orderShare: 0.075 },
  { name: "West Bengal", share: 0.065, profitShare: 0.07, orderShare: 0.07 },
];

const orderRates = { delivered: 0.84, shipped: 0.08, returned: 0.045, cancelled: 0.035 };
const fmtINR = (amount) => `₹${Math.round(amount).toLocaleString("en-IN")}`;
const fmtCompactINR = (amount) => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  return fmtINR(amount);
};
const fmtNumber = (number) => Math.round(number).toLocaleString("en-IN");
const sum = (items, key) => items.reduce((total, item) => total + item[key], 0);

function lineChart(data) {
  const width = 620;
  const height = 190;
  const pad = { top: 10, right: 12, bottom: 25, left: 44 };
  const plotWidth = width - pad.left - pad.right;
  const plotHeight = height - pad.top - pad.bottom;
  const max = Math.ceil(Math.max(...data.map((item) => item.sales)) / 2000000) * 2000000;
  const x = (index) => pad.left + (index * plotWidth) / Math.max(data.length - 1, 1);
  const y = (value) => pad.top + plotHeight - (value / max) * plotHeight;
  const profitMax = Math.ceil(Math.max(...data.map((item) => item.profit)) / 200000) * 200000;
  const profitY = (value) => pad.top + plotHeight - (value / profitMax) * plotHeight;
  const line = (key, yScale = y) => data.map((item, index) => `${index ? "L" : "M"}${x(index)},${yScale(item[key])}`).join(" ");
  const grid = Array.from({ length: 4 }, (_, i) => {
    const value = (max / 3) * i;
    return `<line class="grid-line" x1="${pad.left}" y1="${y(value)}" x2="${width - pad.right}" y2="${y(value)}"/><text class="axis-label" x="${pad.left - 7}" y="${y(value) + 3}" text-anchor="end">${Math.round(value / 100000)}L</text>`;
  }).join("");
  const labels = data.map((item, index) => `<text class="axis-label" x="${x(index)}" y="${height - 5}" text-anchor="middle">${item.month}</text>`).join("");
  const points = data.map((item, index) => `<circle class="sales-point" cx="${x(index)}" cy="${y(item.sales)}" r="3"/>`).join("");
  const area = `${line("sales")} L${x(data.length - 1)},${pad.top + plotHeight} L${x(0)},${pad.top + plotHeight} Z`;
  const profitLabels = Array.from({ length: 4 }, (_, i) =>
    `<text class="axis-label" x="${width - pad.right + 7}" y="${y((max / 3) * i) + 3}">${Math.round((profitMax / 3) * i / 100000)}L</text>`
  ).join("");
  return `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="sales-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#f59b27" stop-opacity=".2"/><stop offset="100%" stop-color="#f59b27" stop-opacity="0"/></linearGradient></defs>${grid}${profitLabels}<path class="trend-area" d="${area}"/><path class="sales-line" d="${line("sales")}"/><path class="profit-line" d="${line("profit", profitY)}"/>${points}${labels}</svg>`;
}

function renderStatus(orders) {
  const rows = [
    { key: "delivered", label: "Delivered", color: "delivered" },
    { key: "shipped", label: "Shipped", color: "shipped" },
    { key: "returned", label: "Returned", color: "returned" },
    { key: "cancelled", label: "Cancelled", color: "cancelled" },
  ];
  document.getElementById("status-success").textContent = `${Math.round(orderRates.delivered * 100)}%`;
  document.getElementById("status-chart").innerHTML = rows.map((row) =>
    `<span class="status-segment ${row.color}" style="width:${orderRates[row.key] * 100}%" title="${row.label}: ${fmtNumber(orders * orderRates[row.key])}"></span>`
  ).join("");
  document.getElementById("status-legend").innerHTML = rows.map((row) =>
    `<div class="status-row"><span class="status-name"><i class="legend-dot ${row.color === "returned" ? "return-dot" : row.color === "cancelled" ? "cancel-dot" : row.color === "delivered" ? "profit-dot" : "shipped-dot"}"></i>${row.label}</span><strong>${fmtNumber(orders * orderRates[row.key])} · ${Math.round(orderRates[row.key] * 100)}%</strong></div>`
  ).join("");
}

function renderCategories(sales, profit, units) {
  const maxShare = Math.max(...categories.map((category) => category.share));
  document.getElementById("category-chart").innerHTML = categories.map((category) => {
    const categorySales = sales * category.share;
    const categoryProfit = profit * category.profitShare;
    const salesWidth = (category.share / maxShare) * 100;
    const profitWidth = Math.min((categoryProfit / (profit * maxShare)) * 100, 100);
    return `<div class="category-row"><span class="category-name">${category.name}</span><div class="category-bars"><div class="bar-track" title="Sales ${fmtCompactINR(categorySales)}"><div class="bar-fill sales" style="width:${salesWidth}%"></div></div><div class="bar-track" title="Profit ${fmtCompactINR(categoryProfit)}"><div class="bar-fill profit" style="width:${profitWidth}%"></div></div></div><span class="category-details"><span><i class="legend-dot sales-dot"></i>${fmtCompactINR(categorySales)}</span><span><i class="legend-dot profit-dot"></i>${fmtCompactINR(categoryProfit)}</span><small>${fmtNumber(units * category.units)} units</small></span></div>`;
  }).join("");
}

function renderProducts(sales) {
  const maxShare = products[0].share;
  document.getElementById("products-chart").innerHTML = products.map((product, index) =>
    `<div class="product-row"><span class="product-rank">${String(index + 1).padStart(2, "0")}</span><span class="product-name" title="${product.name}">${product.name}</span><div class="product-track"><span style="width:${(product.share / maxShare) * 100}%"></span></div><span class="product-value">${fmtCompactINR(sales * product.share)}</span></div>`
  ).join("");
}

function renderLoss(sales, orders) {
  const returned = orders * orderRates.returned;
  const cancelled = orders * orderRates.cancelled;
  document.getElementById("return-rate").textContent = `${(orderRates.returned * 100).toFixed(1)}%`;
  document.getElementById("cancel-rate").textContent = `${(orderRates.cancelled * 100).toFixed(1)}%`;
  document.getElementById("return-orders").textContent = `${fmtNumber(returned)} orders`;
  document.getElementById("cancel-orders").textContent = `${fmtNumber(cancelled)} orders`;
  const max = Math.max(...categories.map((category) => category.returned));
  document.getElementById("loss-chart").innerHTML = categories.map((category) =>
    `<div class="loss-row"><span class="loss-category">${category.name}</span><div class="loss-bars"><i class="returns" style="width:${(category.returned / max) * 100}%"></i><i class="cancellations" style="width:${(category.cancelled / max) * 100}%"></i></div><span class="loss-values">${fmtNumber(returned * category.returned)} / ${fmtNumber(cancelled * category.cancelled)}</span></div>`
  ).join("");
}

function renderChannels(targetId, rows, sales, profit) {
  const salesMax = Math.max(...rows.map((row) => row.share));
  document.getElementById(targetId).innerHTML = `<div class="channel-head"><span></span><span></span><span>SALES</span><span>PROFIT</span></div>${rows.map((row) => {
    const rowSales = sales * row.share;
    const rowProfit = profit * row.profitShare;
    return `<div class="channel-row"><span class="channel-name">${row.name}</span><div class="channel-bars"><i class="sales" style="width:${(row.share / salesMax) * 100}%" title="Sales ${fmtCompactINR(rowSales)}"></i><i class="profit" style="width:${Math.min((rowProfit / (profit * salesMax)) * 100, 100)}%" title="Profit ${fmtCompactINR(rowProfit)}"></i></div><span class="channel-value">${fmtCompactINR(rowSales)}</span><span class="channel-value">${fmtCompactINR(rowProfit)}</span></div>`;
  }).join("")}`;
}

function renderStates(sales, profit, orders) {
  document.getElementById("states-table").innerHTML = states.map((state, index) =>
    `<tr><td><span class="state-rank">${index + 1}</span>${state.name}</td><td>${fmtCompactINR(sales * state.share)}</td><td>${fmtCompactINR(profit * state.profitShare)}</td><td>${fmtNumber(orders * state.orderShare)}</td></tr>`
  ).join("");
}

function renderDashboard(monthCount) {
  const data = monthlyData.slice(-monthCount);
  const sales = sum(data, "sales");
  const profit = sum(data, "profit");
  const orders = sum(data, "orders");
  const units = sum(data, "units");
  const margin = (profit / sales) * 100;

  document.getElementById("kpi-sales").textContent = fmtCompactINR(sales);
  document.getElementById("kpi-profit").textContent = fmtCompactINR(profit);
  document.getElementById("kpi-orders").textContent = fmtNumber(orders);
  document.getElementById("kpi-units").textContent = fmtNumber(units);
  document.getElementById("kpi-aov").textContent = fmtINR(sales / orders);
  document.getElementById("kpi-margin").textContent = `${margin.toFixed(1)}%`;
  document.getElementById("trend-chart").innerHTML = lineChart(data);

  renderStatus(orders);
  renderCategories(sales, profit, units);
  renderProducts(sales);
  renderLoss(sales, orders);
  renderChannels("payment-chart", payments, sales, profit);
  renderChannels("fulfilment-chart", fulfilment, sales, profit);
  renderStates(sales, profit, orders);
}

document.getElementById("period-select").addEventListener("change", (event) => {
  renderDashboard(Number(event.target.value));
});

renderDashboard(12);
