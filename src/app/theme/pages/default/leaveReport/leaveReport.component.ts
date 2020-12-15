
import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { SalesmenReportDetails, SaleseTrakcer, LeaveTrakcer, Branch, TeamTarget, Team } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { BranchComponent } from '../branch/branch.Component';
import * as myGlobals from '../../../../Global';
import { Router } from '@angular/router';
declare var $;
import swal from 'sweetalert2';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
//import * as toastr from '...';

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./leaveReport.component.html",
    encapsulation: ViewEncapsulation.None,
})
@Pipe({
    name: 'customDateFormat',
})
export class GenerateLeaveReportComponent implements OnInit, AfterViewInit {
    salesReportDetails: SalesmenReportDetails[]
    leaveTrakcer: LeaveTrakcer[];
    branch: Branch[];
    team: Team[];

    branch_Id: number;
    constructor(private serverService: ServerService, private router: Router, private _script: ScriptLoaderService) { }
    // isEdited=false;
    // isEdit=false
    team_Id: number;
    teamTargets1: TeamTarget[];
    branch_id: number;
    teamTarget = new TeamTarget();
    onSubmit(): void {

    }


    //sorting
    key: string = '';
    reverse: boolean = false;

    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }
    //pagination
    p: number = 1;

    itemsPerPage: number = 5;
    rowsPerPage: number = 5;
    setPageSize(itemsPerPage) {
        if (itemsPerPage == "") {
            this.itemsPerPage = 5;
        } else {
            this.itemsPerPage = itemsPerPage;
        }
    }

    branchId: string;
    getTeamData(branchId) {
        this.branchId = branchId;
        if (this.branchId == "0") {
            this.team = [];
        }
        else {
            this.serverService.getTeamDataFromServers(branchId, 0, 0, 0)
                .subscribe(Data => {
                    this.team = Data;
                });
        }

    }
    value: number;

    ngOnInit() {
        // this.isEdited=false;
        // this.isEdit=false

        // this.serverService.GetSalesmenreportDetails(1,FromDate,ToDate,"GET")
        // .subscribe(Data =>{
        //     this.salesReportDetails = Data;
        // })

        this.serverService.getBranchDataFromServers(0, 0)
            .subscribe(Data => {
                this.branch = Data;

                this.teamTarget.branch_id = 0;
            });

        this.value = 0;
    }

    FromDate: any
    ToDate: any

    getDetailData(FromDate, ToDate, branchId, teamId) {
        // this.serverService.GetSalesmenreportDetails(0,FromDate,ToDate,"GET")
        // .subscribe(Data =>{
        //     this.salesReportDetails = Data;
        // })
        this.FromDate = new Date(FromDate);
        this.ToDate = new Date(ToDate);
        if (this.FromDate > this.ToDate) {
            swal("Please select valid Todate")
        }
        else if (this.branchId == "0") {
            // this.isEdit=true;
            this.serverService.GetLeaveTrackerDetails(FromDate, ToDate, 0, 0, "GETREPORT")
                .subscribe(Data => {
                    this.leaveTrakcer = Data;
                })
        }
        else {
            this.serverService.GetLeaveTrackerDetails(FromDate, ToDate, branchId, teamId, "GETREPORT")
                .subscribe(Data => {
                    this.leaveTrakcer = Data;
                })

        }


    }

    onStatusChange(MonthId, branchId, TeamId) {
        // this.serverService.GetSalesmenreportDetails(0,FromDate,ToDate,"GET")
        // .subscribe(Data =>{
        //     this.salesReportDetails = Data;
        // })
        // this.isEdited=true;
        if (this.branchId == "0") {
            this.serverService.GetMonthlyLeaveTrackerDetails(MonthId, 0, 0, "GETREPORT_MONTH")
                .subscribe(Data => {
                    this.leaveTrakcer = Data;
                })

        }
        else {
            this.serverService.GetMonthlyLeaveTrackerDetails(MonthId, branchId, TeamId, "GETREPORT_MONTH")
                .subscribe(Data => {
                    this.leaveTrakcer = Data;
                })

        }


    }



    downloadExcel() {
        var downloadLeaveTracker = [{ branch_Name: "Branch", staffName: "Employee Name", leave_ApplyMonth: "Month", leave_ApplyDay: "Day", leave_ApplyDate: "Date", leave_Name: "Leave Type", remarks: "Remarks By User", from_Date: "Leave Submission Date", manager_approve_date: "Leave Approval Date", Leave_Status: "Status", manager_Remarks: "Manager Remarks", Approver: "Approved By" }]
        var pipe = new DatePipe('en-US');
        for (var i = 0; i < this.leaveTrakcer.length; i++) {
            downloadLeaveTracker[i + 1] = { 'branch_Name': this.leaveTrakcer[i].branch_Name, 'staffName': this.leaveTrakcer[i].staffName + '-' + this.leaveTrakcer[i].staff_No, 'leave_ApplyMonth': pipe.transform(this.leaveTrakcer[i].leave_ApplyDate, 'MMM'), 'leave_ApplyDay': pipe.transform(this.leaveTrakcer[i].leave_ApplyDate, 'EEEE'), 'leave_ApplyDate': pipe.transform(this.leaveTrakcer[i].leave_ApplyDate, 'mediumDate'), 'leave_Name': this.leaveTrakcer[i].leave_Name, 'remarks': this.leaveTrakcer[i].remarks, 'from_Date': pipe.transform(this.leaveTrakcer[i].from_Date, 'mediumDate'), 'manager_approve_date': pipe.transform(this.leaveTrakcer[i].manager_approve_date, 'mediumDate'), 'Leave_Status': this.leaveTrakcer[i].Leave_Status, 'manager_Remarks': this.leaveTrakcer[i].manager_Remarks, 'Approver': this.leaveTrakcer[i].Approver }
        }
        new Angular2Csv(downloadLeaveTracker, 'Leave Tracker List');
    }

    //contactNo,collectionDone,managerRemarks



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
