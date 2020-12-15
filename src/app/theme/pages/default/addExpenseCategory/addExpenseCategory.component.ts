import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { AddExpenseCategory } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { NgForm } from '@angular/forms';
import * as myGlobals from '../../../../Global';
import { SettingsComponent } from '../settings/settings.Component';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./addExpenseCategory.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AddExpenseCategoryComponent implements OnInit, AfterViewInit {

    @ViewChild("f") ExpenseForm: NgForm;
    // @ViewChild(SettingsComponent) alert:SettingsComponent;
    ResponseStatus: string;
    expenseCategories: AddExpenseCategory[];
    comp_Id: number;
    id: number;
    Name: string;
    userName: string;
    ipAddress: string;
    deviceId: string;
    login_Id: number;
    token: string;
    mode: string;
    is_Active: number;
    errorMessage: String;
    expenseCategory = new AddExpenseCategory();
    constructor(private serverService: ServerService, private router: Router) {

    }

    omit_special_char(event) {
        var k;
        k = event.charCode;  //         k = event.keyCode;  (Both can be used)
        return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
    }
    onSubmit(): void {
        this.serverService.AddExpenseCategoryDataToServers(this.expenseCategory, "INSERT_EXPENSETYPE")
            .subscribe(expenseCategory => {
                this.ResponseStatus = expenseCategory[0].errorCode;
                if (this.ResponseStatus == "0") {
                    swal({
                        position: 'top-end',
                        type: 'success',
                        title: 'Your Data has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                // this.comp_Id=expenseCategory.comp_Id;
                // this.id=expenseCategory.id;
                // this.Name=expenseCategory.Name;
                // this.userName=expenseCategory.userName;
                // this.ipAddress=expenseCategory.ipAddress;
                // this.deviceId=expenseCategory.deviceId;
                // this.login_Id=expenseCategory.login_Id;
                // this.mode=expenseCategory.mode;
                // this.token=expenseCategory.token;
                // this.is_Active =expenseCategory.is_Active;          
            },
            error => this.errorMessage = <any>error);
    }

    onCancle() {
        myGlobals.setExpenseCategoryIdValue(0);
        this.router.navigate(['./settings'])
    }

    ngOnInit() {
        this.expenseCategory.is_Active = 1;
        if (myGlobals.expenseCategoryId > 0) {
            this.serverService.getExpenseCategoryDataFromServers(myGlobals.expenseCategoryId, 0)
                .subscribe(Data => {

                    this.expenseCategory.id = Data[0].id;
                    this.expenseCategory.Name = Data[0].Name;
                    if (Data[0].is_Active == 1) {
                        this.expenseCategory.is_Active = 1;
                    }
                    else {
                        this.expenseCategory.is_Active = 0;
                    }
                });
        }

    }
    onIsActiveChanged(value) {
        if (value) {
            this.expenseCategory.is_Active = 1;
        } else { this.expenseCategory.is_Active = 2; }

    }
    ngAfterViewInit() {


    }

}



