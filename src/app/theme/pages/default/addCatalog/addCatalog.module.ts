import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddCatalogComponent } from './addCatalog.component';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ServerService } from '../../../../server.service';
const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": AddCatalogComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule, FormsModule, ReactiveFormsModule, HttpClientModule, HttpModule
    ], exports: [
        RouterModule
    ], declarations: [
        AddCatalogComponent
    ],
    providers: [ServerService,],
})
export class AddCatalogModule {



}