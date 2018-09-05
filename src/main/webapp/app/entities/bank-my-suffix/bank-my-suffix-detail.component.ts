import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBankMySuffix } from 'app/shared/model/bank-my-suffix.model';

@Component({
    selector: 'jhi-bank-my-suffix-detail',
    templateUrl: './bank-my-suffix-detail.component.html'
})
export class BankMySuffixDetailComponent implements OnInit {
    bank: IBankMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ bank }) => {
            this.bank = bank;
        });
    }

    previousState() {
        window.history.back();
    }
}
