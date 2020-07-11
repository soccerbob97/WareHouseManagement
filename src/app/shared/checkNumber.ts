import { AbstractControl, ValidatorFn } from "@angular/forms";

export function checkNum(control :AbstractControl) : {[key:string]:any}|null{
    if(isNaN(control.value)) {
        return {'notNumber' : {value : control.value} };
    }  else if(Number(control.value) == 0) {
        return {'zeroNumber' : {value : control.value}};
    }
   // const selection = /default/.test(control.value);
    //console.log(selection + " In prevent" + control.value + "s");
    //return selection ? {'defaultValue' : {value : control.value}} :null;
    return null;

}