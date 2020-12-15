import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { MainMenu, SubMenu, Status } from '../../../componentDetails';
import { ServerService } from '../../../server.service';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
//import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
declare let mLayout: any;
@Component({
    selector: "app-hor-menu",
    templateUrl: "./hor-menu.component.html",
    encapsulation: ViewEncapsulation.None,
    providers: [ServerService]
})
export class HorMenuComponent implements OnInit, AfterViewInit {
    status: Status[];
    selected;
    selectedData;
    main_Menu_Id: number;
    main_Menu_Display_Name: string;
    main_Menu_Icon: string;
    main_Menu_Order_Id: number;

    sub_Menu_Id: number;
    // main_Menu_Id: number;
    //  main_Menu_Display_Name: string;
    sub_Menu_Display_Name: string;
    sub_Menu_Url: string;
    //  main_Menu_Icon: string;
    sub_Menu_Icon: string;
    //  main_Menu_Order_Id: number;
    sub_Menu_Order_Id: number;
    mainMenu: MainMenu[];
    subMenu: SubMenu[];

    constructor(private serverService: ServerService) { }

    ngOnInit() {
        this.serverService.getStatusDataFromServers(0, 1)

            .subscribe(Data => {
                this.status = Data;
            });
        //  if (localStorage.getItem('MenuData') == '0' || localStorage.getItem('MenuData') == null){
        //   setTimeout(() => {
        this.serverService.getMainMenu()

            .subscribe(Data => {
                this.mainMenu = Data;
            });

        this.serverService.getSubMenu()

            .subscribe(Data => {
                this.subMenu = Data;
            });
        //  },500);
        //  }
    }
    ngAfterViewInit() {

        mLayout.initHeader();

    }

}