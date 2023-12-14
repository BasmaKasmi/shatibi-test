"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/use-callback-ref@1.3.0_@types+react@18.2.38_react@18.2.0";
exports.ids = ["vendor-chunks/use-callback-ref@1.3.0_@types+react@18.2.38_react@18.2.0"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/use-callback-ref@1.3.0_@types+react@18.2.38_react@18.2.0/node_modules/use-callback-ref/dist/es2015/assignRef.js":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/use-callback-ref@1.3.0_@types+react@18.2.38_react@18.2.0/node_modules/use-callback-ref/dist/es2015/assignRef.js ***!
  \********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   assignRef: () => (/* binding */ assignRef)\n/* harmony export */ });\n/**\n * Assigns a value for a given ref, no matter of the ref format\n * @param {RefObject} ref - a callback function or ref object\n * @param value - a new value\n *\n * @see https://github.com/theKashey/use-callback-ref#assignref\n * @example\n * const refObject = useRef();\n * const refFn = (ref) => {....}\n *\n * assignRef(refObject, \"refValue\");\n * assignRef(refFn, \"refValue\");\n */ function assignRef(ref, value) {\n    if (typeof ref === \"function\") {\n        ref(value);\n    } else if (ref) {\n        ref.current = value;\n    }\n    return ref;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vdXNlLWNhbGxiYWNrLXJlZkAxLjMuMF9AdHlwZXMrcmVhY3RAMTguMi4zOF9yZWFjdEAxOC4yLjAvbm9kZV9tb2R1bGVzL3VzZS1jYWxsYmFjay1yZWYvZGlzdC9lczIwMTUvYXNzaWduUmVmLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0NBWUMsR0FDTSxTQUFTQSxVQUFVQyxHQUFHLEVBQUVDLEtBQUs7SUFDaEMsSUFBSSxPQUFPRCxRQUFRLFlBQVk7UUFDM0JBLElBQUlDO0lBQ1IsT0FDSyxJQUFJRCxLQUFLO1FBQ1ZBLElBQUlFLE9BQU8sR0FBR0Q7SUFDbEI7SUFDQSxPQUFPRDtBQUNYIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2hhdGliaS1uZXh0LWFwcC8uL25vZGVfbW9kdWxlcy8ucG5wbS91c2UtY2FsbGJhY2stcmVmQDEuMy4wX0B0eXBlcytyZWFjdEAxOC4yLjM4X3JlYWN0QDE4LjIuMC9ub2RlX21vZHVsZXMvdXNlLWNhbGxiYWNrLXJlZi9kaXN0L2VzMjAxNS9hc3NpZ25SZWYuanM/ODc3NiJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEFzc2lnbnMgYSB2YWx1ZSBmb3IgYSBnaXZlbiByZWYsIG5vIG1hdHRlciBvZiB0aGUgcmVmIGZvcm1hdFxuICogQHBhcmFtIHtSZWZPYmplY3R9IHJlZiAtIGEgY2FsbGJhY2sgZnVuY3Rpb24gb3IgcmVmIG9iamVjdFxuICogQHBhcmFtIHZhbHVlIC0gYSBuZXcgdmFsdWVcbiAqXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90aGVLYXNoZXkvdXNlLWNhbGxiYWNrLXJlZiNhc3NpZ25yZWZcbiAqIEBleGFtcGxlXG4gKiBjb25zdCByZWZPYmplY3QgPSB1c2VSZWYoKTtcbiAqIGNvbnN0IHJlZkZuID0gKHJlZikgPT4gey4uLi59XG4gKlxuICogYXNzaWduUmVmKHJlZk9iamVjdCwgXCJyZWZWYWx1ZVwiKTtcbiAqIGFzc2lnblJlZihyZWZGbiwgXCJyZWZWYWx1ZVwiKTtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2lnblJlZihyZWYsIHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiByZWYgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmVmKHZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAocmVmKSB7XG4gICAgICAgIHJlZi5jdXJyZW50ID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiByZWY7XG59XG4iXSwibmFtZXMiOlsiYXNzaWduUmVmIiwicmVmIiwidmFsdWUiLCJjdXJyZW50Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/use-callback-ref@1.3.0_@types+react@18.2.38_react@18.2.0/node_modules/use-callback-ref/dist/es2015/assignRef.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/.pnpm/use-callback-ref@1.3.0_@types+react@18.2.38_react@18.2.0/node_modules/use-callback-ref/dist/es2015/useMergeRef.js":
/*!**********************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/use-callback-ref@1.3.0_@types+react@18.2.38_react@18.2.0/node_modules/use-callback-ref/dist/es2015/useMergeRef.js ***!
  \**********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useMergeRefs: () => (/* binding */ useMergeRefs)\n/* harmony export */ });\n/* harmony import */ var _assignRef__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assignRef */ \"(ssr)/./node_modules/.pnpm/use-callback-ref@1.3.0_@types+react@18.2.38_react@18.2.0/node_modules/use-callback-ref/dist/es2015/assignRef.js\");\n/* harmony import */ var _useRef__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useRef */ \"(ssr)/./node_modules/.pnpm/use-callback-ref@1.3.0_@types+react@18.2.38_react@18.2.0/node_modules/use-callback-ref/dist/es2015/useRef.js\");\n\n\n/**\n * Merges two or more refs together providing a single interface to set their value\n * @param {RefObject|Ref} refs\n * @returns {MutableRefObject} - a new ref, which translates all changes to {refs}\n *\n * @see {@link mergeRefs} a version without buit-in memoization\n * @see https://github.com/theKashey/use-callback-ref#usemergerefs\n * @example\n * const Component = React.forwardRef((props, ref) => {\n *   const ownRef = useRef();\n *   const domRef = useMergeRefs([ref, ownRef]); // 👈 merge together\n *   return <div ref={domRef}>...</div>\n * }\n */ function useMergeRefs(refs, defaultValue) {\n    return (0,_useRef__WEBPACK_IMPORTED_MODULE_0__.useCallbackRef)(defaultValue || null, function(newValue) {\n        return refs.forEach(function(ref) {\n            return (0,_assignRef__WEBPACK_IMPORTED_MODULE_1__.assignRef)(ref, newValue);\n        });\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vdXNlLWNhbGxiYWNrLXJlZkAxLjMuMF9AdHlwZXMrcmVhY3RAMTguMi4zOF9yZWFjdEAxOC4yLjAvbm9kZV9tb2R1bGVzL3VzZS1jYWxsYmFjay1yZWYvZGlzdC9lczIwMTUvdXNlTWVyZ2VSZWYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXdDO0FBQ0U7QUFDMUM7Ozs7Ozs7Ozs7Ozs7Q0FhQyxHQUNNLFNBQVNFLGFBQWFDLElBQUksRUFBRUMsWUFBWTtJQUMzQyxPQUFPSCx1REFBY0EsQ0FBQ0csZ0JBQWdCLE1BQU0sU0FBVUMsUUFBUTtRQUFJLE9BQU9GLEtBQUtHLE9BQU8sQ0FBQyxTQUFVQyxHQUFHO1lBQUksT0FBT1AscURBQVNBLENBQUNPLEtBQUtGO1FBQVc7SUFBSTtBQUNoSiIsInNvdXJjZXMiOlsid2VicGFjazovL3NoYXRpYmktbmV4dC1hcHAvLi9ub2RlX21vZHVsZXMvLnBucG0vdXNlLWNhbGxiYWNrLXJlZkAxLjMuMF9AdHlwZXMrcmVhY3RAMTguMi4zOF9yZWFjdEAxOC4yLjAvbm9kZV9tb2R1bGVzL3VzZS1jYWxsYmFjay1yZWYvZGlzdC9lczIwMTUvdXNlTWVyZ2VSZWYuanM/ZTA4NyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhc3NpZ25SZWYgfSBmcm9tICcuL2Fzc2lnblJlZic7XG5pbXBvcnQgeyB1c2VDYWxsYmFja1JlZiB9IGZyb20gJy4vdXNlUmVmJztcbi8qKlxuICogTWVyZ2VzIHR3byBvciBtb3JlIHJlZnMgdG9nZXRoZXIgcHJvdmlkaW5nIGEgc2luZ2xlIGludGVyZmFjZSB0byBzZXQgdGhlaXIgdmFsdWVcbiAqIEBwYXJhbSB7UmVmT2JqZWN0fFJlZn0gcmVmc1xuICogQHJldHVybnMge011dGFibGVSZWZPYmplY3R9IC0gYSBuZXcgcmVmLCB3aGljaCB0cmFuc2xhdGVzIGFsbCBjaGFuZ2VzIHRvIHtyZWZzfVxuICpcbiAqIEBzZWUge0BsaW5rIG1lcmdlUmVmc30gYSB2ZXJzaW9uIHdpdGhvdXQgYnVpdC1pbiBtZW1vaXphdGlvblxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vdGhlS2FzaGV5L3VzZS1jYWxsYmFjay1yZWYjdXNlbWVyZ2VyZWZzXG4gKiBAZXhhbXBsZVxuICogY29uc3QgQ29tcG9uZW50ID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIHJlZikgPT4ge1xuICogICBjb25zdCBvd25SZWYgPSB1c2VSZWYoKTtcbiAqICAgY29uc3QgZG9tUmVmID0gdXNlTWVyZ2VSZWZzKFtyZWYsIG93blJlZl0pOyAvLyDwn5GIIG1lcmdlIHRvZ2V0aGVyXG4gKiAgIHJldHVybiA8ZGl2IHJlZj17ZG9tUmVmfT4uLi48L2Rpdj5cbiAqIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZU1lcmdlUmVmcyhyZWZzLCBkZWZhdWx0VmFsdWUpIHtcbiAgICByZXR1cm4gdXNlQ2FsbGJhY2tSZWYoZGVmYXVsdFZhbHVlIHx8IG51bGwsIGZ1bmN0aW9uIChuZXdWYWx1ZSkgeyByZXR1cm4gcmVmcy5mb3JFYWNoKGZ1bmN0aW9uIChyZWYpIHsgcmV0dXJuIGFzc2lnblJlZihyZWYsIG5ld1ZhbHVlKTsgfSk7IH0pO1xufVxuIl0sIm5hbWVzIjpbImFzc2lnblJlZiIsInVzZUNhbGxiYWNrUmVmIiwidXNlTWVyZ2VSZWZzIiwicmVmcyIsImRlZmF1bHRWYWx1ZSIsIm5ld1ZhbHVlIiwiZm9yRWFjaCIsInJlZiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/use-callback-ref@1.3.0_@types+react@18.2.38_react@18.2.0/node_modules/use-callback-ref/dist/es2015/useMergeRef.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/.pnpm/use-callback-ref@1.3.0_@types+react@18.2.38_react@18.2.0/node_modules/use-callback-ref/dist/es2015/useRef.js":
/*!*****************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/use-callback-ref@1.3.0_@types+react@18.2.38_react@18.2.0/node_modules/use-callback-ref/dist/es2015/useRef.js ***!
  \*****************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useCallbackRef: () => (/* binding */ useCallbackRef)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/.pnpm/next@14.0.3_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n/**\n * creates a MutableRef with ref change callback\n * @param initialValue - initial ref value\n * @param {Function} callback - a callback to run when value changes\n *\n * @example\n * const ref = useCallbackRef(0, (newValue, oldValue) => console.log(oldValue, '->', newValue);\n * ref.current = 1;\n * // prints 0 -> 1\n *\n * @see https://reactjs.org/docs/hooks-reference.html#useref\n * @see https://github.com/theKashey/use-callback-ref#usecallbackref---to-replace-reactuseref\n * @returns {MutableRefObject}\n */ function useCallbackRef(initialValue, callback) {\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(function() {\n        return {\n            // value\n            value: initialValue,\n            // last callback\n            callback: callback,\n            // \"memoized\" public interface\n            facade: {\n                get current () {\n                    return ref.value;\n                },\n                set current (value){\n                    var last = ref.value;\n                    if (last !== value) {\n                        ref.value = value;\n                        ref.callback(value, last);\n                    }\n                }\n            }\n        };\n    })[0];\n    // update callback\n    ref.callback = callback;\n    return ref.facade;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vdXNlLWNhbGxiYWNrLXJlZkAxLjMuMF9AdHlwZXMrcmVhY3RAMTguMi4zOF9yZWFjdEAxOC4yLjAvbm9kZV9tb2R1bGVzL3VzZS1jYWxsYmFjay1yZWYvZGlzdC9lczIwMTUvdXNlUmVmLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFpQztBQUNqQzs7Ozs7Ozs7Ozs7OztDQWFDLEdBQ00sU0FBU0MsZUFBZUMsWUFBWSxFQUFFQyxRQUFRO0lBQ2pELElBQUlDLE1BQU1KLCtDQUFRQSxDQUFDO1FBQWMsT0FBUTtZQUNyQyxRQUFRO1lBQ1JLLE9BQU9IO1lBQ1AsZ0JBQWdCO1lBQ2hCQyxVQUFVQTtZQUNWLDhCQUE4QjtZQUM5QkcsUUFBUTtnQkFDSixJQUFJQyxXQUFVO29CQUNWLE9BQU9ILElBQUlDLEtBQUs7Z0JBQ3BCO2dCQUNBLElBQUlFLFNBQVFGLE1BQU87b0JBQ2YsSUFBSUcsT0FBT0osSUFBSUMsS0FBSztvQkFDcEIsSUFBSUcsU0FBU0gsT0FBTzt3QkFDaEJELElBQUlDLEtBQUssR0FBR0E7d0JBQ1pELElBQUlELFFBQVEsQ0FBQ0UsT0FBT0c7b0JBQ3hCO2dCQUNKO1lBQ0o7UUFDSjtJQUFJLEVBQUUsQ0FBQyxFQUFFO0lBQ1Qsa0JBQWtCO0lBQ2xCSixJQUFJRCxRQUFRLEdBQUdBO0lBQ2YsT0FBT0MsSUFBSUUsTUFBTTtBQUNyQiIsInNvdXJjZXMiOlsid2VicGFjazovL3NoYXRpYmktbmV4dC1hcHAvLi9ub2RlX21vZHVsZXMvLnBucG0vdXNlLWNhbGxiYWNrLXJlZkAxLjMuMF9AdHlwZXMrcmVhY3RAMTguMi4zOF9yZWFjdEAxOC4yLjAvbm9kZV9tb2R1bGVzL3VzZS1jYWxsYmFjay1yZWYvZGlzdC9lczIwMTUvdXNlUmVmLmpzPzEzNDkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG4vKipcbiAqIGNyZWF0ZXMgYSBNdXRhYmxlUmVmIHdpdGggcmVmIGNoYW5nZSBjYWxsYmFja1xuICogQHBhcmFtIGluaXRpYWxWYWx1ZSAtIGluaXRpYWwgcmVmIHZhbHVlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIGEgY2FsbGJhY2sgdG8gcnVuIHdoZW4gdmFsdWUgY2hhbmdlc1xuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCByZWYgPSB1c2VDYWxsYmFja1JlZigwLCAobmV3VmFsdWUsIG9sZFZhbHVlKSA9PiBjb25zb2xlLmxvZyhvbGRWYWx1ZSwgJy0+JywgbmV3VmFsdWUpO1xuICogcmVmLmN1cnJlbnQgPSAxO1xuICogLy8gcHJpbnRzIDAgLT4gMVxuICpcbiAqIEBzZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL2hvb2tzLXJlZmVyZW5jZS5odG1sI3VzZXJlZlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vdGhlS2FzaGV5L3VzZS1jYWxsYmFjay1yZWYjdXNlY2FsbGJhY2tyZWYtLS10by1yZXBsYWNlLXJlYWN0dXNlcmVmXG4gKiBAcmV0dXJucyB7TXV0YWJsZVJlZk9iamVjdH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUNhbGxiYWNrUmVmKGluaXRpYWxWYWx1ZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgcmVmID0gdXNlU3RhdGUoZnVuY3Rpb24gKCkgeyByZXR1cm4gKHtcbiAgICAgICAgLy8gdmFsdWVcbiAgICAgICAgdmFsdWU6IGluaXRpYWxWYWx1ZSxcbiAgICAgICAgLy8gbGFzdCBjYWxsYmFja1xuICAgICAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgICAgIC8vIFwibWVtb2l6ZWRcIiBwdWJsaWMgaW50ZXJmYWNlXG4gICAgICAgIGZhY2FkZToge1xuICAgICAgICAgICAgZ2V0IGN1cnJlbnQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlZi52YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgY3VycmVudCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBsYXN0ID0gcmVmLnZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChsYXN0ICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZWYudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmVmLmNhbGxiYWNrKHZhbHVlLCBsYXN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH0pOyB9KVswXTtcbiAgICAvLyB1cGRhdGUgY2FsbGJhY2tcbiAgICByZWYuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICByZXR1cm4gcmVmLmZhY2FkZTtcbn1cbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUNhbGxiYWNrUmVmIiwiaW5pdGlhbFZhbHVlIiwiY2FsbGJhY2siLCJyZWYiLCJ2YWx1ZSIsImZhY2FkZSIsImN1cnJlbnQiLCJsYXN0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/use-callback-ref@1.3.0_@types+react@18.2.38_react@18.2.0/node_modules/use-callback-ref/dist/es2015/useRef.js\n");

/***/ })

};
;