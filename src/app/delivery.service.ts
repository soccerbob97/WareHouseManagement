import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { IDelivery } from './deliery';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  url:string = "/assets/data/delivery.json";
  deliveryList = [{"name":"Samantha", "id":"912183475","store":"Walmart","date":"2020-02-23","deliveryItems" : [{"good":"flower pots","qty":10, "price":4.99}], 
  "totalQty" : 10, "totalPrice" : 49.90 }];
  private sharedData = new BehaviorSubject<Object[]>(this.deliveryList);
  currentMessage = this.sharedData.asObservable(); 
  //create a Behavior Subject reference to deliveryList and create a reference of the BehaviorSubject as an Observable 
  // the classes that need the list will subscribe to current message

  constructor(private httpClient :HttpClient) { }

  addMessage(deliverys:Object[]) {
    this.sharedData.next(deliverys);
  } //updates the deliveryList with the new list which has one element added


  removeElement(removedDelivery:Object[]) {
    this.sharedData.next(removedDelivery);
  } //updates the deliveryList with the new list which has one element removed

  getRandomData() : Object {
    let probNum = Math.floor(Math.random()*5);
    let deliveryObj : Object = {"name":"Samantha", "id":"912183475","store":"Walmart","date":"2020-02-23","deliveryItems" : [{"good":"flower pots","qty":10, "price":4.99}]};
    console.log("prob num name " + probNum);
    //console.log(deliveryObj);
    //console.log("in begin");
    switch(probNum) {
      case 0:
        deliveryObj["name"] = "Todd";
        break;
      case 1:
        deliveryObj["name"] = "Kimmy";
        break;
      case 2:
        deliveryObj["name"] = "Lindsay";
        break;
      case 3:
        deliveryObj["name"] = "Kimmy";
        break;
      case 4:
        deliveryObj["name"] = "Frank";
        break;
    } //random name
    //console.log(deliveryObj);
    //console.log("after name");
    let id = "";
    let x = 0;
    for(; x < 9;x++) {
      id += Math.floor( Math.random()*9) + "";
      //console.log(" id " + id);
    } //random id
    deliveryObj["id"] = id;

    //console.log(deliveryObj);
    //console.log("after id");

    probNum = Math.floor(Math.random()*5);
    console.log("prob num store" + probNum);
    switch(probNum) {
      case 0:
        deliveryObj["store"] = "Walmart";
        break;
      case 1:
        deliveryObj["store"] = "Target";
        break;
      case 2:
        deliveryObj["store"] = "Home Depot";
        break;
      case 3:
        deliveryObj["store"] = "Yeezys";
        break;
      case 4:
        deliveryObj["store"] = "Kroger";
        break;
    } //random store

   // console.log(deliveryObj);
    //console.log("after store");

    let year :string = ( Math.floor(Math.random()*20) + 2000) + "";
    let month:string = (Math.floor(Math.random()*12) + 1) + "";
    let day:string = (Math.floor(Math.random()*30) + 1) + "";
    if(month.length == 1) {
      month = "0" + month;
    }
    if(day.length == 1) {
      day = "0" + day;
    }
    let date = year + "-" + month + "-" + day;
    deliveryObj["date"] = date;
    //random date

    //console.log(deliveryObj);
    //console.log("in date");
    probNum = Math.floor(Math.random()*5);
    console.log("prob num deliveryItems" + probNum);
    switch(probNum) {
      case 0:
        deliveryObj["deliveryItems"] = [
        {"good":"flower pots","qty":10, "price":4.99}, 
        {"good":"seed packs","qty":15, "price":2.99},
        {"good":"showels","qty":10, "price":7.99}
        ];
        break;
      case 1:
        deliveryObj["deliveryItems"] = [
          {"good":"sleeping matress","qty":5, "price":80}, 
          {"good":"blankets","qty":7, "price":19.99},
        ];
        break;
      case 2:
        deliveryObj["deliveryItems"] = [
          {"good":"table","qty":8, "price":49.99}, 
          ];
        break;
      case 3:
        deliveryObj["deliveryItems"] = [
          {"good":"laptops","qty":40, "price":199.99}, 
          {"good":"computer mouse","qty":200, "price":10.99},
          {"good":"keyboards","qty":50, "price":20.99},
          {"good":"gaming chair","qty":20, "price":100}
          ];
        break;
      case 4:
        deliveryObj["deliveryItems"] = [
          {"good":"packs of pens","qty":20, "price":5.99}, 
          {"good":"packs of pencils","qty":10, "price":2.99},
        ];
        break;
    } //random goods
    return deliveryObj;




  }










}
