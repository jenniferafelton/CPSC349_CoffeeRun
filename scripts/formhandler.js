// IIFE (Immediately Invoked Function Expression)
(function (window) {
  'use strict';
  var App = window.App || {};
  // JQuery uses $ 
  var $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }
    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }
  // submit button listener 
  // form handler created, callback is passed to addSumbitHandler
  FormHandler.prototype.addSubmitHandler = function (fn) {
    console.log('Setting submit handler for form');
    this.$formElement.on('submit', function (event) {
      event.preventDefault();

      // returns form data as an array
      var data = {};
      $(this).serializeArray().forEach(function (item) {
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      });

      console.log(data);
      fn(data);
      this.reset();
      this.elements[0].focus();
    });
  };


  App.FormHandler = FormHandler;
  window.App = App;

})(window);