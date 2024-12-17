import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Observable, of, switchMap } from 'rxjs';
import { Movie } from '../../models/movie.interface';
import { CommonModule } from '@angular/common';
import { DurationPipe } from '../../pipes/duration.pipe';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, DurationPipe],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent {
  private readonly _router: Router = inject(Router);
  private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly _moviesService: MoviesService = inject(MoviesService);

  protected readonly movieDetails$: Observable<Movie | null> =
    this._activatedRoute.paramMap.pipe(
      // En récupérant l'id dans la route de l'url, on veut prendre l'objet Movie qui est en lien.
      // Grâce à switchMap, on peut réobtenir un observable derriere, en se basant sur l'observable précédent
      switchMap((params) => {
        const movieId: string | null = params.get('movieId'); // Récupération de l'id depuis l'URL

        if (movieId) {
          return this._moviesService.getMovieById(movieId);
        } else {
          return of(null);
        }
      })
    );

  /**
   * Retourne le tableau de string de producers en string
   * @param movie le film contenant la donnée des producteurs
   * @returns les producers en string
   */
  protected producersAsString(movie: Movie): string {
    return movie.producers.join(', ');
  }

  protected backToMovieList(): void {
    this._router.navigate(['/movies']);
  }
}
