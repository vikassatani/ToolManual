
import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { AddBranch, Branch, Employee } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { BranchComponent } from '../branch/branch.Component';
import * as myGlobals from '../../../../Global';
import { Router } from '@angular/router';
declare var $;
import swal from 'sweetalert2';
//import * as toastr from '...';

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./addBranch.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AddBranchComponent implements OnInit, AfterViewInit {
    @ViewChild('f') branchForm: NgForm;

    submitted = false;


    employee: Employee[]
    ResponseStatus: string;
    addBranches: AddBranch[];
    errorMessage: String;
    comp_Id: number;
    branch_Id: number;
    is_Active: number;
    login_Id: number;
    userName: string;
    ip_Address: string;
    device_Id: string;
    mode: string;
    token: string;
    branch_Name: string;
    branch_Location: string;
    branch_Address: string;
    branch_Manager: number;
    branch = new AddBranch();


    constructor(private serverService: ServerService, private router: Router, private _script: ScriptLoaderService) { }

    omit_special_char(event) {
        var k;
        k = event.charCode;  //         k = event.keyCode;  (Both can be used)
        return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
    }



    onSubmit(): void {
        this.submitted = true;

        this.serverService.addBranchData(this.branch, "INSERT_BRANCH")
            .subscribe(branch => {
                this.ResponseStatus = branch[0].errorCode;
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


    onCancel(): void {

        myGlobals.setBranchIDValue(0);
        this.router.navigate(['./branch']);

    }
    onIsActiveChanged(value) {
        if (value) {
            this.branch.is_Active = 1;
        } else { this.branch.is_Active = 2; }

    }
    ngOnInit() {
        this.branch.is_Active = 1;

        if (myGlobals.id > 0) {

            this.serverService.getBranchDataFromServers(myGlobals.id, 0)

                .subscribe(Data => {

                    this.branch.branch_Id = Data[0].branch_Id;
                    //this.branch.userName=Data[0].userName;
                    this.branch.branch_Manager = Data[0].branch_Manager;
                    this.branch.branch_Name = Data[0].branch_Name;
                    this.branch.branch_Address = Data[0].branch_Address;
                    this.branch.branch_Location = Data[0].branch_Location;
                    if (Data[0].is_Active == 1) {
                        this.branch.is_Active = 1;
                    }
                    else {
                        this.branch.is_Active = 0;
                    }
                });
        }

        this.branch_Id = 0;

        this.serverService.getEmployeeDataFromServers(0, 0)

            .subscribe(Data => {
                this.employee = Data;
            });
    }


    ngAfterViewInit() {

    }

}
