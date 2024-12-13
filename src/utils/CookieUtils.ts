export class CookieUtils {
  static getCookieValue(name: string) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) return cookieValue;
    }
    return null;
  }

  static setCookie(
    name: string,
    value: string,
    days: number,
    path: string = '/'
  ) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value};expires=${expires};path=${path}`;
  }

  static removeCookieValue(name: string, path: string = '/', domain?: string) {
    let cookie = `${name}=;path=${path};expires=Thu, 01 Jan 1970 00:00:00 UTC;`;

    if (domain) {
      cookie += `domain=${domain};`;
    }

    document.cookie = cookie;
  }
}
