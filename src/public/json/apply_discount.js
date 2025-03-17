async function fetchTents() {
  try {
    const response = await fetch("/public/json/tents.json"); // Caminho relativo no Vite
    if (!response.ok) throw new Error("Error loading data");
    const tents = await response.json();
    return tents;
  } catch (error) {
    console.error("Error when searching for data:", error);
    return [];
  }
}

function calculateDiscountedPrice(item1, item2) {
  let total = item1.FinalPrice + item2.FinalPrice;
  let discount = total * 0.3;
  let finalPrice = total - discount;
  return finalPrice;
}

async function showDiscountOptions() {
  const tents = await fetchTents();

  if (tents.length === 0) {
    console.warn("No items found.");
    return;
  }

  for (let i = 0; i < tents.length; i++) {
    for (let j = i + 1; j < tents.length; j++) {
      let discountedPrice = calculateDiscountedPrice(tents[i], tents[j]);
      console.log(
        `Comprando "${tents[i].NameWithoutBrand}" e "${
          tents[j].NameWithoutBrand
        }" together, the final discounted price is: R$${discountedPrice.toFixed(
          2
        )}`
      );
    }
  }
}

// Executar a função
showDiscountOptions();
