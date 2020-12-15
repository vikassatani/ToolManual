import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OrderApprovalComponent } from './orderApproval.component';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ServerService } from '../../../../server.service';
import { FormsModule } from '@angular/forms';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap';
// import {PopupModule} from 'ng2-opd-popup'
const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": OrderApprovalComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule, Ng2OrderModule, Ng2SearchPipeModule,
        NgxPaginationModule, HttpClientModule, HttpModule, FormsModule, ModalModule.forRoot()
    ], exports: [
        RouterModule
    ], declarations: [
        OrderApprovalComponent
    ],
    providers: [ServerService,],
})
export class OrderApprovalModule {



}