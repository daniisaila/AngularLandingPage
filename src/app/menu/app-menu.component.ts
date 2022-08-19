import { Component, ViewEncapsulation, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {
    trigger,
    style,
    state,
    animate,
    transition
  } from '@angular/animations';

  // -- animation triggers --
    const rotate = trigger('rotatedState', [
    state('default', style({ transform: 'rotate(0)' })),
    state('rotated', style({ transform: 'rotate(-360deg)' })),
    transition('rotated => default', animate('0.4s ease-out')),
    transition('default => rotated', animate('0.4s ease-in'))
  ])

  const fadeInOut = trigger('fadeInOut', [
    state(
      'in',
      style({
        opacity: 1,
      })
    ),
    transition('void => *', [style({ opacity: 0 }), animate('0.5s ease-out')]),
    transition('* => void', [animate('0.1s ease-out'), style({ opacity: 0 })]),
  ]);

@Component({
    selector     : 'app-menu',
    templateUrl  : './app-menu.component.html',
    animations: [fadeInOut,rotate],
    encapsulation: ViewEncapsulation.None
})
export class AppMenu implements OnInit{

    pageTabs:string[] = ["Releases Notes","To be continued.."];
    currentTab:string = this.pageTabs[0];

    // -- animation controls --
    isShown:boolean = true;
    sidenavShow:boolean = true;
    rotateState: string = 'default';
    // -- animation controls --

    constructor()
    {
    }

    drawerToggle():void
    {
        this.sidenavShow = !this.sidenavShow;
        this.rotate();
    }

    public selectTab(index:number):void
    {
        this.currentTab = this.pageTabs[index];
    }


    async ngOnInit(): Promise<void>{
	  }


    // -- animation methods --
    rotate():void {
        this.rotateState = (this.rotateState === 'default' ? 'rotated' : 'default');
    }

    fadeInOut(): void {
        this.isShown = !this.isShown;
    }


    onAnimationDone(event: any):void {
        console.log('onAnimationDone', event);
        if(this.isShown == false)
        {
            this.isShown = true;
        }
    }
     // -- animation methods --

}