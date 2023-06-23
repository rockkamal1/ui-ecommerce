import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../image-processing.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {

  showTable=false;

  pageNumber: number = 0;
  showLoadButton=false;

  productDetails: Product[]= [];
  displayedColumns: string[] = ['Id', 'Product Name', 'description', 'Product Discounted Price','product Actual Price','Actions'];

  constructor(private productService: ProductService,public imagesDialog: MatDialog,
    private imageProcesingService: ImageProcessingService, private router: Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllProducts();
  }


  searchByKeyword(searchkeyword){
    console.log(searchkeyword);
    this.pageNumber=0;
    this.productDetails=[];
    this.getAllProducts(searchkeyword);

  }


  public getAllProducts(searchkeyword: string=""){
    this.showTable=false;
  this.productService.getAllProducts(this.pageNumber,searchkeyword)
   .pipe(
    map((x: Product[], i) => x.map((product: Product)=> this.imageProcesingService.createImages(product)))
   )
    .subscribe(
      (resp: Product[])=>{
        console.log(resp);
        if(resp.length==8){
          this.showLoadButton=true;
        }else{
          this.showLoadButton=false;
        }
        resp.forEach(product=>this.productDetails.push(product));
        this.showTable=true;
       // this.productDetails=resp;
        
      },(error: HttpErrorResponse) =>{
        console.log(error);
        
      }
    );

  }
  deleteProduct(productId){
    this.productService.deleteProductDetails(productId).subscribe(
      (resp)=>{
       this.getAllProducts();
       console.log(resp);
       
        
      },(error: HttpErrorResponse) =>{
        console.log(error); 
         
      }
    )
    
  }

  showImages(product: Product){
    this.imagesDialog.open(ShowProductImagesDialogComponent,{
      data: {
        images: product.productImages 
      },
      height: '500px',
      width: '800px'
    });
    console.log(product);
    
  }


  // rejectProduct(){
  //   this.dialog.open(DialogComponent);
  // }



  editProductDetails(productId: number){
    this.router.navigate(['/addNewProduct', {productId: productId}])  

  }

  loadProduct(){  
   this.pageNumber=this.pageNumber+1;
   this.getAllProducts();
  }

}
