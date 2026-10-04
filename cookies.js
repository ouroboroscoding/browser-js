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
 * @param {string} defaultReturn The default value to return if no cookie is found
 * @return {string | object | null}
 */
function get(name, defaultReturn) {
    // Set the default if no value is passed
    const defRet = (typeof defaultReturn === 'undefined')
        ? null
        : defaultReturn;
    // Parse all cookies
    const oCookies = {};
    const lCookies = document.cookie.split(';');
    for (const s of lCookies) {
        const i = s.indexOf('=');
        if (i === -1)
            continue;
        oCookies[s.slice(0, i).trimStart()] = decodeURIComponent(s.slice(i + 1));
    }
    // If there's no name, return all
    if (typeof name === 'undefined') {
        return oCookies;
    }
    // If the cookie exists return it, else return the default
    return (name in oCookies) ? oCookies[name] : defRet;
}
/**
 * Remove
 *
 * Removes a cookie.
 *
 * @name remove
 * @access public
 * @param name The name of the cookie to delete
 * @param options The optional settings: Domain, Path
 */
function remove(name, optionsOrDomain, ...rest) {
    // Init options
    let options = {};
    // Detect new options-object format
    if (optionsOrDomain !== null && typeof optionsOrDomain === 'object') {
        options = { ...optionsOrDomain };
    }
    // Detect legacy (deprecated) format
    else if (typeof optionsOrDomain === 'string' || rest.length > 0) {
        console.warn('remove: passing (domain, path) as separate arguments is ' +
            'deprecated and will be removed in a future version. Pass an ' +
            'options object instead: remove(name, { Domain, Path })');
        const [path] = rest;
        options = {
            Domain: optionsOrDomain,
            Path: path
        };
    }
    // No options passed
    else {
        options = {};
    }
    // Add the expires to clear it immediately
    options.Expires = 0;
    // Call set with no value and a time in the past
    set(name, '', options);
}
/**
 * Set
 *
 * Sets a cookie.
 *
 * @param name The name of the cookie
 * @param value The value to store
 * @param options The optional settings: Domain, Expires, Path, Secure,
 * SameSite, Partitioned
 */
function set(name, value, optionsOrExpires, ...rest) {
    // If no name was passed
    if (!name) {
        throw new Error('set: name is required');
    }
    // Init options
    let options;
    // Detect new options-object format
    if (optionsOrExpires !== null && typeof optionsOrExpires === 'object') {
        options = optionsOrExpires;
    }
    // Detect legacy (deprecated) format
    else if (typeof optionsOrExpires === 'number' || rest.length > 0) {
        // Warn the user to update the code
        console.warn('set: passing (expires, domain, path) as separate arguments is ' +
            'deprecated and will be removed in a future version. Pass an ' +
            'options object instead: set(name, value, { Expires, Domain, ' +
            'Path })');
        // Pull out the domain and path if they exist
        const [domain, path] = rest;
        // Create the new format from the old format
        options = {
            Expires: optionsOrExpires,
            Domain: domain,
            Path: path,
        };
    }
    // No options passed
    else {
        options = {};
    }
    // Init the sections with the name and value
    const lSections = [
        `${name}=${encodeURIComponent(value)}`
    ];
    // If we have an expires
    if (options.Expires) {
        // Generate the expires time
        const d = new Date();
        d.setTime(d.getTime() + (options.Expires * 1000));
        // Add it to the sections
        lSections.push(`Expires=${d.toUTCString()}`);
    }
    // If we have a domain
    if (options.Domain) {
        lSections.push(`Domain=${options.Domain}`);
    }
    // If we have a path
    if (options.Path) {
        lSections.push(`Path=${options.Path}`);
    }
    // If we want secure
    if (options.Secure) {
        lSections.push('Secure');
    }
    // If we want SameSite
    if (options.SameSite) {
        // If the value is 'None' and Secure is not turned on
        if (options.SameSite === 'None' && !options.Secure) {
            // Warn the user this is invalid
            console.warn('set: SameSite as None without Secure is invalid and the ' +
                'browser will most likely fail to create the cookie.');
        }
        // Set it
        lSections.push(`SameSite=${options.SameSite}`);
    }
    // If we want partitioned
    if (options.Partitioned) {
        // If the value is true and Secure is not turned on
        if (options.Partitioned && !options.Secure) {
            // Warn the user this is invalid
            console.warn('set: Partitioned without Secure is invalid and the ' +
                'browser will most likely fail to create the cookie.');
        }
        // Set it
        lSections.push('Partitioned');
    }
    // Set the cookie by combining the sections
    document.cookie = lSections.join('; ');
}
// Default export
const cookies = { get, remove, set };
export default cookies;
