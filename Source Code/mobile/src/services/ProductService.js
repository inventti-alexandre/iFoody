import axios from "axios";
import { GetAllProduct } from "../assets/constants/apiUrl";
const actionUrl = GetAllProduct;

function PagingAllProductsByCategory(
  categoryId,
  page,
  count
){
  // debugger
  let url;
  if (count!==undefined) {
    url =
      actionUrl +
      "/?categoryId=" +
      categoryId +
      "&page=" +
      page +
      "&count=" +
      count;
  } else {
    url =
      actionUrl +
      "/?categoryId=" +
      categoryId +
      "&page=" +
      page +
      "&count";
  }
  return axios
  .get(url)
  .then(response => {
    return response.data;
  })
  .catch(err => {
    return err.response;
  });
};

const ProductService = {
  PagingAllProductsByCategory
};
export default ProductService;
