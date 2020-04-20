"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeNotes = exports.isolateNotes = void 0;
var NOTES_MARKER = 'Notes: ';
var NOTES_REG = new RegExp("^".concat(NOTES_MARKER), 'm');
/*
 * We want to pull the notes out of each slide. This RegEx looks for "Notes: "
 * that starts on a new line. Anything after the notes marker will be considered notes.
 */

var isolateNotes = function isolateNotes(content) {
  var indexOfNotes = content.search(NOTES_REG);

  if (indexOfNotes >= 0) {
    // found the notes marker!
    return content.substring(indexOfNotes + NOTES_MARKER.length);
  }

  return '';
};
/*
 * When generating the slide components, we only want the slide content to be
 * compiled by mdx.sync. Remove all the notes content.
 */


exports.isolateNotes = isolateNotes;

var removeNotes = function removeNotes(content) {
  var indexOfNotes = content.search(NOTES_REG);

  if (indexOfNotes >= 0) {
    // found the notes marker!
    return content.substring(0, indexOfNotes);
  }

  return content;
};

exports.removeNotes = removeNotes;