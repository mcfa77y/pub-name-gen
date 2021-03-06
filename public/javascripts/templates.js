(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['pub_name'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class='page-header'>\n    <h1>The "
    + alias3(((helper = (helper = helpers.noun1 || (depth0 != null ? depth0.noun1 : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"noun1","hash":{},"data":data}) : helper)))
    + " and "
    + alias3(((helper = (helper = helpers.noun2 || (depth0 != null ? depth0.noun2 : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"noun2","hash":{},"data":data}) : helper)))
    + " </h1>\n</div>";
},"useData":true});
templates['table'] = template({"1":function(depth0,helpers,partials,data) {
    return "        <th>Add to favorites</th>\n";
},"3":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=this.escapeExpression;

  return "        <tr>\n            <td class='card'>\n                <span class='image-wrap' style='background:url("
    + alias1(((helper = (helper = helpers.preview_url_84 || (depth0 != null ? depth0.preview_url_84 : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"preview_url_84","hash":{},"data":data}) : helper)))
    + ") no-repeat center center; background-color: "
    + alias1(helpers.randomColor.call(depth0,(depths[1] != null ? depths[1].colors : depths[1]),{"name":"randomColor","hash":{},"data":data}))
    + "'>\n             </span>\n            </td>\n            <td class='circle'>\n                <span class='image-wrap' style='background:url("
    + alias1(helpers.getIt.call(depth0,(depths[1] != null ? depths[1].icons2 : depths[1]),(data && data.index),"preview_url_84",{"name":"getIt","hash":{},"data":data}))
    + ") no-repeat center center; background-color: "
    + alias1(helpers.randomColor.call(depth0,(depths[1] != null ? depths[1].colors : depths[1]),{"name":"randomColor","hash":{},"data":data}))
    + "'>\n             </span>\n            </td>\n"
    + ((stack1 = helpers['if'].call(depth0,(depths[1] != null ? depths[1].user : depths[1]),{"name":"if","hash":{},"fn":this.program(4, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "        </tr>\n";
},"4":function(depth0,helpers,partials,data) {
    return "            <td>\n                <button type=\"button\" class=\"btn btn-default addToFavorite\" aria-label=\"Left Align\">\n                    <span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span>\n                </button>\n            </td>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<table class='table table-striped'>\n    <thead>\n        <th>"
    + alias3(((helper = (helper = helpers.noun1 || (depth0 != null ? depth0.noun1 : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"noun1","hash":{},"data":data}) : helper)))
    + "</th>\n        <th>"
    + alias3(((helper = (helper = helpers.noun2 || (depth0 != null ? depth0.noun2 : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"noun2","hash":{},"data":data}) : helper)))
    + "</th>\n"
    + ((stack1 = helpers['if'].call(depth0,(depths[1] != null ? depths[1].user : depths[1]),{"name":"if","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </thead>\n    <tbody>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.icons1 : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </tbody>\n</table>";
},"useData":true,"useDepths":true});
})();