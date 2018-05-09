import axios from "axios";
import { GetAllCategories } from "../assets/constants/apiUrl";

function getAllCategories() {
  return axios
    .get(GetAllCategories)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response;
    });
}

const SearchService = {
  getAllCategories
};
export default SearchService;
