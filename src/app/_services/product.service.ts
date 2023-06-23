import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { Observable } from 'rxjs';
import { OredrDetails } from '../_model/order-details-model';
import { MyOrdersDetails } from '../_model/order-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  public addProduct(product: FormData) {
    return this.httpClient.post<Product>("http://localhost:9090/addNewProduct", product);
  }

  public getAllProducts(pageNumber, searchKeyword: string = "") {
    return this.httpClient.get<Product[]>("http://localhost:9090/getAllProducts?pageNumber=" + pageNumber + "&searchKey=" + searchKeyword);
  }

  public getProductDetailsById(productId) {
    return this.httpClient.get<Product>("http://localhost:9090/getProductDetailsById/" + productId);
  }

  public deleteProductDetails(productId: number) {

    return this.httpClient.delete("http://localhost:9090/deleteProductDetails/" + productId);

  }

  public getreject(reject: string): Observable<string> {
    return this.httpClient.get<string>("http://localhost:9090/reject")
  }



  public getProductDetails(isSingleProductCheckout, productId) {
    return this.httpClient.get<Product[]>("http://localhost:9090/getProductDetails/" + isSingleProductCheckout + "/" + productId);

  }

  public placeOrder(orderDetails: OredrDetails, isCartCheckout) {
    return this.httpClient.post("http://localhost:9090/placeOrder/" + isCartCheckout, orderDetails);

  }

  public addToCart(productId) {
    return this.httpClient.get("http://localhost:9090/addToCart/" + productId);
  }

  public getCartDetails() {
    return this.httpClient.get("http://localhost:9090/getCartDetails");
  }

  public deleteCartItem(cartId) {
    return this.httpClient.delete("http://localhost:9090/deleteCartItem/" + cartId);
  }

  public getMyOrders(): Observable<MyOrdersDetails[]> {
    return this.httpClient.get<MyOrdersDetails[]>("http://localhost:9090/getOrderDetails");
  }

  public getAllOrdersForAdmin(status: string) {
    return this.httpClient.get("http://localhost:9090/getAllOrderDetails/" + status);
  }

  public orderMarkAsDelivered(orderId) {
    return this.httpClient.get("http://localhost:9090/markOrderAsDelivered/" + orderId);
  }

  public createTransaction(amount){
    return this.httpClient.get("http://localhost:9090/createTransaction/"+amount);
  }

}

