import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICoreUserMySuffix } from 'app/shared/model/core-user-my-suffix.model';
import { Principal } from 'app/core';
import { CoreUserMySuffixService } from './core-user-my-suffix.service';

@Component({
    selector: 'jhi-core-user-my-suffix',
    templateUrl: './core-user-my-suffix.component.html'
})
export class CoreUserMySuffixComponent implements OnInit, OnDestroy {
    coreUsers: ICoreUserMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private coreUserService: CoreUserMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.coreUserService.query().subscribe(
            (res: HttpResponse<ICoreUserMySuffix[]>) => {
                this.coreUsers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCoreUsers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICoreUserMySuffix) {
        return item.id;
    }

    registerChangeInCoreUsers() {
        this.eventSubscriber = this.eventManager.subscribe('coreUserListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
