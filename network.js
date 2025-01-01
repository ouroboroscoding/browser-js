/**
 * Network
 *
 * Tracks whether the browser is online / offline
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2024-04-09
 */
// Ouroboros modules
import Subscribe from '@ouroboros/subscribe';
/**
 * Track Offline
 *
 * The actual function passed to the event so that we only have one event
 * listener
 *
 * @name trackOffline
 * @access private
 */
function trackOffline() {
    // Set the data so the instance notifies subscribers
    network.set(false);
}
/**
 * Track Online
 *
 * The actual function passed to the event so that we only have one event
 * listener
 *
 * @name trackOnline
 * @access private
 */
function trackOnline() {
    // Set the data so the instance notifies subscribers
    network.set(true);
}
/**
 * Network
 *
 * Extends the Subscribe class to be created once and exported
 *
 * @name Network
 * @extends Subscribe
 */
class Network extends Subscribe {
    /**
     * Constructor
     *
     * Creates a new instance and returns it
     *
     * @name Network
     * @access private
     * @returns Network
     */
    constructor() {
        // Get the current values and init the instance with them
        super(navigator.onLine);
    }
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
    subscribe(callback) {
        // If we have no current subscribers
        if (this.subscribeCallbacks.length === 0) {
            // Add the event listeners
            window.addEventListener('online', trackOnline);
            window.addEventListener('offline', trackOffline);
        }
        // Call the parent subscribe and return
        return super.subscribe(callback);
    }
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
    unsubscribe(callback) {
        // Call the parent unsubscribe
        const bRet = super.unsubscribe(callback);
        // If it was successful and we have no more callbacks
        if (bRet && this.subscribeCallbacks.length === 0) {
            // Remove the event listeners
            window.removeEventListener('online', trackOnline);
            window.removeEventListener('offline', trackOffline);
        }
        // Return
        return bRet;
    }
}
// Create an instance of the class
const network = new Network();
// Default export
export default network;
