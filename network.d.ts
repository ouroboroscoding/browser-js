/**
 * Network
 *
 * Tracks whether the browser is online / offline
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2024-04-09
 */
import Subscribe, { SubscribeCallback, SubscribeReturn } from '@ouroboros/subscribe';
/**
 * Network
 *
 * Extends the Subscribe class to be created once and exported
 *
 * @name Network
 * @extends Subscribe
 */
declare class Network extends Subscribe {
    /**
     * Constructor
     *
     * Creates a new instance and returns it
     *
     * @name Network
     * @access private
     * @returns Network
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
declare const network: Network;
export default network;
