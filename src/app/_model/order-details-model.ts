import { OrderQuantity } from "./order-quantity-model";

export interface OredrDetails{
     fullName: string;
     fullAddress: string;
     contactNumber: string;
    alternateContactNumber: string;
    transactionId: string;
    orderProductQuantityList: OrderQuantity[];
}