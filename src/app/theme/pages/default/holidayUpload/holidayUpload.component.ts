
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { NgForm } from '@angular/forms';
import { HolidayUpload } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { Brand } from '../../../../componentDetails';
import { Router } from '@angular/router';
import * as myGlobals from '../../../../Global';
import swal from 'sweetalert2';


//addCatalog.parent_Id
//addCatalog.inventory_classification_id
@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./holidayUpload.component.html",
    encapsulation: ViewEncapsulation.None,
})

export class HolidayUploadComponent implements OnInit, AfterViewInit {
    readonly compId: string = JSON.parse(localStorage.getItem('currentUser')).comp_Id;
    readonly roleId: string = JSON.parse(localStorage.getItem('currentUser')).role_Id;
    readonly token: string = JSON.parse(localStorage.getItem('currentUser')).token;
    readonly loginId: string = JSON.parse(localStorage.getItem('currentUser')).login_Id;

    readonly staff_Id: string = JSON.parse(localStorage.getItem('currentUser')).staff_Id;
    readonly branch_Id: string = JSON.parse(localStorage.getItem('currentUser')).branch_Id;
    readonly user_Name: string = JSON.parse(localStorage.getItem('currentUser')).user_Name;
    holiday: HolidayUpload[];
    //    downloadHoliday:HolidayUpload[];


    constructor(private serverService: ServerService, private router: Router, public http: Http) { }

    year: number;
    years: any;
    ngOnInit(): void {
        this.years = [{ 'year_Id': 2017, 'year_Name': '2017' }, { 'year_Id': 2018, 'year_Name': '2018' },
        { 'year_Id': 2019, 'year_Name': '2019' }, { 'year_Id': 2020, 'year_Name': '2020' },
        { 'year_Id': 2021, 'year_Name': '2021' },
        { 'year_Id': 2022, 'year_Name': '2022' }]
        this.year = 2020;

        this.serverService.getHolidayListFromServers(this.year)
            .subscribe(Data => {
                this.holiday = Data;
            });
    }

    fileuploaderFileChange(event) {
        if (this.year == undefined) {
            swal(
                'Please Select Year...'
            )
        } else {
            swal({
                title: 'Are you sure to Upload?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Upload it!'
            }).then((result) => {
                if (result.value) {
                    let file = event[0];
                    let formData: FormData = new FormData();
                    formData.append('uploadFile', file, file.name);
                    let headers = new Headers()

                    headers.append('compId', this.compId);
                    headers.append('loginid', this.loginId.toString());
                    headers.append('token', this.token.toString());
                    headers.append('userName', this.user_Name);
                    headers.append('ipAddress', '12345');
                    headers.append('deviceId', '123');
                    headers.append('filepath', 'Holiday');
                    headers.append('yearId', this.year.toString());
                    headers.append('filename', file.name);

                    let options = new RequestOptions({ headers: headers });
                    let apiUrl1 = "http://localhost:57509/api/HolidayUploads/ExcelUploadHoliday";
                    this.http.post(apiUrl1, formData, options)
                        .map(res => res.json())
                        .catch(error => Observable.throw(error))
                        .subscribe(
                        Data => {
                            swal(
                                'Data Uploaded.',
                                'success'
                            ).then((result) => {
                                if (result.value) {
                                    window.location.reload();
                                }
                            })
                        })
                }
            });
        }

    }

    setYear(year) {
        this.year = year;
        this.serverService.getHolidayListFromServers(this.year)
            .subscribe(Data => {
                this.holiday = Data;
            });
    }
    downloadExcel() {
        var downloadHoliday = [{ holiday_Date: "Holiday Date", holiday_Name: "Holiday Name" }]
        for (var i = 0; i < this.holiday.length; i++) {
            downloadHoliday[i + 1] = { 'holiday_Date': this.holiday[i].holiday_Date, 'holiday_Name': this.holiday[i].holiday_Name }
            // downloadHoliday[i+1].holiday_Name = this.holiday[i].holiday_Name;
        }
        new Angular2Csv(downloadHoliday, 'Holiday List');
    }
    ngAfterViewInit() {

    }
}



