
import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { SalesmenReportDetails, DownloadPDF, SaleseTrakcer, Branch, TeamTarget, Team } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { BranchComponent } from '../branch/branch.Component';
import * as myGlobals from '../../../../Global';
import { Router } from '@angular/router';
declare var $;
import swal from 'sweetalert2';
import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic/src/platform_providers';
//import * as toastr from '...';

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./salesmanReport.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class GenerateSalesmanReportComponent implements OnInit, AfterViewInit {
    salesReportDetails: SalesmenReportDetails[]
    salesTrakcer: SaleseTrakcer[];
    branch: Branch[];
    team: Team[];
    downloadPDF: DownloadPDF[];


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

    //    Download(FromDate,ToDate){
    //     this.FromDate=new Date(FromDate);
    //     this.ToDate=new Date(ToDate); 
    //     if( this.FromDate > this.ToDate){
    //         swal("Please select valid Todate") 
    //     }
    //     else{
    //         this.serverService.DownloadSalesmenPDFDetails(FromDate,ToDate)
    //         .subscribe(Data =>{
    //             this.downloadPDF = Data;
    //         })   

    //     }
    //    }
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
    }

    FromDate: any
    ToDate: any

    getDetailData(FromDate, ToDate, branchId, teamId) {
        this.salesTrakcer = [];
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
            this.serverService.GetSalesTrackerDetails(FromDate, ToDate, 0, 0, "GETREPORT")
                .subscribe(Data => {
                    this.salesTrakcer = Data;
                })
        }
        else {
            this.serverService.GetSalesTrackerDetails(FromDate, ToDate, branchId, teamId, "GETREPORT")
                .subscribe(Data => {
                    this.salesTrakcer = Data;
                })
        }

    }

    onStatusChange(MonthId, branchId, TeamId) {
        this.salesTrakcer = [];
        // this.serverService.GetSalesmenreportDetails(0,FromDate,ToDate,"GET")
        // .subscribe(Data =>{
        //     this.salesReportDetails = Data;
        // })
        // this.isEdited=true;
        if (this.branchId == "0") {
            // this.isEdit=true;
            this.serverService.GetSalesTrackerMonthlyDetails(MonthId, 0, 0, "GETREPORT_MONTH")
                .subscribe(Data => {
                    this.salesTrakcer = Data;
                })
        }
        else {
            this.serverService.GetSalesTrackerMonthlyDetails(MonthId, branchId, TeamId, "GETREPORT_MONTH")
                .subscribe(Data => {
                    this.salesTrakcer = Data;
                })
        }


    }


    downloadExcel() {
        var downloadSalesmanReport = [{
            empName: "Employee Name", salesTarget: "Sales Target", pendingOrder: "Pending Order", tillDateSales: "Till Date Sales", collectionTillDate: "Till Date collection", todaysCollection: "Todays Collection", modeOfComunication: "Mode Of Communication", placesVisited: "Place Visted", customer: "Customer", purposeName: "Purpose of Visit", visitedDate: "Visted Date", contactNo: "Contact Number",
            enquiry: "Enquiry", enquiry_uom: "Enquiry uom", ordergiven: "Order Quantity", order_uom: "Order uom", collectionDone: "Collection", remarks: "Remarks"
        }]
        for (var i = 0; i < this.salesTrakcer.length; i++) {
            downloadSalesmanReport[i + 1] = {
                'empName': this.salesTrakcer[i].empName + '-' + this.salesTrakcer[i].empId, 'salesTarget': this.salesTrakcer[i].salesTarget, 'pendingOrder': this.salesTrakcer[i].pendingOrder, 'tillDateSales': this.salesTrakcer[i].tillDateSales, 'collectionTillDate': this.salesTrakcer[i].collectionTillDate, 'todaysCollection': this.salesTrakcer[i].todaysCollection, 'modeOfComunication': this.salesTrakcer[i].modeOfComunication, 'placesVisited': this.salesTrakcer[i].placesVisited, 'customer': this.salesTrakcer[i].customer, 'purposeName': this.salesTrakcer[i].purposeName, 'visitedDate': this.salesTrakcer[i].visitedDate, 'contactNo': this.salesTrakcer[i].contactNo,
                'enquiry': this.salesTrakcer[i].enquiry, 'enquiry_uom': this.salesTrakcer[i].enquiry_uom, 'ordergiven': this.salesTrakcer[i].ordergiven, 'order_uom': this.salesTrakcer[i].order_uom, 'collectionDone': this.salesTrakcer[i].collectionDone, 'remarks': this.salesTrakcer[i].remarks
            }
        }
        new Angular2Csv(downloadSalesmanReport, 'Salesman Report');
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
