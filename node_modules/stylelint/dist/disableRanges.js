"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (root, result) {
  result.stylelint = result.stylelint || {};

  var disabledRanges = result.stylelint.disabledRanges = {
    all: []
  };
  var currentlyDisabledRules = new Set();

  root.walkComments(checkComment);

  return result;

  function processDisableLineCommand(comment) {
    getCommandRules(disableLineCommand, comment.text).forEach(function (ruleToDisable) {
      if (currentlyDisabledRules.has(ALL_RULES)) {
        throw comment.error("All rules have already been disabled", { plugin: "stylelint" });
      }
      if (currentlyDisabledRules.has(ruleToDisable)) {
        throw comment.error("\"" + ruleToDisable + "\" has already been disabled", { plugin: "stylelint" });
      }
      if (ruleToDisable === ALL_RULES) {
        Object.keys(disabledRanges).forEach(function (ruleName) {
          startDisabledRange(comment, ruleName);
          endDisabledRange(comment, ruleName);
        });
      } else {
        startDisabledRange(comment, ruleToDisable);
        endDisabledRange(comment, ruleToDisable);
      }
    });
  }

  function processDisableCommand(comment) {
    getCommandRules(disableCommand, comment.text).forEach(function (ruleToDisable) {
      var alreadyDisabled = currentlyDisabledRules.has(ruleToDisable);
      // If all rules have already been disabled and we're trying to do it again ...
      if (ruleToDisable === ALL_RULES && alreadyDisabled) {
        throw comment.error("All rules have already been disabled", { plugin: "stylelint" });
      }
      // If all rules have already been disabled or this specific rule has been ...
      if (alreadyDisabled) {
        throw comment.error("\"" + ruleToDisable + "\" has already been disabled", { plugin: "stylelint" });
      }

      if (ruleToDisable === ALL_RULES) {
        Object.keys(disabledRanges).forEach(function (ruleName) {
          startDisabledRange(comment, ruleName);
        });
      } else {
        startDisabledRange(comment, ruleToDisable);
      }
      currentlyDisabledRules.add(ruleToDisable);
    });
  }

  function processEnableCommand(comment) {
    getCommandRules(enableCommand, comment.text).forEach(function (ruleToEnable) {
      if (ruleToEnable === ALL_RULES) {
        if (_lodash2.default.values(disabledRanges).every(function (ranges) {
          return _lodash2.default.isEmpty(ranges) || !!_lodash2.default.last(ranges.end);
        })) {
          throw comment.error("No rules have been disabled", { plugin: "stylelint" });
        }
        Object.keys(disabledRanges).forEach(function (ruleName) {
          if (!_lodash2.default.get(_lodash2.default.last(disabledRanges[ruleName]), "end")) {
            endDisabledRange(comment, ruleName);
          }
        });
        currentlyDisabledRules.clear();
        return;
      }

      if (currentlyDisabledRules.has(ALL_RULES) && !currentlyDisabledRules.has(ruleToEnable)) {
        // Get a starting point from the where all rules were disabled
        if (!disabledRanges[ruleToEnable]) {
          disabledRanges[ruleToEnable] = _lodash2.default.cloneDeep(disabledRanges.all);
        } else {
          disabledRanges[ruleToEnable].push(_lodash2.default.clone(_lodash2.default.last(disabledRanges[ALL_RULES])));
        }
        endDisabledRange(comment, ruleToEnable);
        return;
      }

      if (currentlyDisabledRules.has(ruleToEnable)) {
        endDisabledRange(comment, ruleToEnable);
        currentlyDisabledRules.delete(ruleToEnable);
        return;
      }

      throw comment.error("\"" + ruleToEnable + "\" has not been disabled", { plugin: "stylelint" });
    });
  }

  function checkComment(comment) {
    var text = comment.text;

    // Ignore comments that are not relevant commands

    if (text.indexOf(COMMAND_PREFIX) !== 0) {
      return result;
    }

    if (text.indexOf(disableLineCommand) === 0) {
      processDisableLineCommand(comment);
    } else if (text.indexOf(disableCommand) === 0) {
      processDisableCommand(comment);
    } else if (text.indexOf(enableCommand) === 0) {
      processEnableCommand(comment);
    }
  }

  function getCommandRules(command, fullText) {
    var rules = _lodash2.default.compact(fullText.slice(command.length).split(",")).map(function (r) {
      return r.trim();
    });
    if (_lodash2.default.isEmpty(rules)) {
      return [ALL_RULES];
    }
    return rules;
  }

  function startDisabledRange(comment, ruleName) {
    var rangeObj = { start: comment.source.start.line };
    ensureRuleRanges(ruleName);
    disabledRanges[ruleName].push(rangeObj);
  }

  function endDisabledRange(comment, ruleName) {
    var lastRangeForRule = _lodash2.default.last(disabledRanges[ruleName]);
    if (!lastRangeForRule) {
      return;
    }
    // Add an `end` prop to the last range of that rule
    lastRangeForRule.end = comment.source.end.line;
  }

  function ensureRuleRanges(ruleName) {
    if (!disabledRanges[ruleName]) {
      disabledRanges[ruleName] = _lodash2.default.cloneDeep(disabledRanges.all);
    }
  }
};

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var COMMAND_PREFIX = "stylelint-";
var disableCommand = COMMAND_PREFIX + "disable";
var enableCommand = COMMAND_PREFIX + "enable";
var disableLineCommand = COMMAND_PREFIX + "disable-line";
var ALL_RULES = "all";

// Run it like a plugin ...