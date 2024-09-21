/**
 * Size
 *
 * JS Library to manage the current client width of the screen in specific sizes
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2024-09-19
 */

// Ouroboros modules
import Subscribe, {
	SubscribeCallback,
	SubscribeReturn
} from '@ouroboros/subscribe';

// Types
export type SIZE = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// The minimum pixels necessary for each size type
export const SIZES: Record<SIZE, number> = {
	xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536
}

/**
 * Calculate
 *
 * Uses the current client width to calculate the string representation
 *
 * @name calculate
 * @access private
 * @returns string
 */
function calculate(): SIZE {
	if(document.documentElement.clientWidth < 600) { return 'xs' }
	if(document.documentElement.clientWidth < 900) { return 'sm' }
	if(document.documentElement.clientWidth < 1200) { return 'md' }
	if(document.documentElement.clientWidth < 1536) { return 'lg' }
	return 'xl';
}

/**
 * Size
 *
 * Extends the Subscribe class to be created once and exported
 *
 * @name Size
 * @extends Subscribe
 */
class Size extends Subscribe {

	// The window event callback
	_callback: () => void;

	/**
	 * Constructor
	 *
	 * Creates a new instance and returns it
	 *
	 * @name Size
	 * @access private
	 * @returns Size
	 */
	constructor() {

		// Get the current values and init the instance with them
		super(calculate());

		// Store the subscription callback
		this._callback = () => {
			this.set(calculate());
		}
	}

	/**
	 * Compare
	 *
	 * Calls the module's `compare` method with the current size and the
	 * `against` param.
	 *
	 * @name compare
	 * @access public
	 * @param against The size to compare the current size against
	 * @returns number
	 */
	compare(against: SIZE): number {
		return compare(this.subscribeData, against);
	}

	/**
	 * Get
	 *
	 * Returns the current size. Overrides the built in Subscribe.get to make
	 * sure we always have the latest, even if no one has ever subscribed
	 *
	 * @name get
	 * @access public
	 * @returns string
	 */
	get() {
		const s = calculate();
		if(s !== this.subscribeData) {
			this.set(s);
		}
		return s;
	}

	/**
	 * Greater Than
	 *
	 * Calls the module's `greaterThan` method with the current size and the
	 * `against` param.
	 *
	 * @name greaterThan
	 * @access public
	 * @param against The size to compare the current size against
	 * @returns number
	 */
	greaterThan(against: SIZE): boolean {
		return greaterThan(this.subscribeData, against);
	}

	/**
	 * Less Than
	 *
	 * Calls the module's `lessThan` method with the current size and the
	 * `against` param.
	 *
	 * @name lessThan
	 * @access public
	 * @param against The size to compare the current size against
	 * @returns number
	 */
	lessThan(against: SIZE): boolean {
		return lessThan(this.subscribeData, against);
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
	subscribe(callback: SubscribeCallback): SubscribeReturn {

		// If we have no current subscribers
		if(this.subscribeCallbacks.length === 0) {

			// Add the event listener
			window.addEventListener('resize', this._callback);
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
	unsubscribe(callback: SubscribeCallback): boolean {

		// Call the parent unsubscribe
		const bRet = super.unsubscribe(callback);

		// If it was successful and we have no more callbacks
		if(bRet && this.subscribeCallbacks.length === 0) {

			// Remove the event listener
			window.removeEventListener('resize', this._callback);
		}

		// Return
		return bRet;
	}
}

// Create an instance of the class
const size = new Size();
// Default export
export default size;

/**
 * Compare
 *
 * Compares two widths and returns the standard -1,0,1 values as a result. -1
 * if `a` is less than `b, 0 for equality, and 1 if `a` is greater than `b`.
 *
 * @name compare
 * @access public
 * @param a The size to compare against `b`
 * @param b The size to compare against `a`
 * @returns -1 || 0 || 1
 */
export function compare(a: SIZE, b: SIZE) {

	// If the current size is the same as the passed value
	if(a === b) return 0;

	// Else, if the current value is less than the passed value
	if(SIZES[a] < SIZES[b]) return -1;

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
 * @param a The size to compare as greater than `b`
 * @param b The size to compare against `a`
 * @returns boolean
 */
export function greaterThan(a: SIZE, b: SIZE): boolean {

	// If the current value is greater than the passed value
	return SIZES[a] > SIZES[b];
}

/**
 * Less Than
 *
 * Returns true only if `a` is a smaller width than `b`
 *
 * @name greaterThan
 * @access public
 * @param a The size to compare as less than `b`
 * @param b The size to compare against `a`
 * @returns boolean
 */
export function lessThan(a: SIZE, b: SIZE): boolean {

	// If the `a` minimum value is less than the `b` minimum value
	return SIZES[a] < SIZES[b];
}