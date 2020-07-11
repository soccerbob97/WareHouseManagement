import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators  } from '@angular/forms';
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

  get good() {
    return this.customerForm.get('deliveryItems').get('good');
  }
  get qty() {
    return this.customerForm.get('deliveryItems').get('qty');
  }
  get price() {
    return this.customerForm.get('deliveryItems').get('price');
  }

  deliveryList:Object[];
  customerForm : FormGroup;
  stores = ['Walmart','Target', 'Kroger', "Yeezys", "Home Depot"];
  constructor(private formBuilder:FormBuilder,private deliveryService : DeliveryService) { }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      name :['',Validators.required],
      id:['', [Validators.required, Validators.minLength(9),Validators.maxLength(9)]],
      store:['default',preventDefault],
      date:['default',[preventDefault,Validators.maxLength(10)]],
      deliveryItems:this.formBuilder.group({
        good:['',Validators.required],
        qty:['',[Validators.required,checkNum]],
        price:['',[Validators.required,checkNum]]
      })

    });

    this.deliveryService.currentMessage
    .subscribe(message => this.deliveryList = message);

  }

  addDelivery() {
    var objectValue:Object = this.customerForm.value;
    this.deliveryList.push(objectValue);
    this.deliveryService.changeMessage(this.deliveryList);
  }
  

}
