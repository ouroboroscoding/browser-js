/**
 * Page Visibility
 *
 * Library/Namespace containing various functions to track page visibility
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2018-08-01
 */

// Callback type
type Callback = (...args: any[]) => {};

// Init the visibility property name and event values
let bVis = false;
const dVis = {
	property: 'hidden',
	event: 'visibilitychange',
	state: 'visibilityState'
};
const lCallbacks: Callback[] = []

// Figure out the name of the visibility property and event
// Valid browser prefixes
const lPrefixes = ['moz', 'ms', 'o', 'webkit'];

// If a prefix is required
if('hidden' in document) {
	bVis = true;
}

// Else, loop through the prefixes
else {
	for(const prefix of lPrefixes) {

		// If the prefixes version exists
		if((prefix + 'Hidden') in document) {
			dVis.property = prefix + 'Hidden';
			dVis.event = prefix + 'visibilitychange';
			dVis.state = prefix + 'VisibilityState';
			bVis = true;
			break;
		}
	}
}

/**
 * Track
 *
 * The actual function passed to the event so that we only have one event listener
 *
 * @name track
 * @access private
 * @return {void}
 */
function track(): void {

	// Call the callbacks and pass them bool and state values
	for(const f of lCallbacks) {
		f(document[dVis.property as keyof Document], document[dVis.state as keyof Document]);
	}
}

/**
 * Get
 *
 * Returns the current state of visibility
 *
 * @name get
 * @access public
 * @return {object | false}
 */
export function get(): object | false {

	// If the library is available
	if(bVis) {
		return {
			property: document[dVis.property as keyof Document],
			state: document[dVis.state as keyof Document]
		}
	} else {
		console.error('Page Visibility API not available');
		return false;
	}
}

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
export function subscribe(callback: Callback): boolean {

	// If the Page Visibility  API is not available
	if(bVis === false) {
		console.error('Page Visibility API not available');
		return false;
	}

	// Save the callback for later
	lCallbacks.push(callback);

	// Attach an event listener if this is our first event
	if(lCallbacks.length === 1) {
		document.addEventListener(dVis.event, track);
	}

	// Return ok
	return true;
}

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
export function unsubscribe(callback: Callback): boolean {

	// If the Page Visibility  API is not available
	if(bVis === false) {
		console.error('Page Visibility API not available');
		return false;
	}

	// Find the index of the callback
	const iIndex = lCallbacks.indexOf(callback);

	// If it exists
	if(iIndex > -1) {

		// Remove the callback
		lCallbacks.splice(iIndex, 1);

		// Remove event listener if we have no more callbacks
		if(lCallbacks.length === 0) {
			document.removeEventListener(dVis.event, track);
		}
	}

	// Return ok
	return true;
}

// Default export
const pageVisibility = { get, subscribe, unsubscribe };
export default pageVisibility;
