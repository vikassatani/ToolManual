import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme/theme.component';
import { LayoutModule } from './theme/layouts/layout.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScriptLoaderService } from "./_services/script-loader.service";

import { ThemeRoutingModule } from "./theme/theme-routing.module";
import { AuthModule } from "./auth/auth.module";

// import { AddBranchComponent } from './theme/pages/default/addBranch/addbranch.component';
import { BranchModule } from './theme/pages/default/branch/branch.module';
import { AddBranchModule } from './theme/pages/default/addBranch/addbranch.module';
import { SettingsModule } from './theme/pages/default/settings/settings.module';
import { AddTaxModule } from './theme/pages/default/addTax/addTax.module';
import { HolidayUploadModule } from './theme/pages/default/holidayUpload/holidayUpload.module';

import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
    declarations: [
        ThemeComponent,
        AppComponent,


    ],
    imports: [
        LayoutModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ThemeRoutingModule,
        AuthModule,
        BranchModule,
        SettingsModule,
        AddTaxModule,
        HolidayUploadModule


    ],
    providers: [ScriptLoaderService,
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }