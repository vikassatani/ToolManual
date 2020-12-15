import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GenerateLeaveReportComponent } from './leaveReport.component';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ServerService } from '../../../../server.service';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": GenerateLeaveReportComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), RouterModule, Ng2SearchPipeModule, LayoutModule, Ng2OrderModule, NgxPaginationModule, FormsModule, ReactiveFormsModule, HttpClientModule, HttpModule
    ], exports: [
        RouterModule
    ], declarations: [
        GenerateLeaveReportComponent
    ],
    providers: [ServerService],
})
export class GenerateLeaveReportModule {
}

