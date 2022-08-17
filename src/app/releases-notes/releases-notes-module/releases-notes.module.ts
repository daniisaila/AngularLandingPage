import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {ReleasesNotesComponent} from './releases-notes.component'
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        ReleasesNotesComponent
    ],
    imports: [
	CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatSelectModule,
    FormsModule
    ],
	exports: [ReleasesNotesComponent]
})
export class ReleasesNotesModule
{
}