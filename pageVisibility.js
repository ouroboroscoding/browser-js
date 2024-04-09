/**
 * Page Visibility
 *
 * Library/Namespace containing various functions to track page visibility
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2018-08-01
 */
// Ouroboros modules
import Subscribe from '@ouroboros/subscribe';
// Init the visibility property name and event values
let apiAvailable = false;
const properties = {
    property: 'hidden',
    event: 'visibilitychange',
    state: 'visibilityState'
};
// Valid browser prefixes
const prefixes = ['moz', 'ms', 'o', 'webkit'];
// If a prefix is not required
if ('hidden' in document) {
    apiAvailable = true;
}
// Else, loop through the prefixes
else {
    for (const prefix of prefixes) {
        // If the prefixes version exists
        if ((prefix + 'Hidden') in document) {
            properties.property = prefix + 'Hidden';
            properties.event = prefix + 'visibilitychange';
            properties.state = prefix + 'VisibilityState';
            apiAvailable = true;
            break;
        }
    }
}
/**
 * Track
 *
 * The actual function passed to the event so that we only have one event
 * listener
 *
 * @name track
 * @access private
 */
function track() {
    // Set the data so the instance notifies subscribers
    pageVisibility.set({
        property: document[properties.property],
        state: document[properties.state]
    });
}
/**
 * Page Visibility
 *
 * Extends the Subscribe class to be created once and exported
 *
 * @name PageVisibility
 * @extends Subscribe
 */
class PageVisibility extends Subscribe {
    /**
     * Constructor
     *
     * Creates a new instance and returns it
     *
     * @name PageVisibility
     * @access private
     * @returns PageVisibility
     */
    constructor() {
        // Get the current values and init the instance with them
        super(apiAvailable ? {
            property: document[properties.property],
            state: document[properties.state]
        } : null);
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
        if (apiAvailable && this.subscribeCallbacks.length === 0) {
            // Add the event listener
            document.addEventListener(properties.event, track);
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
        // If there's no API
        if (!apiAvailable) {
            return false;
        }
        // Call the parent unsubscribe
        const bRet = super.unsubscribe(callback);
        // If it was successful and we have no more callbacks
        if (bRet && this.subscribeCallbacks.length === 0) {
            // Remove the event listener
            document.removeEventListener(properties.event, track);
        }
        // Return
        return bRet;
    }
}
// Create an instance of the class
const pageVisibility = new PageVisibility();
// Default export
export default pageVisibility;
