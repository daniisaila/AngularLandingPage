import { Component, ViewEncapsulation, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ReleaseConvertorService } from './version-list-convertor/releases-convertor.service'
import { Version } from './version-list-convertor/version.types';

@Component({
    selector     : 'version-list',
    templateUrl  : './version-list.component.html',
    providers: [ReleaseConvertorService],
    encapsulation: ViewEncapsulation.None
})
export class VersionListComponent implements OnInit, AfterViewInit{

    releaseVersions!: Version[];
    showFiller:boolean;

    constructor(private versionConverterService:ReleaseConvertorService)
    {
        this.showFiller = true;
        this.versionConverterService.getData();
    }

    ngAfterViewInit(): void {
        console.log(this.releaseVersions);
    }

    async ngOnInit(): Promise<void>{

        await this.versionConverterService.VersionsSubject$.subscribe(async (message) => {
            this.releaseVersions = message;
        });

	}

    


}