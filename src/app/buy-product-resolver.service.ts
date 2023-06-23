import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from './_model/product.model';
import { Observable } from 'rxjs';
import { ProductService } from './_services/product.service';
import { ImageProcessingService } from './image-processing.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Product[]> {

  constructor(private productSrvice: ProductService, private imageProcessingService: ImageProcessingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]>{ 

    const id =route.paramMap.get("id");
   const isSingleProductCheckout= route.paramMap.get("isSingleProductCheckout");
   return this.productSrvice.getProductDetails(isSingleProductCheckout, id)
   .pipe(
    map(
      (x: Product[], i)=> x.map((product: Product)=> this.imageProcessingService.createImages(product))
    )
   );

  }
}
