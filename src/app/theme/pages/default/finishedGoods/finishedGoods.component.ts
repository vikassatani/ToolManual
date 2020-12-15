import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { NgForm } from '@angular/forms';
import { Catalog, FinishedGoods } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import * as myGlobals from '../../../../Global';
import swal from 'sweetalert2';


//addCatalog.parent_Id
//addCatalog.inventory_classification_id
@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./finishedGoods.component.html",
    encapsulation: ViewEncapsulation.None,
})

export class FinishedGoodsComponent implements OnInit, AfterViewInit {

    ArrayList: any;
    //    ArrayList1 : any;
    finish: FinishedGoods[];
    catalog: Catalog[];
    itemDropDown: any;
    uomDropDown: any;
    errorMessage: String;
    ResponseStatus: string;

    //    downloadHoliday:HolidayUpload[];


    constructor(private serverService: ServerService, private router: Router, public http: Http) { }

    year: number;
    years: any;

    onlyNumberKey(event) {
        return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
    }
    finishedGoods: number
    ngOnInit(): void {
        this.ArrayList = [];
        // this.ArrayList1 =  [{'item_Name':'Demo' ,'quantity' : '25','uom':20 ,'edit' : 0 },
        //                     {'item_Name':'Demo1' ,'quantity' : '25','uom':20 ,'edit' : 0 },
        //                     {'item_Name':'Demo2' ,'quantity' : '25','uom':20 ,'edit' : 0 }]

        this.serverService.getCatalogDataFromServers(0, 0, 0, 0, 0)
            .subscribe(Data => {
                this.catalog = Data;
                this.finishedGoods = 0;
            });

    }
    getData(finishedGoods) {
        this.serverService.getFinishedGoodsFromServers(finishedGoods, 0, 0, 'GETITEM')
            .subscribe(Data => {
                this.itemDropDown = Data;
            });
        this.serverService.getFinishedGoodsFromServers(finishedGoods, 0, 0, 'GET')
            .subscribe(Data => {
                this.ArrayList = Data;
            });
        this.serverService.getUOMDataFromServers()
            .subscribe(Data => {
                this.uomDropDown = Data;
            });
    }
    getItemDD(finishedGoods) {
        this.serverService.getFinishedGoodsFromServers(finishedGoods, 0, 0, 'GETITEM')
            .subscribe(Data => {
                this.itemDropDown = Data;
            });
    }
    AddNew(finishedGoods) {
        if (finishedGoods == undefined || finishedGoods == "" || finishedGoods == "0") {
            swal("Please Select Finished Goods");
        } else {

            this.ArrayList.unshift({ 'finished_Good': 0, 'item_Id': "", 'raw_Material_Id': 0, 'quantity': '', 'uom': '', 'item_Name': '', 'uom_Name': '', 'edit': 1 });
            this.serverService.getFinishedGoodsFromServers(finishedGoods, 0, 0, 'GETITEM')
                .subscribe(Data => {
                    this.itemDropDown = Data;
                });

            // this.ArrayList =  [{'item_Name':'' ,'quantity' : '','uom':'' ,'edit' : 1 }]
        }
    }
    close(i) {
        var val = i;
        if (this.ArrayList[val].item_Name == '' && this.ArrayList[val].quantity == '' && this.ArrayList[val].uom == '') {
            this.ArrayList.splice(val, 1);
        } else {
            this.ArrayList[val].edit = 0;
        }
    }
    submit(finishedGoods) {
        for (var i = 0; i < this.ArrayList.length; i++) {
            this.serverService.saveFinishedGoods(this.ArrayList[i], finishedGoods, 'CREATE')
                .subscribe(data => {
                    this.ResponseStatus = data[0].errorCode;


                },
                error => this.errorMessage = <any>error);
        }

        if (this.ResponseStatus == "0") {
            swal({
                position: 'top-end',
                type: 'success',
                title: 'Your Data has been saved',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    Delete(i, finishedGoods) {
        swal({
            title: 'Records will not be able to revert !',
            text: "Are you sure?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                this.serverService.saveFinishedGoods(this.ArrayList[i], finishedGoods, 'DELETE')
                    .subscribe(data => {
                        this.ResponseStatus = data[0].errorCode;
                        if (this.ResponseStatus == "0") {
                            swal(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            this.getData(finishedGoods);
                        }
                    },
                    error => this.errorMessage = <any>error);
            }
        })
    }
    ngAfterViewInit() {

    }
}



