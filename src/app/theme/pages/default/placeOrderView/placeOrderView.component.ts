import { Component, OnInit, Input, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';

import { Router } from '@angular/router'
import { Helpers } from '../../../../helpers';
import { Observable } from 'rxjs/Observable';
import { Employee } from '../../../../componentDetails';
import { AddEmployee, EmployeeStatus, OrderApproval } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { ElementRef } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import * as myGlobals from '../../../../Global';
import 'rxjs/add/operator/map';
import swal from 'sweetalert2';
declare var $;

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./placeOrderView.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class PlaceOrderViewComponent implements OnInit, AfterViewInit {
    errorMessage: String;
    ResponseStatus: string;
    date: Date;
    orderApproval: OrderApproval[];

    selectedDate: Date;
    constructor(private serverService: ServerService, private router: Router, private element: ElementRef,
        private _script: ScriptLoaderService) { }
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
    dd: any;
    mm: any;
    yyyy: any;
    today: any;
    addPage() {
        this.router.navigate(['./placeOrder']);
    }
    ngOnInit(): void {
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
        this.selectedDate = this.today;
        this.serverService.getOrderApprovalDataByDateFromServers(this.selectedDate, "GET_ORDER_BY_DATE")
            .subscribe(Data => {
                this.orderApproval = Data;
            })
    }
    getData(date) {
        this.serverService.getOrderApprovalDataByDateFromServers(date, "GET_ORDER_BY_DATE")
            .subscribe(Data => {
                this.orderApproval = Data;
            })
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
