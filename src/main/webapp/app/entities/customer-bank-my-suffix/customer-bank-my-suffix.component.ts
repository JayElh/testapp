import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICustomerBankMySuffix } from 'app/shared/model/customer-bank-my-suffix.model';
import { Principal } from 'app/core';
import { CustomerBankMySuffixService } from './customer-bank-my-suffix.service';

@Component({
    selector: 'jhi-customer-bank-my-suffix',
    templateUrl: './customer-bank-my-suffix.component.html'
})
export class CustomerBankMySuffixComponent implements OnInit, OnDestroy {
    customerBanks: ICustomerBankMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private customerBankService: CustomerBankMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.customerBankService.query().subscribe(
            (res: HttpResponse<ICustomerBankMySuffix[]>) => {
                this.customerBanks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCustomerBanks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICustomerBankMySuffix) {
        return item.id;
    }

    registerChangeInCustomerBanks() {
        this.eventSubscriber = this.eventManager.subscribe('customerBankListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
