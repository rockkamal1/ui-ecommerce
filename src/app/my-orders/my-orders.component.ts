import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { MyOrdersDetails } from '../_model/order-model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  displayedColumns= ['Name','Address','Contact No.','Amount','Status']
  getMyOrderDetails: MyOrdersDetails[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getMyOrdersDetails();
  }

  getMyOrdersDetails(){
    this.productService.getMyOrders().subscribe(
      (response: MyOrdersDetails[])=>{
        this.getMyOrderDetails=response;
        console.log(response);
        
      },(err)=>{
        console.log(err);
        
      }
    );

  }

}
