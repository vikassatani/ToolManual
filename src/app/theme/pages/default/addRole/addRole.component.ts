import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { AddRole, CompanyRole, RoleHomePage, UserType } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { NgForm } from '@angular/forms';
import * as myGlobals from '../../../../Global';
import { SettingsComponent } from '../settings/settings.Component';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./addRole.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AddRoleComponent implements OnInit, AfterViewInit {
    @ViewChild("f") DesignationForm: NgForm;


    numberAndSpecial(event) {
        let charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 91 && charCode != 92 && charCode != 93 && charCode != 94 && charCode != 95 && charCode != 96 && (charCode < 65 || charCode > 123))
            return false;
        return true;
    }
    Submitted = false;
    ResponseStatus: string;

    roles: AddRole[];
    company: CompanyRole[];
    homePage: RoleHomePage[];
    userType: UserType[];
    errorMessage: string;
    comp_Id: number;
    role_Id: number;
    sub_Menu_Id: number;
    role_Type_Id: number;
    role_Name: string;
    role_Display_Name: string;
    role_Description: string;
    role_Home_Page: string;
    is_Active: number;
    ip_Address: string;
    user_Name: string;
    token: string;
    mode: string;
    login_Id: number;
    addRole = new AddRole();
    constructor(private serverService: ServerService, private router: Router) {

    }
    onSubmit(): void {
        this.Submitted = true;
        this.serverService.AddRoleDataToServers(this.addRole, "INSERT")
            .subscribe(addRole => {
                this.ResponseStatus = addRole.ResponseCode;
                if (this.ResponseStatus == "0") {
                    swal({
                        position: 'top-end',
                        type: 'success',
                        title: 'Your Data has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    myGlobals.setRoleIDValue(0);
                    //this.router.navigate(['./role'])
                }
                else {
                    swal('Role Name already Exists...')
                }
            },
            error => this.errorMessage = <any>error);
    }

    onCancle() {
        myGlobals.setRoleIDValue(0);
        this.router.navigate(['./role'])
    }


    ngOnInit() {
        this.addRole.is_Active = 1;
        this.serverService.getRoleCompanyDropDownDataFromServers()
            .subscribe(Data => {
                this.company = Data;
                this.serverService.getHomePageDropDownDataFromServers()
                    .subscribe(Data => {
                        this.homePage = Data;
                        this.serverService.getUserTypeDropDownDataFromServers()
                            .subscribe(Data => {
                                this.userType = Data;
                                if (myGlobals.roleId > 0) {
                                    this.serverService.getRoleDataFromServers(1, myGlobals.roleId, 0)
                                        .subscribe(Data => {
                                            this.addRole.comp_Id = Data[0].comp_Id;
                                            this.addRole.role_Id = Data[0].role_Id;
                                            this.addRole.role_Name = Data[0].role_Name;
                                            this.addRole.role_Display_Name = Data[0].role_Display_Name;
                                            this.addRole.role_Description = Data[0].role_Description;
                                            this.addRole.sub_Menu_Id = Data[0].sub_Menu_Id;
                                            this.addRole.role_Type_Id = Data[0].role_Type_Id;
                                            this.addRole.is_Active = Data[0].is_Active;
                                            if (Data[0].is_Active == 1) {
                                                this.addRole.is_Active = 1;
                                            }
                                            else {
                                                this.addRole.is_Active = 0;
                                            }
                                        });
                                }
                                else {
                                    myGlobals.setRoleIDValue(0);
                                }
                            });
                    });
            });

    }
    // ngAfterViewInit() {
    //     this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
    //         'assets/demo/default/custom/components/datatables/base/html-table.js');

    // }
    onIsActiveChanged(value) {
        if (value) {
            this.addRole.is_Active = 1;
        } else { this.addRole.is_Active = 2; }

    }
    ngAfterViewInit() {

    }

}