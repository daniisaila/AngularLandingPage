import { Injectable } from '@angular/core';
import releases from 'src/assets/releases.json'
import { Version } from './version.types';
import { HttpClient } from '@angular/common/http';
import { Observable, map, Subject } from 'rxjs';

@Injectable()
export class ReleaseConvertorService
{
    releaseVersions!: Version[];
    _jsonURL='src/assets/releases.json';

    private _VersionsSubject = new Subject<Version[]>();
    VersionsSubject$ = this._VersionsSubject.asObservable();

    constructor(private http:HttpClient)
    {

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
    
            const versionss = [ '1.1.0', '5.0.0', '0.2.0', '2.4.1', '1.02.1' ];
            const sorted = this.releaseVersions.sort(compareSemanticVersions);
            sorted.reverse();
            console.log(sorted);

            this._VersionsSubject.next(this.releaseVersions);
            console.log(this.releaseVersions);

        });
    }

}