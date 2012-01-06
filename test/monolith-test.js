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

var assert = require('assert'),
    fs = require('fs'),
    monolith = require('../monolith'),
    path = require('path'),
    vows = require('vows');

vows.describe('monolith').addBatch({
  "A new Monolith instance": {
    topic: monolith.init(),

    "should have the correct methods set": function (instance) {
      assert.isFunction(instance.addCSSFile);
      assert.isFunction(instance.addScriptFile);
      assert.isFunction(instance.getCSS);
      assert.isFunction(instance.getScript);
    },

    "should provide arrays of css and script files": function (instance) {
      assert.isArray(instance.getCSS());
      assert.isArray(instance.getScript());
    },

    "should start with empty arrays for css and script files": function (instance) {
      assert.isEmpty(instance.getCSS());
      assert.isEmpty(instance.getScript());
    },

    "adds CSS to its internal store when called": function (instance) {
      instance.addCSS('#monolith { align: centaur; }');
      assert.equal(instance.getCSS().length, 1);
    },

    "adds JavaScript to its internal store when called": function (instance) {
      instance.addScript('"use strict";');
      assert.equal(instance.getScript().length, 1);
    }
  },



  "A Monolith instance provided with a CSS file": {
    topic: function () {
      var filepath = path.join(__dirname, 'assets', 'normalize.css'),
          fileContents = fs.readFileSync(filepath, 'utf-8'),
          instance = monolith.init();

      instance.addCSSFile(filepath);

      return {
        fileContents: fileContents,
        instance: instance,

      };
    },

    "should have been provided with around 8KB CSS": function (topic) {
      assert.isTrue(topic.fileContents.length > 7000);
      assert.isTrue(topic.fileContents.length < 10000);
    },

    "should return a single stylesheet when getCSS() is invoked": function (topic) {
      // assert.length is currently broken, so use assert.equal in its place.
      assert.equal(topic.instance.getCSS().length, 1);

    },

    "should return a much smaller stylesheet after minification": function (topic) {
      var css = topic.instance.getCSS();

      assert.isTrue(css[0].length > 1000);
      assert.isTrue(css[0].length < 4000);
    }
  },



  "A Monolith instance provided with a JavaScript file": {
    topic: function () {
      var filepath = path.join(__dirname, 'assets', 'monoQuery.js'),
          fileContents = fs.readFileSync(filepath, 'utf-8'),
          instance = monolith.init();

      instance.addScriptFile(filepath);

      return {
        fileContents: fileContents,
        instance: instance
      };
    },

    "should have been provided with around 1KB JavaScript": function (topic) {
      assert.isTrue(topic.fileContents.length > 1000);
      assert.isTrue(topic.fileContents.length < 2000);
    },

    "should return a single script when getScript() is invoked": function (topic) {
      // assert.length is currently broken, so use assert.equal in its place.
      assert.equal(topic.instance.getScript().length, 1);

    },

    "should return a much smaller script after minification": function (topic) {
      var script = topic.instance.getScript();

      assert.isTrue(script[0].length > 100);
      assert.isTrue(script[0].length < 500);
    }
  }
}).export(module);

