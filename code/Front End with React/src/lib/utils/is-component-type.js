"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/** isComponentType(Component, String)
 * Takes Component and name (String) of component type you want to test for
 * Returns a boolean
 * Turned into a util to avoid having to repeatedly check:
 * mdx or regular component types.
 * May be unnecessary in future, if we treat MDX differently
 *
 * **Note**: Make sure to pass `Component.name` instead of a string name as
 * the `name` parameter or else minification may break functionality.
 * See: https://github.com/FormidableLabs/spectacle/issues/763
 */
var _default = function _default(component, name) {
  return (component.props || {}).mdxType === name || (component.type || {}).name === name;
};

exports.default = _default;