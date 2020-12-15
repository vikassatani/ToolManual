import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { AddTeam, Branch, Employee } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { NgForm } from '@angular/forms';
import * as myGlobals from '../../../../Global';
import { SettingsComponent } from '../settings/settings.Component';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./addTeam.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AddTeamComponent implements OnInit, AfterViewInit {

    @ViewChild("f") AddTeamForm: NgForm;
    isEdited = false;
    ResponseStatus: string;

    branch: Branch[];
    employee: Employee[];
    teams: AddTeam[];
    comp_Id: number;
    branch_Id: number;
    team_Id: number;
    team_Manager: number;
    login_Id: number;
    status: number;
    token: string;
    team_Name: string;
    userName: string;
    ipAddress: string;
    device_Id: string;
    mode: string;
    errorMessage: String;
    team = new AddTeam();
    constructor(private serverService: ServerService, private router: Router) {

    }

    omit_special_char(event) {
        var k;
        k = event.charCode;  //         k = event.keyCode;  (Both can be used)
        return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
    }
    onSubmit(): void {

        this.serverService.AddTeamDataToServers(this.team, "INSERT_TEAM")
            .subscribe(team => {
                this.ResponseStatus = team[0].errorCode;
                if (this.ResponseStatus == "0") {
                    swal({
                        position: 'top-end',
                        type: 'success',
                        title: 'Your Data has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                this.comp_Id = team.comp_Id;
                this.branch_Id = team.branch_Id;
                this.team_Id = team.team_Id;
                this.team_Manager = team.team_Manager;
                this.team_Name = team.team_Name;
                this.userName = team.userName;
                this.ipAddress = team.ipAddress;
                this.login_Id = team.login_Id;
                this.token = team.token;
            },
            error => this.errorMessage = <any>error);
    }

    onCancle() {
        myGlobals.setTeamIDValue(0, 0, 0);
        this.router.navigate(['./settings']);
    }
    ngOnInit() {
        this.team.status = 1;
        if (myGlobals.teamId > 0) {
            this.isEdited = true;
            this.serverService.getTeamDataFromServers(myGlobals.tbranchId, myGlobals.teamId, myGlobals.teamManagerId, 0)

                .subscribe(Data => {
                    this.team.branch_Id = Data[0].branch_Id;
                    this.team.team_Id = Data[0].team_Id;
                    this.team.team_Manager = Data[0].team_Manager;
                    this.team.team_Name = Data[0].team_Name;
                    if (Data[0].status == 1) {
                        this.team.status = 1;
                    }
                    else {
                        this.team.status = 0;
                    }
                });
        }
        this.serverService.getBranchDataFromServers(0, 0)
            .subscribe(Data => {
                this.branch = Data;
            })

        this.serverService.getEmployeeDataFromServers(0, 0)

            .subscribe(Data => {
                this.employee = Data;
            });
    }
    onIsActiveChanged(value) {
        if (value) {
            this.team.status = 1;
        } else { this.team.status = 2; }

    }

    ngAfterViewInit() {


    }

}