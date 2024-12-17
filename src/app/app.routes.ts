import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';

export const routes: Routes = [
    { path: 'movies', component: MovieListComponent }, // Show movie list
    { path: 'movies/:movieId', component: MovieDetailComponent }, // Show movie details
    { path: '', redirectTo: 'movies', pathMatch: 'full' } // Redirect to movie list by default
];
