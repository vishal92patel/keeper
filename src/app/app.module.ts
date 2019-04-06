import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { LeftSideNavComponent } from './left-side-nav/left-side-nav.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { LongPressDirective } from './directives/long-press.directive';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		LeftSideNavComponent,
		MainContainerComponent,
		LongPressDirective
	],
	imports: [
		BrowserAnimationsModule,
		MatToolbarModule,
		MatMenuModule,
		MatIconModule,
		MatSidenavModule,
		MatListModule,
		MatCardModule,
		DragDropModule,
		MatButtonModule,
		MatTooltipModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
