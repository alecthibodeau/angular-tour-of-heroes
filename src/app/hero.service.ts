import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// The HeroService could get hero data from anywhere—
// a web service, local storage, or a mock data source.
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

import { MessageService } from './message.service';

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

  // getHeroes(): Hero[] {
  //   return HEROES;
  // }

  // of(HEROES) returns an Observable<Hero[]>
  // that emits *a single value*, the array of mock heroes.
  // getHeroes(): Observable<Hero[]> {
  //   return of(HEROES);
  // }

  // Modify the getHeroes method
  // to send a message when the heroes are fetched.
  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  // Like getHeroes(), getHero() has an asynchronous signature.
  // It returns a *mock hero* as an Observable, using the RxJS of() function.
  // You'll be able to re-implement getHero() as a real Http request
  // without having to change the HeroDetailComponent that calls it.
  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  // Modify the constructor with a parameter that declares
  // a private messageService property.
  // Angular will inject the singleton MessageService into that property
  // when it creates the HeroService.

  // This is a typical "service-in-service" scenario:
  // you inject the MessageService into the HeroService
  // which is injected into the HeroesComponent.
  constructor(private messageService: MessageService) { }
}
