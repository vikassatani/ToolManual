import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { AddDepartment } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { NgForm } from '@angular/forms';
import * as myGlobals from '../../../../Global';
import { SettingsComponent } from '../settings/settings.Component';
import { Router } from '@angular/router';
import { setDepartmentIDValue, departmentId } from '../../../../Global';
import swal from 'sweetalert2';
@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./addDepartments.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AddDepartmentsComponent implements OnInit, AfterViewInit {
    @ViewChild('f') DepartmentForm: NgForm;


    omit_special_char(event) {
        var k;
        k = event.charCode;  //         k = event.keyCode;  (Both can be used)
        return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
    }
    submitted = false;

    ResponseStatus: string;
    departments: AddDepartment[];
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
    department = new AddDepartment();
    constructor(private serverService: ServerService, private router: Router) {

    }
    onSubmit(): void {
        this.submitted = true;

        this.serverService.AddDepartmentDataToServers(this.department, "INSERT_DEPARTMENT")
            .subscribe(department => {
                this.ResponseStatus = department[0].errorCode;
                if (this.ResponseStatus == "0") {
                    swal({
                        position: 'top-end',
                        type: 'success',
                        title: 'Your Data has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                // this.comp_Id=department.comp_Id;
                // this.id=department.id;
                // this.Name=department.Name;
                // this.userName=department.userName;
                // this.ipAddress=department.ipAddress;
                // this.deviceId=department.deviceId;
                // this.login_Id=department.login_Id;
                // this.mode=department.mode;
                // this.token=department.token;
                // this.is_Active = department.is_Active;          
            },
            error => this.errorMessage = <any>error);
    }
    ngOnInit() {
        this.department.is_Active = 1;
        if (myGlobals.departmentId > 0) {
            this.serverService.getDepartmentDataFromServers(myGlobals.departmentId, 0)

                .subscribe(Data => {
                    this.department.id = Data[0].id;
                    this.department.Name = Data[0].Name;
                    if (Data[0].is_Active == 1) {
                        this.department.is_Active = 1;
                    }
                    else {
                        this.department.is_Active = 0;
                    }
                });

        }

    }

    onCancle() {
        myGlobals.setDepartmentIDValue(0);
        this.router.navigate(['./settings']);
    }

    onIsActiveChanged(value) {
        if (value) {
            this.department.is_Active = 1;
        } else { this.department.is_Active = 2; }

    }

    ngAfterViewInit() {

    }

}