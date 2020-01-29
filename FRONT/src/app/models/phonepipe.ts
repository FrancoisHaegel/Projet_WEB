import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phone'
})

export class PhonePipe implements PipeTransform
{
  transform(phoneNumber: string, country?: string): string {
    let res = phoneNumber.substr(1);
    switch(country){
      case"France":
        res = "+33 " + res;
        break;
      case"Germany":
        res = "+49 " + res;
        break;
      case"Spain":
        res = "+34 " + res;
        break;
      case"Russia":
        res = "+7 " + res;
        break;
      case"Italy":
        res = "+39 " + res;
        break;
      case"Belgium":
        res = "+32 " + res;
        break;
    }
    return res;
  }
}

