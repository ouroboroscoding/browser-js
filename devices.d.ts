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
export declare function hasPointer(): boolean;
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
export declare function isMobile(): boolean;
declare const devices: {
    hasPointer: typeof hasPointer;
    isMobile: typeof isMobile;
};
export default devices;
