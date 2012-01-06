/*!
 * Copyright 2012 Mikkel Hoegh
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */
"use strict";

var fs = require('fs'),
    uglify = require('uglify-js');

var Monolith = function (options) {
  var self = this,
      css = [],
      script = [];

  self.construct = function () {
    options = options || {};

    self.minify = options.hasOwnProperty('minify') ? options.minify : true;

  };

  // Add CSS to the CSS array.
  self.addCSS = function (source) {
    css.push(source);
  };

  self.addCSSFile = function (filepath) {
    self.addCSS(fs.readFileSync(filepath, 'utf-8'));
  };

  self.addScript = function (source) {
    if (self.minify) {
      script.push(uglify(source, {
        gen_options: { inline_script: true }
      }));
    }
    else {
      script.push(source);
    }
  };

  self.addScriptFile = function (filepath) {
    self.addScript(fs.readFileSync(filepath, 'utf-8'));
  };

  self.getCSS = function () {
    return css;
  };

  self.getScript = function () {
    return script;
  };

  return self.construct();
};

// Helper function to generate a Monolith instance for use.
module.exports.init = function (options) {
  return new Monolith(options);
};

