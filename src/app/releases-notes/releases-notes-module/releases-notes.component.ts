import { Component, ViewEncapsulation, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ReleasesConvertorService } from '../version-notes-service/releases-convertor.service'
import { Release, ReleaseDisplay, PerspectiveComments } from '../version-notes-service/version.types';


@Component({
    selector     : 'releases-notes',
    templateUrl  : './releases-notes.component.html',
    providers: [ReleasesConvertorService],
    encapsulation: ViewEncapsulation.None
})
export class ReleasesNotesComponent implements OnInit{

  selectedVersionDisplay!:ReleaseDisplay;
  selectedPerspective!:PerspectiveComments;
  releasesDisplay!: ReleaseDisplay[];

  constructor(private versionConverterService:ReleasesConvertorService){
    this.versionConverterService.getVersionNotesData(); 
  }  


  async ngOnInit(): Promise<void>{

    await this.versionConverterService.VersionsSubject$.subscribe(async (message) => {
        this.releasesDisplay = message;
        this.selectedVersionDisplay = this.releasesDisplay[0];
        this.selectedPerspective = this.releasesDisplay[0].perspectivesComments[0];
    });

}

  public selectPerspective(index:number):void
  {
      this.selectedPerspective = this.selectedVersionDisplay.perspectivesComments[index];
  }

  public selectVersion():void
  {
      this.selectedPerspective = this.selectedVersionDisplay.perspectivesComments[0];
  }

}
