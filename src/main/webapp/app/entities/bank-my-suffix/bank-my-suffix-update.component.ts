import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IBankMySuffix } from 'app/shared/model/bank-my-suffix.model';
import { BankMySuffixService } from './bank-my-suffix.service';

@Component({
    selector: 'jhi-bank-my-suffix-update',
    templateUrl: './bank-my-suffix-update.component.html'
})
export class BankMySuffixUpdateComponent implements OnInit {
    private _bank: IBankMySuffix;
    isSaving: boolean;

    constructor(private bankService: BankMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ bank }) => {
            this.bank = bank;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.bank.id !== undefined) {
            this.subscribeToSaveResponse(this.bankService.update(this.bank));
        } else {
            this.subscribeToSaveResponse(this.bankService.create(this.bank));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBankMySuffix>>) {
        result.subscribe((res: HttpResponse<IBankMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get bank() {
        return this._bank;
    }

    set bank(bank: IBankMySuffix) {
        this._bank = bank;
    }
}
