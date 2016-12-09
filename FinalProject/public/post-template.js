(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['post'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<section class=\"post\">\r\n  <div class=\"dismiss-button\">&times;</div>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.date : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  <p>Post: "
    + container.escapeExpression(((helper = (helper = helpers.details || (depth0 != null ? depth0.details : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"details","hash":{},"data":data}) : helper)))
    + "</p>\r\n <button type=\"button\" class=\"like-button\" onclick=\"style.color='blue'\">like</button>\r\n</section>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return "  <h2>Date: "
    + container.escapeExpression(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"date","hash":{},"data":data}) : helper)))
    + "</h2>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.details : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
})();