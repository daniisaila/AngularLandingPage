import { Component, ViewEncapsulation, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ReleaseConvertorService } from './version-list-convertor/releases-convertor.service'
import { Version, VersionDisplay, PerspectiveComments } from './version-list-convertor/version.types';
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
    selector     : 'version-list',
    templateUrl  : './version-list.component.html',
    providers: [ReleaseConvertorService],
    animations: [fadeInOut,rotate],
    encapsulation: ViewEncapsulation.None
})
export class VersionListComponent implements OnInit, AfterViewInit{

    releaseVersions!: Version[];
    selectedVersionDisplay!:VersionDisplay;
    selectedPerspective!:PerspectiveComments;
    releasesDisplay!: VersionDisplay[];

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
            this.releasesDisplay = message;
            this.selectedVersionDisplay = this.releasesDisplay[0];
            this.selectedPerspective = this.releasesDisplay[0].perspectivesComments[0];
        });

	}

    public selectVersion(index:number)
    {
        this.selectedVersionDisplay = this.releasesDisplay[index];
        this.isShown = !this.isShown;
        this.selectedPerspective = this.selectedVersionDisplay.perspectivesComments[0];
        console.log(this.selectedVersionDisplay);
    }

    public selectPerspective(index:number)
    {
        this.selectedPerspective = this.selectedVersionDisplay.perspectivesComments[index];
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