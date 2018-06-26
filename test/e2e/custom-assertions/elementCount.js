// A custom Nightwatch assertion.
// The assertion name is the filename.
// Example usage:
//
//   browser.assert.elementCount(selector, count)
//
// For more information on custom assertions see:
// http://nightwatchjs.org/guide#writing-custom-assertions

/* eslint no-shadow: "off" */
exports.assertion = (selector, count) => {
  this.message = `Testing if element <${selector}> has count: ${count}`;
  this.expected = count;
  this.pass = val => val === this.expected;
  this.value = res => res.value;
  this.command = cb => this.api.execute(
    selector => document.querySelectorAll(selector).length,
    [selector],
    res => cb.call(this, res),
  );
};
