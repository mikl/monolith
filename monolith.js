/*!
 * Copyright 2011 Mikkel Hoegh
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */
"use strict";

var fs = require('fs');

var Monolith = function (options) {
  var self = this;

  self.construct = function () {
    self.css = [];
    self.script = [];
  };

  self.addCSSFile = function (filepath) {
    self.css.push(fs.readFileSync(filepath, 'utf-8'));
  };

  self.addScriptFile = function (filepath) {
    self.script.push(fs.readFileSync(filepath, 'utf-8'));
  };

  self.getCSS = function () {
    return self.css.join("\n");
  };

  self.getScript = function () {
    return self.script.join("\n");
  };

  return self.construct();
};

// Helper function to generate a Monolith instance for use.
module.exports.init = function (options) {
  return new Monolith(options);
};

