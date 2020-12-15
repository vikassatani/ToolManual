
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { Observable } from 'rxjs';
import { Expense, ExpenseStatus, AddExpense, ChangePassword, AddClaimExpenseDetails, ClaimExpenseDetails } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import * as myGlobals from '../../../../Global';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
declare var $;
import swal from 'sweetalert2';


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./changePassword.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ChangePasswordComponent implements OnInit, AfterViewInit {

    password: ChangePassword[];
    //comp_Id:number;
    token: string;
    login_Id: number;
    ResponseStatus: any;
    errorMessage: string;
    passw = new ChangePassword();


    constructor(private serverService: ServerService, private router: Router) { }

    onSave(old_password, password, ResetPassword) {
        if (password === ResetPassword) {
            this.serverService.ChangePasswordDetails(this.passw, old_password, password)
                .subscribe(passw => {
                    this.ResponseStatus = passw[0].errorCode;
                    if (this.ResponseStatus == "0") {
                        swal({
                            position: 'top-end',
                            type: 'success',
                            title: 'PASSWORD Reset Succesful!!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }


                },
                error => this.errorMessage = <any>error);
        }
        else {
            swal("Please check the password entered")
        }

    }

    CkeckMatch(password, ResetPassword) {

    }
    ngOnInit(): void {


    }
    ngAfterViewInit() {

    }
}
