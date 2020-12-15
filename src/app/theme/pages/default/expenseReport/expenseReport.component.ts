
import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { SalesmenReportDetails, ExpenseTrakcer, Branch, TeamTarget, Team } from '../../../../componentDetails';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { ServerService } from '../../../../server.service';
import { BranchComponent } from '../branch/branch.Component';
import * as myGlobals from '../../../../Global';
import { Router } from '@angular/router';
declare var $;
import swal from 'sweetalert2';
//import * as toastr from '...';

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./expenseReport.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class GenerateExpenseReportComponent implements OnInit, AfterViewInit {

    expenseTrakcer: ExpenseTrakcer[];

    branch: Branch[];
    team: Team[];

    branch_Id: number;

    // isEdited=false;
    // isEdit=false
    team_Id: number;
    teamTargets1: TeamTarget[];
    branch_id: number;
    teamTarget = new TeamTarget();

    //sorting
    key: string = '';
    reverse: boolean = false;

    // sort(key){
    //     this.key = key;
    //     this.reverse = !this.reverse;
    // }
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

    constructor(private serverService: ServerService, private router: Router, private _script: ScriptLoaderService) { }

    onSubmit(): void {

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
    ngOnInit() {

        // this.isEdited=false;
        // this.isEdit=false
        this.serverService.getBranchDataFromServers(0, 0)
            .subscribe(Data => {
                this.branch = Data;
            });
        // this.serverService.GetSalesmenreportDetails(1,FromDate,ToDate,"GET")
        // .subscribe(Data =>{
        //     this.salesReportDetails = Data;
        // })
    }

    FromDate: any
    ToDate: any
    getDetailData(FromDate, ToDate, branchId, teamId) {

        this.FromDate = new Date(FromDate);
        this.ToDate = new Date(ToDate);
        if (this.FromDate > this.ToDate) {
            swal("Please select valid Todate")
        }
        else if (this.branchId == "0") {
            // this.isEdit=true;
            this.serverService.GetExpenseTrackerDetails(FromDate, ToDate, 0, 0, "GETREPORT")
                .subscribe(Data => {
                    this.expenseTrakcer = Data;
                })
        }
        else {

            this.serverService.GetExpenseTrackerDetails(FromDate, ToDate, branchId, teamId, "GETREPORT")
                .subscribe(Data => {
                    this.expenseTrakcer = Data;
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


            this.serverService.GetMonthlyExpenseTrackerDetails(MonthId, 0, 0, "GETREPORT_MONTH")
                .subscribe(Data => {
                    this.expenseTrakcer = Data;
                })
        }
        else {
            this.serverService.GetMonthlyExpenseTrackerDetails(MonthId, branchId, TeamId, "GETREPORT_MONTH")
                .subscribe(Data => {
                    this.expenseTrakcer = Data;
                })
        }


    }


    downloadExcel() {
        var downloadExpenseTracker = [{ empName: "Employee Name", empId: "Employee Code", tripName: "Trip Name", expenseCategory: "Expense Category", submittedOn: "Submitted On", amount: "Amount", staff_Remarks: "Remarks", approver_Remarks: "Manager Remarks", approvedDate: "Approved Date", approverName: "Approver Name", currentstatus: "Status" }]
        for (var i = 0; i < this.expenseTrakcer.length; i++) {
            downloadExpenseTracker[i + 1] = { 'empName': this.expenseTrakcer[i].empName, 'empId': this.expenseTrakcer[i].empId, 'tripName': this.expenseTrakcer[i].tripName, 'expenseCategory': this.expenseTrakcer[i].expenseCategory, 'submittedOn': this.expenseTrakcer[i].submittedOn, 'amount': this.expenseTrakcer[i].amount, 'staff_Remarks': this.expenseTrakcer[i].staff_Remarks, 'approver_Remarks': this.expenseTrakcer[i].approver_Remarks, 'approvedDate': this.expenseTrakcer[i].approvedDate, 'approverName': this.expenseTrakcer[i].approverName, 'currentstatus': this.expenseTrakcer[i].currentstatus }
        }
        new Angular2Csv(downloadExpenseTracker, 'Expense Tracker');
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
