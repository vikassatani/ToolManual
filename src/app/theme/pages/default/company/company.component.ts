


import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Company, AddCompany, TimeZone, currency } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import swal from 'sweetalert2';
import { ElementRef } from '@angular/core';


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./company.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class CompanyComponent implements OnInit, AfterViewInit {
    //@ViewChild('f') details:NgForm;

    // readonly compId: string = JSON.parse(localStorage.getItem('currentUser')).comp_Id;
    // readonly roleId: string = JSON.parse(localStorage.getItem('currentUser')).role_Id;
    // readonly token: string = JSON.parse(localStorage.getItem('currentUser')).token;
    // readonly loginId: string = JSON.parse(localStorage.getItem('currentUser')).login_Id;
    // // readonly staff_Id: string = JSON.parse(localStorage.getItem('currentUser')).staff_Id;
    // readonly branch_Id: string = JSON.parse(localStorage.getItem('currentUser')).branch_Id;
    // readonly reporting_Manager: string = JSON.parse(localStorage.getItem('currentUser')).reporting_Manager;
    // readonly user_Name: string = JSON.parse(localStorage.getItem('currentUser')).user_Name;

    compLogo: any;
    timeZone: TimeZone[];
    companies: Company[];
    company = new Company();
    Currency: currency[];
    addCompanies: AddCompany[]
    errorMessage: String;
    ResponseStatus: string;
    rowsPerPage = 5;
    addComapnyId: number;
    AddCompany: number;
    getCompanyId: any;

    comp_Id: number;
    comp_name: string;
    registration_number: string;
    tin_Number: string;
    pan_Number: string;
    reg_Office1: string;
    telephone_Number: string;
    fax_Number: string;
    website: string;
    currency: string;
    userTimeZone: string;
    copy_Right: string;
    login_Id: number;
    //token:string;
    comp_Logo: string;
    userName: string;
    ip_Address: string;
    device_Id: string;
    mode: string;
    // Name:string
    addCompany = new AddCompany();


    constructor(private serverService: ServerService, private element: ElementRef, private http: Http) { }
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
    ResponseCode: any;
    changeListner(event) {
        var reader = new FileReader();
        var image = this.element.nativeElement.querySelector('.image');

        reader.onload = (event: any) => {
            var src = event.target.result;
            image.src = src;
        };

        reader.readAsDataURL(event.target.files[0]);

        let file = event.target.files[0];
        let formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        let headers = new Headers()
        // headers.append('Content-Type', 'json');  
        // headers.append('Accept', 'application/json');  
        // headers.append('compId', this.compId);
        // headers.append('loginid', this.loginId);
        // headers.append('token', this.token);
        // headers.append('filepath', 'Group/Logo');
        headers.append('filename', file.name);
        let options = new RequestOptions({ headers: headers });
        this.http.post("http://localhost:57509/api/Company/LogoUpdate", formData, options)
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




    onSelectFile(event) {

        swal({
            //  title: 'Are you sure to Upload?',
            //  text: "You won't be able to revert this!",
            //  type: 'warning',
            //  showCancelButton: true,
            //  confirmButtonColor: '#3085d6',
            //  cancelButtonColor: '#d33',
            //  confirmButtonText: 'Yes, Upload it!'
        }).then((result) => {
            if (result.value) {
                let file = event.target.files[0];
                let fileName = event.target.files[0].name;
                let formData: FormData = new FormData();
                formData.append('uploadFile', file, file.name);
                //  let headers = new Headers()  
                //  // headers.append('Content-Type', 'json');  
                //  // headers.append('Accept', 'application/json');  
                //  headers.append('compId', '1');  
                //  headers.append('loginid', this.loginId.toString());
                //  headers.append('token', this.token.toString()); 
                //  headers.append('userName', 'ABC'); 
                //  headers.append('ipAddress', '12345'); 
                //  headers.append('deviceId', '123'); 
                //  headers.append('filepath', 'Holiday'); 
                //  headers.append('yearId', this.year.toString());  
                //  headers.append('filename', file.name); 

                //  let options = new RequestOptions({ headers: headers });  
                //  let apiUrl1 = "http://localhost:57509/api/HolidayUpload/ExcelUploadHoliday";  
                //  this.http.post(apiUrl1, formData, options)  
                //  .map(res => res.json())  
                //  .catch(error => Observable.throw(error))  
                //  .subscribe(  
                //      Data => {
                //          swal(
                //              'Data Uploaded.',
                //              'success'
                //            ).then((result) => {
                //              if (result.value) {
                //            window.location.reload();}})
                //      })
            }
        });
    }



    // fileuploaderFileChange(event){

    // }

    onSubmit(): void {

        this.serverService.updateCompanyDataTOServer(this.addCompany)
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
            },
            error => this.errorMessage = <any>error);
    }

    ngOnInit(): void {

        this.serverService.getTimeZoneDataDataFromServers()

            .subscribe(Data => {
                this.timeZone = Data;
            });

        this.serverService.geCurrencyDataFromServers(0, 0)

            .subscribe(Data => {
                this.Currency = Data;
            });


        this.serverService.getCompanyDataFromServer(1)
            .subscribe(Data => {
                this.addCompany.comp_Id = Data[0].comp_Id;
                this.addCompany.comp_name = Data[0].comp_name;
                this.addCompany.registration_number = Data[0].registration_number;
                this.addCompany.tin_Number = Data[0].tin_Number;
                this.addCompany.pan_Number = Data[0].pan_Number;
                this.addCompany.reg_Office1 = Data[0].reg_Office1;
                this.addCompany.telephone_Number = Data[0].telephone_Number;
                this.addCompany.fax_Number = Data[0].fax_Number;
                this.addCompany.website = Data[0].website;
                this.addCompany.currency = Data[0].currency;
                this.addCompany.userTimeZone = Data[0].userTimeZone;
                this.addCompany.copy_Right = Data[0].copy_Right;
                this.addCompany.comp_Logo = "http://localhost:57509/Group/Logo/" + Data[0].comp_Logo;

                this.compLogo = this.addCompany.comp_Logo
                //this.comp_name=Company.comp_name;
            });





    }
    ngAfterViewInit() {

    }
}

