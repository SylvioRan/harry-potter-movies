import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private _httpClient: HttpClient = inject(HttpClient);

  private readonly _movieApiUrl: string = '/movies';

  public getMovies(): Observable<Movie[]> {
    return this._httpClient.get<Movie[]>(this._movieApiUrl);
  }
}
