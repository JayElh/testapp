import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICoreUserMySuffix } from 'app/shared/model/core-user-my-suffix.model';

type EntityResponseType = HttpResponse<ICoreUserMySuffix>;
type EntityArrayResponseType = HttpResponse<ICoreUserMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class CoreUserMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/core-users';

    constructor(private http: HttpClient) {}

    create(coreUser: ICoreUserMySuffix): Observable<EntityResponseType> {
        return this.http.post<ICoreUserMySuffix>(this.resourceUrl, coreUser, { observe: 'response' });
    }

    update(coreUser: ICoreUserMySuffix): Observable<EntityResponseType> {
        return this.http.put<ICoreUserMySuffix>(this.resourceUrl, coreUser, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICoreUserMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICoreUserMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
