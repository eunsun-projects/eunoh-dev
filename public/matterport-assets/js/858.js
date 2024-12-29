/*! For license information please see 858.js.LICENSE.txt */
(self.webpackChunkmp_webgl = self.webpackChunkmp_webgl || []).push([
  [858],
  {
    70858: (e) => {
      function t() {
        switch (((this._element = null), arguments.length)) {
          case 1:
            var e = arguments[0];
            e != t.INPUT_TEXT && e != t.INPUT_BUTTON && e != t.INPUT_SELECT && e != t.INPUT_CHECKBOX
              ? (this._element = document.createElement(e))
              : ((this._element = document.createElement('input')), (this._element.type = e));
            break;
          case 0:
            this._element = document.createElement('div');
        }
      }
      (t.DIV = 'div'),
        (t.INPUT_TEXT = 'text'),
        (t.INPUT_BUTTON = 'button'),
        (t.INPUT_SELECT = 'select'),
        (t.INPUT_CHECKBOX = 'checkbox'),
        (t.OPTION = 'option'),
        (t.LIST = 'ul'),
        (t.LIST_ITEM = 'li'),
        (t.SPAN = 'span'),
        (t.TEXTAREA = 'textarea'),
        (t.prototype = {
          addChild: function (e) {
            return this._element.appendChild(e.getElement()), e;
          },
          addChildren: function () {
            for (var e = -1, t = arguments.length, n = this._element; ++e < t; )
              n.appendChild(arguments[e].getElement());
            return this;
          },
          addChildAt: function (e, t) {
            return this._element.insertBefore(e.getElement(), this._element.children[t]), e;
          },
          removeChild: function (e) {
            return this.contains(e) ? (this._element.removeChild(e.getElement()), e) : null;
          },
          removeChildren: function () {
            for (var e = -1, t = arguments.length, n = this._element; ++e < t; )
              n.removeChild(arguments[e].getElement());
            return this;
          },
          removeChildAt: function (e, t) {
            return this.contains(e) ? (this._element.removeChild(e.getElement()), e) : null;
          },
          removeAllChildren: function () {
            for (var e = this._element; e.hasChildNodes(); ) e.removeChild(e.lastChild);
            return this;
          },
          setWidth: function (e) {
            return (this._element.style.width = e + 'px'), this;
          },
          getWidth: function () {
            return this._element.offsetWidth;
          },
          setHeight: function (e) {
            return (this._element.style.height = e + 'px'), this;
          },
          getHeight: function () {
            return this._element.offsetHeight;
          },
          setPosition: function (e, t) {
            return this.setPosition(e).setPosition(t);
          },
          setPositionX: function (e) {
            return (this._element.style.marginLeft = e + 'px'), this;
          },
          setPositionY: function (e) {
            return (this._element.style.marginTop = e + 'px'), this;
          },
          setPositionGlobal: function (e, t) {
            return this.setPositionGlobalX(e).setPositionGlobalY(t);
          },
          setPositionGlobalX: function (e) {
            return (this._element.style.left = e + 'px'), this;
          },
          setPositionGlobalY: function (e) {
            return (this._element.style.top = e + 'px'), this;
          },
          getPosition: function () {
            return [this.getPositionX(), this.getPositionY()];
          },
          getPositionX: function () {
            return this._element.offsetLeft;
          },
          getPositionY: function () {
            return this._element.offsetTop;
          },
          getPositionGlobal: function () {
            for (var e = [0, 0], t = this._element; t; )
              (e[0] += t.offsetLeft), (e[1] += t.offsetTop), (t = t.offsetParent);
            return e;
          },
          getPositionGlobalX: function () {
            for (var e = 0, t = this._element; t; ) (e += t.offsetLeft), (t = t.offsetParent);
            return e;
          },
          getPositionGlobalY: function () {
            for (var e = 0, t = this._element; t; ) (e += t.offsetTop), (t = t.offsetParent);
            return e;
          },
          addEventListener: function (e, t, n) {
            return this._element.addEventListener(e, t, n), this;
          },
          removeEventListener: function (e, t, n) {
            return this._element.removeEventListener(e, t, n), this;
          },
          dispatchEvent: function (e) {
            return this._element.dispatchEvent(e), this;
          },
          setStyleClass: function (e) {
            return (this._element.className = e), this;
          },
          setStyleProperty: function (e, t) {
            return (this._element.style[e] = t), this;
          },
          getStyleProperty: function (e) {
            return this._element.style[e];
          },
          setStyleProperties: function (e) {
            for (var t in e) this._element.style[t] = e[t];
            return this;
          },
          deleteStyleClass: function () {
            return (this._element.className = ''), this;
          },
          deleteStyleProperty: function (e) {
            return (this._element.style[e] = ''), this;
          },
          deleteStyleProperties: function (e) {
            for (var t in e) this._element.style[t] = '';
            return this;
          },
          getChildAt: function (e) {
            return new t().setElement(this._element.children[e]);
          },
          getChildIndex: function (e) {
            return this._indexOf(this._element, e.getElement());
          },
          getNumChildren: function () {
            return this._element.children.length;
          },
          getFirstChild: function () {
            return new t().setElement(this._element.firstChild);
          },
          getLastChild: function () {
            return new t().setElement(this._element.lastChild);
          },
          hasChildren: function () {
            return 0 != this._element.children.length;
          },
          contains: function (e) {
            return -1 != this._indexOf(this._element, e.getElement());
          },
          _indexOf: function (e, t) {
            return Array.prototype.indexOf.call(e.children, t);
          },
          setProperty: function (e, t) {
            return (this._element[e] = t), this;
          },
          setProperties: function (e) {
            for (var t in e) this._element[t] = e[t];
            return this;
          },
          getProperty: function (e) {
            return this._element[e];
          },
          setElement: function (e) {
            return (this._element = e), this;
          },
          getElement: function () {
            return this._element;
          },
          getStyle: function () {
            return this._element.style;
          },
          getParent: function () {
            return new t().setElement(this._element.parentNode);
          },
        }),
        (t.getNodeByElement = function (e) {
          return new t().setElement(e);
        }),
        (t.getNodeById = function (e) {
          return new t().setElement(document.getElementById(e));
        }),
        (e.exports = t);
    },
  },
]);
