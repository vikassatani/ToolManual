import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { Role, AddRole, Status } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as myGlobals from '../../../../Global';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./role.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class RoleComponent implements OnInit, AfterViewInit {
    status: Status[];

    errorMessage: String;
    comp_Id: number;


    role: Role[];

    addRole = new AddRole();

    ResponseStatus: string;

    //sorting
    key: string = '';
    reverse: boolean = false;

    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }
    //pagination
    p: number = 1;


    //  onRoleStatusChange(desId)
    //  {
    //      this.addRole.is_Active=desId;
    //      this.serverService.getRoleDataFromServers(0,this.addRole.is_Active)
    //          .subscribe(Data => {
    //               this.role = Data;
    //           });
    //  }

    constructor(private serverService: ServerService, private router: Router) { }

    ngOnInit(): void {

        this.serverService.getStatusDataFromServers(0, 1)

            .subscribe(Data => {
                this.status = Data;
            });

        this.serverService.getRoleDataFromServers(0, 0, 0)

            .subscribe(Data => {
                this.role = Data;
            });

    }


    redirectToRole(roleId) {
        this.router.navigate(['./addRole']);
        myGlobals.setRoleIDValue(roleId)
    }




    deleteRole(roleId) {
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                this.addRole.id = roleId;
                this.serverService.AddRoleDataToServers(this.addRole, "UPDATE")
                    .subscribe(desId => {
                        this.ResponseStatus = desId[0].errorCode;
                        if (this.ResponseStatus == "0") {
                            swal(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                        this.getData();
                    },
                    error => this.errorMessage = <any>error);

            }
        })
    }

    getData() {
        this.serverService.getRoleDataFromServers(0, 0, 0)
            .subscribe(Data => {
                this.role = Data;
            });
    }


    ngAfterViewInit() {

    }
}


