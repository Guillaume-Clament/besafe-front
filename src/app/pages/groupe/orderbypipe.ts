import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'orderBy' })
export class OrderByPipe implements PipeTransform{
   transform(arr){
    if(arr === undefined){return null;}
    return arr.sort((a, b) => {
      if (a.dateEnvoie < b.dateEnvoie) {
        return 1;
      }
      if (a.dateEnvoie > b.dateEnvoie) {
        return -1;
      }
      return 0;
    });
  }
}