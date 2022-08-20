import { Injectable } from '@angular/core';
import releases from 'src/assets/releases.json'
import { Release, ReleaseDisplay, PerspectiveComments } from './version.types';
import { HttpClient } from '@angular/common/http';
import { Observable, map, Subject } from 'rxjs';

@Injectable()
export class ReleasesConvertorService
{
    dataReleases!: Release[];
    _jsonURL='src/assets/releases.json';
    dataReleasesDisplay!: ReleaseDisplay[];

    private _VersionsSubject = new Subject<ReleaseDisplay[]>();
    VersionsSubject$ = this._VersionsSubject.asObservable();

    constructor(private http:HttpClient)
    {
        this.dataReleasesDisplay = [];
    }

    public async getVersionNotesData()
    {
     
        await this.http.get("assets/releases.json").subscribe(async data =>{
            console.log(data);

            let dataString:string = JSON.stringify(data);
            let dataJSON = JSON.parse(dataString)
            this.dataReleases = dataJSON.releasedVersionsList;

            this.sortReleases();
            this.releasestoReleasesDisplay();
     
        });
    }

    private sortReleases():void
    {
        const compareSemanticVersions = (firstReleaseCompare: Release, secondReleaseCompare: Release):number => {
 
            let firstReleaseVersion:string = firstReleaseCompare.versionNumber.toString();
            let secondReleaseVersion:string = secondReleaseCompare.versionNumber.toString();

            // 1. Split the strings into their parts.
            const firstReleaseVersionSplitted = firstReleaseVersion.split('.');
            const secondReleaseVersionSplitted = secondReleaseVersion.split('.');
            // 2. Contingency in case there's a 4th or 5th version
            const minimumVersionSplittedLength = Math.min(firstReleaseVersionSplitted.length, secondReleaseVersionSplitted.length);
            // 3. Look through each version number and compare.

            for (let i = 0; i < minimumVersionSplittedLength; i++) {
            
                const firstReleaseVersionValue = + firstReleaseVersionSplitted[ i ] || 0;
                const secondReleaseVersionValue = + secondReleaseVersionSplitted[ i ] || 0;
                
                if (firstReleaseVersionValue !== secondReleaseVersionValue) {
                    return firstReleaseVersionValue > secondReleaseVersionValue ? 1 : -1;        
                }
            }
            
            // 4. We hit this if the all checked versions so far are equal
            return firstReleaseVersionSplitted.length - secondReleaseVersionSplitted.length;
        };

        const dataReleasesSorted = this.dataReleases.sort(compareSemanticVersions);
        this.dataReleases = dataReleasesSorted.reverse();
    }

    private async releasestoReleasesDisplay()
    {
        // parse Versions
        for(var indexVersion in this.dataReleases)
        {
            
            this.dataReleasesDisplay.push({versionNumber:this.dataReleases[indexVersion].versionNumber,perspectivesComments:[]})

            // parsee releaseNotesEntriesForVersion
            for(var indexPerspective in this.dataReleases[indexVersion].releaseNotesEntriesForVersion)
            {
                // add perspectives to releasesDisplay
                const perspectiveExists = this.dataReleasesDisplay[indexVersion].perspectivesComments.findIndex(affectedPerspective => 
                                affectedPerspective.affectedPerspective ===
                               this.dataReleases[indexVersion].releaseNotesEntriesForVersion[indexPerspective].affectedPerspective);
                console.log(perspectiveExists);
                if (perspectiveExists === -1) {
                    var perspective:PerspectiveComments = {
                        affectedPerspective: this.dataReleases[indexVersion].releaseNotesEntriesForVersion[indexPerspective].affectedPerspective,
                        affectedPerspectivecomments: []
                    };
                    perspective.affectedPerspectivecomments.push(this.dataReleases[indexVersion].releaseNotesEntriesForVersion[indexPerspective].releaseNotesComment)
                    console.log(perspective);
                    this.dataReleasesDisplay[indexVersion].perspectivesComments.push(perspective);

                }
                else
                {
                    this.dataReleasesDisplay[indexVersion].perspectivesComments[perspectiveExists].affectedPerspectivecomments.push(this.dataReleases[indexVersion].releaseNotesEntriesForVersion[indexPerspective].releaseNotesComment)
                }      
            }

            this.dataReleasesDisplay[indexVersion].perspectivesComments.sort(function (a, b) {
                if (a.affectedPerspective < b.affectedPerspective) {
                  return -1;
                }
                if (a.affectedPerspective > b.affectedPerspective) {
                  return 1;
                }
                return 0;
              });
            
        }

        this._VersionsSubject.next(this.dataReleasesDisplay);
    }

}