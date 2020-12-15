import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Helpers } from '../../../../helpers';
import { Observable } from 'rxjs/Observable';
import { AssignBranch, Branch } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import * as myGlobals from '../../../../Global';
import swal from 'sweetalert2';
import 'rxjs/add/operator/map'

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./assignBranch.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AssignBranchComponent implements OnInit, AfterViewInit {
    staffId: number;
    staff_No: string;
    errorMessage: String;
    assignBranch: AssignBranch[];
    assignedBranch: any;
    branch: Branch[];
    selected = false;
    ab = new AssignBranch();
    show = false;
    constructor(private serverService: ServerService) { }

    omit_special_char(event) {
        var k;
        k = event.charCode;  //         k = event.keyCode;  (Both can be used)
        return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
    }



    ngOnInit(): void {
    }
    getBranchAssignDatas(staffNo) {

        this.serverService.getAssignBranchDataFromServers(staffNo)
            .subscribe(Data => {
                if (Data.length == 0) {
                    swal("Employee Record not found")
                    this.show = false;
                }
                else {
                    this.show = true;
                }

                this.assignBranch = Data;
                this.staffId = Data[0].staff_Id;
                this.serverService.getAssignedBranchDataFromServers(Data[0].staff_Id)
                    .subscribe(Data => {
                        this.assignedBranch = Data;
                    })
            });
        this.selected = true;

    }
    save(staffNo) {
        this.serverService.saveAssignBranchDetails(this.ab, this.staffId, 0, "DELETE_STAFF_BRANCH_ASSIGN")
            .subscribe(Data => {
                for (var i = 0; i < this.assignedBranch.length; i++) {
                    if (this.assignedBranch[i].checked_Branch == true || this.assignedBranch[i].checked_Branch == 1) {
                        this.serverService.saveAssignBranchDetails(this.ab, this.staffId, this.assignedBranch[i].branch_id, "STAFF_MULTIPLE_BRANCH_ASSIGN")
                            .subscribe(Data => { })
                    }
                }
                swal({
                    position: 'top-end',
                    type: 'success',
                    title: 'Your Data has been saved',
                    showConfirmButton: false,
                    timer: 1500
                });

                this.getBranchAssignDatas(staffNo);
            })

    }
    ngAfterViewInit() {

    }
}
