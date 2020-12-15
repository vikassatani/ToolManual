
import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { salesReport, SalesmenReportDetails, DownloadPDF, SaleseTrakcer, Branch, TeamTarget, Team } from '../../../../componentDetails';
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
    templateUrl: "./salesReport.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class GenerateSalesReportComponent implements OnInit, AfterViewInit {
    salesReportDetails: SalesmenReportDetails[]
    salesTrakcer: SaleseTrakcer[];
    branch: Branch[];
    team: Team[];
    downloadPDF: DownloadPDF[];
    salesReport: salesReport[];

    branch_Id: number;
    constructor(private serverService: ServerService, private router: Router, private _script: ScriptLoaderService) { }
    // isEdited=false;
    // isEdit=false
    //  team_Id:number;
    // teamTargets1: TeamTarget[];
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


        this.serverService.getBranchDataFromServers(0, 0)
            .subscribe(Data => {
                this.branch = Data;
            });
    }

    FromDate: any
    ToDate: any

    getDetailData(branchId, MonthId) {
        this.salesReport = [];


        //  this.FromDate=new Date(FromDate);
        //  this.ToDate=new Date(ToDate); 
        //  if( this.FromDate > this.ToDate){
        //     swal("Please select valid Todate") 
        // }

        // this.isEdit=true;visited_date_to

        //   visited_date_to:Date;

        this.serverService.GetSalesReportdetails_branch(branchId, MonthId, "Get_OrderReport")
            .subscribe(Data => {

                this.salesReport = Data;
                if (this.salesReport.length == 0) {
                    swal("No Data")

                }
            })




    }






    getsalesdatawise(FromDate, ToDate, branchId) {
        this.salesReport = [];

        this.FromDate = new Date(FromDate);
        this.ToDate = new Date(ToDate);
        if (this.FromDate > this.ToDate) {
            swal("Please select valid Todate")
        }

        else {
            this.serverService.GetSalesreportdatewise(FromDate, ToDate, branchId, "Get_OrderReport_date")
                .subscribe(Data => {
                    this.salesReport = Data;
                })
        }

    }




    downloadExcel() {
        // var downloadSalesmanReport = [{ empName: "Employee Name", salesTarget: "Sales Target", pendingOrder: "Pending Order", tillDateSales: "Till Date Sales", collectionTillDate: "Till Date collection", todaysCollection: "Todays Collection", modeOfComunication: "Mode Of Communication", placesVisited: "Place Visted", customer: "Customer", purposeName: "Purpose of Visit", visitedDate: "Visted Date", contactNo: "Contact Number",  ordergiven: "Order Quantity",  collectionDone: "Collection", remarks: "Remarks"}]
        // for(var i=0;i<this.salesTrakcer.length;i++){
        //     downloadSalesmanReport[i+1] = {'empName' : this.salesTrakcer[i].empName+'-'+this.salesTrakcer[i].empId, 'salesTarget':this.salesTrakcer[i].salesTarget , 'pendingOrder':this.salesTrakcer[i].pendingOrder, 'tillDateSales':this.salesTrakcer[i].tillDateSales, 'collectionTillDate':this.salesTrakcer[i].collectionTillDate, 'todaysCollection':this.salesTrakcer[i].todaysCollection, 'modeOfComunication':this.salesTrakcer[i].modeOfComunication, 'placesVisited':this.salesTrakcer[i].placesVisited, 'customer':this.salesTrakcer[i].customer, 'purposeName':this.salesTrakcer[i].purposeName, 'visitedDate':this.salesTrakcer[i].visitedDate, 'contactNo':this.salesTrakcer[i].contactNo, 'ordergiven':this.salesTrakcer[i].ordergiven,    'collectionDone':this.salesTrakcer[i].collectionDone, 'remarks':this.salesTrakcer[i].remarks }
        // }
        // new Angular2Csv(downloadSalesmanReport, 'Salesman Report');

        if (this.salesReport == undefined || this.salesReport == null) {
            swal("Please select")

        }

        if (this.salesReport.length == 0) {
            swal("No Data")

        } else {


            var downloadSalesReport = [{
                order_Ref_Number: "order Ref Number", order_date_time: "order_date_time", branch_Name: "branch_Name", Manager_approved_Date: "Manager_approved_Date",
                manager_name: "manager_name", manager_remarks: "manager_remarks", Dispatch_approved_Date: "Dispatch_approved_Date", dispatchStatus: "dispatchStatus", customer_Name: "customer_Name",
                clusterName: "clusterName", categoryName: "categoryName", Item_Name: "Item_Name", Uom: "Uom", quantity: "quantity", amount: "amount",
                itemTotal: "itemTotal", discount: "discount", pl_Postive_Discount: "pl_Postive_Discount", pl_Negative_discount: "pl_Negative_discount", for_Discount: "for_Discount",
                sub_Total: "sub_Total", cgst: "cgst", sgst: "igst", igst: "sgst", Total: "Total"
            }]

            for (var i = 0; i < this.salesReport.length; i++) {

                downloadSalesReport[i + 1] = {
                    'order_Ref_Number': this.salesReport[i].order_Ref_Number,
                    'order_date_time': this.salesReport[i].order_date_time,
                    'branch_Name': this.salesReport[i].branch_Name,
                    'Manager_approved_Date': this.salesReport[i].Manager_approved_Date,
                    'manager_name': this.salesReport[i].manager_name,
                    'manager_remarks': this.salesReport[i].manager_remarks,
                    'Dispatch_approved_Date': this.salesReport[i].Dispatch_approved_Date,
                    'dispatchStatus': this.salesReport[i].dispatchStatus,
                    'customer_Name': this.salesReport[i].customer_Name,
                    'clusterName': this.salesReport[i].clusterName,
                    'categoryName': this.salesReport[i].categoryName,
                    'Item_Name': this.salesReport[i].Item_Name,
                    'Uom': this.salesReport[i].Uom,
                    'quantity': this.salesReport[i].quantity,
                    'amount': this.salesReport[i].amount,
                    'itemTotal': this.salesReport[i].itemTotal,
                    'discount': this.salesReport[i].discount,
                    'pl_Postive_Discount': this.salesReport[i].pl_Postive_Discount,
                    'pl_Negative_discount': this.salesReport[i].pl_Negative_discount,
                    'for_Discount': this.salesReport[i].for_Discount,
                    'sub_Total': this.salesReport[i].sub_Total,
                    'cgst': this.salesReport[i].cgst,
                    'sgst': this.salesReport[i].sgst,
                    'igst': this.salesReport[i].igst,
                    'Total': this.salesReport[i].itemTotal,

                }





            }



        }
        new Angular2Csv(downloadSalesReport, 'Sales Report');
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
