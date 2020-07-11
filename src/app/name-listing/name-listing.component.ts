import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../delivery.service';

@Component({
  selector: 'app-name-listing',
  templateUrl: './name-listing.component.html',
  styleUrls: ['./name-listing.component.css']
})
export class NameListingComponent implements OnInit {

  deliveryList:Object[];
  constructor(private deliveryService:DeliveryService) { }

  ngOnInit(): void {
     this.deliveryService.currentMessage
    .subscribe(message => this.deliveryList = message);

    console.log(this.deliveryList[0]);
  }

}
