import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerBankMySuffix } from 'app/shared/model/customer-bank-my-suffix.model';
import { CustomerBankMySuffixService } from './customer-bank-my-suffix.service';
import { CustomerBankMySuffixComponent } from './customer-bank-my-suffix.component';
import { CustomerBankMySuffixDetailComponent } from './customer-bank-my-suffix-detail.component';
import { CustomerBankMySuffixUpdateComponent } from './customer-bank-my-suffix-update.component';
import { CustomerBankMySuffixDeletePopupComponent } from './customer-bank-my-suffix-delete-dialog.component';
import { ICustomerBankMySuffix } from 'app/shared/model/customer-bank-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class CustomerBankMySuffixResolve implements Resolve<ICustomerBankMySuffix> {
    constructor(private service: CustomerBankMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((customerBank: HttpResponse<CustomerBankMySuffix>) => customerBank.body));
        }
        return of(new CustomerBankMySuffix());
    }
}

export const customerBankRoute: Routes = [
    {
        path: 'customer-bank-my-suffix',
        component: CustomerBankMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CustomerBanks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'customer-bank-my-suffix/:id/view',
        component: CustomerBankMySuffixDetailComponent,
        resolve: {
            customerBank: CustomerBankMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CustomerBanks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'customer-bank-my-suffix/new',
        component: CustomerBankMySuffixUpdateComponent,
        resolve: {
            customerBank: CustomerBankMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CustomerBanks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'customer-bank-my-suffix/:id/edit',
        component: CustomerBankMySuffixUpdateComponent,
        resolve: {
            customerBank: CustomerBankMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CustomerBanks'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerBankPopupRoute: Routes = [
    {
        path: 'customer-bank-my-suffix/:id/delete',
        component: CustomerBankMySuffixDeletePopupComponent,
        resolve: {
            customerBank: CustomerBankMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CustomerBanks'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
