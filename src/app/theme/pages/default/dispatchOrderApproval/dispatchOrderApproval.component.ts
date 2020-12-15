import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit, TemplateRef } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { OrderApproval, Branch } from '../../../../componentDetails';
import { AddCustomer, Employee, Customerstatus, TargetCustomerTarget, Country, State, City, InventoryClassificationLevelWise, CustomerTarget, CustomerType, ModeOfPayment } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
// import {Popup} from 'ng2-opd-popup';
@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./dispatchOrderApproval.component.html",
    encapsulation: ViewEncapsulation.None,
})

export class DispatchOrderApprovalComponent implements OnInit, AfterViewInit {
    readonly staff_Id: string = JSON.parse(localStorage.getItem('currentUser')).staff_Id;

    statusId: number;
    status: number;
    branchId: number;
    branch: any;
    orderId: number;
    customerId: number;
    ShowDetails: boolean;
    orderApproval: OrderApproval[];
    orderApprovalHistory: OrderApproval[];


    errorMessage: String;
    ResponseStatus: string;
    // orderApprovalDetail:OrderApproval[];
    orderApprovalDetailedData: OrderApproval[];
    orderApprovalHistoryDetailedData: OrderApproval[];

    orderApprovalDetail = new OrderApproval();
    orderApprovalHistoryDetail = new OrderApproval();


    // Customer Use //
    employee: Employee[];
    customerType: CustomerType[];
    modeOfPayment: ModeOfPayment[];
    customerStatus: Customerstatus[];
    customerTarget: CustomerTarget[];
    country: Country[];
    state: State[];
    city: City[];
    customer = new AddCustomer();

    // END Customer Use //
    modalRef: BsModalRef;
    constructor(private serverService: ServerService, private modalService: BsModalService, public http: Http) { }

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
    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    }

    ngOnInit(): void {
        this.ShowDetails = false;
        this.statusId = 3;
        this.branch = [{ 'branch_id': 0, 'branch_Name': '' }]
        // this.serverService.getAssignedBranchDataFromServers(3)
        // .subscribe(Data =>{
        //     var j=0;
        //     for(var i=0; i<Data.length;i++){
        //         if(Data[i].checked_Branch==1){
        //             this.branch[j]=Data[i];
        //             j++;
        //         }
        //     }
        // })


        this.serverService.getAssignedBranchDataFromServers(this.staff_Id)
            .subscribe(Data => {

                if (this.staff_Id == '0') {
                    this.branch = Data;
                }
                else {
                    for (var i = 0; i < Data.length; i++) {
                        if (Data[i].checked_Branch == 1) {
                            this.branch.unshift(Data[i]);
                        }
                        if (Data[i].is_primary == 1) {
                            this.branchId = Data[i].branch_id;
                        }
                    }

                }

            })
    }
    getData(branchId, order, status) {
        this.status = status;
        this.serverService.getOrderApprovalDataFromServers(branchId, order, 0, status, "GET_ORDER_DISPATCH", this.customerId)
            .subscribe(Data => {
                this.orderApproval = Data;
            })
    }
    showDetailedData(branchId, order, approval, customer) {
        if (approval == 3) {
            this.ShowDetails = true;
            this.branchId = branchId;
            this.orderId = order;
            this.customerId = customer;
            this.serverService.getOrderApprovalDataFromServers(branchId, order, 0, 0, "GET_ORDER_DISPATCH", this.customerId)
                .subscribe(Data => {
                    this.orderApprovalDetail = Data[0];
                })
            this.serverService.getOrderApprovalDataFromServers(0, order, 0, 0, "GET_ORDER_DETAIL", this.customerId)
                .subscribe(Data => {
                    this.orderApprovalDetailedData = Data;
                })
        }
    }

    approveData(approve, remarks) {
        this.statusId = 4;
        this.serverService.updateDispatchOrderApproval(this.orderId, approve, remarks, "UPDATE_DISPATCH")
            .subscribe(Data => {
                this.ResponseStatus = Data[0].errorCode;
                if (this.ResponseStatus == "0") {
                    swal({
                        position: 'top-end',
                        type: 'success',
                        title: 'Your Data has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    this.ShowDetails = false;
                    this.serverService.getOrderApprovalDataFromServers(this.branchId, 0, 0, 4, "GET_ORDER_DISPATCH", this.customerId)
                        .subscribe(Data => {
                            this.orderApproval = Data;
                        })
                }
                //this.DownloadFile();

            },
            error => this.errorMessage = <any>error);
    }



    DownloadFile(): void {
        //Download Testing
        this.serverService.downloadOrderReceipt()
            .subscribe(Data => {
                alert("Downloaded");
            });

        this.getFile("http://localhost:57509/api/Order/GetTestFile")
            .subscribe(fileData => {
                let b: any = new Blob([fileData], { type: 'application/pdf' });
                var url = window.URL.createObjectURL(b);
                window.open(url);

            });
    }


    ResponseContentType: any;
    public getFile(path: string): Observable<any> {
        //let options = new RequestOptions({responseType: ResponseContentType.Blob});
        return this.http.get(path)
            .map((response: Response) => <Blob>response.blob());
    }

    ngAfterViewInit() {

    }
}
