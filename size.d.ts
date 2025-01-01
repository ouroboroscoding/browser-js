/**
 * Size
 *
 * JS Library to manage the current client width of the screen in specific sizes
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2024-09-19
 */
import Subscribe, { SubscribeCallback, SubscribeReturn } from '@ouroboros/subscribe';
export type SIZE = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export declare const SIZES: Record<SIZE, number>;
/**
 * Size
 *
 * Extends the Subscribe class to be created once and exported
 *
 * @name Size
 * @extends Subscribe
 */
declare class Size extends Subscribe {
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
    constructor();
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
    compare(against: SIZE): number;
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
    get(): SIZE;
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
    greaterThan(against: SIZE): boolean;
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
    lessThan(against: SIZE): boolean;
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
declare const size: Size;
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
export declare function compare(a: SIZE, b: SIZE): 0 | 1 | -1;
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
export declare function greaterThan(a: SIZE, b: SIZE): boolean;
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
export declare function lessThan(a: SIZE, b: SIZE): boolean;
