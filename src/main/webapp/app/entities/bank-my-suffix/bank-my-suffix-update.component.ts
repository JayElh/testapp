import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IBankMySuffix } from 'app/shared/model/bank-my-suffix.model';
import { BankMySuffixService } from './bank-my-suffix.service';
import { ICustomerBankMySuffix } from 'app/shared/model/customer-bank-my-suffix.model';
import { CustomerBankMySuffixService } from 'app/entities/customer-bank-my-suffix';

@Component({
    selector: 'jhi-bank-my-suffix-update',
    templateUrl: './bank-my-suffix-update.component.html'
})
export class BankMySuffixUpdateComponent implements OnInit {
    private _bank: IBankMySuffix;
    isSaving: boolean;

    customers: ICustomerBankMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private bankService: BankMySuffixService,
        private customerBankService: CustomerBankMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ bank }) => {
            this.bank = bank;
        });
        this.customerBankService.query({ filter: 'bank-is-null' }).subscribe(
            (res: HttpResponse<ICustomerBankMySuffix[]>) => {
                if (!this.bank.customerId) {
                    this.customers = res.body;
                } else {
                    this.customerBankService.find(this.bank.customerId).subscribe(
                        (subRes: HttpResponse<ICustomerBankMySuffix>) => {
                            this.customers = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCustomerBankById(index: number, item: ICustomerBankMySuffix) {
        return item.id;
    }
    get bank() {
        return this._bank;
    }

    set bank(bank: IBankMySuffix) {
        this._bank = bank;
    }
}
