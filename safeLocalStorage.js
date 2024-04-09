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
 * @param name The name of the local var to fetch
 * @param defaultReturn The value to return if the var is not found
 * @returns The boolean value found in storage
 */
export function bool(name, defaultReturn = false) {
    const value = localStorage.getItem(name);
    return value === null ? defaultReturn : (value === '' ? false : true);
}
/**
 * JSON
 *
 * Fetches a value from local storage or returns the default if no value is
 * found. Assumes data is stored in JSON
 *
 * @name json
 * @access public
 * @param name The name of the local var to fetch
 * @param defaultReturn The value to return if the var is not found
 * @returns The object or other JS value found in storage
 */
export function json(name, defaultReturn) {
    const value = localStorage.getItem(name);
    return value === null ? defaultReturn : JSON.parse(value);
}
/**
 * String
 *
 * Fetches a value from local storage or returns the default if no value is
 * found
 *
 * @name string
 * @access public
 * @param name The name of the local var to fetch
 * @param defaultReturn The value to return if the var is not found
 * @returns The string found in storage
 */
export function string(name, defaultReturn) {
    const value = localStorage.getItem(name);
    return value === null ? defaultReturn : value;
}
// Default export
const safeLocaleStorage = { bool, json, string };
export default safeLocaleStorage;
