
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { Observable } from 'rxjs';
import { Expense, ExpenseStatus, StaffLeave, LeaveStatus, UpdateLeave, StaffLeaveDetails, TotalStaffLeaveLeft, AddExpense, AddClaimExpenseDetails, ClaimExpenseDetails, AddApproverExpense } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import * as myGlobals from '../../../../Global';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
declare var $;
import swal from 'sweetalert2';
@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./approveLeave.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ApproveLeaveComponent implements OnInit, AfterViewInit {
    ResponseStatus: string;
    staffLeaveDetails: StaffLeaveDetails[];

    selected12 = true;
    selected14 = true;
    selected15 = false;
    selected13 = false;
    isEdited = true;

    //  approverStatus:number; 

    constructor(private serverService: ServerService, private router: Router) {

    }
    leaveStatusDDL: LeaveStatus[];
    staffLeave: StaffLeave[];

    update: UpdateLeave[];
    comp_Id: number;
    year_Id: number;
    leave_Id: number;
    staffId: number;
    noOfDay: number;
    status_Of_Leave: number;
    application_Id: number;
    login_Id: number;
    to_Date: Date;
    token: string;
    device_Id: string;
    ipAddress: string;
    userNameUpdate: string;
    manager_Remarks: string;
    isEditable: any;
    updateLeave = new UpdateLeave();
    errorMessage: String;
    LeaveId: number;
    applicationId: number;

    //sorting
    key: string = '';
    reverse: boolean = true;

    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }
    //pagination
    p: number = 1;

    itemsPerPage: number = 10;
    rowsPerPage: number = 10;
    setPageSize(itemsPerPage) {
        if (itemsPerPage == "") {
            this.itemsPerPage = 10;
        } else {
            this.itemsPerPage = itemsPerPage;
        }
    }


    SubmitForApproval(applicationId, staffId, LeaveId, manager_Remarks, day_Count, date) {
        // this.selected12=false
        this.SendStatus(1, applicationId, staffId, LeaveId, manager_Remarks, day_Count, date);
    }
    SubmitForRejected(applicationId, staffId, LeaveId, manager_Remarks, day_Count, date) {
        //  this.selected12=false
        this.SendStatus1(2, applicationId, staffId, LeaveId, manager_Remarks, day_Count, date);
    }
    SendStatus(statusID, applicationId, staffId, LeaveId, manager_Remarks, day_Count, date) {
        this.serverService.SaveLeaveUpdateDataToServers(this.updateLeave, statusID, applicationId, staffId, LeaveId, manager_Remarks, day_Count, date)
            .subscribe(updateLeave => {

                this.serverService.getStaffApproveLeaveFromServers(0, "GETLEAVESAPPROVER")
                    .subscribe(Data => {
                        this.staffLeave = Data;
                    });

                this.ResponseStatus = updateLeave[0].errorCode;
                if (this.ResponseStatus == "0") {
                    swal({
                        position: 'top-end',
                        type: 'success',
                        title: 'Leave has been Approved',
                        showConfirmButton: false,
                        timer: 1500

                    });
                    this.router.navigate(['./approveLeave']);
                }
            },
            error => this.errorMessage = <any>error);
    }

    SendStatus1(statusID, applicationId, staffId, LeaveId, manager_Remarks, day_Count, date) {
        this.serverService.SaveLeaveUpdateDataToServers(this.updateLeave, statusID, applicationId, staffId, LeaveId, manager_Remarks, day_Count, date)
            .subscribe(updateLeave => {

                this.serverService.getStaffApproveLeaveFromServers(0, "GETLEAVESAPPROVER")
                    .subscribe(Data => {
                        this.staffLeave = Data;
                    });
                this.ResponseStatus = updateLeave[0].errorCode;
                if (this.ResponseStatus == "0") {
                    swal({
                        position: 'top-end',
                        type: 'success',
                        title: 'Leave has been Rejected',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.router.navigate(['./approveLeave']);
                }
            },
            error => this.errorMessage = <any>error);
    }
    onStatusChange(statusId) {

        if (statusId == 0) {
            this.selected12 = true;
            this.selected13 = false;
            this.selected14 = true;
            this.selected15 = false;
        }
        else {
            this.selected12 = false;
            this.selected13 = true;
            this.selected14 = false;
            this.selected15 = true;
        }
        // this.expense.status=statusId;
        this.serverService.getStaffApproveLeaveFromServers(statusId, "GETLEAVESAPPROVER")
            .subscribe(Data => {
                this.staffLeave = Data;

            });
    }


    ngOnInit() {

        this.serverService.getApproveLeaveStatusDataFromServers(0, 0)
            .subscribe(Data => {
                this.leaveStatusDDL = Data;

                // this.approverStatus=0;
            });
        this.serverService.getStaffApproveLeaveFromServers(0, "GETLEAVESAPPROVER")
            .subscribe(Data => {
                this.staffLeave = Data;
            });
    }

    onStatusChange2(AppId, Remarks) {

    }


    redirect(StaffId, StatusId) {
        this.router.navigate(['./addApproveLeave']);
        myGlobals.setApproveLeaveIDValue(StaffId);
    }

    ngAfterViewInit() {

    }

}