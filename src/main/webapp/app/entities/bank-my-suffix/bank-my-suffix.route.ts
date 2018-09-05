import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BankMySuffix } from 'app/shared/model/bank-my-suffix.model';
import { BankMySuffixService } from './bank-my-suffix.service';
import { BankMySuffixComponent } from './bank-my-suffix.component';
import { BankMySuffixDetailComponent } from './bank-my-suffix-detail.component';
import { BankMySuffixUpdateComponent } from './bank-my-suffix-update.component';
import { BankMySuffixDeletePopupComponent } from './bank-my-suffix-delete-dialog.component';
import { IBankMySuffix } from 'app/shared/model/bank-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class BankMySuffixResolve implements Resolve<IBankMySuffix> {
    constructor(private service: BankMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((bank: HttpResponse<BankMySuffix>) => bank.body));
        }
        return of(new BankMySuffix());
    }
}

export const bankRoute: Routes = [
    {
        path: 'bank-my-suffix',
        component: BankMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Banks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bank-my-suffix/:id/view',
        component: BankMySuffixDetailComponent,
        resolve: {
            bank: BankMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Banks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bank-my-suffix/new',
        component: BankMySuffixUpdateComponent,
        resolve: {
            bank: BankMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Banks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bank-my-suffix/:id/edit',
        component: BankMySuffixUpdateComponent,
        resolve: {
            bank: BankMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Banks'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bankPopupRoute: Routes = [
    {
        path: 'bank-my-suffix/:id/delete',
        component: BankMySuffixDeletePopupComponent,
        resolve: {
            bank: BankMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Banks'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
