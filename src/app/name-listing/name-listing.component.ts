import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../delivery.service';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-name-listing',
  templateUrl: './name-listing.component.html',
  styleUrls: ['./name-listing.component.css']
})
export class NameListingComponent implements OnInit {


 

  deliveryList:Object[];
  totalInventoryPrice:number = 0 ;
  totalInventoryQty:number = 0 ;
  totalOrders:number = 0;
  
  constructor(private deliveryService:DeliveryService) { }

  ngOnInit(): void {
     this.deliveryService.currentMessage
    .subscribe(message => { this.deliveryList = message
      this.totalOrders = this.deliveryList.length;
      let x = 0;
      let y = 0;
      let price = 0;
      let qty  = 0;
      let totalDeliveryPrice = 0;
      this.totalInventoryPrice = 0;
      this.totalInventoryQty = 0;

      for(; x < this.deliveryList.length;x++) {
        this.totalInventoryPrice += this.deliveryList[x]['totalPrice'];
        this.totalInventoryQty += this.deliveryList[x]['totalQty'];
        
      } //adds all the prices and qtys froms the deliveryList json data

      /*
      for(; x < this.deliveryList.length;x++) {
        console.log(x + " total length " + this.deliveryList.length);
        console.log((this.deliveryList[x]['deliveryItems'].length));
        y = 0;
        //loops through all the delivery list which has the name, id, store and deliveryItems array


        for(;y < this.deliveryList[x]['deliveryItems'].length; y++) {
          
          price =   Number(this.deliveryList[x]['deliveryItems'][y]['price']);
          
          qty = Number(this.deliveryList[x]['deliveryItems'][y]['qty']);
          totalDeliveryPrice = Number((price * qty).toFixed(3));
          //converts price and qty to a number, multiplies them together
          //rounds the number to 2 decimcal and then converts the returned string to a Number

          console.log((" var price " + price + " var qty " + qty + " t " + (price* qty) + " tot " + totalDeliveryPrice   )  );
          this.totalPrice += totalDeliveryPrice;
          this.totalQty += qty;
        } //loops through the current delivery list's deliveryItems and this is an array that contains all the goods
      }
      */
    });
  


    
   

  }

  removeShippment(num : number) {

    this.deliveryList.splice(num,1);
    this.deliveryService.removeElement(this.deliveryList);
    //removes a delivery order from the deliveryList 
    //num is the order the user clicked the X button on.
    //Updates the service by calling remove Element

    //console.log("deliveryList remove");
    //console.log(this.deliveryList);
  }
}
