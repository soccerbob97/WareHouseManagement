import { AbstractControl, ValidatorFn } from "@angular/forms";

export function preventDefault(control :AbstractControl) : {[key:string]:any}|null{
    
    const selection = /default/.test(control.value);
    return selection ? {'defaultValue' : {value : control.value}} :null;


}

/*export function preventDefault(checkName: RegExp)
: ValidatorFn {
    return (control: AbstractControl):
     { [key: string]: any } | null => {
        const selection = checkName.test(control.value);
        console.log(selection + " In prevent" + control.value + "s");
        return selection ? {'defaultValue' : {value : control.value}} :null;

    }
}*/