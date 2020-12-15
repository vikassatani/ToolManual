
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { Observable } from 'rxjs';
import { Expense, ExpenseStatus, AddExpense, DuplicateLeave, StaffLeaveStatus, AddLeaveType, UpdateLeave, AddLeaveApplication, LeaveDropDown, AddClaimExpenseDetails, ClaimExpenseDetails, AddApproverExpense } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import * as myGlobals from '../../../../Global';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
declare var $;
import swal from 'sweetalert2';

import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./applyLeave.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ApplyLeaveComponent implements OnInit, AfterViewInit {
    leaveDDL: LeaveDropDown[];
    staffLeaveStatus: StaffLeaveStatus[];
    ResponseStatus: string;
    duplicate: DuplicateLeave[];
    duplicateLeave = new DuplicateLeave();

    leaveType_Id: number;
    LeaveDDLId: number;
    Application: AddLeaveApplication[];
    errorMessage: string;
    comp_Id: number;
    year_Id: number;
    leave_Id: number;
    staffId: number;
    noOfDay: number;
    TotalLeave: number;
    leaveTaken: number;
    login_Id: number;
    designation_Id: number;
    from_Date: string;
    to_Date: string;
    document_Need: string;
    token: string;
    addressOnLeave: string;
    remarks: string;
    device_Id: string;
    ipAddress: string;
    userNameUpdate: string;
    addLeaveApplication = new AddLeaveApplication();

    constructor(private serverService: ServerService, private router: Router) {

    }


    // $('.datepicker').datepicker({
    //     format: 'dd/mm/yyyy'
    //  });


    applicationid: number

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
    date2: Date;
    todate1: Date;
    fromdate1: Date;
    toDate: Date;
    fromDate: Date;
    fromdateLod: Date;
    todateLod: Date;
    fromdateTra: Date;
    todateTra: Date;
    expId: number;
    getFromDate(fromdate) {
        let fromdate1 = new Date(fromdate);
        this.date2 = new Date();
        if (fromdate1 != this.date2 || fromdate1 == this.date2) {
            if (fromdate1 > this.date2 || fromdate1 == this.date2) {
                this.fromDate = fromdate1;

            }
        }
    }

    getToDate(todate) {
        let todate1 = new Date(todate);
        this.date2 = new Date();
        if (todate1 != this.date2) {
            if (todate1 > this.date2) {
                this.toDate = todate1;

            }
        }
    }

    onSelectOfDDL(LeaveTypeId) {
        this.LeaveDDLId = LeaveTypeId;
        this.serverService.getStaffLeaveStatusFromServers(LeaveTypeId, 0, "GETLEAVESANPENDIS")
            .subscribe(Data => {

                // this.leaveDDL= Data;
                // this.staffLeaveStatus.TotalLeave= Data[0].TotalLeave;
                // this.staffLeaveStatus.leave_Avail= Data[0].leave_Avail;
                this.staffLeaveStatus = Data;
            });

    }

    AddNew(ExpId) {
        this.expId = ExpId;
        if (ExpId == undefined || ExpId == '0') {
            swal("Please Select Leave Type");
        }
    }

    onSubmit(fromDate, toDate): void {
        fromDate = new Date(fromDate);
        toDate = new Date(toDate);
        if (fromDate > toDate) {
            swal("From Date is Greater than To Date");
        }
        else if (this.expId == undefined || this.expId == 0) {
            swal("Please Select Leave Type");
        }
        else {

            this.serverService.getDuplicateLeaveData(this.duplicateLeave, fromDate, toDate, "GET_LEAVE_ALREADY_TAKEN")
                .subscribe(duplicateLeave => {


                    this.ResponseStatus = duplicateLeave[0].errorCode;
                    if (this.ResponseStatus == "1234") {

                        swal("Leave Already Taken For Given Date ")
                    }
                    else {
                        this.serverService.SaveLeaveApplicationDataToServers(this.addLeaveApplication, this.LeaveDDLId, 0, "SAVELEAVE")
                            .subscribe(addLeaveApplication => {

                                this.serverService.getStaffLeaveStatusFromServers(0, 0, "GETLEAVESANPENDIS")
                                    .subscribe(Data => {
                                        this.staffLeaveStatus = Data;
                                    });
                                this.addLeaveApplication.leave_Id = null;

                                // this.getId=addClaimExpenseDetails.Id;



                                // this.serverService.getClaimExpenseDetailsDataFromServers(myGlobals.ExpenseId,0,0)

                                // .subscribe(Data => {
                                //     this.claimExpenseDetails= Data;
                                // });

                                this.ResponseStatus = addLeaveApplication[0].errorCode;
                                if (this.ResponseStatus == "0") {
                                    swal({
                                        position: 'top-end',
                                        type: 'success',
                                        title: 'Your Data has been saved',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });

                                }
                                //  this.addLeaveApplication.from_Date=new Date(Date.now());
                                //  this.addLeaveApplication.to_Date=new Date(Date.now());
                                this.addLeaveApplication.remarks = '';
                            },
                            error => this.errorMessage = <any>error);
                    }



                },
                error => this.errorMessage = <any>error);




        }




    }

    dd: any;
    mm: any;
    yyyy: any;
    today: any;
    fromDateformat: any;
    ngOnInit() {
        this.addLeaveApplication.remarks = '';
        this.today = new Date();
        this.dd = this.today.getDate();
        this.mm = this.today.getMonth() + 1;
        this.yyyy = this.today.getFullYear();
        if (this.dd < 10) {
            this.dd = '0' + this.dd
        }
        if (this.mm < 10) {
            this.mm = '0' + this.mm
        }
        this.today = this.mm + '/' + this.dd + '/' + this.yyyy;
        this.addLeaveApplication.from_Date = this.today;
        this.addLeaveApplication.to_Date = this.today;
        this.fromdateTra = new Date(this.today);
        this.todateTra = new Date(this.today);
        this.fromdateLod = new Date(this.today);
        this.todateLod = new Date(this.today);


        this.serverService.getLeaveDropDownDataFromServers()
            .subscribe(Data => {
                this.leaveDDL = Data;
                this.addLeaveApplication.leave_Id = 0;

            });

        this.serverService.getStaffLeaveStatusFromServers(-1, 0, "GETLEAVESANPENDIS")
            .subscribe(Data => {
                this.staffLeaveStatus = Data;

                //  this.fromDateformat=Data[i]
            });


    }

    delete(ApplicationId, leaveTypeId) {
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                this.applicationid = ApplicationId;
                this.LeaveDDLId = leaveTypeId;
                this.serverService.SaveLeaveApplicationDataToServers(this.addLeaveApplication, this.LeaveDDLId, this.applicationid, "DELETELEAVEDETAILS")
                    .subscribe(ExpenseDetailId => {
                        this.ResponseStatus = ExpenseDetailId[0].errorCode;
                        if (this.ResponseStatus == "0") {
                            swal(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                        this.getData();
                    },
                    error => this.errorMessage = <any>error);


            }
        })
    }

    getData() {
        this.serverService.getStaffLeaveStatusFromServers(-1, 0, "GETLEAVESANPENDIS")
            .subscribe(Data => {
                this.staffLeaveStatus = Data;
            });

    }

    onRedirect(appicationId) {
        this.serverService.getStaffLeaveStatusFromServers(0, appicationId, "GETLEAVESANPENDIS")
            .subscribe(Data => {
                this.addLeaveApplication.leave_Id = Data[0].leaveType_Id;
                this.addLeaveApplication.from_Date = Data[0].from_Date;
                this.addLeaveApplication.to_Date = Data[0].to_Date;
                this.addLeaveApplication.remarks = Data[0].remarks;

            });

    }

    ngAfterViewInit() {
        var BootstrapDatepicker = function() {
            var t = function() {
                $("#m_datepicker_1, #m_datepicker_1_validate").datepicker({ todayHighlight: !0, orientation: "bottom left", templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }), $("#m_datepicker_1_modal").datepicker({ todayHighlight: !0, orientation: "bottom left", templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }),
                    $("#m_datepicker_2, #m_datepicker_2_validate").datepicker({ todayHighlight: !0, orientation: "bottom left", templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }), $("#m_datepicker_2_modal").datepicker({ todayHighlight: !0, orientation: "bottom left", templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }),
                    $("#m_datepicker_3, #m_datepicker_3_validate").datepicker({ todayBtn: "linked", clearBtn: !0, todayHighlight: !0, templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }), $("#m_datepicker_3_modal").datepicker({ todayBtn: "linked", clearBtn: !0, todayHighlight: !0, templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }),
                    $("#m_datepicker_4_1").datepicker({ orientation: "top left", todayHighlight: !0, templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }), $("#m_datepicker_4_2").datepicker({ orientation: "top right", todayHighlight: !0, templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }),
                    $("#m_datepicker_4_3").datepicker({ orientation: "bottom left", todayHighlight: !0, templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }), $("#m_datepicker_4_4").datepicker({ orientation: "bottom right", todayHighlight: !0, templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }),
                    $("#m_datepicker_5").datepicker({ todayHighlight: !0, templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }), $("#m_datepicker_6").datepicker({ todayHighlight: !0, templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } })
            }; return { init: function() { t() } }
        }(); jQuery(document).ready(function() { BootstrapDatepicker.init() });

    }

}