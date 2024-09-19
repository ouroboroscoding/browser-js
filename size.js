/**
 * Size
 *
 * JS Library to manage the current client width of the screen in specific sizes
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2024-09-19
 */
// Constants
export const xs = 'xs';
export const sm = 'sm';
export const md = 'md';
export const lg = 'lg';
export const xl = 'xl';
// The minimum pixels necessary for each size type
export const SIZES = {
    [xs]: 0, [sm]: 600, [md]: 900,
    [lg]: 1200, [xl]: 1536
};
// The current size
let _current = null;
/**
 * Init
 *
 * Called internally to setup the module
 *
 * @name _init
 * @access private
 */
function _init() {
    // Const private function to calculate size from client width
    const _calculate = () => {
        if (document.documentElement.clientWidth < 600) {
            return xs;
        }
        if (document.documentElement.clientWidth < 900) {
            return sm;
        }
        if (document.documentElement.clientWidth < 1200) {
            return md;
        }
        if (document.documentElement.clientWidth < 1536) {
            return lg;
        }
        return xl;
    };
    // If we don't have the size
    if (_current === null) {
        _current = _calculate();
        window.addEventListener('resize', () => {
            _current = _calculate();
        });
    }
}
/**
 * Compare
 *
 * Compares two widths and returns the standard -1,0,1 values as a result. -1
 * if `a` is less than `b, 0 for equality, and 1 if `a` is greater than `b`.
 *
 * @name compare
 * @access public
 * @param against The size to compare the current size against
 * @returns -1 || 0 || 1
 */
export function compare(against) {
    // Init if necessary
    if (_current === null)
        _init();
    // If the current size is the same as the passed value
    if (_current === against)
        return 0;
    // Else, if the current value is less than the passed value
    if (SIZES[_current] < SIZES[against])
        return -1;
    // Else, the current value is more than the passed value
    return 1;
}
/**
 * Greater Than
 *
 * Returns true only if `a` is a larger width than `b`
 *
 * @name greaterThan
 * @access public
 * @param against The size to compare the current size against
 * @returns boolean
 */
export function greaterThan(against) {
    // Init if necessary
    if (_current === null)
        _init();
    // If the current value is greater than the passed value
    return SIZES[_current] > SIZES[against];
}
/**
 * Less Than
 *
 * Returns true only if `a` is a smaller width than `b`
 *
 * @name greaterThan
 * @access public
 * @param against The size to compare the current size against
 * @returns boolean
 */
export function lessThan(against) {
    // Init if necessary
    if (_current === null)
        _init();
    // If the current value is less than the passed value
    return SIZES[_current] < SIZES[against];
}
/**
 * Get
 *
 * Returns the current width type based on the current client width
 *
 * @name get
 * @access public
 * @returns The current width
 */
export function get() {
    // Init if necessary
    if (_current === null)
        _init();
    // Return the current size
    return _current;
}
// Default export
const width = { xs, sm, md, lg, xl, compare, greaterThan, lessThan, get };
export default width;
