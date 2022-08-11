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
            
            this._VersionsSubject.next(this.releaseVersions);
            console.log(this.releaseVersions);

        });
    }

}