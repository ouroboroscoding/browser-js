/**
 * Page Visibility
 *
 * Library/Namespace containing various functions to track page visibility
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2018-08-01
 */
import Subscribe, { SubscribeCallback, SubscribeReturn } from '@ouroboros/subscribe';
/**
 * Page Visibility
 *
 * Extends the Subscribe class to be created once and exported
 *
 * @name PageVisibility
 * @extends Subscribe
 */
declare class PageVisibility extends Subscribe {
    /**
     * Constructor
     *
     * Creates a new instance and returns it
     *
     * @name PageVisibility
     * @access private
     * @returns PageVisibility
     */
    constructor();
    /**
     * Subscribe
     *
     * Overrides parent subscribe to handle adding the window event
     *
     * @name subscribe
     * @access public
     * @param callback The function to call when the state changes
     * @returns object
     */
    subscribe(callback: SubscribeCallback): SubscribeReturn;
    /**
     * Unsubscribe
     *
     * Overrides parent unsubscribe to handle removing the window event
     *
     * @name unsubscribe
     * @access public
     * @param callback The callback to remove from the list
     * @returns boolean
     */
    unsubscribe(callback: SubscribeCallback): boolean;
}
declare const pageVisibility: PageVisibility;
export default pageVisibility;
