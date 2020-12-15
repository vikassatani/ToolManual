import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MainMenu, Empmail } from '../../../componentDetails';
import { ServerService } from '../../../server.service';
import * as myGlobals from '../../../Global';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
@Component({
    selector: "app-header-brand",
    templateUrl: "./header-brand.component.html",
    encapsulation: ViewEncapsulation.None,
    providers: [ServerService]
})
export class HeaderBrandComponent implements OnInit {
    Email: string;
    empmail: Empmail[];
    constructor(private serverService: ServerService) {

    }
    ngOnInit() {

    }

}