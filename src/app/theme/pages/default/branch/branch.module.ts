import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BranchComponent } from './branch.component';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ServerService } from '../../../../server.service';


import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": BranchComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, NgMultiSelectDropDownModule.forRoot(), RouterModule.forChild(routes), LayoutModule, HttpClientModule, NgxPaginationModule, Ng2SearchPipeModule, Ng2OrderModule, HttpModule, FormsModule, ReactiveFormsModule
    ], exports: [
        RouterModule
    ], declarations: [
        BranchComponent
    ],
    providers: [ServerService],

})
export class BranchModule {



}




// export class Branch {
//     branch_Id: number;
//     branch_Name: string;
//     branch_Address: string;
//     branch_Location: string;
//     branch_Manager: number;
//     branch_Manager_Name: string;
//     is_Active: number

//     constructor() {
//     }


// }
// import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/share';
// import 'rxjs/Rx';
// import { Branch } from './branchDetails'
// @Injectable()
// export class ServerService {
//     headers: Headers;
//     options: RequestOptions;
//     postResponse: any

//     constructor(private httpService: Http) {
//         this.headers = new Headers({ 'Content-Type': 'application/json', });
//         this.options = new RequestOptions({ headers: this.headers });
//     }


//     getBranchDataFromServers(): Observable<Branch[]> {
//         return this.httpService
//             .post('http://localhost:57509/api/Branch/getBranch', {
//                 'comp_Id': 1,
//                 'login_Id': 1,
//                 'token': 'dGVzdA==',
//                 'branch_Id': 0
//             })

//             // //) 
//             .map((response: Response) => <Branch[]>response.json())
//     }
//     private handleError(error: Response) {
//         console.error(error);
//         return Observable.throw(error.json().error || 'Server error');
//     }

//  }
