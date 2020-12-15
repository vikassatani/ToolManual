

import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ServerService } from '../../../../server.service';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Branch, CompanyRole, UserType, MainMenu, Role, UserRoleAssign } from '../../../../componentDetails';
import { ViewChild } from '@angular/core';
import 'rxjs/add/operator/map';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./menuAssign.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class MenuAssignComponent implements OnInit, AfterViewInit {
    ResponseStatus: string;
    errorMessage: String;

    userType: UserType[];
    company: CompanyRole[];
    mainMenu: MainMenu[];
    role: Role[];
    userRoleAssign: UserRoleAssign[];
    userAssign = new UserRoleAssign();

    constructor(private serverService: ServerService, public http: Http) { }

    ngOnInit(): void {
        this.serverService.getRoleCompanyDropDownDataFromServers()
            .subscribe(Data => {
                this.company = Data;
                this.serverService.getUserTypeDropDownDataFromServers()
                    .subscribe(Data => {
                        this.userType = Data;
                        this.serverService.geMainMenuDropDownDataFromServers()
                            .subscribe(Data => {
                                this.mainMenu = Data;
                            });
                    });
            });
    }

    getRole(userType) {
        this.serverService.getRoleDataFromServers(userType, 0, 0)
            .subscribe(Data => {
                this.role = Data;
            });
    }

    getRoleAssignData(role, mainmenu) {
        this.serverService.getMenuAssignDataFromServers(role, mainmenu)
            .subscribe(Data => {
                this.userRoleAssign = Data;
            });
    }

    updateRoleAssign(role, mainmenu) {
        for (var i = 0; i < this.userRoleAssign.length; i++) {
            if (this.userRoleAssign[i].is_Active) {
                this.userRoleAssign[i].is_Active = 1;
            } else { this.userRoleAssign[i].is_Active = 0; }
            this.userAssign = this.userRoleAssign[i];
            this.serverService.updateRoleAssignDataToServers(role, mainmenu, this.userAssign, "UPDATE")
                .subscribe(Data => {
                    this.ResponseStatus = Data.ResponseCode;
                },
                error => this.errorMessage = <any>error);
        }
        swal({
            position: 'top-end',
            type: 'success',
            title: 'Your Data has been saved',
            showConfirmButton: false,
            timer: 1500
        });
        this.getRoleAssignData(role, mainmenu);
    }
    exportSubmenu() {
        this.serverService.exportSubMenuDataToServers()
            .subscribe(Data => {
                this.ResponseStatus = Data.ResponseCode;
            },
            error => this.errorMessage = <any>error);
    }
    ngAfterViewInit() {
    }
}
