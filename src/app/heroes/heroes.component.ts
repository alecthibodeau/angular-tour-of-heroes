import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes';

// Delete the HEROES import, because you won't need that anymore.
// Import the HeroService instead.
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  selectedHero: Hero;

  // heroes = HEROES;

  // Replace the definition of the heroes property
  // with a simple declaration.
  heroes: Hero[];

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  // Add a private heroService parameter
  // of type HeroService to the constructor.

  // The parameter simultaneously defines a private heroService property
  // and identifies it as a HeroService injection site.
  constructor(private heroService: HeroService) { }

  // Create a function to retrieve the heroes from the service.
  getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
  }

  // While you could call getHeroes() in the constructor,
  // that's not the best practice.

  // Reserve the constructor for simple initialization
  // such as wiring constructor parameters to properties.
  // The constructor shouldn't do anything.
  // It certainly shouldn't call a function that makes
  // HTTP requests to a remote server as a real data service would.

  // Instead, call getHeroes() inside the ngOnInit lifecycle hook
  // and let Angular call ngOnInit at an appropriate time
  // after constructing a HeroesComponent instance.
  ngOnInit() {
    this.getHeroes();
  }

}
