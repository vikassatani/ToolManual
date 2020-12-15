import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { AddSupplier, Country, State, City } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { SuppliersComponent } from '../suppliers/suppliers.component';
import { suppliersId } from '../../../../Global';
import * as myGlobals from '../../../../Global';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./addSuppliers.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AddSuppliersComponent implements OnInit, AfterViewInit {
    @ViewChild('f') Details: NgForm;

    readonly compId: string = JSON.parse(localStorage.getItem('currentUser')).comp_Id;
    readonly roleId: string = JSON.parse(localStorage.getItem('currentUser')).role_Id;
    readonly token: string = JSON.parse(localStorage.getItem('currentUser')).token;
    readonly loginId: string = JSON.parse(localStorage.getItem('currentUser')).login_Id;
    readonly staff_Id: string = JSON.parse(localStorage.getItem('currentUser')).staff_Id;
    readonly branch_Id: string = JSON.parse(localStorage.getItem('currentUser')).branch_Id;
    readonly reporting_Manager: string = JSON.parse(localStorage.getItem('currentUser')).reporting_Manager;
    readonly user_Name: string = JSON.parse(localStorage.getItem('currentUser')).user_Name;

    isEdited = false;
    country: Country[];
    state: State[];
    city: City[];
    suppliers: AddSupplier[];
    errorMessage: String;
    ResponseStatus: string;

    supplierId: number;
    AddSupplier: number;
    getSupplierId: any;

    comp_Id: number;
    supplier_Id: number;
    country_Id: number;
    state_Id: number;
    city_Id: number;
    status: number;
    billing_Rate: Float32Array;
    credit_Limit: Float32Array;
    registration_Number: string;
    supplier_Code: string;
    contact_Person_Name: string;
    contact_Person_Email_Id: string;
    contact_Person_Mobile_No: string;
    address: string;
    company_Name: string;
    pincode: string;
    phone_No: string;
    website: string;
    supplier_Email_Id: string;
    account_No: string;
    pan_No: string;
    fax: string;
    gst_Number: string;
    id_Card: string;
    gst_certificate: string;
    address_Proof: string;
    visiting_Card: string;
    userName: string;
    ipAddress: string;
    device_Id: string;
    login_Id: number;
    //token:string;
    mode: string;
    supplier = new AddSupplier();

    idcard: boolean;
    gst: boolean;
    addres: boolean;
    visiting: boolean;

    idcard1: boolean;
    gst1: boolean;
    addres1: boolean;
    visiting1: boolean;



    constructor(private serverService: ServerService, private router: Router, private http: Http) {

    }

    getState(Countyid) {
        this.serverService.getStateDataFromServers(Countyid)
            .subscribe(Data => {
                this.state = Data;
            });
    }

    getCity(Countyid, StateId) {
        this.serverService.getCityDataFromServers(Countyid, StateId)
            .subscribe(Data => {
                this.city = Data;
            });
    }

    // private dateChanged(newDate) {
    //     this.selectedDeal.EndDate= new Date(newDate);
    //     console.log(this.selectedDeal.EndDate); // <-- for testing
    //   }

    onlyNumberKey(event) {
        return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
    }
    omit_special_char(event) {
        var k;
        k = event.charCode;  //         k = event.keyCode;  (Both can be used)
        return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
    }


    numberAndSpecial(event) {
        let charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 91 && charCode != 92 && charCode != 93 && charCode != 94 && charCode != 95 && charCode != 96 && (charCode < 65 || charCode > 123))
            return false;
        return true;
    }





    onSubmit(): void {

        this.serverService.saveSupplierDetails(this.supplier, "INSERT_SUPPLIER")
            .subscribe(data => {
                this.ResponseStatus = data[0].errorCode;
                if (this.ResponseStatus == "0") {
                    swal({
                        position: 'top-end',
                        type: 'success',
                        title: 'Your Data has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                this.getSupplierId = data[0].Id;
                myGlobals.setSupplierIDValue(this.getSupplierId);
                this.supplier.supplier_Id = this.getSupplierId;
                this.isEdited = true;
            },
            error => this.errorMessage = <any>error);
    }


    onCancel(): void {

        myGlobals.setSupplierIDValue(0);
        this.supplier.supplier_Id = 0;
        this.router.navigate(['./suppliers']);

    }

    upload1: string;
    upload2: string;
    upload3: string;
    upload4: string;
    upload5: string;
    ngOnInit() {

        if (myGlobals.suppliersId > 0) {
            this.isEdited = false;
            this.serverService.getSupplierDataFromServers(myGlobals.suppliersId, 0)

                .subscribe(Data => {
                    this.supplier.supplier_Id = Data[0].supplier_Id;
                    this.supplier.country_Id = Data[0].country_Id;
                    this.supplier.state_Id = Data[0].state_Id;
                    this.supplier.city_Id = Data[0].city_Id;
                    this.supplier.status = Data[0].status;
                    this.supplier.billing_Rate = Data[0].billing_Rate;
                    this.supplier.credit_Limit = Data[0].credit_Limit;
                    this.supplier.registration_Number = Data[0].registration_Number;
                    this.supplier.supplier_Code = Data[0].supplier_Code;
                    this.supplier.contact_Person_Name = Data[0].contact_Person_Name;
                    this.supplier.contact_Person_Email_Id = Data[0].contact_Person_Email_Id;
                    this.supplier.contact_Person_Mobile_No = Data[0].contact_Person_Mobile_No;
                    this.supplier.address = Data[0].address;
                    this.supplier.company_Name = Data[0].company_Name;
                    this.supplier.pincode = Data[0].pincode;
                    this.supplier.phone_No = Data[0].phone_No;
                    this.supplier.website = Data[0].website;
                    this.supplier.supplier_Email_Id = Data[0].supplier_Email_Id;
                    this.supplier.account_No = Data[0].account_No;
                    this.supplier.pan_No = Data[0].pan_No;
                    this.supplier.fax = Data[0].fax;
                    this.supplier.gst_Number = Data[0].gst_Number;


                    this.upload1 = Data[0].id_Card;
                    this.upload2 = Data[0].gst_certificate;
                    this.upload3 = Data[0].address_Proof;
                    this.upload4 = Data[0].visiting_Card;


                    this.supplier.id_Card = "http://localhost:57509/Group/Supplier/" + Data[0].id_Card;
                    this.supplier.gst_certificate = "http://localhost:57509/Group/Supplier/" + Data[0].gst_certificate;
                    this.supplier.address_Proof = "http://localhost:57509/Group/Supplier/" + Data[0].address_Proof;
                    this.supplier.visiting_Card = "http://localhost:57509/Group/Supplier/" + Data[0].visiting_Card;


                    if (this.upload1 == undefined || this.upload1 == "" || this.supplier.id_Card == undefined) {
                        this.idcard = true;
                        this.idcard1 = false;
                    }
                    if (this.upload2 == undefined || this.upload2 == "" || this.supplier.gst_certificate == undefined) {
                        this.gst = true;
                        this.gst1 = false;
                    }
                    if (this.upload3 == undefined || this.upload3 == "" || this.supplier.address_Proof == undefined) {
                        this.addres = true;
                        this.addres1 = false;
                    }
                    if (this.upload4 == undefined || this.upload4 == "" || this.supplier.visiting_Card == undefined) {
                        this.visiting = true;
                        this.visiting1 = false;
                    }


                    this.isEdited = true;
                });
        }

        this.supplier.supplier_Id = 0;
        this.isEdited = false;

        this.serverService.getCountryDataFromServers()
            .subscribe(Data => {
                this.country = Data;
            });

    }

    ResponseCode: any;
    fileuploaderFileChange(event, SuppId, Doctype) {

        let file = event[0];
        let formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        let headers = new Headers()
        // headers.append('Content-Type', 'json');  
        // headers.append('Accept', 'application/json');  
        headers.append('compId', this.compId);
        headers.append('suppierId', SuppId);
        headers.append('loginid', this.loginId);
        headers.append('token', this.token);
        headers.append('documentType', Doctype);
        headers.append('filepath', 'Group/Supplier');
        headers.append('filename', file.name);
        let options = new RequestOptions({ headers: headers });
        this.http.post("http://localhost:57509/api/Supplier/DocumentUpdate", formData, options)
            .map(res => res.json())
            .catch(error => Observable.throw(error))
            .subscribe(
            Data => {
                this.ResponseCode = Data.ResponseCode;
                // if(this.ResponseCode=="0000")
                // {
                // swal({
                //     position: 'top-end',
                //     type: 'success',
                //     title: 'Your Data has been saved',
                //     showConfirmButton: false,
                //     timer: 1500
                //   });
                // }
            })


    }

    ngAfterViewInit() {

    }

}