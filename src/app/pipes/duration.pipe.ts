import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {

  transform(value: string): string {
    const totalMinutes: number = parseInt(value);
    const heures: number = Math.floor(totalMinutes / 60); // On récupère les heures
    const minutes = totalMinutes % 60; // On récupère le reste des minutes

    let formattedDuration: string = '';
    if (totalMinutes > 0) {
      // Si on a plus de 60 minutes, on affiche les heures
      if (heures > 0) {
        formattedDuration += `${heures}h `;
      }
      formattedDuration += `${minutes}min`;
    }
    
    return formattedDuration;
  }

}
