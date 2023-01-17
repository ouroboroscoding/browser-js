/**
 * Safe Local Storage
 *
 * Handles safely fetching values from localeStorage regardless if they exist
 * or not
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-01-17
 */
/**
 * Bool
 *
 * Fetches a value from local storage or returns the default if no value is
 * found. Assumes data is a boolean value
 *
 * @name bool
 * @access public
 * @param {string} name The name of the local var to fetch
 * @param {string} defaultReturn The value to return if the var is not found
 * @return {boolean}
 */
export declare function bool(name: string, defaultReturn?: boolean): boolean;
/**
 * json
 *
 * Fetches a value from local storage or returns the default if no value is
 * found. Assumes data is stored in JSON
 *
 * @name json
 * @access public
 * @param {string} name The name of the local var to fetch
 * @param {string} defaultReturn The value to return if the var is not found
 * @return {any}
 */
export declare function json(name: string, defaultReturn: any): any;
/**
 * String
 *
 * Fetches a value from local storage or returns the default if no value is
 * found
 *
 * @name string
 * @access public
 * @param {string} name The name of the local var to fetch
 * @param {string} defaultReturn The value to return if the var is not found
 * @return {string}
 */
export declare function string(name: string, defaultReturn: string): string;
declare const safeLocaleStorage: {
    bool: typeof bool;
    json: typeof json;
    string: typeof string;
};
export default safeLocaleStorage;
