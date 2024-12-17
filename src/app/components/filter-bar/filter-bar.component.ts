import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.css',
})
export class FilterBarComponent {
  @Output()
  public titleFilter = new EventEmitter<string>();
  @Output()
  public releaseYearFilter = new EventEmitter<string>();

  protected onTitleChange(event: Event): void {
    // Récupération de la valeur saisie
    const value = (event.target as HTMLInputElement).value;
    this.titleFilter.emit(value);
  }

  protected onReleaseYearChange(event: Event): void {
    // Récupération de la valeur saisie
    const value: string = (event.target as HTMLInputElement).value;

    this.releaseYearFilter.emit(value);
  }
}
