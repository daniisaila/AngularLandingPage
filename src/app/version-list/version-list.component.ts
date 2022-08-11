import { Component, ViewEncapsulation, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ReleaseConvertorService } from './version-list-convertor/releases-convertor.service'
import { Version } from './version-list-convertor/version.types';
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
  // -- animation triggers --

@Component({
    selector     : 'version-list',
    templateUrl  : './version-list.component.html',
    providers: [ReleaseConvertorService],
    animations: [fadeInOut,rotate],
    encapsulation: ViewEncapsulation.None
})
export class VersionListComponent implements OnInit, AfterViewInit{

    releaseVersions!: Version[];
    selectedVersion!:Version;

    // -- animation controls --
    isShown:boolean = true;
    sidenavShow:boolean = true;
    rotateState: string = 'default';
    // -- animation controls --

    constructor(private versionConverterService:ReleaseConvertorService)
    {
        this.versionConverterService.getData();
        
    }

    drawerToggle()
    {
        this.sidenavShow = !this.sidenavShow;
        this.rotate();
    }

    ngAfterViewInit(): void {
        console.log(this.releaseVersions);
    }

    async ngOnInit(): Promise<void>{

        this.versionConverterService.VersionsSubject$.subscribe(async (message) => {
            this.releaseVersions = message;
            this.selectedVersion = this.releaseVersions[0];
        });

	}

    public selectVersion(index:number)
    {
        this.selectedVersion = this.releaseVersions[index];
        this.isShown = !this.isShown;
        console.log(this.selectedVersion);
    }


    // -- animation methods --
    rotate() {
        this.rotateState = (this.rotateState === 'default' ? 'rotated' : 'default');
    }

    fadeInOut(): void {
        this.isShown = !this.isShown;
    }


    onAnimationDone(event: any) {
        console.log('onAnimationDone', event);
        if(this.isShown == false)
        {
            this.isShown = true;
        }
    }

     // -- animation methods --

}