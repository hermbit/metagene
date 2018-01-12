import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, query, group, stagger } from '@angular/animations';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routerTransition', [
      transition('* <=> *', [
        /* order */
        /* 1 */ query(':enter, :leave', style({ position: 'absolute', width:'100%', overflow:'hidden' })
          , { optional: true }),
          /* 2 */ query('.block', style({ opacity: 0 }), { optional: true }),
        /* 2 */ group([  // block executes in parallel
          query(':enter', [
            style({ transform: 'translateY(100px)', opacity: '0' }),
            animate('.5s ease-in-out', style({ transform: 'translateY(0px)', opacity: '1' }))
          ], { optional: true }),
          query(':leave', [
            style({ transform: 'translateY(0px)', opacity: '1' }),
            animate('.5s ease-in-out', style({ transform: 'translateY(-100px)', opacity: '0' }))
          ], { optional: true }),
          /* 4 */ query(':enter .block', stagger(100, [
      style({ transform: 'translateY(100px)' }),
      animate('1s ease-in-out', 
        style({ transform: 'translateY(0px)', opacity: 1 })),
    ]), { optional: true }),
        ])
      ]),
    ])
  ]
})
export class AppComponent {

  constructor( public router: Router ) { }
  
  ngOnInit() { 

  }


  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
  
}