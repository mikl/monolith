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
  var self = this;

  self.construct = function () {
    options = options || {};

    self.minify = options.hasOwnProperty('minify') ? options.minify : true;

    self.css = [];
    self.script = [];
  };

  self.addCSSFile = function (filepath) {
    self.css.push(fs.readFileSync(filepath, 'utf-8'));
  };

  self.addScriptFile = function (filepath) {
    var source = fs.readFileSync(filepath, 'utf-8');

    if (self.minify) {
      self.script.push(uglify(source, {
        gen_options: { inline_script: true }
      }));
    }
    else {
      self.script.push(source);
    }
  };

  self.getCSS = function () {
    return self.css;
  };

  self.getScript = function () {
    return self.script;
  };

  return self.construct();
};

// Helper function to generate a Monolith instance for use.
module.exports.init = function (options) {
  return new Monolith(options);
};

