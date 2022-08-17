import { Injectable } from '@angular/core';
import releases from 'src/assets/releases.json'
import { Version, VersionDisplay, PerspectiveComments } from './version.types';
import { HttpClient } from '@angular/common/http';
import { Observable, map, Subject } from 'rxjs';

@Injectable()
export class ReleaseConvertorService
{
    releaseVersions!: Version[];
    _jsonURL='src/assets/releases.json';
    releasesDisplay!: VersionDisplay[];

    private _VersionsSubject = new Subject<VersionDisplay[]>();
    VersionsSubject$ = this._VersionsSubject.asObservable();

    constructor(private http:HttpClient)
    {
        this.releasesDisplay = [];
    }

    public async getData()
    {

            
        await this.http.get("assets/releases.json").subscribe(async data =>{
            console.log(data);

            let releasesString:string = JSON.stringify(data);
            let jsonfile = JSON.parse(releasesString)
            this.releaseVersions = jsonfile.releasedVersionsList;

    
            const compareSemanticVersions = (va: Version, vb: Version) => {
 
                let a:string = va.versionNumber.toString();
                let b:string = vb.versionNumber.toString();

                // 1. Split the strings into their parts.
                const a1 = a.split('.');
                const b1 = b.split('.');
                // 2. Contingency in case there's a 4th or 5th version
                const len = Math.min(a1.length, b1.length);
                // 3. Look through each version number and compare.

                console.log(a1);
                console.log(b1);

                for (let i = 0; i < len; i++) {
                
                    const a2 = +a1[ i ] || 0;
                    console.log(a2);
                    const b2 = +b1[ i ] || 0;
                    console.log(b2);
                    
                    if (a2 !== b2) {
                        return a2 > b2 ? 1 : -1;        
                    }
                }
                
                // 4. We hit this if the all checked versions so far are equal
                //
                console.log("ceva: " + (b1.length - a1.length));
                return a1.length - b1.length;
            };
    
            const sorted = this.releaseVersions.sort(compareSemanticVersions);
            sorted.reverse();

            await this.releaseVersionToVersionDisplay();
     


            console.log(this.releasesDisplay);

        });
    }

    private async releaseVersionToVersionDisplay()
    {
        // parse Versions
        for(var indexVersion in this.releaseVersions)
        {
            
            this.releasesDisplay.push({versionNumber:this.releaseVersions[indexVersion].versionNumber,perspectivesComments:[]})

            //this.releasesDisplay[indexVersion].versionNumber = this.releaseVersions[indexVersion].versionNumber;

            // parsee releaseNotesEntriesForVersion
            for(var indexPerspective in this.releaseVersions[indexVersion].releaseNotesEntriesForVersion)
            {
                // add perspectives to releasesDisplay
                //this.releasesDisplay[indexVersion].perspectivesComments.push({affectedPerspective:'',affectedPerspectivecomments:[]})

                //console.log(this.releaseVersions[indexVersion].releaseNotesEntriesForVersion.length)
                const perspectiveExists = this.releasesDisplay[indexVersion].perspectivesComments.findIndex(affectedPerspective => 
                                affectedPerspective.affectedPerspective ===
                               this.releaseVersions[indexVersion].releaseNotesEntriesForVersion[indexPerspective].affectedPerspective);
                console.log(perspectiveExists);
                if (perspectiveExists === -1) {
                    var perspective:PerspectiveComments = {
                        affectedPerspective: this.releaseVersions[indexVersion].releaseNotesEntriesForVersion[indexPerspective].affectedPerspective,
                        affectedPerspectivecomments: []
                    };
                    perspective.affectedPerspectivecomments.push(this.releaseVersions[indexVersion].releaseNotesEntriesForVersion[indexPerspective].releaseNotesComment)
                    console.log(perspective);
                    this.releasesDisplay[indexVersion].perspectivesComments.push(perspective);

                }
                else
                {
                    this.releasesDisplay[indexVersion].perspectivesComments[perspectiveExists].affectedPerspectivecomments.push(this.releaseVersions[indexVersion].releaseNotesEntriesForVersion[indexPerspective].releaseNotesComment)
                    //console.log("pop");
                    //this.releasesDisplay[indexVersion].perspectivesComments.pop();
                }      
            }

            this.releasesDisplay[indexVersion].perspectivesComments.sort(function (a, b) {
                if (a.affectedPerspective < b.affectedPerspective) {
                  return -1;
                }
                if (a.affectedPerspective > b.affectedPerspective) {
                  return 1;
                }
                return 0;
              });
            
            
        }
        console.log("aiciii");
        console.log(this.releasesDisplay);
        this._VersionsSubject.next(this.releasesDisplay);
        //console.log(this.)
    }

}