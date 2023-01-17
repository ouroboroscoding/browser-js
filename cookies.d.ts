/**
 * Cookies
 *
 * JS Library to deal with Cookies
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2018-11-24
 */
/**
 * Get
 *
 * Gets a cookie or returns the default. Set no name to get all
 *
 * @name get
 * @access public
 * @param {string} name The name of the cookie to fetch
 * @param {string} defaulReturn The default value to return if no cookie is found
 * @return {string | object | null}
 */
declare function get(name: string, defaulReturn: string | null | undefined): string | object | null;
/**
 * Remove
 *
 * Deletes a cookie
 *
 * @name remove
 * @access public
 * @param {string} name The name of the cookie to delete
 * @param {string?} domain The domain of the cookie
 * @param {string?} path The path of the cookie
 * @return {void}
 */
declare function remove(name: string, domain?: string, path?: string): void;
/**
 * Set
 *
 * Sets a cookie
 *
 * @name set
 * @access public
 * @param {string} name The name of the cookie
 * @param {string} value The value to store
 * @param {number} expires The number of seconds before the cookie expires
 * @param {string?} domain The optional domain to set the cookie on
 * @param {string?} path The optional path of the cookie
 * @return {void}
 */
declare function set(name: string, value: string, expires: number, domain?: string, path?: string): void;
declare const cookies: {
    get: typeof get;
    remove: typeof remove;
    set: typeof set;
};
export default cookies;
