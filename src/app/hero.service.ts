import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// The HeroService could get hero data from anywhere—
// a web service, local storage, or a mock data source.
import { Hero } from './hero';
// import { HEROES } from './mock-heroes';

import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Import the catchError symbol from rxjs/operators,
// along with some other operators you'll need later.
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

// The @Injectable() decorator accepts a metadata object for the service,
// the same way the @Component() decorator did for your component classes.
@Injectable({

// When you provide the service at the root level,
// Angular creates a single, shared instance of HeroService
// and injects into any class that asks for it.
// Registering the provider in the @Injectable metadata also
// allows Angular to optimize an app by removing the service
// if it turns out not to be used after all.
  providedIn: 'root',
})

export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  // Modify the constructor with a parameter that declares
  // a private messageService property.
  // Angular will inject the singleton MessageService into that property
  // when it creates the HeroService.

  // This is a typical "service-in-service" scenario:
  // you inject the MessageService into the HeroService
  // which is injected into the HeroesComponent.
  constructor(
    // Inject HttpClient into the constructor in a private property called http.
    private http: HttpClient,
    private messageService: MessageService) { }

  // Keep injecting the MessageService. You'll call it so frequently 
  // that you'll wrap it in a private log() method.
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /** GET heroes from the server */
  // Now extend the observable result with the .pipe() method
  // and give it a catchError() operator.
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
      );
  }

  // Like getHeroes(), getHero() has an asynchronous signature.
  // It returns a *mock hero* as an Observable, using the RxJS of() function.
  // You'll be able to re-implement getHero() as a real Http request
  // without having to change the HeroDetailComponent that calls it.
  // getHero(id: number): Observable<Hero> {
  //   // TODO: send the message _after_ fetching the hero
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(HEROES.find(hero => hero.id === id));
  // }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // The overall structure of the updateHero() method
  // is similar to that of getHeroes(), but it uses http.put()
  // to persist the changed hero on the server.
  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /* GET heroes whose name contains search term */
  // The method returns immediately with an empty array
  // if there is no search term. The rest of it closely
  // resembles getHeroes(). The only significant difference
  // is the URL, which includes a query string with the search term.
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}