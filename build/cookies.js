/**
 * Cookies
 *
 * JS Library to deal with Cookies
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2018-11-24
 */
/**
 * Get
 *
 * Gets a cookie or returns the default. Set no name to get all
 *
 * @name get
 * @access public
 * @param {string} name The name of the cookie to fetch
 * @param {string} defaulReturn The default value to return if no cookie is found
 * @return {string | object | null}
 */
function get(name, defaulReturn) {
    // Set the default if no value is passed
    if (typeof defaulReturn === 'undefined') {
        defaulReturn = null;
    }
    // Parse all cookies
    const oCookies = {};
    const lCookies = document.cookie.split(';');
    for (const s of lCookies) {
        const l = s.split('=');
        oCookies[l[0].trimStart()] = decodeURIComponent(l[1]);
    }
    // If there's no name, return all
    if (typeof name === 'undefined') {
        return oCookies;
    }
    // If the cookie exists return it, else return the default
    return (name in oCookies) ? oCookies[name] : defaulReturn;
}
/**
 * Remove
 *
 * Deletes a cookie
 *
 * @name remove
 * @access public
 * @param {string} name The name of the cookie to delete
 * @param {string?} domain The domain of the cookie
 * @param {string?} path The path of the cookie
 * @return {void}
 */
function remove(name, domain, path) {
    set(name, '', -86400, domain, path);
}
/**
 * Set
 *
 * Sets a cookie
 *
 * @name set
 * @access public
 * @param {string} name The name of the cookie
 * @param {string} value The value to store
 * @param {number} expires The number of seconds before the cookie expires
 * @param {string?} domain The optional domain to set the cookie on
 * @param {string?} path The optional path of the cookie
 * @return {void}
 */
function set(name, value, expires, domain, path) {
    // Init the sections with the name and value
    const lSections = [
        `${name}=${encodeURIComponent(value)}`
    ];
    // If we have an expires
    if (expires) {
        // Generate the expires time
        const d = new Date();
        d.setTime(d.getTime() + (expires * 1000));
        // Add it to the sections
        lSections.push(`expires=${d.toUTCString()}`);
    }
    // If we have a domain
    if (domain) {
        lSections.push(`domain=${domain}`);
    }
    // If we have a path
    if (path) {
        lSections.push(`path=${path}`);
    }
    // Set the cookie by combining the sections
    document.cookie = lSections.join('; ');
}
// Default export
const cookies = { get, remove, set };
export default cookies;
