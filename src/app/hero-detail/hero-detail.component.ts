import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailComponent implements OnInit {
  // hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // this.getHero();
  }

  getHero(): Observable<any> {
    console.log("get herro is called.")
    const id = +this.route.snapshot.paramMap.get('id');
    return this.heroService.getHero(id)
      // .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

 save(hero): void {
    this.heroService.updateHero(hero)
      .subscribe(() => this.goBack());
  }
}
