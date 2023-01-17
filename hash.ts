/**
 * Hash
 *
 * JS Library to manage hash values
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2018-12-09
 */

// Generic modules
import { clone, empty, isObject, parseQuery } from '@ouroboros/tools';

// Callback type
type Callback = (value: string | null) => {};

// name regex
const nameRE = /^[a-zA-Z_]+$/;

// Callbacks
const dCallbacks: Record<string, Callback[]> = {};

// Values
let dHash: Record<string, string> = {};

/**
 * Hash Changed
 *
 * Called when the location hash has been altered, notifies any watchers of
 * hash values changing
 *
 * @name _hashChanged
 * @access private
 * @return {void}
 */
function _hashChanged(): void {

	// Store the current hash
	const old = clone(dHash);

	// Re-parse the current location hash
	dHash = parseQuery(window.location.hash.substring(1));

	// If there are dCallbacks
	if(!empty(dCallbacks)) {

		// Check each watch
		for(const name in dCallbacks) {

			// If the value didn't exist and now it does, or it did exist
			//	and now it doesn't, or the values don't match
			if((!(name in old) && name in dHash) ||
				(name in old && !(name in dHash)) ||
				old[name] !== dHash[name]) {

				// Go through each callback and call it
				for(const f of dCallbacks[name]) {
					f(dHash[name] || null);
				}
			}
		}
	}
}

/**
 * Init
 *
 * Initialises the internal hash by fetching and parsing the current
 * location hash
 *
 * @name init
 * @access public
 * @return {void}
 */
function init(): void {

	// Track changes
	window.addEventListener("hashchange", _hashChanged);

	// Parse the current location hash
	dHash = parseQuery(window.location.hash.substring(1));
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
	if(typeof dHash[name] !== 'undefined') {
		return dHash[name];
	}

	// Else, return the default
	else {
		return defaultReturn === undefined ? null : defaultReturn;
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
	const copy = clone(dHash);

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
		temp.push(k + '=' + copy[k]);
	}

	// Reset the window location hash
	window.location.hash = temp.join('&');
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
function subscribe(name: string, callback: Callback): void {

	// If we already have the name
	if(name in dCallbacks) {

		// Go through the callbacks associated with the name
		for(const f of dCallbacks[name]) {

			// If we already have the callback there's no need to store it
			if(f === callback) {
				return;
			}
		}
	}

	// Else if we don't have any callbacks for the name
	else {
		dCallbacks[name] = [];
	}

	// Add the callback to the dCallbacks
	dCallbacks[name].push(callback);
}

/**
 * Unsubscribe
 *
 * Removes a callback from the dCallbacks
 *
 * @name unsubscribe
 * @access public
 * @param {string} name The name of the value to stop watching
 * @param {function} callback The callback to remove
 * @return {void}
 */
function unsubscribe(name: string, callback: Callback): void {

	// If we have the name
	if(name in dCallbacks) {

		// Go through the callbacks associated with the name
		for(let i = 0; i < dCallbacks[name].length; ++i) {

			// If we find the callback
			if(dCallbacks[name][i] === callback) {

				// Remove it
				dCallbacks[name].splice(i, 1);
				return;
			}
		}
	}
}

// Default export
const hash = { init, get, set, subscribe, unsubscribe };
export default hash;
