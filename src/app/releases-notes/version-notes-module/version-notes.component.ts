import { Component, ViewEncapsulation, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ReleaseConvertorService } from '../version-notes-service/releases-convertor.service'
import { Version, VersionDisplay, PerspectiveComments } from '../version-notes-service/version.types';


@Component({
    selector     : 'version-notes',
    templateUrl  : './version-notes.component.html',
    providers: [ReleaseConvertorService],
    encapsulation: ViewEncapsulation.None
})
export class VersionNotesComponent implements OnInit{

  selectedVersionDisplay!:VersionDisplay;
  selectedPerspective!:PerspectiveComments;
  releasesDisplay!: VersionDisplay[];

  constructor(private versionConverterService:ReleaseConvertorService){
    this.versionConverterService.getData(); 
  }  


  async ngOnInit(): Promise<void>{

    await this.versionConverterService.VersionsSubject$.subscribe(async (message) => {
        this.releasesDisplay = message;
        this.selectedVersionDisplay = this.releasesDisplay[0];
        this.selectedPerspective = this.releasesDisplay[0].perspectivesComments[0];
    });

}

  public selectVersion(index:number)
  {
      this.selectedVersionDisplay = this.releasesDisplay[index];
      this.selectedPerspective = this.selectedVersionDisplay.perspectivesComments[0];
      console.log(this.selectedVersionDisplay);
  }

  public selectPerspective(index:number):void
  {
      this.selectedPerspective = this.selectedVersionDisplay.perspectivesComments[index];
  }

  public viewToModelUpdate(newValue:any):void
  {
      this.selectedPerspective = this.selectedVersionDisplay.perspectivesComments[0];
  }

}
