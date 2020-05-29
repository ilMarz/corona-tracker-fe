import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'infoPipe'
})
export class InfoPipePipe implements PipeTransform {

  transform(value: any, ...args: any[]): unknown {
    console.log("args 0 ", args[0])
    if (args[0]) {
      const orderType = args[0];
      if (orderType === 'az'){
        return value.sort((a, b) => a.countryCode.localeCompare(b.countryCode));
      }
      if (orderType === 'case'){
        return value.sort((a, b) => a.cases > b.cases ? -1 : 1);
      }
      if (orderType === 'death'){
        return value.sort((a, b) => a.deaths > b.deaths ? -1 : 1);
      }
    }
    return value;
  }

}
