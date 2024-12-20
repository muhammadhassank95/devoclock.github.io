import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, finalize } from "rxjs/operators";
import { TokenService, LogService, UtilsService } from "abp-ng2-module";
import { AppConsts } from "@shared/AppConsts";
import { UrlHelper } from "@shared/helpers/UrlHelper";
import {
  AuthenticateModel,
  AuthenticateResultModel,
  TokenAuthServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { of } from "rxjs";

@Injectable()
export class AppAuthService {
  authenticateModel: AuthenticateModel;
  authenticateResult: AuthenticateResultModel;
  rememberMe: boolean;

  constructor(
    private _tokenAuthService: TokenAuthServiceProxy,
    private _router: Router,
    private _utilsService: UtilsService,
    private _tokenService: TokenService,
    private _logService: LogService
  ) {
    this.clear();
  }

  logout(reload?: boolean): void {
    abp.auth.clearToken();
    abp.utils.deleteCookie(AppConsts.authorization.encryptedAuthTokenName);

    if (reload !== false) {
      location.href = AppConsts.appBaseUrl;
    }
    localStorage.removeItem("SelecedFinancialYearObject");
    localStorage.clear();
  }
  // logout(reload?: boolean): void {
  //   // Clear authentication tokens and cookies
  //   abp.auth.clearToken();
  //   abp.utils.deleteCookie(AppConsts.authorization.encryptedAuthTokenName);

  //   // Remove the selected financial year from local storage
  //   localStorage.removeItem("SelecedFinancialYearObject");

  //   // Dynamically determine whether to redirect to the live URL or stay on localhost
  //   const redirectUrl = UrlHelper.getCorrectUrl(); // Use the helper method to get the correct URL

  //   // Redirect if 'reload' is not explicitly set to false
  //   if (reload !== false) {
  //     location.href = redirectUrl; // Redirect to the correct URL
  //   }
  // }

  authenticate(finallyCallback?: () => void): void {
    finallyCallback = finallyCallback || (() => { });

    this._tokenAuthService
      .authenticate(this.authenticateModel)
      .pipe(
        finalize(() => {
          finallyCallback();
        }),
        catchError((error) => {
          this.logout();
          return of(null);
        })
      )
      .subscribe((result: AuthenticateResultModel) => {
        this.processAuthenticateResult(result);
      });
  }

  private processAuthenticateResult(
    authenticateResult: AuthenticateResultModel
  ) {
    this.authenticateResult = authenticateResult;

    if (authenticateResult.accessToken) {
      // Successfully logged in
      this.login(
        authenticateResult.accessToken,
        authenticateResult.encryptedAccessToken,
        authenticateResult.expireInSeconds,
        this.rememberMe
      );
    } else {
      // Unexpected result!

      this._logService.warn("Unexpected authenticateResult!");
      this._router.navigate(["account/login"]);
    }
  }

  private login(
    accessToken: string,
    encryptedAccessToken: string,
    expireInSeconds: number,
    rememberMe?: boolean
  ): void {
    const tokenExpireDate = rememberMe
      ? new Date(new Date().getTime() + 1000 * expireInSeconds)
      : undefined;

    this._tokenService.setToken(accessToken, tokenExpireDate);

    this._utilsService.setCookieValue(
      AppConsts.authorization.encryptedAuthTokenName,
      encryptedAccessToken,
      tokenExpireDate,
      abp.appPath
    );

    let initialUrl = UrlHelper.initialUrl;
    // let initialUrl = UrlHelper.getCorrectUrl();

    debugger;
    if (initialUrl.indexOf("/login") > 0) {
      debugger;
      initialUrl = AppConsts.appBaseUrl;
    }
    debugger;
    location.href = initialUrl;
  }

  private clear(): void {
    this.authenticateModel = new AuthenticateModel();
    this.authenticateModel.rememberClient = false;
    this.authenticateResult = null;
    this.rememberMe = false;
  }
}
