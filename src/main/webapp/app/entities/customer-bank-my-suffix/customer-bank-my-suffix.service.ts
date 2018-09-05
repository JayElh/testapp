import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICustomerBankMySuffix } from 'app/shared/model/customer-bank-my-suffix.model';

type EntityResponseType = HttpResponse<ICustomerBankMySuffix>;
type EntityArrayResponseType = HttpResponse<ICustomerBankMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class CustomerBankMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/customer-banks';

    constructor(private http: HttpClient) {}

    create(customerBank: ICustomerBankMySuffix): Observable<EntityResponseType> {
        return this.http.post<ICustomerBankMySuffix>(this.resourceUrl, customerBank, { observe: 'response' });
    }

    update(customerBank: ICustomerBankMySuffix): Observable<EntityResponseType> {
        return this.http.put<ICustomerBankMySuffix>(this.resourceUrl, customerBank, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICustomerBankMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICustomerBankMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
