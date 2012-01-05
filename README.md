# Monolith [![Build Status](https://secure.travis-ci.org/mikl/monolith.png)](http://travis-ci.org/mikl/monolith)

Node.js module to aggregate CSS and JavaScript for inlining them into a
single HTML document. Helpful for high-performance HTML5 apps.

### Example ###

First, initialise the Monolith and add your CSS/JS files:

    var monolith = require('monolith').init();

    // Add our CSS.
    monolith.addCSSFile(path.join("path", "to", "typography.css"));
    monolith.addCSSFile(path.join("path", "to", "layout.css"));

    // Add JavaScript.
    monolith.addScriptFile(path.join("path", "to", "jquery-1.7.1.js"));
    monolith.addScriptFile(require.resolve('underscore'));
    monolith.addScriptFile(require.resolve('backbone'));

Then add them to your template rendering logic (the following will vary
greatly depending on what sort of template rendering you use):

    template.render({
      css: monolith.getCSS(),
      script: monolith.getScript()
    };

Then, in the template, add the CSS and styles to the page (this examply
uses [Underscore templates][utmpl], the syntax should be easy to figure out):

    <head>
      <meta charset="utf-8">

      <title>Demo</title>

      <% _.each(css, function (code) { %>
      <style><%= code %></style>
      <% }); %>

      <% _.each(script, function (code) { %>
      <script><%= code %></script>
      <% }); %>
    </head>

And you're done. 

[utmpl]: http://documentcloud.github.com/underscore/#template

