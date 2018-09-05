import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBankMySuffix } from 'app/shared/model/bank-my-suffix.model';

type EntityResponseType = HttpResponse<IBankMySuffix>;
type EntityArrayResponseType = HttpResponse<IBankMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class BankMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/banks';

    constructor(private http: HttpClient) {}

    create(bank: IBankMySuffix): Observable<EntityResponseType> {
        return this.http.post<IBankMySuffix>(this.resourceUrl, bank, { observe: 'response' });
    }

    update(bank: IBankMySuffix): Observable<EntityResponseType> {
        return this.http.put<IBankMySuffix>(this.resourceUrl, bank, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IBankMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IBankMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
