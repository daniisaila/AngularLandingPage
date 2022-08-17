import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {AppMenu} from './app-menu.component'
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ReleasesNotesModule} from '../releases-notes/releases-notes-module/releases-notes.module'


@NgModule({
    declarations: [
        AppMenu
    ],
    imports: [
	CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    ReleasesNotesModule
    ],
	exports: [AppMenu]
})
export class AppMenuModule
{
}
