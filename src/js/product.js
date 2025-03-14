import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productId = getParam("product");  // Obtém o ID do produto da URL
const dataSource = new ProductData("tents");  // Fonte de dados do produto

const product = new ProductDetails(productId, dataSource);
product.init();  // Inicializa a exibição do produto
