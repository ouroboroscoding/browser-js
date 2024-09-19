/**
 * Size
 *
 * JS Library to manage the current client width of the screen in specific sizes
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2024-09-19
 */
export declare const xs = "xs";
export declare const sm = "sm";
export declare const md = "md";
export declare const lg = "lg";
export declare const xl = "xl";
export type SIZE = typeof xs | typeof sm | typeof md | typeof lg | typeof xl;
export declare const SIZES: Record<SIZE, number>;
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
export declare function compare(against: SIZE): 0 | 1 | -1;
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
export declare function greaterThan(against: SIZE): boolean;
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
export declare function lessThan(against: SIZE): boolean;
/**
 * Get
 *
 * Returns the current width type based on the current client width
 *
 * @name get
 * @access public
 * @returns The current width
 */
export declare function get(): SIZE;
declare const width: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    compare: typeof compare;
    greaterThan: typeof greaterThan;
    lessThan: typeof lessThan;
    get: typeof get;
};
export default width;
