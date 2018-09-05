import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoreUserMySuffix } from 'app/shared/model/core-user-my-suffix.model';
import { CoreUserMySuffixService } from './core-user-my-suffix.service';
import { CoreUserMySuffixComponent } from './core-user-my-suffix.component';
import { CoreUserMySuffixDetailComponent } from './core-user-my-suffix-detail.component';
import { CoreUserMySuffixUpdateComponent } from './core-user-my-suffix-update.component';
import { CoreUserMySuffixDeletePopupComponent } from './core-user-my-suffix-delete-dialog.component';
import { ICoreUserMySuffix } from 'app/shared/model/core-user-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class CoreUserMySuffixResolve implements Resolve<ICoreUserMySuffix> {
    constructor(private service: CoreUserMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((coreUser: HttpResponse<CoreUserMySuffix>) => coreUser.body));
        }
        return of(new CoreUserMySuffix());
    }
}

export const coreUserRoute: Routes = [
    {
        path: 'core-user-my-suffix',
        component: CoreUserMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CoreUsers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'core-user-my-suffix/:id/view',
        component: CoreUserMySuffixDetailComponent,
        resolve: {
            coreUser: CoreUserMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CoreUsers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'core-user-my-suffix/new',
        component: CoreUserMySuffixUpdateComponent,
        resolve: {
            coreUser: CoreUserMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CoreUsers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'core-user-my-suffix/:id/edit',
        component: CoreUserMySuffixUpdateComponent,
        resolve: {
            coreUser: CoreUserMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CoreUsers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const coreUserPopupRoute: Routes = [
    {
        path: 'core-user-my-suffix/:id/delete',
        component: CoreUserMySuffixDeletePopupComponent,
        resolve: {
            coreUser: CoreUserMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CoreUsers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
