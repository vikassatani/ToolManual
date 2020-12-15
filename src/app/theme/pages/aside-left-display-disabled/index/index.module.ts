import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index.component';
import { LayoutModule } from '../../../layouts/layout.module';
import { AsideLeftDisplayDisabledComponent } from '../aside-left-display-disabled.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ServerService } from '../../../../server.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AmChartsModule } from "@amcharts/amcharts3-angular";
import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown/ng-multiselect-dropdown.module';


const routes: Routes = [
    {
        "path": "",
        "component": AsideLeftDisplayDisabledComponent,
        "children": [
            {
                "path": "",
                "component": IndexComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, NgxPaginationModule, FormsModule, ReactiveFormsModule, AmChartsModule, RouterModule.forChild(routes), LayoutModule, HttpClientModule, HttpModule
    ], exports: [
        RouterModule
    ], declarations: [
        IndexComponent

    ],
    providers: [ServerService,],
})
export class IndexModule {



}