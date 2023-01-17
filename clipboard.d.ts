/**
 * Clipboard
 *
 * Handles adding text to the clipboard
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2018-11-24
 */
/**
 * Copy
 *
 * Attempts to add text to the clipboard
 *
 * @name copy
 * @access public
 * @param {string} text The text to add to the clipboard
 * @return {Promise}
 */
export declare function copy(text: string): Promise<any>;
declare const clipboard: {
    copy: typeof copy;
};
export default clipboard;
