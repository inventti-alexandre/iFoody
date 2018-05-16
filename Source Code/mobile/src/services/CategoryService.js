import axios from "axios";
import { GetAllCategories } from "../assets/constants/apiUrl";

function GetCategories() {
  return axios
    .get(GetAllCategories)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response;
    });
}

const CategoryService = {
  GetCategories
};
export default CategoryService;
