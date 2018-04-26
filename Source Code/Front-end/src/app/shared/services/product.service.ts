import { Observable } from "rxjs/Rx";
import { IUploadProduct } from "./../models/allModel";
import { element } from "protractor";
import * as apiUrl from "./../../constant/apiUrl";
import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import { tryCatch } from "rxjs/util/tryCatch";
import { CategoryService } from "./category.service";
import { AuthService } from "./auth.service";

@Injectable()
export class ProductService {
  private actionUrl: string;
  private getProductWithCategoryUrl: string;
  authToken: any;

  constructor(private _http: Http, private _authService: AuthService) {
    this.actionUrl = apiUrl.GetAllProduct;
    this.getProductWithCategoryUrl = apiUrl.ProductCategory;
    this.authToken = this._authService.retriveToken();
  }
  private handleError(error: Response) {
    console.log("handleError works.");
    // console.error(error);
    return Observable.throw(error.json().error || "Server error");
  }

  public GetAll = (): Observable<any> => {
    let listProduct = [];
    return this._http
      .get(this.actionUrl)
      .map((response: Response) => <any>response.json())
      .do(x => {
        listProduct.push(x);
      });
  };

  public GetProductByCategoryId = (categoryId): Observable<any> => {
    let listProduct = [];
    console.log("GetProductByCategoryId similar");
    if (categoryId != null) {
      return this._http
        .get(
          this.actionUrl + "/?categoryId=" + categoryId.replace(/['"]+/g, "")
        )
        .map((response: Response) => <any>response.json())
        .do(x => {
          listProduct.push(x);
        });
    }
  };

  public PagingAllProducts = (page, count?): Observable<any> => {
    let listProduct = [];
    let url;
    if (count) {
      url = this.actionUrl + "/?page=" + page + "&count=" + count;
    } else {
      url = this.actionUrl + "/?page=" + page + "&count";
    }
    return this._http
      .get(url)
      .map((response: Response) => <any>response.json())
      .do(x => {
        listProduct.push(x);
      });
  };

  public PagingAllProductsByCategory = (
    categoryId,
    page,
    count?
  ): Observable<any> => {
    let listProduct = [];
    let url;
    if (count) {
      url =
        this.actionUrl +
        "/?categoryId=" +
        categoryId +
        "&page=" +
        page +
        "&count=" +
        count;
    } else {
      url =
        this.actionUrl +
        "/?categoryId=" +
        categoryId +
        "&page=" +
        page +
        "&count";
    }
    return this._http
      .get(url)
      .map((response: Response) => <any>response.json())
      .do(x => {
        listProduct.push(x);
      });
  };

  // POST - Product updload
  // Tuan modified
  addNewProduct = (product): Observable<any> => {
    let body = JSON.stringify(product);
    let headers = new Headers({ "Content-Type": "application/json" });
    headers.append("Token", this.authToken);
    let options = new RequestOptions({ headers: headers });

    console.log("product in service", product);
    return this._http
      .post(this.actionUrl, body, options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  };
  // public GetProductByCategory=(categoryName, products, result): Observable<any> => {
  //   console.log('GetProductByCategory works');
  //   if(products != null) {
  //     let temp = products.filter(i => i.category.name === categoryName);
  //     if(temp.length!==0){
  //       result.categoryName = categoryName;
  //       result.products = temp;
  //     }
  //     return result;
  //   }
  // }

  // Tuan made
  // public GetProductByCategoryId(id: string): Observable<any> {
  //   console.log('GetProductByCategoryId works');
  //   console.log(id);
  //   if(id != null) {
  //     return this._http.get(this.getProductWithCategoryUrl + '/' + id.replace(/['"]+/g, ''))
  //           .map((response: Response) => <any>response.json());
  //         }
  // }

  // Tuan made
  public GetProductById(id: string): Observable<any> {
    // console.log('getProductById works');
    // console.log(id);
    if (id != null) {
      return this._http
        .get(this.actionUrl + "/" + id.replace(/['"]+/g, ""))
        .map((response: Response) => <any>response.json());
    }
  }

  // Tuan made
  public GetReviewListByProductId(id: string): Observable<any> {
    console.log("getReviewListByProductId works");
    console.log("productId", id);
    if (id != null) {
      return this._http
        .get(apiUrl.ProductReview + "/" + id.replace(/['"]+/g, ""))
        .map((response: Response) => <any>response.json());
    }
  }

  // Tuan made
  // Update Product in StoreDetailComponent
  updateProduct(id: string, model: any): Observable<any> {
    console.log("updateProduct in service works");
    console.log("model", model);

    let body = JSON.stringify(model);
    let headers = new Headers();
    headers.append("Token", this.authToken);
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers });

    return this._http
      .put(apiUrl.Product + "/" + id.replace(/['"]+/g, ""), body, options)
      .catch(this.handleError);
  }

  // Tuan made
  // Delete Product in StoreDetailComponent
  deleteProduct(id: string): Observable<any> {
    console.log("delete product in productservice works");
    console.log("id", id);
    let headers = new Headers();
    headers.append("Token", this.authToken);
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers });

    return this._http
      .delete(apiUrl.Product + "/" + id.replace(/['"]+/g, ""), options)
      .catch(this.handleError);
  }
  getSimilarProducts = (productId, page, count?): Observable<any> => {
    let url;
    if (count) {
      url =
        this.actionUrl +
        "/?productId=" +
        productId +
        "&page=" +
        page +
        "&count=" +
        count;
    } else {
      url =
        this.actionUrl +
        "/?productId=" +
        productId +
        "&page=" +
        page +
        "&count";
    }
   return this._http
      .get(url)
      .map((response: Response) => <any>response.json())
      .catch((erro: any) => {
        return Observable.of(erro);
      })
  };
}
