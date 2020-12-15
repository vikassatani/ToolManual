import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { Branch, AddBranch, Status } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { NgForm } from '@angular/forms';
//import { ServerService } from './server.service';
//import {HttpClient,HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import * as myGlobals from '../../../../Global';
//import { Branch, IBranch } from './branchDetails'
declare var jquery: any;
declare var $: any;
import swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown/public_api';
@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./branch.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class BranchComponent implements OnInit, AfterViewInit {

    status: Status[];

    branches: Branch[];
    branchForDDL: Branch[];
    //branch_Name:string;

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
    deleteBranch = new AddBranch();
    // comp_Id:number;
    selected;
    selectedData;

    ResponseStatus: string;
    dropdownList = [
        { item_id: 1, item_text: 'Images' },
        { item_id: 2, item_text: 'Vendor Names' },
        { item_id: 3, item_text: 'Vendor PN' },
        { item_id: 4, item_text: 'Simens PN' },
        { item_id: 5, item_text: 'System/Subsystem' },
        { item_id: 6, item_text: 'Product Description' }
    ];
    dropdownSettings: IDropdownSettings = {
        singleSelection: false,
        enableCheckAll: false,
        idField: 'item_id',
        textField: 'item_text',
        itemsShowLimit: 1,
        allowSearchFilter: false,
        showSelectedItemsAtTop: false
    };

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


    constructor(private serverService: ServerService, private router: Router) {
        this.selectedData = this.branches;
    }

    ngOnInit(): void {

        this.serverService.getBranchDataFromServers(0, 0)

            .subscribe(Data => {
                let data = Data;
                this.branches = data;
            });

        this.serverService.getStatusDataFromServers(0, 1)

            .subscribe(Data => {
                this.status = Data;
                this.deleteBranch.is_Active = 0;
            });
    }

    redirect(id) {
        this.router.navigate(['./addBranch']);
        myGlobals.setBranchIDValue(id);

    }
    delete(branchId) {
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
                this.deleteBranch.branch_Id = branchId;
                this.serverService.addBranchData(this.deleteBranch, "DELETE_BRANCH")
                    .subscribe(id => {
                        this.ResponseStatus = id[0].errorCode;
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
        });

    }
    getData() {
        this.serverService.getBranchDataFromServers(0, 0)

            .subscribe(Data => {
                this.branches = Data;
            });
    }
    // onFilter(id){

    //     this.deleteBranch.branch_Id=id;
    //     this.serverService.getBranchDataFromServers(this.deleteBranch.branch_Id)
    //     .subscribe(Data => {
    //         this.branches = Data;
    //     });
    //    // this.deleteBranch.branch_Id=0;
    //   }
    onStatusChange(statusId) {
        this.deleteBranch.is_Active = statusId;
        this.serverService.getBranchDataFromServers(0, this.deleteBranch.is_Active)
            .subscribe(Data => {
                this.branches = Data;
            });
        // this.deleteBranch.branch_Id=0;
    }
    pageSize: number;
    noofrecords = 5;
    setSize(pageSize) {
        if (pageSize == "") {
            this.pageSize = this.noofrecords;
        }
        else {
            this.pageSize = pageSize;
        }
    }

    ngAfterViewInit() {
        //     var DatatableDataLocalDemo = function() {
        //         var e = function() {
        //             var e = JSON.parse('[{"COMPANY_ID":1,"BRANCH_ID":1,"BRANCH_NAME":"Salem","BRANCH_ADDRESS":"652, First Floor, Doddanekkundi Main Road, Pragathi Layout, Doddanekkundi, Bengaluru, Karnataka 560037","BRANCH_LOCATION":"Bangalore","BRANCH_MANAGER":"Dinesh","PAN_NUMBER":"BVID2323L","GST_NUMBER":"123ASD321","PHONE":"9916775405","FAX":"9916775405","EMAIL":"Lrjramkumar@gmail.com","CONTACT_PERSON_NAME":"Prasanth","CONTACT_PERSON_DESIGNATION":"Manager","CONTACT_PERSON_MOBILE":"9677488455","EXISTING_SUPPLIER":"LRJR","BUSINESS_NATURE":"Builders","START_DATE":"2017-11-28","ANNUAL_TURNOVER":"20000","REFERRED_BY":"Ramnath","CREDIT_LIMIT":"15000","CREDIT_DAYS":15,"MODE_OF_PAYMENT":"online","PAN_DOCUMENT":1,"ID_CARD_DOCUMENT":1,"ADDRESS_PROOF":1,"GST_CERTIFICATE":1,"CUSTOMER_TYPE":1,"IS_APPROVED":1,"CREATED_DATE":"2017-11-28","CREATED_USER_ID":"Lloyd","APPROVED_USER_ID":"Vasu","APPROVED_DATE":"2017-11-28","DEVICE_IP_ID":"192.168.2.6","MODIFIED_DATE":"2017-11-28","MODIFIED_USER_ID":"lloyd","DELETE_FLAG":0},{"COMPANY_ID":1,"BRANCH_ID":2,"BRANCH_NAME":"Hubli","BRANCH_ADDRESS":"N Fort Rd, Parrys, George Town, Chennai, Tamil Nadu 600104","BRANCH_LOCATION":"Chennai","BRANCH_MANAGER":"Sriram","PAN_NUMBER":"BVID2323L","GST_NUMBER":"123ASD321","PHONE":"9916775405","FAX":"9916775405","EMAIL":"Lrjramkumar@gmail.com","CONTACT_PERSON_NAME":"Prasanth","CONTACT_PERSON_DESIGNATION":"Manager","CONTACT_PERSON_MOBILE":"9677488455","EXISTING_SUPPLIER":"LRJR","BUSINESS_NATURE":"Builders","START_DATE":"2017-11-28","ANNUAL_TURNOVER":"20000","REFERRED_BY":"Ramnath","CREDIT_LIMIT":"15000","CREDIT_DAYS":15,"MODE_OF_PAYMENT":"online","PAN_DOCUMENT":1,"ID_CARD_DOCUMENT":1,"ADDRESS_PROOF":1,"GST_CERTIFICATE":1,"CUSTOMER_TYPE":1,"IS_APPROVED":1,"CREATED_DATE":"2017-11-28","CREATED_USER_ID":"Lloyd","APPROVED_USER_ID":"Vasu","APPROVED_DATE":"2017-11-28","DEVICE_IP_ID":"192.168.2.6","MODIFIED_DATE":"2017-11-28","MODIFIED_USER_ID":"lloyd","DELETE_FLAG":0},{"COMPANY_ID":1,"BRANCH_ID":3,"BRANCH_NAME":"Hospet","BRANCH_ADDRESS":"Hydrabad","BRANCH_LOCATION":"Hydrabad","BRANCH_MANAGER":"Lokesh","PAN_NUMBER":"BVID2323L","GST_NUMBER":"123ASD321","PHONE":"9916775405","FAX":"9916775405","EMAIL":"Lrjramkumar@gmail.com","CONTACT_PERSON_NAME":"Prasanth","CONTACT_PERSON_DESIGNATION":"Manager","CONTACT_PERSON_MOBILE":"9677488455","EXISTING_SUPPLIER":"LRJR","BUSINESS_NATURE":"Builders","START_DATE":"2017-11-28","ANNUAL_TURNOVER":"20000","REFERRED_BY":"Ramnath","CREDIT_LIMIT":"15000","CREDIT_DAYS":15,"MODE_OF_PAYMENT":"online","PAN_DOCUMENT":1,"ID_CARD_DOCUMENT":1,"ADDRESS_PROOF":1,"GST_CERTIFICATE":1,"CUSTOMER_TYPE":1,"IS_APPROVED":1,"CREATED_DATE":"2017-11-28","CREATED_USER_ID":"Lloyd","APPROVED_USER_ID":"Vasu","APPROVED_DATE":"2017-11-28","DEVICE_IP_ID":"192.168.2.6","MODIFIED_DATE":"2017-11-28","MODIFIED_USER_ID":"lloyd","DELETE_FLAG":0},{"COMPANY_ID":1,"BRANCH_ID":4,"BRANCH_NAME":"Banglore","BRANCH_ADDRESS":"Bangalore","BRANCH_LOCATION":"Bangalore","BRANCH_MANAGER":"Rohan","PAN_NUMBER":"BVID2323L","GST_NUMBER":"123ASD321","PHONE":"9916775405","FAX":"9916775405","EMAIL":"Lrjramkumar@gmail.com","CONTACT_PERSON_NAME":"Prasanth","CONTACT_PERSON_DESIGNATION":"Manager","CONTACT_PERSON_MOBILE":"9677488455","EXISTING_SUPPLIER":"LRJR","BUSINESS_NATURE":"Builders","START_DATE":"2017-11-28","ANNUAL_TURNOVER":"20000","REFERRED_BY":"Ramnath","CREDIT_LIMIT":"15000","CREDIT_DAYS":15,"MODE_OF_PAYMENT":"online","PAN_DOCUMENT":1,"ID_CARD_DOCUMENT":1,"ADDRESS_PROOF":1,"GST_CERTIFICATE":1,"CUSTOMER_TYPE":1,"IS_APPROVED":1,"CREATED_DATE":"2017-11-28","CREATED_USER_ID":"Lloyd","APPROVED_USER_ID":"Vasu","APPROVED_DATE":"2017-11-28","DEVICE_IP_ID":"192.168.2.6","MODIFIED_DATE":"2017-11-28","MODIFIED_USER_ID":"lloyd","DELETE_FLAG":0},{"COMPANY_ID":1,"BRANCH_ID":5,"BRANCH_NAME":"Hydrabad","BRANCH_ADDRESS":"Anantapur","BRANCH_LOCATION":"Anantapur","BRANCH_MANAGER":"pranav","PAN_NUMBER":"BVID2323L","GST_NUMBER":"123ASD321","PHONE":"9916775405","FAX":"9916775405","EMAIL":"Lrjramkumar@gmail.com","CONTACT_PERSON_NAME":"Prasanth","CONTACT_PERSON_DESIGNATION":"Manager","CONTACT_PERSON_MOBILE":"9677488455","EXISTING_SUPPLIER":"LRJR","BUSINESS_NATURE":"Builders","START_DATE":"2017-11-28","ANNUAL_TURNOVER":"20000","REFERRED_BY":"Ramnath","CREDIT_LIMIT":"15000","CREDIT_DAYS":15,"MODE_OF_PAYMENT":"online","PAN_DOCUMENT":1,"ID_CARD_DOCUMENT":1,"ADDRESS_PROOF":1,"GST_CERTIFICATE":1,"CUSTOMER_TYPE":1,"IS_APPROVED":1,"CREATED_DATE":"2017-11-28","CREATED_USER_ID":"Lloyd","APPROVED_USER_ID":"Vasu","APPROVED_DATE":"2017-11-28","DEVICE_IP_ID":"192.168.2.6","MODIFIED_DATE":"2017-11-28","MODIFIED_USER_ID":"lloyd","DELETE_FLAG":0},{"COMPANY_ID":1,"BRANCH_ID":6,"BRANCH_NAME":"Hubli","BRANCH_ADDRESS":"Nellore","BRANCH_LOCATION":"Nellore","BRANCH_MANAGER":"Santhosh","PAN_NUMBER":"BVID2323L","GST_NUMBER":"123ASD321","PHONE":"9916775405","FAX":"9916775405","EMAIL":"Lrjramkumar@gmail.com","CONTACT_PERSON_NAME":"Prasanth","CONTACT_PERSON_DESIGNATION":"Manager","CONTACT_PERSON_MOBILE":"9677488455","EXISTING_SUPPLIER":"LRJR","BUSINESS_NATURE":"Builders","START_DATE":"2017-11-28","ANNUAL_TURNOVER":"20000","REFERRED_BY":"Ramnath","CREDIT_LIMIT":"15000","CREDIT_DAYS":15,"MODE_OF_PAYMENT":"online","PAN_DOCUMENT":1,"ID_CARD_DOCUMENT":1,"ADDRESS_PROOF":1,"GST_CERTIFICATE":1,"CUSTOMER_TYPE":1,"IS_APPROVED":1,"CREATED_DATE":"2017-11-28","CREATED_USER_ID":"Lloyd","APPROVED_USER_ID":"Vasu","APPROVED_DATE":"2017-11-28","DEVICE_IP_ID":"192.168.2.6","MODIFIED_DATE":"2017-11-28","MODIFIED_USER_ID":"lloyd","DELETE_FLAG":0},{"COMPANY_ID":1,"BRANCH_ID":7,"BRANCH_NAME":"Salem","BRANCH_ADDRESS":"Bangalore","BRANCH_LOCATION":"Bangalore","BRANCH_MANAGER":"Nikilesh","PAN_NUMBER":"BVID2323L","GST_NUMBER":"123ASD321","PHONE":"9916775405","FAX":"9916775405","EMAIL":"Lrjramkumar@gmail.com","CONTACT_PERSON_NAME":"Prasanth","CONTACT_PERSON_DESIGNATION":"Manager","CONTACT_PERSON_MOBILE":"9677488455","EXISTING_SUPPLIER":"LRJR","BUSINESS_NATURE":"Builders","START_DATE":"2017-11-28","ANNUAL_TURNOVER":"20000","REFERRED_BY":"Ramnath","CREDIT_LIMIT":"15000","CREDIT_DAYS":15,"MODE_OF_PAYMENT":"online","PAN_DOCUMENT":1,"ID_CARD_DOCUMENT":1,"ADDRESS_PROOF":1,"GST_CERTIFICATE":1,"CUSTOMER_TYPE":1,"IS_APPROVED":1,"CREATED_DATE":"2017-11-28","CREATED_USER_ID":"Lloyd","APPROVED_USER_ID":"Vasu","APPROVED_DATE":"2017-11-28","DEVICE_IP_ID":"192.168.2.6","MODIFIED_DATE":"2017-11-28","MODIFIED_USER_ID":"lloyd","DELETE_FLAG":0},{"COMPANY_ID":1,"BRANCH_ID":8,"BRANCH_NAME":"Hubli","BRANCH_ADDRESS":"Bangalore","BRANCH_LOCATION":"Bangalore","BRANCH_MANAGER":"Adinarayanan","PAN_NUMBER":"BVID2323L","GST_NUMBER":"123ASD321","PHONE":"9916775405","FAX":"9916775405","EMAIL":"Lrjramkumar@gmail.com","CONTACT_PERSON_NAME":"Prasanth","CONTACT_PERSON_DESIGNATION":"Manager","CONTACT_PERSON_MOBILE":"9677488455","EXISTING_SUPPLIER":"LRJR","BUSINESS_NATURE":"Builders","START_DATE":"2017-11-28","ANNUAL_TURNOVER":"20000","REFERRED_BY":"Ramnath","CREDIT_LIMIT":"15000","CREDIT_DAYS":15,"MODE_OF_PAYMENT":"online","PAN_DOCUMENT":1,"ID_CARD_DOCUMENT":1,"ADDRESS_PROOF":1,"GST_CERTIFICATE":1,"CUSTOMER_TYPE":1,"IS_APPROVED":1,"CREATED_DATE":"2017-11-28","CREATED_USER_ID":"Lloyd","APPROVED_USER_ID":"Vasu","APPROVED_DATE":"2017-11-28","DEVICE_IP_ID":"192.168.2.6","MODIFIED_DATE":"2017-11-28","MODIFIED_USER_ID":"lloyd","DELETE_FLAG":0}]')
        //            var a = $(".BranchData").mDatatable({
        //                     data: { type: "local", source: e, pageSize: 20 },
        //                     layout: { theme: "default", class: "", scroll: !1, height: 750, footer: !1 },
        //                     sortable: !0,
        //                     pagination: !0,
        //                     search: { input: $("#generalSearch") },
        //                     columns: [{
        //                             field: "BRANCH_ID",
        //                             title: "#",
        //                             width: 50,
        //                             sortable: !1,
        //                             selector: !1,
        //                             textAlign: "center"
        //                         },
        //                         {
        //                             field: "BRANCH_NAME",
        //                             title: " Name",
        //                             responsive: {
        //                                 visible: "lg"
        //                             }
        //                         },
        //                         {
        //                             field: "BRANCH_ADDRESS",
        //                             title: " Address",
        //                             responsive: {
        //                                 visible: "lg"
        //                             }
        //                         },
        //                         {
        //                             field: "BRANCH_LOCATION",
        //                             title: " Location",
        //                             responsive: {
        //                                 visible: "lg"
        //                             }
        //                         },
        //                         {
        //                             field: "BRANCH_MANAGER",
        //                             title: " Manager",
        //                             responsive: {
        //                                 visible: "lg"
        //                             }
        //                         },

        //                         {
        //                             field: "IS_APPROVED",
        //                             title: "Status",
        //                             template: function(e) {
        //                                 var a = {
        //                                     1: {
        //                                         title: "Active",
        //                                         class: "m-badge--brand"
        //                                     },
        //                                     2: {
        //                                         title: "Inactive",
        //                                         class: " m-badge--metal"
        //                                     },
        //                                     3: {
        //                                         title: "Canceled",
        //                                         class: " m-badge--primary"
        //                                     },
        //                                     4: {
        //                                         title: "Success",
        //                                         class: " m-badge--success"
        //                                     },
        //                                     5: {
        //                                         title: "Info",
        //                                         class: " m-badge--info"
        //                                     },
        //                                     6: {
        //                                         title: "Danger",
        //                                         class: " m-badge--danger"
        //                                     },
        //                                     7: {
        //                                         title: "Warning",
        //                                         class: " m-badge--warning"
        //                                     }
        //                                 };
        //                                 return '<span class="m-badge ' + a[
        //                                     e.IS_APPROVED
        //                                 ].class + ' m-badge--wide">' + a[
        //                                     e.IS_APPROVED
        //                                 ].title + "</span>"
        //                             }
        //                         },
        //                         {
        //                             field: "Actions",
        //                             width: 110,
        //                             title: "Actions",
        //                             sortable: !1,
        //                             overflow: "visible",
        //                             template: function(e) {
        //                                 return '\t\t\t\t\t\t<div class="dropdown ' + (e.getDatatable().getPageSize() - e.getIndex() <= 4 ? "dropup" : "") + '">\t\t\t\t\t\t\t<a href="#" class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown">  <i class="la la-ellipsis-h"></i>  </a>\t\t\t\t\t\t  \t<div class="dropdown-menu dropdown-menu-right">\t\t\t\t\t\t    \t<a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit Details</a>\t\t\t\t\t\t    \t<a class="dropdown-item" href="#"><i class="la la-leaf"></i> Update Status</a>\t\t\t\t\t\t    \t<a class="dropdown-item" href="#"><i class="la la-print"></i> Generate Report</a>\t\t\t\t\t\t  \t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="View ">                            <i class="la la-edit"></i>                        </a>\t\t\t\t\t'
        //                             }
        //                         }
        //                     ]
        //                 }),
        //                 i = a.getDataSourceQuery();
        //             $("#m_form_status").on("change", function() { a.search($(this).val(), "IS_APPROVED") }).val(void 0 !== i.IS_APPROVED ? i.IS_APPROVED : ""), $("#m_form_type").on("change", function() { a.search($(this).val(), "Type") }).val(void 0 !== i.Type ? i.Type : ""), $("#m_form_status, #m_form_type").selectpicker()
        //         };
        //         return { init: function() { e() } }
        //     }();
        //     jQuery(document).ready(function() { DatatableDataLocalDemo.init() });
    }


}


