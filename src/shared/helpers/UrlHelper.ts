export class UrlHelper {
  /**
   * The URL requested, before initial routing.
   */
  static readonly initialUrl = location.href;

  static getQueryParameters(): any {
    return document.location.search
      .replace(/(^\?)/, "")
      .split("&")
      .map(
        function (n) {
          return (n = n.split("=")), (this[n[0]] = n[1]), this;
        }.bind({})
      )[0];
  }

  static validateAndPreventInput(event: KeyboardEvent): void {
    const key = event.key;
    const regex = /^[a-zA-Z\s]$/;
    if (!regex.test(key)) {
      event.preventDefault();
    }
  }

  static validateAndAllowOnlyPositiveNumbers(event: KeyboardEvent): void {
    const key = event.key;
    const regex = /^[0-9]$/;
    if (!regex.test(key)) {
      event.preventDefault();
    }
  }
  // static getCorrectUrl(): string {
  //   debugger;
  //   const liveUrl = "http://65.109.118.136:443/";
  //   const localhostPattern = /^(http:\/\/localhost|http:\/\/127\.0\.0\.1)/;

  //   // If the initial URL contains 'localhost' or '127.0.0.1', replace it with the live URL
  //   if (localhostPattern.test(UrlHelper.initialUrl)) {
  //     return liveUrl;
  //   }

  //   // Otherwise, return the initial URL
  //   return UrlHelper.initialUrl;
  // }
}
