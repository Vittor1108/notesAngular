import { AbstractControl } from '@angular/forms';

export function confirmPassword(campo: AbstractControl){
  const password = campo.parent?.get('password')?.value;
  const confirmPassword = campo.parent?.get('confirmPassword')?.value;
  if(password === confirmPassword){
    return null;
}else{
    return { validatePassword:  true};
}
}
