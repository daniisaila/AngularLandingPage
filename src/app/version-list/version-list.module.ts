import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {VersionListComponent} from './version-list.component'
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';


@NgModule({
    declarations: [
        VersionListComponent
    ],
    imports: [
	CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule
    ],
	exports: [VersionListComponent]
})
export class VersionListModule
{
}
