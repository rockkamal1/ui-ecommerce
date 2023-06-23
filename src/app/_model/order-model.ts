import { Product } from "./product.model"

export interface MyOrdersDetails{
    orderId: number,
    orderFullName:string,
    orderFullAddress:string,
    orderContactNumber:string,
    orderStatus: string,
    orderAmount:number,
    orderAlternateContactNumber:string
    product: Product[],
    user: any
}