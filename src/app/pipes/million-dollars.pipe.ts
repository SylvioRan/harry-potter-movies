import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'millionDollars',
  standalone: true
})
export class MillionDollarsPipe implements PipeTransform {

  transform(value: string): string {
    return `$${value} million`;
  }

}
