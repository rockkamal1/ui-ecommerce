import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { ImageProcessingService } from '../image-processing.service';
import { Product } from '../_model/product.model';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  productDetails: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
   
  }


 

  generaepdf(myreject:string){
   

    return this.productService.getreject(myreject).subscribe((resp)=>{

      // let value = JSON.stringify(resp)
          console.log(resp);
     
      
         
    })
    
  }


  // getProductName(myProductName: string){
  //   return this.productService.getProductName(myProductName).subscribe((response)=>{
  //     console.log(response);
      
  //   })
  // }

}
