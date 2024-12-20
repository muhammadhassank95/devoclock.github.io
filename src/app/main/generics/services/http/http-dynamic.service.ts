import {
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  Optional,
} from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpResponseBase,
} from "@angular/common/http";
import { ResultDto, GetAllResultDto } from "../../models/resultDto.model";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { catchError, finalize, throwError } from "rxjs";
import Swal from "sweetalert2";
@Injectable({
  providedIn: "root",
})
@Injectable()
export class HttpDynamicService<Dto, GetAllDto> {
  constructor(private http: HttpClient) {}

  commonUrl: string = "api/services/app/";
  baseUrl: string = newBaseUrl + this.commonUrl;

  create = (input: Dto, action: string) => {
    return this.http.post<ResultDto<string>>(
      `${this.baseUrl + action}/Create`,
      input
    );
  };

  edit = (input: Dto, action: string) => {
    return this.http.post<ResultDto<string>>(
      `${this.baseUrl + action}/Edit`,
      input
    );
  };

  get = (id: number, action: string) => {
    return this.http.get<ResultDto<Dto>>(
      `${this.baseUrl + action}/Get?Id=${id}`
    );
  };

  getAll = (
    skipCount: number,
    maxCount: number,
    query: string,
    action: string
  ) => {
    debugger;
    return this.http.get<GetAllResultDto<GetAllDto[]>>(
      `${
        this.baseUrl + action
      }/GetAll?SkipCount=${skipCount}&MaxResultCount=${maxCount}${query}`
    );
  };

  getAllData = (action: string) => {
    return this.http.get<GetAllResultDto<GetAllDto[]>>(
      `${this.baseUrl + action}/GetAll?IsDropdown=true`
    );
  };

  delete = (id: number, action: string) => {
    let response = this.http.delete<ResultDto<string>>(
      `${this.baseUrl + action}/Delete?Id=${id}`
    );
    return response;
  };

  createBulk = async (input: File, action: string) => {
    return await this.http.post<ResultDto<string>>(
      `${this.baseUrl + action}/CreateBulk`,
      input
    );
  };

  updateBulk = async (input: File, action: string) => {
    return await this.http.post<ResultDto<string>>(
      `${this.baseUrl + action}/UpdateBulk`,
      input
    );
  };

  deleteBulk = async (ids: number[], action: string) => {
    return await this.http.delete<ResultDto<string>>(
      `${this.baseUrl + action}/DeleteBulk`,
      { body: ids }
    );
  };
}
