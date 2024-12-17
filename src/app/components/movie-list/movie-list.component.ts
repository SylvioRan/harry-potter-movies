import { Component, inject, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Movie } from '../../models/movie.interface';
import { CommonModule } from '@angular/common';
import { DurationPipe } from '../../pipes/duration.pipe';
import { FilterBarComponent } from '../filter-bar/filter-bar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, DurationPipe, FilterBarComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent implements OnInit {
  private readonly _router: Router = inject(Router);
  private readonly _movieService: MoviesService = inject(MoviesService);

  // Déclaration des filtres dans des behavior subjects, afin de prendre facilement les nouvelles valeurs
  private titleFilter$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  private releaseYearFilter$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  // Récupération de tous les films
  protected allMovies$: Observable<Movie[]> = this._movieService.getMovies();
  // Permet d'afficher les films de façon filtré
  protected filteredMovies$!: Observable<Movie[]>;

  public ngOnInit(): void {
    // On utilise combine latest, afin d'avoir constament les dernières valeurs de chaque observable
    // C'est surtout utile pour les deux filtres
    this.filteredMovies$ = combineLatest([
      this.allMovies$,
      this.titleFilter$,
      this.releaseYearFilter$,
    ]).pipe(
      map(([movies, titleFilter, yearFilter]) => {
        return movies.filter((movie) => {
          // Récupération de l'année du film
          const movieYearAsDate: Date = new Date(movie.release_date);
          const movieYear: string = movieYearAsDate.getFullYear().toString();

          // On regarde si le titre contient au moins un passage avec la donnée dans le filtre.
          // Il est important de tout lowerCase ou toUpperCase pour mieux filtrer sur les mots
          const onTitleFilter: boolean = movie.title
            .toLowerCase()
            .includes(titleFilter.toLocaleLowerCase());
          // Il est important de mettre le filtre à true, si aucune année n'est renseignée
          const onYearFilter: boolean = yearFilter
            ? movieYear.includes(yearFilter)
            : true;

          return onTitleFilter && onYearFilter;
        });
      })
    );
  }

  /** Mise à jour des filtres */
  protected updateTitleFilter(title: string): void {
    this.titleFilter$.next(title);
  }

  protected updateReleaseYearFilter(yearFilter: string): void {
    this.releaseYearFilter$.next(yearFilter);
  }

  /**
   * Permet d'afficher les détails sur le film
   * @param movieId l'id du film
   */
  protected showDetails(movieId: string): void {
    this._router.navigate(['/movies', movieId]);
  }
}
