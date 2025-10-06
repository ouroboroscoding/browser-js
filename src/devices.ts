/**
 * Device
 *
 * Functions for getting device information
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2025-04-16
 */

/**
 * Has Pointer
 *
 * Returns true only if the device has some sort of pointer device like a mouse.
 *
 * @name hasPointer
 * @access public
 * @returns bool
 */
export function hasPointer(): boolean {
	return window.matchMedia("(any-hover: hover)").matches
}

/**
 * Is Mobile
 *
 * Returns true only if the device appears to be a mobile device, but does not
 * gaurantee anything.
 *
 * @name isMobile
 * @access public
 * @returns bool
 */
export function isMobile(): boolean {

	// Mobile regex
	const reMobile = /iPhone|Android.*Mobile|Mobile.*Android|KaiOS/i;

	// If any of the following fail, we are probably on desktop
	if(!reMobile.test(navigator.userAgent)
		|| !('ontouchstart' in window)
		|| !('orientation' in window)
		|| window.innerWidth >= 768) {

		// Not a mobile device
		return false;
	}

	// Probably a mobile device
	return true;
}

// Default export
const devices = { hasPointer, isMobile }
export default devices;