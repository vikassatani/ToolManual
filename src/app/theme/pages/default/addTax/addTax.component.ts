import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { Tax } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { NgForm } from '@angular/forms';
import * as myGlobals from '../../../../Global';
import { SettingsComponent } from '../settings/settings.Component';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./addTax.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AddTaxComponent implements OnInit, AfterViewInit {

    @ViewChild("f") LeaveTypeForm: NgForm;

    ResponseStatus: string;
    comp_Id: number;
    id: number;
    Name: string;
    no_Of_Days: number;
    userName: string;
    ipAddress: string;
    deviceId: string;
    login_Id: number;
    token: string;
    mode: string;
    is_Active: number;
    errorMessage: String;
    tax = new Tax();



    constructor(private serverService: ServerService, private router: Router) {

    }
    onSubmit(): void {
        this.serverService.AddTaxDataToServers(this.tax, "INSERTTAX")
            .subscribe(tax => {
                this.ResponseStatus = tax[0].errorCode;
                if (this.ResponseStatus == "0") {
                    swal({
                        position: 'top-end',
                        type: 'success',
                        title: 'Your Data has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.onCancle();
                }
            },
            error => this.errorMessage = <any>error);
    }

    onCancle() {
        myGlobals.setLeaveTypeIDValue(0);
        this.router.navigate(['./settings']);
    }

    ngOnInit() {
        this.tax.status = 1;
        if (myGlobals.TaxId > 0) {
            this.serverService.getTaxDataFromServers(myGlobals.TaxId, 0)
                .subscribe(Data => {
                    this.tax.tax_Id = Data[0].tax_Id;
                    this.tax.tax_Name = Data[0].tax_Name;
                    this.tax.percentage = Data[0].percentage;

                    if (Data[0].status == 1) {
                        this.tax.status = 1;
                    }
                    else {
                        this.tax.status = 0;
                    }
                });
        }
    }
    // ngAfterViewInit() {
    //     this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
    //         'assets/demo/default/custom/components/datatables/base/html-table.js');

    // }
    onlyDecimalNumberKey(event) {
        let charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 46 && charCode > 31
            && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }

    onIsActiveChanged(value) {
        if (value) {
            this.tax.status = 1;
        } else { this.tax.status = 2; }
    }

    ngAfterViewInit() {


    }

}