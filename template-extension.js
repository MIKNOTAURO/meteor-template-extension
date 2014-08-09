Template.prototype.replacesTemplate = function (replacedTemplateName) {
  var self = this;

  var replacedTemplate = Template[replacedTemplateName];
  if (!replacedTemplate) {
    console.warn("Can't replace template " + replacedTemplateName + " because it hasn't been defined yet.");
    return;
  }

  replacedTemplate.__render = Template[self.__templateName].__render;
};

Template.prototype.inheritsHelpersFromTemplate = function (otherTemplateName) {
  var self = this;

  var otherTemplate = Template[otherTemplateName];
  if (!otherTemplate) {
    console.warn("Can't inherit helpers from template " + otherTemplateName + " because it hasn't been defined yet.");
    return;
  }

  var thisTemplate = Template[self.__templateName];
  for (var h in otherTemplate) {
    if (otherTemplate.hasOwnProperty(h) && (h.slice(0, 2) !== "__")) {
      thisTemplate[h] = otherTemplate[h];
    }
  }
};

Template.prototype.inheritsEventsFromTemplate = function (otherTemplateName) {
  var self = this;

  var otherTemplate = Template[otherTemplateName];
  if (!otherTemplate) {
    console.warn("Can't inherit events from template " + otherTemplateName + " because it hasn't been defined yet.");
    return;
  }

  Template[self.__templateName].__eventMaps = otherTemplate.__eventMaps;
};

Template.prototype.copyAs = function (newTemplateName) {
    var self = this;

    var newTemplate = Template.__define__(newTemplateName, self.__render);
    newTemplate.__initView = self.__initView;

    Template[newTemplateName] = newTemplate;

    newTemplate.inheritsHelpersFromTemplate(self.__templateName);
    newTemplate.inheritsEventsFromTemplate(self.__templateName);
};