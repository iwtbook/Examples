// router-client.js

export class Router {
  /**
   * The constructor initializes the Router instance and adds the necessary event 
   * listeners to the document / window. Must be called before adding any routes.
   * @param {string} route The route for the entry point of your app (usually just '/' but can be anything)
   * @param {function} func The function of what will be executed on that specific route
   * @param {string} base The base to prepend onto any route (optional)
   */
  constructor (route, func, base) {
    this.base = this.formatBase(base); // The base to prepend onto all routes
    this.routes = {}; // Object to hold all of the routes / functions in
    this.entry = `${this.base}${route}`; // The entry route
    this.currState = this.entry; // The current state of the Router
    this.addRoute(this.entry, func); // The entry page

    // Listen for link clicks to intercept them and use the Router instead
    document.addEventListener('click', e => {
      let el = e.target;

      // Make sure that it was a link that was clicked
      while (el && 'A' !== el.nodeName.toUpperCase()) el = el.parentNode;
      if (!el || 'A' !== el.nodeName.toUpperCase()) return;

      // If it's a non-linking <a> then ignore it
      if (el.hasAttribute('download') || el.getAttribute('rel') === 'external') return;
      
      // Prevent the default link action
      e.preventDefault();

      // Change the route
      if (this.currState != `${this.base}${el.getAttribute('href')}`) {
        if (this.pushHistory(`${this.base}${el.getAttribute('href')}`)) {
          this.changeRoute(`${this.base}${el.getAttribute('href')}`);
        }
      }
    });

    // When the back button is hit, grab the old state and update the page
    window.addEventListener('popstate', e => {
      this.changeRoute(e.state?.route);
    });

    // On page load if the current page isn't the entry page, then change the route to the new page.
    // This won't do anything unless you have all routes on your server diverted to the entry page.
    window.addEventListener('DOMContentLoaded', () => {
      this.changeRoute(window.location.pathname);
    });
  }

  /**
   * Takes in the base the user input, checks to make sure first char is / and that there isn't a trailing /
   * then encodes the base to URI just in case. For internal use only.
   * @param {string} base the raw base string that the user passed in
   * @returns {string} formatted base string
   */
  formatBase(base) {
    if (!base) return '';
    if (base.charAt(0) != '/') base = '/' + base;
    if (base.charAt(base.length - 1) == '/') base = base.substr(0, base.length - 1);
    return encodeURI(base);
  }

  /**
   * Adds route and associated function to routes object for storage
   * @param {string} route the route to be added
   * @param {function} func the associated function to execute for the given route
   */
  addRoute(route, func) {
    this.routes[`${this.base}${route}`] = func;
  }

  /**
   * Adds the given route and state to history so forward and backward navigation will work
   * @param {string} route the route to add to history
   * @returns {boolean} whether or not the route was real and valid in the routes object
   */
  pushHistory(route) {
    let state = route;
    // If the route doesn't exist and there ISN'T any 404 function handler
    if (!this.routes[route] && !this.routes['*']) {
      console.log(`Error: route ${route} doesn't exist`);
      return false;
    // If the route doesn't exist but there IS a 404 function handler
    } else if (!this.routes[route]) {
      state = '*';
    }
    
    history.pushState({route: state}, '', `${this.base}${route}`);
    return true;
  }

  /**
   * Executes the function associated with the given route stored in the routes object.
   * @param {string} route the desired route to change to
   */
  changeRoute(route) {
    // If the route is null, it's likely the entry page since that won't have a state
    if (!route) {
      route = this.entry;
    // If the route doesn't exist and there is ISN'T a 404 handler
    } else if (!this.routes[route] && !this.routes['*']) {
      console.log(`Error: route ${route} doesn't exist`);
      route = this.entry;
      history.replaceState({route: route}, '', `${this.base}${route}`);
    // If the route doesn't exist but there IS a 404 function handler
    } else if (!this.routes[route]) {
      route = '*';
    }
    
    this.currState = `${this.base}${route}`;
    this.routes[route]();
  }
}
