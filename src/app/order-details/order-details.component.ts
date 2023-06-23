import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Product Name', 'Name', 'Address', 'Contact No.', 'Status', 'Action'];
  dataSource = [];
  status: string = 'All'

  constructor(private productService: ProductService) { }
 
  ngOnInit(): void {
    this.getAllOrdersForAdmin(this.status);
  }

  getAllOrdersForAdmin(statusParameter: string) {
    this.productService.getAllOrdersForAdmin(statusParameter).subscribe(  
      (response: any) => {
        this.dataSource = response;
        console.log(response);


      }, (err) => {
        console.log(err);

      }
    );
  }
  markAsDelivered(orderId) {
    console.log(orderId);
    this.productService.orderMarkAsDelivered(orderId).subscribe(
      (response) => {
        this.getAllOrdersForAdmin(this.status);
        console.log(response);


      }, (err) => {
        console.log(err);

      }
    )


  }



}
