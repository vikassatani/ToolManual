
import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { DownloadPDF, Customerreport, Branch, TeamTarget, Team } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { BranchComponent } from '../branch/branch.Component';
import * as myGlobals from '../../../../Global';
import { Router } from '@angular/router';
declare var $;
import swal from 'sweetalert2';
import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic/src/platform_providers';
import { DecimalPipe } from '@angular/common';
//import * as toastr from '...';
//"./salesmanReport.component.html"
@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./CustomerReport.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class GenerateCustomerReportComponent implements OnInit, AfterViewInit {
    //  CustomreportReportDetails:CustomreportReportDetails[];
    Customerreport: Customerreport[];
    branch: Branch[];
    team: Team[];
    downloadPDF: DownloadPDF[];


    branch_Id: number;
    constructor(private serverService: ServerService, private router: Router, private _script: ScriptLoaderService) { }
    // isEdited=false;
    // isEdit=false
    team_Id: number;
    teamTargets1: TeamTarget[];
    branch_id: number;
    teamTarget = new TeamTarget();
    onSubmit(): void {

    }



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

    branchId: string;
    getTeamData(branchId) {
        this.branchId = branchId;
        if (this.branchId == "0") {

            this.team = [];
        }
        else {
            this.serverService.getTeamDataFromServers(branchId, 0, 0, 0)
                .subscribe(Data => {
                    this.team = Data;
                });

        }

    }

    //    Download(FromDate,ToDate){
    //     this.FromDate=new Date(FromDate);
    //     this.ToDate=new Date(ToDate); 
    //     if( this.FromDate > this.ToDate){
    //         swal("Please select valid Todate") 
    //     }
    //     else{
    //         this.serverService.DownloadSalesmenPDFDetails(FromDate,ToDate)
    //         .subscribe(Data =>{
    //             this.downloadPDF = Data;
    //         })   

    //     }
    //    }
    value: number;
    ngOnInit() {
        // this.isEdited=false;
        // this.isEdit=false

        // this.serverService.GetSalesmenreportDetails(1,FromDate,ToDate,"GET")
        // .subscribe(Data =>{
        //     this.salesReportDetails = Data;
        // })

        this.serverService.getBranchDataFromServers(0, 0)
            .subscribe(Data => {
                this.branch = Data;
            });

        this.value = 0;
    }

    FromDate: any
    ToDate: any

    getDetailData(FromDate, ToDate) {
        this.Customerreport = [];
        // this.serverService.GetSalesmenreportDetails(0,FromDate,ToDate,"GET")
        // .subscribe(Data =>{
        //     this.salesReportDetails = Data;
        // })
        this.FromDate = new Date(FromDate);
        this.ToDate = new Date(ToDate);
        if (this.FromDate > this.ToDate) {
            swal("Please select valid Todate")
        }

        else {
            this.serverService.Getcusdatefilter(FromDate, ToDate, "GetCustomerReport_Date")
                .subscribe(Data => {
                    this.Customerreport = Data;



                    for (var i = 0; i < this.Customerreport.length; i++) {

                        this.Customerreport[i].Welding_Electrodes = this.Customerreport[i]["Welding Electrodes"];
                        this.Customerreport[i].HR_PIPE = this.Customerreport[i]["HR PIPE"];
                        this.Customerreport[i].Binding_Wire = this.Customerreport[i]["Binding Wire"];
                        this.Customerreport[i].PPGI_Coil = this.Customerreport[i]["PPGI Coil"];
                        this.Customerreport[i].PPGL_Coil = this.Customerreport[i]["PPGL Coil"];
                        this.Customerreport[i].CR_SHEET = this.Customerreport[i]["CR SHEET"];
                        this.Customerreport[i].HR_SHEET = this.Customerreport[i]["HR SHEET"];
                        this.Customerreport[i].CHQ_COIL = this.Customerreport[i]["CHQ COIL"];

                        this.Customerreport[i].CR_COIL = this.Customerreport[i]["CR COIL"];
                        this.Customerreport[i].HR_COIL = this.Customerreport[i]["HR COIL"];
                        this.Customerreport[i].GP_SHEET = this.Customerreport[i]["GP SHEET"];
                        this.Customerreport[i].GC_Sheet = this.Customerreport[i]["GC Sheet"];
                        this.Customerreport[i].MS_PLATE = this.Customerreport[i]["MS PLATE"];
                        this.Customerreport[i].CHQ_Plate = this.Customerreport[i]["CHQ.Plate"];
                        this.Customerreport[i].Roofing_Sheet = this.Customerreport[i]["Roofing Sheet"];
                        this.Customerreport[i].Profile_Sheet_Accessories = this.Customerreport[i]["Profile Sheet - Accessories"];
                        this.Customerreport[i].BABY_COIL = this.Customerreport[i]["BABY COIL"];
                        this.Customerreport[i].CR_PIPE = this.Customerreport[i]["CR PIPE"];
                        this.Customerreport[i].GI_PIPE = this.Customerreport[i]["GI PIPE"];

                        this.Customerreport[i].GP_PIPE_APLBHUSHAN = this.Customerreport[i]["GP PIPE- APL/BHUSHAN"];
                        this.Customerreport[i].GP_PIPE_LAKSHMIOTHERS = this.Customerreport[i]["GP PIPE- LAKSHMI/ OTHERS"];
                        this.Customerreport[i].MS_ANGLE = this.Customerreport[i]["MS ANGLE"];
                        this.Customerreport[i].MS_BEAM = this.Customerreport[i]["MS BEAM"];
                        this.Customerreport[i].MS_CHANNEL = this.Customerreport[i]["MS CHANNEL"];
                        this.Customerreport[i].MS_FLAT = this.Customerreport[i]["MS FLAT"];
                        this.Customerreport[i].MS_ROUND = this.Customerreport[i]["MS ROUND"];
                        this.Customerreport[i].MS_SQUARE = this.Customerreport[i]["MS SQUARE"];
                        this.Customerreport[i].MS_WIRE_ROD = this.Customerreport[i]["MS WIRE ROD"];
                        this.Customerreport[i].MS_BILLET = this.Customerreport[i]["MS BILLET"];
                        this.Customerreport[i].HEXAGONAL = this.Customerreport[i]["HEXAGONAL"];
                        this.Customerreport[i].DURASTRONG_TMT = this.Customerreport[i]["DURASTRONG TMT"];
                        this.Customerreport[i].BMM_TMT = this.Customerreport[i]["BMM TMT"];

                        this.Customerreport[i].JSPL_TMT = this.Customerreport[i]["JSPL TMT"];
                        this.Customerreport[i].JSW_TMT = this.Customerreport[i]["JSW TMT"];
                        this.Customerreport[i].SAIL_VIZAG = this.Customerreport[i]["SAIL/VIZAG"];
                        this.Customerreport[i].TMT_ROLLING = this.Customerreport[i]["TMT ROLLING"];
                        this.Customerreport[i].TMT_COIL = this.Customerreport[i]["TMT COIL"];

                        this.Customerreport[i].MS_Welded_Wiremesh = this.Customerreport[i]["MS Welded Wiremesh"];
                        this.Customerreport[i].GI_Welded_Wiremesh = this.Customerreport[i]["GI Welded Wiremesh"];
                        this.Customerreport[i].Profile_Sheet = this.Customerreport[i]["Profile Sheet"];
                        this.Customerreport[i].steel_data1 = this.Customerreport[i]["steel data1"];
                        this.Customerreport[i].Product1 = this.Customerreport[i]["Product1"];
                        this.Customerreport[i].Product2 = this.Customerreport[i]["Product2"];
                        this.Customerreport[i].Product3 = this.Customerreport[i]["Product3"];
                        this.Customerreport[i].Product4 = this.Customerreport[i]["Product4"];
                        this.Customerreport[i].Product5 = this.Customerreport[i]["Product5"];





                    }

                })
        }

    }

    downloadExcel() {
        var downloadCustomreportReport = [{ Date_of_creation: "Date of Creation", manager_Name: "Approved by Manager", approver_Date: "Approved Date&Time", customer_code: "Customer Code", sub_Cus_Code: "Sub Customer Code", team_name: "Team Name", SalesManName: "SalesMan", customer_Name: "Customer name", contact_Person_Name: "Contact Person", contact_Person_designation: "Contact Persion Designation", contact_Person_Mobile_Number: "Contact Number", whatssup: "Whatsapp", customer_Email: "Email Id", current_Address: "Address", city_Name: "City", state_Name: "State", current_Zipcode: "Pin Code", credit_Limit: "Credit Limit", credit_Days: "Credit Days", annual_Turnover: "Annual Turnover", reffered_By: "Refered By", nature_Of_Buisness: "Nature Of Business", buisness_Start_Date: "Start Date of Business", modeOdPaymentName: "Mode Of Payment", id_Card_Proof: "ID Card Document", gst_Number: "GST Certificate", address_Proof: "Address Proof", pan_Number: "PAN Number", visiting_card: "Visiting Card Front View", visiting_card_back: "Visiting Card Back View", customer_category: "Customer Catagory", customerTypeName: "Customer Type", Welding_Electrodes: "Welding Electrodes", HR_PIPE: "HR PIPE", Binding_Wire: "Binding Wire", PPGI_Coil: "PPGI Coil", PPGL_Coil: "PPGL Coil", CR_SHEET: "CR SHEET", HR_SHEET: "HR SHEET", CHQ_COIL: "CHQ COIL", CR_COIL: "CR COIL", HR_COIL: "HR COIL", GP_SHEET: "GP SHEET", GC_Sheet: "GC SHEET", MS_PLATE: "MS PLATE", CHQ_Plate: "CHQ Plate", Roofing_Sheet: "Roofing Sheet", Profile_Sheet_Accessories: "Profile Sheet - Accessories", BABY_COIL: "BABY COIL", CR_PIPE: "CR PIPE", GI_PIPE: "GI PIPE", GP_PIPE_APLBHUSHAN: "GP PIPE- APL/BHUSHAN", GP_PIPE_LAKSHMIOTHERS: "GP PIPE- LAKSHMI/ OTHERS", MS_ANGLE: "MS ANGLE", MS_BEAM: "MS BEAM", MS_CHANNEL: "MS CHANNEL", MS_FLAT: "MS FLAT", MS_ROUND: "MS ROUND", MS_SQUARE: "MS SQUARE", MS_WIRE_ROD: "MS WIRE ROD", MS_BILLET: "MS BILLET", HEXAGONAL: "HEXAGONAL", DURASTRONG_TMT: "DURASTRONG TMT", BMM_TMT: "BMM TMT", JSPL_TMT: "JSPL TMT", JSW_TMT: "JSW TMT", SAIL_VIZAG: "SAIL/VIZAG", TMT_ROLLING: "TMT ROLLING", TMT_COIL: "TMT COIL", MS_Welded_Wiremesh: "MS Welded Wiremesh", GI_Welded_Wiremesh: "GI Welded Wiremesh", Profile_Sheet: "Profile Sheet", steel_data1: "steel data1", Product1: "Product1", Product2: "Product2", Product3: "Product3", Product4: "Product4", Product5: "Product5" }]
        for (var i = 0; i < this.Customerreport.length; i++) {
            downloadCustomreportReport[i + 1] = { 'Date_of_creation': this.Customerreport[i].Date_of_creation, 'manager_Name': this.Customerreport[i].manager_Name, 'approver_Date': this.Customerreport[i].approver_Date, 'customer_code': this.Customerreport[i].customer_code, 'sub_Cus_Code': this.Customerreport[i].sub_Cus_Code, 'team_name': this.Customerreport[i].team_name, 'SalesManName': this.Customerreport[i].SalesManName, 'customer_Name': this.Customerreport[i].customer_Name, 'contact_Person_Name': this.Customerreport[i].contact_Person_Name, 'contact_Person_designation': this.Customerreport[i].contact_Person_designation, 'contact_Person_Mobile_Number': this.Customerreport[i].contact_Person_Mobile_Number, 'whatssup': this.Customerreport[i].whatssup, 'customer_Email': this.Customerreport[i].customer_Email, 'current_Address': this.Customerreport[i].current_Address, 'city_Name': this.Customerreport[i].city_Name, 'state_Name': this.Customerreport[i].state_Name, 'current_Zipcode': this.Customerreport[i].current_Zipcode, 'credit_Limit': this.Customerreport[i].credit_Limit, 'credit_Days': this.Customerreport[i].credit_Days, 'annual_Turnover': this.Customerreport[i].annual_Turnover, 'reffered_By': this.Customerreport[i].reffered_By, 'nature_Of_Buisness': this.Customerreport[i].nature_Of_Buisness, 'buisness_Start_Date': this.Customerreport[i].buisness_Start_Date, 'modeOdPaymentName': this.Customerreport[i].modeOdPaymentName, 'id_Card_Proof': this.Customerreport[i].id_Card_Proof, 'gst_Number': this.Customerreport[i].gst_Number, 'address_Proof': this.Customerreport[i].address_Proof, 'pan_Number': this.Customerreport[i].pan_Number, 'visiting_card': this.Customerreport[i].visiting_card, 'visiting_card_back': this.Customerreport[i].visiting_card_back, 'customer_category': this.Customerreport[i].customer_category, 'customerTypeName': this.Customerreport[i].customerTypeName, 'Welding_Electrodes': this.Customerreport[i].Welding_Electrodes, 'HR_PIPE': this.Customerreport[i].HR_PIPE, 'Binding_Wire': this.Customerreport[i].Binding_Wire, 'PPGI_Coil': this.Customerreport[i].PPGI_Coil, 'PPGL_Coil': this.Customerreport[i].PPGL_Coil, 'CR_SHEET': this.Customerreport[i].CR_SHEET, 'HR_SHEET': this.Customerreport[i].HR_SHEET, 'CHQ_COIL': this.Customerreport[i].CHQ_COIL, 'CR_COIL': this.Customerreport[i].CR_COIL, 'HR_COIL': this.Customerreport[i].HR_COIL, 'GP_SHEET': this.Customerreport[i].GP_SHEET, 'GC_Sheet': this.Customerreport[i].GC_Sheet, 'MS_PLATE': this.Customerreport[i].MS_PLATE, 'CHQ_Plate': this.Customerreport[i].CHQ_Plate, 'Roofing_Sheet': this.Customerreport[i].Roofing_Sheet, 'Profile_Sheet_Accessories': this.Customerreport[i].Profile_Sheet_Accessories, 'BABY_COIL': this.Customerreport[i].BABY_COIL, 'CR_PIPE': this.Customerreport[i].CR_PIPE, 'GI_PIPE': this.Customerreport[i].GI_PIPE, 'GP_PIPE_APLBHUSHAN': this.Customerreport[i].GP_PIPE_APLBHUSHAN, 'GP_PIPE_LAKSHMIOTHERS': this.Customerreport[i].GP_PIPE_LAKSHMIOTHERS, 'MS_ANGLE': this.Customerreport[i].MS_ANGLE, 'MS_BEAM': this.Customerreport[i].MS_BEAM, 'MS_CHANNEL': this.Customerreport[i].MS_CHANNEL, 'MS_FLAT': this.Customerreport[i].MS_FLAT, 'MS_ROUND': this.Customerreport[i].MS_ROUND, 'MS_SQUARE': this.Customerreport[i].MS_SQUARE, 'MS_WIRE_ROD': this.Customerreport[i].MS_WIRE_ROD, 'MS_BILLET': this.Customerreport[i].MS_BILLET, 'HEXAGONAL': this.Customerreport[i].HEXAGONAL, 'DURASTRONG_TMT': this.Customerreport[i].DURASTRONG_TMT, 'BMM_TMT': this.Customerreport[i].BMM_TMT, 'JSPL_TMT': this.Customerreport[i].JSPL_TMT, 'JSW_TMT': this.Customerreport[i].JSW_TMT, 'SAIL_VIZAG': this.Customerreport[i].SAIL_VIZAG, 'TMT_ROLLING': this.Customerreport[i].TMT_ROLLING, 'TMT_COIL': this.Customerreport[i].TMT_COIL, 'MS_Welded_Wiremesh': this.Customerreport[i].MS_Welded_Wiremesh, 'GI_Welded_Wiremesh': this.Customerreport[i].GI_Welded_Wiremesh, 'Profile_Sheet': this.Customerreport[i].Profile_Sheet, 'steel_data1': this.Customerreport[i].steel_data1, 'Product1': this.Customerreport[i].Product1, 'Product2': this.Customerreport[i].Product2, 'Product3': this.Customerreport[i].Product3, 'Product4': this.Customerreport[i].Product4, 'Product5': this.Customerreport[i].Product5 }
            //downloadCustomreportReport[i+1] = {'Date_of_creation':this.Customerreport[i].Date_of_creation,'manager_Name':this.Customerreport[i].manager_Name,'approver_Date':this.Customerreport[i].approver_Date,'customer_code':this.Customerreport[i].customer_code,'sub_Cus_Code':this.Customerreport[i].sub_Cus_Code,'team_name':this.Customerreport[i].team_name,'SalesManName':this.Customerreport[i].SalesManName,'customer_Name':this.Customerreport[i].customer_Name,'contact_Person_Name':this.Customerreport[i].contact_Person_Name,'contact_Person_designation':this.Customerreport[i].contact_Person_designation,'contact_Person_Mobile_Number':this.Customerreport[i].contact_Person_Mobile_Number,'whatssup':this.Customerreport[i].whatssup,'customer_Email':this.Customerreport[i].customer_Email,'current_Address':this.Customerreport[i].current_Address,'city_Name':this.Customerreport[i].city_Name,'state_Name':this.Customerreport[i].state_Name,'current_Zipcode':this.Customerreport[i].current_Zipcode,'credit_Limit':this.Customerreport[i].credit_Limit,'credit_Days':this.Customerreport[i].credit_Days,'annual_Turnover':this.Customerreport[i].annual_Turnover,'reffered_By':this.Customerreport[i].reffered_By,'nature_Of_Buisness':this.Customerreport[i].nature_Of_Buisness,'buisness_Start_Date':this.Customerreport[i].buisness_Start_Date,'modeOdPaymentName':this.Customerreport[i].modeOdPaymentName,'id_Card_Proof':this.Customerreport[i].id_Card_Proof,'gst_Number':this.Customerreport[i].gst_Number,'address_Proof':this.Customerreport[i].address_Proof,'pan_Number':this.Customerreport[i].pan_Number,'visiting_card':this.Customerreport[i].visiting_card,'visiting_card_back':this.Customerreport[i].visiting_card_back,'customer_category':this.Customerreport[i].customer_category,'customerTypeName':this.Customerreport[i].customerTypeName,'Welding_Electrodes':this.Customerreport[i].Welding_Electrodes,'HR_PIPE':this.Customerreport[i].HR_PIPE,'Binding_Wire':this.Customerreport[i].Binding_Wire,'PPGI_Coil':this.Customerreport[i].PPGI_Coil,'PPGL_Coil':this.Customerreport[i].PPGL_Coil,'CR_SHEET':this.Customerreport[i].CR_SHEET,'HR_SHEET':this.Customerreport[i].HR_SHEET,'CHQ_COIL':this.Customerreport[i].CHQ_COIL,'CR_COIL':this.Customerreport[i].CR_COIL,'HR_COIL':this.Customerreport[i].HR_COIL,'GP_SHEET':this.Customerreport[i].GP_SHEET,'GC_Sheet':this.Customerreport[i].GC_Sheet,'MS_PLATE':this.Customerreport[i].MS_PLATE,'CHQ_Plate':this.Customerreport[i].CHQ_Plate,'Roofing_Sheet':this.Customerreport[i].Roofing_Sheet,'Profile_Sheet_Accessories':this.Customerreport[i].Profile_Sheet_Accessories,'BABY_COIL':this.Customerreport[i].BABY_COIL,'CR_PIPE':this.Customerreport[i].CR_PIPE,'GI_PIPE':this.Customerreport[i].GI_PIPE,'GP_PIPE_APLBHUSHAN':this.Customerreport[i].GP_PIPE_APLBHUSHAN,'GP_PIPE_LAKSHMIOTHERS':this.Customerreport[i].GP_PIPE_LAKSHMIOTHERS,'MS_ANGLE':this.Customerreport[i].MS_ANGLE,'MS_BEAM':this.Customerreport[i].MS_BEAM,'MS_CHANNEL':this.Customerreport[i].MS_CHANNEL,'MS_FLAT':this.Customerreport[i].MS_FLAT,'MS_ROUND':this.Customerreport[i].MS_ROUND,'MS_SQUARE':this.Customerreport[i].MS_SQUARE,'MS_WIRE_ROD':this.Customerreport[i].MS_WIRE_ROD,'MS_BILLET':this.Customerreport[i].MS_BILLET,'HEXAGONAL':this.Customerreport[i].HEXAGONAL,'DURASTRONG_TMT':this.Customerreport[i].DURASTRONG_TMT,'BMM_TMT':this.Customerreport[i].BMM_TMT,'JSPL_TMT':this.Customerreport[i].JSPL_TMT,'JSW_TMT':this.Customerreport[i].JSW_TMT,'SAIL_VIZAG':this.Customerreport[i].SAIL_VIZAG,'TMT_ROLLING':this.Customerreport[i].TMT_ROLLING,'TMT_COIL':this.Customerreport[i].TMT_COIL,'MS_Welded_Wiremesh':this.Customerreport[i].MS_Welded_Wiremesh,'GI_Welded_Wiremesh':this.Customerreport[i].GI_Welded_Wiremesh,'Profile_Sheet':this.Customerreport[i].Profile_Sheet,'steel_data1':this.Customerreport[i].steel_data1,'Product1':this.Customerreport[i].Product1,'Product2':this.Customerreport[i].Product2,'Product3':this.Customerreport[i].Product3,'Product4':this.Customerreport[i].Product4,'Product5':this.Customerreport[i].SalesManName}
        }

        new Angular2Csv(downloadCustomreportReport, 'Customer Report');
    }


    onStatusChange(MonthId) {
        this.Customerreport = [];


        this.serverService.Getcustomerreport(MonthId, "GET_CUSTOMEREPORT_Month")
            .subscribe(Data => {
                this.Customerreport = Data;
                // JSON.parse(JSON.stringify(this.Customerreport).replace(/"\s+|\s+"/g,'"'))
                //  this.Customerreport;


                //   if( this.Customerreport.length==0){
                //     swal("No Data") 
                //     return;

                // }

                for (var i = 0; i < this.Customerreport.length; i++) {

                    this.Customerreport[i].Welding_Electrodes = this.Customerreport[i]["Welding Electrodes"];
                    this.Customerreport[i].HR_PIPE = this.Customerreport[i]["HR PIPE"];
                    this.Customerreport[i].Binding_Wire = this.Customerreport[i]["Binding Wire"];
                    this.Customerreport[i].PPGI_Coil = this.Customerreport[i]["PPGI Coil"];
                    this.Customerreport[i].PPGL_Coil = this.Customerreport[i]["PPGL Coil"];
                    this.Customerreport[i].CR_SHEET = this.Customerreport[i]["CR SHEET"];
                    this.Customerreport[i].HR_SHEET = this.Customerreport[i]["HR SHEET"];
                    this.Customerreport[i].CHQ_COIL = this.Customerreport[i]["CHQ COIL"];

                    this.Customerreport[i].CR_COIL = this.Customerreport[i]["CR COIL"];
                    this.Customerreport[i].HR_COIL = this.Customerreport[i]["HR COIL"];
                    this.Customerreport[i].GP_SHEET = this.Customerreport[i]["GP SHEET"];
                    this.Customerreport[i].GC_Sheet = this.Customerreport[i]["GC Sheet"];
                    this.Customerreport[i].MS_PLATE = this.Customerreport[i]["MS PLATE"];
                    this.Customerreport[i].CHQ_Plate = this.Customerreport[i]["CHQ.Plate"];
                    this.Customerreport[i].Roofing_Sheet = this.Customerreport[i]["Roofing Sheet"];
                    this.Customerreport[i].Profile_Sheet_Accessories = this.Customerreport[i]["Profile Sheet - Accessories"];
                    this.Customerreport[i].BABY_COIL = this.Customerreport[i]["BABY COIL"];
                    this.Customerreport[i].CR_PIPE = this.Customerreport[i]["CR PIPE"];
                    this.Customerreport[i].GI_PIPE = this.Customerreport[i]["GI PIPE"];

                    this.Customerreport[i].GP_PIPE_APLBHUSHAN = this.Customerreport[i]["GP PIPE- APL/BHUSHAN"];
                    this.Customerreport[i].GP_PIPE_LAKSHMIOTHERS = this.Customerreport[i]["GP PIPE- LAKSHMI/ OTHERS"];
                    this.Customerreport[i].MS_ANGLE = this.Customerreport[i]["MS ANGLE"];
                    this.Customerreport[i].MS_BEAM = this.Customerreport[i]["MS BEAM"];
                    this.Customerreport[i].MS_CHANNEL = this.Customerreport[i]["MS CHANNEL"];
                    this.Customerreport[i].MS_FLAT = this.Customerreport[i]["MS FLAT"];
                    this.Customerreport[i].MS_ROUND = this.Customerreport[i]["MS ROUND"];
                    this.Customerreport[i].MS_SQUARE = this.Customerreport[i]["MS SQUARE"];
                    this.Customerreport[i].MS_WIRE_ROD = this.Customerreport[i]["MS WIRE ROD"];
                    this.Customerreport[i].MS_BILLET = this.Customerreport[i]["MS BILLET"];
                    this.Customerreport[i].HEXAGONAL = this.Customerreport[i]["HEXAGONAL"];
                    this.Customerreport[i].DURASTRONG_TMT = this.Customerreport[i]["DURASTRONG TMT"];
                    this.Customerreport[i].BMM_TMT = this.Customerreport[i]["BMM TMT"];

                    this.Customerreport[i].JSPL_TMT = this.Customerreport[i]["JSPL TMT"];
                    this.Customerreport[i].JSW_TMT = this.Customerreport[i]["JSW TMT"];
                    this.Customerreport[i].SAIL_VIZAG = this.Customerreport[i]["SAIL/VIZAG"];
                    this.Customerreport[i].TMT_ROLLING = this.Customerreport[i]["TMT ROLLING"];
                    this.Customerreport[i].TMT_COIL = this.Customerreport[i]["TMT COIL"];

                    this.Customerreport[i].MS_Welded_Wiremesh = this.Customerreport[i]["MS Welded Wiremesh"];
                    this.Customerreport[i].GI_Welded_Wiremesh = this.Customerreport[i]["GI Welded Wiremesh"];
                    this.Customerreport[i].Profile_Sheet = this.Customerreport[i]["Profile Sheet"];
                    this.Customerreport[i].steel_data1 = this.Customerreport[i]["steel data1"];
                    this.Customerreport[i].Product1 = this.Customerreport[i]["Product1"];
                    this.Customerreport[i].Product2 = this.Customerreport[i]["Product2"];
                    this.Customerreport[i].Product3 = this.Customerreport[i]["Product3"];
                    this.Customerreport[i].Product4 = this.Customerreport[i]["Product4"];
                    this.Customerreport[i].Product5 = this.Customerreport[i]["Product5"];





                }


            })
    }




    //    downloadExcel(){
    //     var downloadSalesmanReport = [{ empName: "Employee Name", salesTarget: "Sales Target", pendingOrder: "Pending Order", tillDateSales: "Till Date Sales", collectionTillDate: "Till Date collection", todaysCollection: "Todays Collection", modeOfComunication: "Mode Of Communication", placesVisited: "Place Visted", customer: "Customer", purposeName: "Purpose of Visit", visitedDate: "Visted Date", contactNo: "Contact Number", collectionDone: "Collection", remarks: "Remarks"}]
    //     for(var i=0;i<this.Customerreport.length;i++){
    //         downloadSalesmanReport[i+1] = {'empName' : this.Customerreport[i].empName+'-'+this.Customerreport[i].empId, 'salesTarget':this.Customerreport[i].salesTarget , 'pendingOrder':this.Customerreport[i].pendingOrder, 'tillDateSales':this.Customerreport[i].tillDateSales, 'collectionTillDate':this.Customerreport[i].collectionTillDate, 'todaysCollection':this.Customerreport[i].todaysCollection, 'modeOfComunication':this.Customerreport[i].modeOfComunication, 'placesVisited':this.Customerreport[i].placesVisited, 'customer':this.Customerreport[i].customer, 'purposeName':this.Customerreport[i].purposeName, 'visitedDate':this.Customerreport[i].visitedDate, 'contactNo':this.Customerreport[i].contactNo, 'collectionDone':this.Customerreport[i].collectionDone, 'remarks':this.Customerreport[i].remarks }
    //     }
    //     new Angular2Csv(downloadSalesmanReport, 'Salesman Report');
    //    }

    //contactNo,collectionDone,managerRemarks



    ngAfterViewInit() {
        var BootstrapDatepicker = function() {
            var t = function() {
                $("#m_datepicker_1, #m_datepicker_1_validate").datepicker({ todayHighlight: !0, orientation: "bottom left", templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }), $("#m_datepicker_1_modal").datepicker({ todayHighlight: !0, orientation: "bottom left", templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }),
                    $("#m_datepicker_2, #m_datepicker_2_validate").datepicker({ todayHighlight: !0, orientation: "bottom left", templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }), $("#m_datepicker_2_modal").datepicker({ todayHighlight: !0, orientation: "bottom left", templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }),
                    $("#m_datepicker_3, #m_datepicker_3_validate").datepicker({ todayBtn: "linked", clearBtn: !0, todayHighlight: !0, templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }), $("#m_datepicker_3_modal").datepicker({ todayBtn: "linked", clearBtn: !0, todayHighlight: !0, templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }),
                    $("#m_datepicker_4_1").datepicker({ orientation: "top left", todayHighlight: !0, templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }), $("#m_datepicker_4_2").datepicker({ orientation: "top right", todayHighlight: !0, templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }),
                    $("#m_datepicker_4_3").datepicker({ orientation: "bottom left", todayHighlight: !0, templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }), $("#m_datepicker_4_4").datepicker({ orientation: "bottom right", todayHighlight: !0, templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }),
                    $("#m_datepicker_5").datepicker({ todayHighlight: !0, templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }), $("#m_datepicker_6").datepicker({ todayHighlight: !0, templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } })
            }; return { init: function() { t() } }
        }(); jQuery(document).ready(function() { BootstrapDatepicker.init() });

    }
}
