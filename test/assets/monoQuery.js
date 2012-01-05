/*!
 * monoQuery JavaScript Library
 * A silly, renamed, reduced, useless mock-up of jQuery used for testing
 * the Monolith module for Node.js.
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
"use strict";
(function( window, undefined ) {

// Use the correct document accordingly with window argument (sandbox)
var document = window.document,
	navigator = window.navigator,
	location = window.location;

var monoQuery = (function() {

// A central reference to the root monoQuery(document)
var rootmonoQuery;

// Define a local copy of monoQuery
var  monoQuery = function( selector, context ) {
  // The monoQuery object is actually just the init constructor 'enhanced'
  return new monoQuery.fn.init( selector, context, rootmonoQuery );
},

// Map over monoQuery in case of overwrite
_monoQuery = window.monoQuery,

// Map over the $ in case of overwrite
_$ = window.$;

}());

monoQuery.fn = monoQuery.prototype = {
	constructor: monoQuery,
  init: function () {
    return this;
  },
  length: 0,
  flippertigibbet: function () {
    return 'hello burger';
  }
};

}( window ));

