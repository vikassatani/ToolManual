
import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { AddBranch, Branch, Employee, Customer, SalesmenReportDetails, AddSalesReport } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { BranchComponent } from '../branch/branch.Component';
import * as myGlobals from '../../../../Global';
import { Router } from '@angular/router';
declare var $;
import swal from 'sweetalert2';
//import * as toastr from '...';

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./addSalesReport.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AddSalesReportComponent implements OnInit, AfterViewInit {
    customer: Customer[];
    ResponseStatus: string;
    salesReportDetails: SalesmenReportDetails[]

    addSales: AddSalesReport[];
    visited_date: Date;
    customer_Id: number;
    customer_name: string;
    contact_Number: string;
    location_name: string;
    mode_of_communication: number;
    purpose_of_visit: string;
    pending_Orders: Float32Array;
    pending_Order_Uom: number;
    sales: Float32Array;
    sales_Uom: number;
    collection_in_rs: Float32Array;
    remarks: string;
    manager_Remarks: string;
    errorMessage: string;
    errorCode: string;
    addSalesReport = new AddSalesReport();


    constructor(private serverService: ServerService, private router: Router, private _script: ScriptLoaderService) { }
    downloadExcel() {

    }


    onSubmit(): void {
        this.serverService.saveSalesmenreportDetails(this.addSalesReport)
            .subscribe(addSalesReport => {
                this.ResponseStatus = addSalesReport[0].errorCode;
                if (this.ResponseStatus == "0") {
                    swal({
                        position: 'top-end',
                        type: 'success',
                        title: 'Your Data has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }


            },
            error => this.errorMessage = <any>error);
    }

    dd: any;
    mm: any;
    yyyy: any;
    today: any;
    ngOnInit() {

        this.today = new Date();
        this.dd = this.today.getDate();
        this.mm = this.today.getMonth() + 1; //January is 0!
        this.yyyy = this.today.getFullYear();
        if (this.dd < 10) {
            this.dd = '0' + this.dd
        }
        if (this.mm < 10) {
            this.mm = '0' + this.mm
        }
        this.today = this.mm + '/' + this.dd + '/' + this.yyyy;

        //     this.serverService.GetSalesmenreportDetails(0,FromDate,ToDate,"GET")
        // .subscribe(Data =>{
        //     this.salesReportDetails = Data;
        // }) 

        this.serverService.getCustomerDataFromServers(0, -1)

            .subscribe(Data => {
                this.customer = Data;
            });

    }
    FromDate: Date;
    ToDate: Date;
    getData(FromDate, ToDate) {
        this.FromDate = FromDate
        this.ToDate = ToDate
        // this.serverService.GetSalesmenreportDetails(0,FromDate,ToDate,"GET")
        // .subscribe(Data =>{
        //     this.salesReportDetails = Data;
        // })

    }
    onStatusChange(CustomerId) {
        if (CustomerId == "") {
            this.serverService.GetSalesmenreportDetails(0, this.FromDate, this.ToDate, "GET")
                .subscribe(Data => {
                    this.salesReportDetails = Data;
                })
        }
        else {
            this.serverService.GetSalesmenreportDetails(CustomerId, this.FromDate, this.ToDate, "GET")
                .subscribe(Data => {
                    this.salesReportDetails = Data;
                })
        }


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
