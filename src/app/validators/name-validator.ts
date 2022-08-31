import { AbstractControl } from "@angular/forms";

export function validatorName(string: AbstractControl){
  const name: string = string.value as string;
  const countName: Array<string> = name.split('');
  if(countName.length < 3){
    return {short: true}
  }else{
    return null;
  }
}
