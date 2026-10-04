/**
 * Cookies
 *
 * JS Library to deal with Cookies
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2018-11-24
 */
export type setOptions = {
    Domain?: string;
    Expires?: number;
    Path?: string;
    Secure?: boolean;
    SameSite?: 'Strict' | 'Lax' | 'None';
    Partitioned?: boolean;
};
export type removeOptions = {
    Domain?: string;
    Path?: string;
};
/**
 * Get
 *
 * Gets a cookie or returns the default. Set no name to get all
 *
 * @name get
 * @access public
 * @param {string} name The name of the cookie to fetch
 * @param {string} defaultReturn The default value to return if no cookie is found
 * @return {string | object | null}
 */
declare function get(name?: string, defaultReturn?: string): string | object | null;
/**
 * Remove
 *
 * Removes a cookie.
 *
 * @deprecated The (domain, path) positional signature is deprecated and will be
 * removed in a future version. Pass an options object instead:
 * remove(name, { Domain, Path })
 */
declare function remove(name: string, domain?: string, path?: string): void;
/**
 * Remove
 *
 * Removes a cookie using an options object.
 */
declare function remove(name: string, options?: removeOptions): void;
/**
 * Sets a cookie.
 *
 * @deprecated The (expires, domain, path) positional signature is deprecated
 * and will be removed in a future version. Pass an options object instead:
 * set(name, value, { Expires, Domain, Path })
 */
declare function set(name: string, value: string, expires?: number, domain?: string, path?: string): void;
/**
 * Sets a cookie using an options object.
 */
declare function set(name: string, value: string, options?: setOptions): void;
declare const cookies: {
    get: typeof get;
    remove: typeof remove;
    set: typeof set;
};
export default cookies;
