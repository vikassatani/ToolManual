import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { AddLeaveTypes } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { NgForm } from '@angular/forms';
import * as myGlobals from '../../../../Global';
import { SettingsComponent } from '../settings/settings.Component';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./addLeaveTypes.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AddLeaveTypesComponent implements OnInit, AfterViewInit {

    @ViewChild("f") LeaveTypeForm: NgForm;

    ResponseStatus: string;
    leaveTypes: AddLeaveTypes[];
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
    leaveType = new AddLeaveTypes();
    constructor(private serverService: ServerService, private router: Router) {

    }

    omit_special_char(event) {
        var k;
        k = event.charCode;  //         k = event.keyCode;  (Both can be used)
        return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
    }
    onSubmit(): void {

        this.serverService.AddLeaveTypeDataToServers(this.leaveType, "INSERT_LEAVE")
            .subscribe(leaveType => {
                this.ResponseStatus = leaveType[0].errorCode;
                if (this.ResponseStatus == "0") {
                    swal({
                        position: 'top-end',
                        type: 'success',
                        title: 'Your Data has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                this.comp_Id = leaveType.comp_Id;
                this.id = leaveType.id;
                this.Name = leaveType.Name;
                this.no_Of_Days = leaveType.no_Of_Days;
                this.userName = leaveType.userName;
                this.ipAddress = leaveType.ipAddress;
                this.deviceId = leaveType.deviceId;
                this.login_Id = leaveType.login_Id;
                this.mode = leaveType.mode;
                this.token = leaveType.token;
                this.is_Active = leaveType.is_Active;
            },
            error => this.errorMessage = <any>error);
    }

    onCancle() {
        myGlobals.setLeaveTypeIDValue(0);
        this.router.navigate(['./settings']);
    }
    ngOnInit() {
        this.leaveType.is_Active = 1;
        if (myGlobals.leaveTypesId > 0) {

            this.serverService.getLeaveTypesDataFromServers(myGlobals.leaveTypesId, 0)

                .subscribe(Data => {
                    this.leaveType.id = Data[0].id;
                    this.leaveType.Name = Data[0].Name;
                    this.leaveType.no_Of_Days = Data[0].no_Of_Days;
                    if (Data[0].is_Active == 1) {
                        this.leaveType.is_Active = 1;
                    }
                    else {
                        this.leaveType.is_Active = 0;
                    }
                });

        }
    }
    // ngAfterViewInit() {
    //     this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
    //         'assets/demo/default/custom/components/datatables/base/html-table.js');

    // }
    onIsActiveChanged(value) {
        if (value) {
            this.leaveType.is_Active = 1;
        } else { this.leaveType.is_Active = 2; }

    }
    ngAfterViewInit() {


    }

}