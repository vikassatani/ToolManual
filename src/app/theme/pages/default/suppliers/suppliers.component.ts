import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Supplier, AddSupplier, Status } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import * as myGlobals from '../../../../Global';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import swal from 'sweetalert2';
@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./suppliers.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class SuppliersComponent implements OnInit, AfterViewInit {
    status: Status[];
    supplier: Supplier[];
    errorMessage: String;
    suppliers = new AddSupplier();
    comp_Id: number;

    ResponseStatus: string;
    constructor(private serverService: ServerService, private router: Router) { }

    //sorting
    key: string = '';
    reverse: boolean = false;

    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }
    //pagination
    p: number = 1;

    itemsPerPage: number = 5;
    rowsPerPage: number = 5;
    setPageSize(itemsPerPage) {
        if (itemsPerPage == "") {
            this.itemsPerPage = 5;
        } else {
            this.itemsPerPage = itemsPerPage;
        }
    }

    ngOnInit(): void {

        this.serverService.getSupplierDataFromServers(0, 0)

            .subscribe(Data => {
                this.supplier = Data;
            });

        this.serverService.getStatusDataFromServers(0, 1)

            .subscribe(Data => {
                this.status = Data;
                this.suppliers.status = 0;
            });
    }

    redirect(suppliersId) {
        this.router.navigate(['./addSuppliers']);
        myGlobals.setSupplierIDValue(suppliersId);
    }

    onStatusChange(statusId) {
        this.suppliers.status = statusId;
        this.serverService.getSupplierDataFromServers(0, this.suppliers.status)
            .subscribe(Data => {
                this.supplier = Data;
            });
        // this.deleteBranch.branch_Id=0;
    }
    getData() {
        this.serverService.getSupplierDataFromServers(0, 0)
            .subscribe(Data => {
                this.supplier = Data;
            });
    }

    addPage() {
        myGlobals.setSupplierIDValue(0);
        this.router.navigate(['./addSuppliers']);
    }

    delete(supplierId) {
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
                this.suppliers.supplier_Id = supplierId;
                this.serverService.saveSupplierDetails(this.suppliers, 'DELETE_SUPPLIERS')
                    .subscribe(sid => {
                        this.ResponseStatus = sid[0].errorCode;
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

    ngAfterViewInit() {

    }

}