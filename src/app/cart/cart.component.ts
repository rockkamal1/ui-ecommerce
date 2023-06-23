import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Description', 'Actual Price', 'Discounted Price','Action'];

  getCardDetails: any[] = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getCardDetail();
  }

  public getCardDetail() {
    this.productService.getCartDetails().subscribe(
      (response: any) => {
        console.log(response);
        this.getCardDetails = response;


      }, (error) => {
        console.log(error);

      }
    )
  }

  checkout() {

    this.router.navigate(['/buyProduct', {
      isSingleProductCheckout: false, id: 0
    }]);
    // this.productService.getProductDetails(false,0).subscribe(
    //   (response)=>{
    //    console.log(response);

    //   },(error)=>{
    //     console.log(error);

    //   })

  }

  deleteCart(cartId){
    this.productService.deleteCartItem(cartId).subscribe(
      (response)=>{
      console.log(response);
      this.getCardDetail();
      
      },(err)=>{
      console.log(err);
      
      }
    );
    console.log(cartId);
    
  }

}
