import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormArray  } from '@angular/forms';
import { DeliveryService } from '../delivery.service';
import {preventDefault} from '../shared/selectStore';
import {checkNum} from '../shared/checkNumber';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  get name () {
    return this.customerForm.get('name');
  }

  get id () {
    return this.customerForm.get('id');
  }

  get store() {
    return this.customerForm.get('store');
  }

  get date() {
    return this.customerForm.get('date');
  }

  get extraGoods() {
    return this.customerForm.get('extraGoods') as FormArray;
  }

  get deliveryItemsList() {
    return (this.customerForm.get('deliveryItems') as FormArray).controls;
  }

  deliveryList:Object[];
  totalPrice:number = 1;
  totalQty:number = 1;
  goodNum:number = 0;
  customerForm : FormGroup;
  deliveryItems: FormArray;
  stores = ['Walmart','Target', 'Kroger', "Yeezys", "Home Depot"];
  constructor(private formBuilder:FormBuilder,private deliveryService : DeliveryService) { }

  ngOnInit(): void {


   /* this.customerForm = this.formBuilder.group({
      name :['',Validators.required],
      id:['', [Validators.required, Validators.minLength(9),Validators.maxLength(9)]],
      store:['default',preventDefault],
      date:['default',[preventDefault,Validators.maxLength(10)]],
      deliveryItems:this.formBuilder.group({
        good:['',Validators.required],
        qty:['',[Validators.required,checkNum]],
        price:['',[Validators.required,checkNum]]
      }), extraGoods:this.formBuilder.array([])

    });*/
    this.customerForm = this.formBuilder.group({
      name :['',Validators.required],
      id:['', [Validators.required, Validators.minLength(9),Validators.maxLength(9)]],
      store:['default',preventDefault],
      date:['2009-29-02',[preventDefault,Validators.maxLength(10)]],
      deliveryItems: this.formBuilder.array([
        this.formBuilder.group({
          good: ['', Validators.required],
          qty: [1, [Validators.required, checkNum]],
          price: [1, [Validators.required, checkNum]]
        }),
      ])

    });

    /*let dev = (this.customerForm.get('deliveryItems') as FormArray).controls[0];
    console.log("hello");
    console.log(dev.get('good'));
    console.log("after");*/


    this.deliveryService.currentMessage
    .subscribe(message => this.deliveryList = message);

  }

  addDelivery() {
    var objectValue:Object = this.customerForm.value;
    objectValue["totalQty"] = this.totalQty;
    objectValue["totalPrice"] = this.totalPrice;
    this.deliveryList.push(objectValue);
    this.deliveryService.addMessage(this.deliveryList);
    this.resetForm();
    this.totalQty = 1;
    this.totalPrice = 1;
  } //adds user input to list of orders and updates list in service

  resetForm() {
    let deliveryArray = this.customerForm.controls.deliveryItems as FormArray;
    let x = deliveryArray.length;
    for(; x > 0;x--) {
      deliveryArray.removeAt(x);
    }
    this.customerForm.setValue({
      name : "",
      id:"",
      store:"",
      date:"",
      deliveryItems: [
        {
         good:"",
         qty:1,
         price:1
        }
      ]
        
      
    });
  } //resets all the info of the form

  addGoods() {
    let deliveryArray = this.customerForm.controls.deliveryItems as FormArray;
    let arraylen = deliveryArray.length;
    let newDeliveryGroup: FormGroup = this.formBuilder.group({
      good:['',Validators.required],
      qty:[1,[Validators.required,checkNum]],
      price:[1,[Validators.required,checkNum]]
    });
    this.totalQty += 1;
    this.totalPrice += 1;
    deliveryArray.insert(arraylen,newDeliveryGroup);
    //create a new form group and insert it to deliveryArray
    
  } //adds input textboxes for goods, qty, and price

  removeAr(pos :number ) {

  }

  changePrice(e) {
    
   // console.log(e);

  }

  changeQty(e) {
    //console.log(e);
  }

  changedValue() {
      let lastPrice = this.totalPrice;
      let x = 0;
      let y = 0;
      let price = 0;
      let qty  = 0;
      let totalDeliveryPrice = 0;
      this.totalPrice = 0;
      this.totalQty = 0;
      this.deliveryItems =  (this.customerForm.get('deliveryItems') as FormArray);
      //console.log(this.deliveryItems.at(0).get('price').value);
    

      for(; x < this.deliveryItems.length;x++ ) {
        price = this.deliveryItems.at(x).get('price').value;
        qty = this.deliveryItems.at(x).get('qty').value;
        totalDeliveryPrice = Number((price * qty).toFixed(2));
        this.totalPrice += totalDeliveryPrice;
        this.totalQty += qty;
      } //calcultes total price and qty of goods
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
  }

  loadRandom() {
    this.resetForm();
    let shippmentObj = this.deliveryService.getRandomData();
    let x = 1;
    //console.log(shippmentObj);
    for(;x < shippmentObj["deliveryItems"].length;x++) {
      this.addGoods();
    }

    this.customerForm.setValue({
      name : shippmentObj["name"],
      id:shippmentObj["id"],
      store:shippmentObj["store"],
      date:shippmentObj["date"],
      deliveryItems: shippmentObj["deliveryItems"]
    });
    this.changedValue();

    
  } //loads random data to the form


  

}
