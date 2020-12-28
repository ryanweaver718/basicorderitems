(function(e, a) { for(var i in a) e[i] = a[i]; if(a.__esModule) Object.defineProperty(e, "__esModule", { value: true }); }(exports,
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./helpers.js":
/*!********************!*\
  !*** ./helpers.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "response": () => /* binding */ response
/* harmony export */ });
const response = data => {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    statusCode: 200,
    body: JSON.stringify(data)
  };
};

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deleteOrder": () => /* binding */ deleteOrder,
/* harmony export */   "updateOrderCost": () => /* binding */ updateOrderCost,
/* harmony export */   "getOrders": () => /* binding */ getOrders,
/* harmony export */   "createOrder": () => /* binding */ createOrder
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "uuid");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ "./helpers.js");
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models */ "./models.js");



const deleteOrder = async ({
  queryStringParameters
}) => {
  const {
    id
  } = queryStringParameters;
  await _models__WEBPACK_IMPORTED_MODULE_2__.OrderModel.delete({
    id
  });
  return (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.response)({
    success: true
  });
};
const updateOrderCost = async ({
  body
}) => {
  const {
    cost
  } = JSON.parse(body);
  await _models__WEBPACK_IMPORTED_MODULE_2__.OrderModel.update({
    id
  }, {
    cost
  });
  return (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.response)({
    success: true
  });
};
const getOrders = async ({
  queryStringParameters
}) => {
  const {
    email
  } = queryStringParameters;
  let allOrders = await _models__WEBPACK_IMPORTED_MODULE_2__.OrderModel.scan().exec();
  let orders = allOrders.filter(order => {
    if (order.email === email) {
      return true;
    } else {
      return false;
    }
  });

  for (let order of orders) {
    order.items = await _models__WEBPACK_IMPORTED_MODULE_2__.ItemModel.query({
      orderId: order.id
    }).exec();
  }

  return (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.response)({
    orders
  });
};
const createOrder = async ({
  body
}) => {
  const {
    email,
    items
  } = JSON.parse(body);
  let order = await _models__WEBPACK_IMPORTED_MODULE_2__.OrderModel.create({
    id: (0,uuid__WEBPACK_IMPORTED_MODULE_0__.v4)(),
    email,
    date: Date.now().toString()
  });
  let createdItems = [];
  let costOfAllItems = 0;

  for (const item of items) {
    let dbItem = await _models__WEBPACK_IMPORTED_MODULE_2__.ItemModel.create({
      id: (0,uuid__WEBPACK_IMPORTED_MODULE_0__.v4)(),
      orderId: order.id,
      quantity: parseInt(item.quantity),
      costPerItem: item.costPerItem,
      name: item.name
    });
    costOfAllItems += parseFloat(item.costPerItem) * parseInt(item.quantity);
    createdItems.push(dbItem);
  }

  order = await _models__WEBPACK_IMPORTED_MODULE_2__.OrderModel.update({
    id: order.id
  }, {
    cost: costOfAllItems
  });
  return (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.response)({
    order,
    createdItems
  });
};

/***/ }),

/***/ "./models.js":
/*!*******************!*\
  !*** ./models.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OrderModel": () => /* binding */ OrderModel,
/* harmony export */   "ItemModel": () => /* binding */ ItemModel
/* harmony export */ });
/* harmony import */ var dynamoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dynamoose */ "dynamoose");
/* harmony import */ var dynamoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dynamoose__WEBPACK_IMPORTED_MODULE_0__);

const OrderSchema = new (dynamoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({
  id: {
    hashKey: true,
    required: true,
    type: String
  },
  email: {
    type: String,
    required: true
  },
  cost: {
    type: Number
  },
  date: {
    type: String,
    required: true
  }
});
const ItemSchema = new (dynamoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({
  orderId: {
    type: String,
    required: true,
    hashKey: true
  },
  id: {
    rangeKey: true,
    required: true,
    type: String
  },
  name: String,
  quantity: Number,
  costPerItem: String
});
const OrderModel = dynamoose__WEBPACK_IMPORTED_MODULE_0___default().model('orders-ryansapp-two', OrderSchema);
const ItemModel = dynamoose__WEBPACK_IMPORTED_MODULE_0___default().model('items-ryansapp-two', ItemSchema);

/***/ }),

/***/ "dynamoose":
/*!****************************!*\
  !*** external "dynamoose" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("dynamoose");;

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("uuid");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./index.js");
/******/ })()

));
//# sourceMappingURL=index.js.map