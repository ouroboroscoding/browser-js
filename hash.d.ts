/**
 * Hash
 *
 * JS Library to manage hash values
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2018-12-09
 */
import { SubscribeCallback, SubscribeReturn } from '@ouroboros/subscribe';
/**
 * Get
 *
 * Returns a hash name
 *
 * @name get
 * @access public
 * @static
 * @param {string} name The name to look for
 * @param {string?} defaultReturn The value to return if the name isn't found
 * @return {string | null}
 */
declare function get(name: string, defaultReturn?: string): string | null;
/**
 * Set
 *
 * Sets a specific name
 *
 * @name set
 * @access public
 * @param {string | object} name The name to set, or an object of name/value pairs
 * @param {string?} value The value to set the name to
 */
declare function set(name: string | object, value?: string): void;
/**
 * Subscribe
 *
 * Adds a callback for a specific name which will be called if the name is
 * added, deleted, or changed
 *
 * @name subscribe
 * @access public
 * @param {string} name The name of the value to watch
 * @param {function} callback The function to call when the value changes
 * @return {void}
 */
declare function subscribe(name: string, callback: SubscribeCallback): SubscribeReturn;
/**
 * Unsubscribe
 *
 * Removes a callback from the oSubscribe
 *
 * @name unsubscribe
 * @access public
 * @param {string} name The name of the value to stop watching
 * @param {function} callback The callback to remove
 * @return {void}
 */
declare function unsubscribe(name: string, callback: SubscribeCallback): void;
declare const hash: {
    get: typeof get;
    set: typeof set;
    subscribe: typeof subscribe;
    unsubscribe: typeof unsubscribe;
};
export default hash;
