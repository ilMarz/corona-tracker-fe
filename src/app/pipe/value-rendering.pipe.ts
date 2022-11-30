import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valueRendering'
})
export class ValueRenderingPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    const milion = 10000000;
    const thousand = 1000;

    if(value >= milion) {
      return (value/milion).toFixed(2) + "M";
    }

    if(value >= thousand) {
      return (value/thousand).toFixed(2) + "K";
    }

    return value+"";
  }

}
