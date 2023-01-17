/**
 * Page Visibility
 *
 * Library/Namespace containing various functions to track page visibility
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2018-08-01
 */
type Callback = (...args: any[]) => {};
/**
 * Get
 *
 * Returns the current state of visibility
 *
 * @name get
 * @access public
 * @return {object | false}
 */
export declare function get(): object | false;
/**
 * Subscribe
 *
 * Track changes on page visibility
 *
 * @name subscribe
 * @access public
 * @param {function} callback Function to call on visibility changes
 * @return {boolean}
 */
export declare function subscribe(callback: Callback): boolean;
/**
 * Ubsubscribe
 *
 * Stop tracking changes in page visibility
 *
 * @name unsubscribe
 * @access public
 * @param {function} callback
 * @return {boolean}
 */
export declare function unsubscribe(callback: Callback): boolean;
declare const pageVisibility: {
    get: typeof get;
    subscribe: typeof subscribe;
    unsubscribe: typeof unsubscribe;
};
export default pageVisibility;
