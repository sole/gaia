/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- /
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

'use strict';

var ListMenu = {
  get element() {
    delete this.element;
    return this.element = document.getElementById('listmenu');
  },

  get container() {
    delete this.container;
    return this.container = document.getElementById('listmenu-container');
  },

  get visible() {
    return this.element.classList.contains('visible');
  },

  init: function lm_init() {
    window.addEventListener('click', this, true);
  },

  request: function lm_request(list_items, handler) {
    this.container.innerHTML = '';
    list_items.forEach(function render_item(element){
      var item = document.createElement('div');
      item.dataset.value = element.value;
      item.textContent = element.label;
      this.container.appendChild(item);

      if (handler) {
        this.onreturn = handler;
      } else {
        this.onreturn = function lm_onreturn(){};
      }
    }, this);
    this.show();
  },

  show: function lm_show() {
    this.element.classList.add('visible');
  },

  hide: function lm_hide() {
    this.element.classList.remove('visible');
  },

  onreturn: function lm_onReturn() {
  },

  handleEvent: function lm_handleEvent(evt) {
    switch (evt.type) {
      case 'screenchange': 
        if (!evt.detail.screenEnabled)
          this.hide();
        break;

      case 'click':
        var action = evt.target.dataset.value;
        this.hide();
        this.onreturn(action);
        break;

    }
  }
};

ListMenu.init();
