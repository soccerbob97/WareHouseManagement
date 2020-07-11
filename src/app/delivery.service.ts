import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { IDelivery } from './deliery';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  url:string = "/assets/data/delivery.json";
  deliveryList = [{"name":"Samantha", "id":"912183475","store":"Walmart","date":"2020/02/23","deliveryItems" : {"good":"flower pots","qty":10, "price":4.99} }];
  private sharedData = new BehaviorSubject<Object[]>(this.deliveryList);
  currentMessage = this.sharedData.asObservable(); 

  constructor(private httpClient :HttpClient) { }

  changeMessage(deliverys:Object[]) {
    this.sharedData.next(deliverys);
  }









}
