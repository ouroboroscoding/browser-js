/**
 * Hash
 *
 * JS Library to manage hash values
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2018-12-09
 */

// Ouroboros modules
import Subscribe, {
	SubscribeCallback,
	SubscribeReturn
} from '@ouroboros/subscribe';
import { empty, isObject, parseQuery } from '@ouroboros/tools';

// Type
type HashType = Record<string, string>;

// name regex
const nameRE = /^[a-zA-Z_]+$/;

// Subscribers by name
const oSubscribe: Record<string, Subscribe> = {};

// Hash values by name (only null for init)
let dHash: HashType | null = null;

/**
 * Init
 *
 * Only called once
 */
if(dHash === null) {

	// Track changes
	window.addEventListener("hashchange", hashChanged);

	// Parse the current location hash
	dHash = parseQuery(window.location.hash.substring(1));
}

/**
 * Hash Changed
 *
 * Called when the location hash has been altered, notifies any watchers of
 * hash values changing
 *
 * @name hashChanged
 * @access private
 * @return {void}
 */
function hashChanged(): void {

	// Store the current hash
	const old = { ...dHash };

	// Re-parse the current location hash
	dHash = parseQuery(window.location.hash.substring(1));

	// If there are oSubscribe
	if(!empty(oSubscribe)) {

		// Check each subscribe instance
		for(const name of Object.keys(oSubscribe)) {

			// If the value no longer exists, set it to null
			if(name in old && !(name in dHash)) {
				oSubscribe[name].set(null);
			}

			// Else, the value is new, or altered, so use the new value
			else {
				oSubscribe[name].set(dHash[name]);
			}
		}
	}
}

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
function get(name: string, defaultReturn?: string): string | null {

	// If the name is invalid
	if(!nameRE.test(name)) {
		throw new Error('Invalid Hash name');
	}

	// If there is a value for the name
	if(typeof (dHash as HashType)[name] !== 'undefined') {
		return (dHash as HashType)[name];
	}

	// Else, return the default
	else {
		return defaultReturn === undefined ? null : defaultReturn;
	}
}

/**
 * Reset
 *
 * Notifies all existing subscriptions that all data went away
 *
 * @name reset
 * @access private
 */
function reset(): void {

	// Go through each subscribe instance
	for(const name of Object.keys(oSubscribe)) {
		oSubscribe[name].set(null);
	}
}

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
function set(name: string | object, value?: string) {

	// If the name is not an object
	if(!isObject(name)) {

		// If the value is not defined
		if(typeof value === 'undefined') {
			value = '';
		}

		// Set the value
		name = {[name as string]: value}
	}

	// Make a copy of the current hash
	const copy = { ...dHash };

	// Go through each name
	for(const n of Object.keys(name)) {

		// If the name is invalid
		if(!nameRE.test(n)) {
			throw new Error('Invalid Hash name: ' + n);
		}

		// If we got null, delete the name
		if(name[n as keyof object] === null) {
			delete copy[n];
		}
		// Else, set the new value
		else {
			copy[n] = name[n as keyof object];
		}
	}

	// Init an array to store the parts
	const temp: string[] = [];

	// Go through each name
	for(const k of Object.keys(copy)) {
		temp.push(copy[k] === '' ? k : (k + '=' + copy[k]));
	}

	// If we have none
	if(temp.length === 0) {

		// If we can use pushState
		if('pushState' in history) {
			history.pushState(
				'',
				document.title,
				window.location.pathname + window.location.search
			);
			reset();
		}

		// Else, we can't remove the '#', but clear the rest regardless
		else {
			window.location.hash = '';
		}
	}

	// Else, reset the window location hash
	else {
		window.location.hash = temp.join('&');
	}
}

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
function subscribe(name: string, callback: SubscribeCallback): SubscribeReturn {

	// If we don't already have the name
	if(!(name in oSubscribe)) {

		// Create a new subscribe instance
		oSubscribe[name] = new Subscribe(
			name in (dHash as HashType) ? (dHash as HashType)[name] : null
		);
	}

	// Add the callback and return
	return oSubscribe[name].subscribe(callback);
}

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
function unsubscribe(name: string, callback: SubscribeCallback): void {

	// If we have the name
	if(name in oSubscribe) {

		// Attempt to unsubscribe
		oSubscribe[name].unsubscribe(callback);
	}
}

// Default export
const hash = { get, set, subscribe, unsubscribe };
export default hash;