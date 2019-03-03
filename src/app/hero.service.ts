import { Injectable } from '@angular/core';

// The HeroService could get hero data from anywhere—
// a web service, local storage, or a mock data source.
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

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

  getHeroes(): Hero[] {
    return HEROES;
  }

  constructor() { }
}
