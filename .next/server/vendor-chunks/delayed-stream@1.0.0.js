"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/delayed-stream@1.0.0";
exports.ids = ["vendor-chunks/delayed-stream@1.0.0"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/delayed-stream@1.0.0/node_modules/delayed-stream/lib/delayed_stream.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/.pnpm/delayed-stream@1.0.0/node_modules/delayed-stream/lib/delayed_stream.js ***!
  \***************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar Stream = (__webpack_require__(/*! stream */ \"stream\").Stream);\nvar util = __webpack_require__(/*! util */ \"util\");\nmodule.exports = DelayedStream;\nfunction DelayedStream() {\n    this.source = null;\n    this.dataSize = 0;\n    this.maxDataSize = 1024 * 1024;\n    this.pauseStream = true;\n    this._maxDataSizeExceeded = false;\n    this._released = false;\n    this._bufferedEvents = [];\n}\nutil.inherits(DelayedStream, Stream);\nDelayedStream.create = function(source, options) {\n    var delayedStream = new this();\n    options = options || {};\n    for(var option in options){\n        delayedStream[option] = options[option];\n    }\n    delayedStream.source = source;\n    var realEmit = source.emit;\n    source.emit = function() {\n        delayedStream._handleEmit(arguments);\n        return realEmit.apply(source, arguments);\n    };\n    source.on(\"error\", function() {});\n    if (delayedStream.pauseStream) {\n        source.pause();\n    }\n    return delayedStream;\n};\nObject.defineProperty(DelayedStream.prototype, \"readable\", {\n    configurable: true,\n    enumerable: true,\n    get: function() {\n        return this.source.readable;\n    }\n});\nDelayedStream.prototype.setEncoding = function() {\n    return this.source.setEncoding.apply(this.source, arguments);\n};\nDelayedStream.prototype.resume = function() {\n    if (!this._released) {\n        this.release();\n    }\n    this.source.resume();\n};\nDelayedStream.prototype.pause = function() {\n    this.source.pause();\n};\nDelayedStream.prototype.release = function() {\n    this._released = true;\n    this._bufferedEvents.forEach((function(args) {\n        this.emit.apply(this, args);\n    }).bind(this));\n    this._bufferedEvents = [];\n};\nDelayedStream.prototype.pipe = function() {\n    var r = Stream.prototype.pipe.apply(this, arguments);\n    this.resume();\n    return r;\n};\nDelayedStream.prototype._handleEmit = function(args) {\n    if (this._released) {\n        this.emit.apply(this, args);\n        return;\n    }\n    if (args[0] === \"data\") {\n        this.dataSize += args[1].length;\n        this._checkIfMaxDataSizeExceeded();\n    }\n    this._bufferedEvents.push(args);\n};\nDelayedStream.prototype._checkIfMaxDataSizeExceeded = function() {\n    if (this._maxDataSizeExceeded) {\n        return;\n    }\n    if (this.dataSize <= this.maxDataSize) {\n        return;\n    }\n    this._maxDataSizeExceeded = true;\n    var message = \"DelayedStream#maxDataSize of \" + this.maxDataSize + \" bytes exceeded.\";\n    this.emit(\"error\", new Error(message));\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vZGVsYXllZC1zdHJlYW1AMS4wLjAvbm9kZV9tb2R1bGVzL2RlbGF5ZWQtc3RyZWFtL2xpYi9kZWxheWVkX3N0cmVhbS5qcyIsIm1hcHBpbmdzIjoiO0FBQUEsSUFBSUEsU0FBU0Msb0RBQXdCO0FBQ3JDLElBQUlDLE9BQU9ELG1CQUFPQSxDQUFDO0FBRW5CRSxPQUFPQyxPQUFPLEdBQUdDO0FBQ2pCLFNBQVNBO0lBQ1AsSUFBSSxDQUFDQyxNQUFNLEdBQUc7SUFDZCxJQUFJLENBQUNDLFFBQVEsR0FBRztJQUNoQixJQUFJLENBQUNDLFdBQVcsR0FBRyxPQUFPO0lBQzFCLElBQUksQ0FBQ0MsV0FBVyxHQUFHO0lBRW5CLElBQUksQ0FBQ0Msb0JBQW9CLEdBQUc7SUFDNUIsSUFBSSxDQUFDQyxTQUFTLEdBQUc7SUFDakIsSUFBSSxDQUFDQyxlQUFlLEdBQUcsRUFBRTtBQUMzQjtBQUNBVixLQUFLVyxRQUFRLENBQUNSLGVBQWVMO0FBRTdCSyxjQUFjUyxNQUFNLEdBQUcsU0FBU1IsTUFBTSxFQUFFUyxPQUFPO0lBQzdDLElBQUlDLGdCQUFnQixJQUFJLElBQUk7SUFFNUJELFVBQVVBLFdBQVcsQ0FBQztJQUN0QixJQUFLLElBQUlFLFVBQVVGLFFBQVM7UUFDMUJDLGFBQWEsQ0FBQ0MsT0FBTyxHQUFHRixPQUFPLENBQUNFLE9BQU87SUFDekM7SUFFQUQsY0FBY1YsTUFBTSxHQUFHQTtJQUV2QixJQUFJWSxXQUFXWixPQUFPYSxJQUFJO0lBQzFCYixPQUFPYSxJQUFJLEdBQUc7UUFDWkgsY0FBY0ksV0FBVyxDQUFDQztRQUMxQixPQUFPSCxTQUFTSSxLQUFLLENBQUNoQixRQUFRZTtJQUNoQztJQUVBZixPQUFPaUIsRUFBRSxDQUFDLFNBQVMsWUFBWTtJQUMvQixJQUFJUCxjQUFjUCxXQUFXLEVBQUU7UUFDN0JILE9BQU9rQixLQUFLO0lBQ2Q7SUFFQSxPQUFPUjtBQUNUO0FBRUFTLE9BQU9DLGNBQWMsQ0FBQ3JCLGNBQWNzQixTQUFTLEVBQUUsWUFBWTtJQUN6REMsY0FBYztJQUNkQyxZQUFZO0lBQ1pDLEtBQUs7UUFDSCxPQUFPLElBQUksQ0FBQ3hCLE1BQU0sQ0FBQ3lCLFFBQVE7SUFDN0I7QUFDRjtBQUVBMUIsY0FBY3NCLFNBQVMsQ0FBQ0ssV0FBVyxHQUFHO0lBQ3BDLE9BQU8sSUFBSSxDQUFDMUIsTUFBTSxDQUFDMEIsV0FBVyxDQUFDVixLQUFLLENBQUMsSUFBSSxDQUFDaEIsTUFBTSxFQUFFZTtBQUNwRDtBQUVBaEIsY0FBY3NCLFNBQVMsQ0FBQ00sTUFBTSxHQUFHO0lBQy9CLElBQUksQ0FBQyxJQUFJLENBQUN0QixTQUFTLEVBQUU7UUFDbkIsSUFBSSxDQUFDdUIsT0FBTztJQUNkO0lBRUEsSUFBSSxDQUFDNUIsTUFBTSxDQUFDMkIsTUFBTTtBQUNwQjtBQUVBNUIsY0FBY3NCLFNBQVMsQ0FBQ0gsS0FBSyxHQUFHO0lBQzlCLElBQUksQ0FBQ2xCLE1BQU0sQ0FBQ2tCLEtBQUs7QUFDbkI7QUFFQW5CLGNBQWNzQixTQUFTLENBQUNPLE9BQU8sR0FBRztJQUNoQyxJQUFJLENBQUN2QixTQUFTLEdBQUc7SUFFakIsSUFBSSxDQUFDQyxlQUFlLENBQUN1QixPQUFPLENBQUMsVUFBU0MsSUFBSTtRQUN4QyxJQUFJLENBQUNqQixJQUFJLENBQUNHLEtBQUssQ0FBQyxJQUFJLEVBQUVjO0lBQ3hCLEdBQUVDLElBQUksQ0FBQyxJQUFJO0lBQ1gsSUFBSSxDQUFDekIsZUFBZSxHQUFHLEVBQUU7QUFDM0I7QUFFQVAsY0FBY3NCLFNBQVMsQ0FBQ1csSUFBSSxHQUFHO0lBQzdCLElBQUlDLElBQUl2QyxPQUFPMkIsU0FBUyxDQUFDVyxJQUFJLENBQUNoQixLQUFLLENBQUMsSUFBSSxFQUFFRDtJQUMxQyxJQUFJLENBQUNZLE1BQU07SUFDWCxPQUFPTTtBQUNUO0FBRUFsQyxjQUFjc0IsU0FBUyxDQUFDUCxXQUFXLEdBQUcsU0FBU2dCLElBQUk7SUFDakQsSUFBSSxJQUFJLENBQUN6QixTQUFTLEVBQUU7UUFDbEIsSUFBSSxDQUFDUSxJQUFJLENBQUNHLEtBQUssQ0FBQyxJQUFJLEVBQUVjO1FBQ3RCO0lBQ0Y7SUFFQSxJQUFJQSxJQUFJLENBQUMsRUFBRSxLQUFLLFFBQVE7UUFDdEIsSUFBSSxDQUFDN0IsUUFBUSxJQUFJNkIsSUFBSSxDQUFDLEVBQUUsQ0FBQ0ksTUFBTTtRQUMvQixJQUFJLENBQUNDLDJCQUEyQjtJQUNsQztJQUVBLElBQUksQ0FBQzdCLGVBQWUsQ0FBQzhCLElBQUksQ0FBQ047QUFDNUI7QUFFQS9CLGNBQWNzQixTQUFTLENBQUNjLDJCQUEyQixHQUFHO0lBQ3BELElBQUksSUFBSSxDQUFDL0Isb0JBQW9CLEVBQUU7UUFDN0I7SUFDRjtJQUVBLElBQUksSUFBSSxDQUFDSCxRQUFRLElBQUksSUFBSSxDQUFDQyxXQUFXLEVBQUU7UUFDckM7SUFDRjtJQUVBLElBQUksQ0FBQ0Usb0JBQW9CLEdBQUc7SUFDNUIsSUFBSWlDLFVBQ0Ysa0NBQWtDLElBQUksQ0FBQ25DLFdBQVcsR0FBRztJQUN2RCxJQUFJLENBQUNXLElBQUksQ0FBQyxTQUFTLElBQUl5QixNQUFNRDtBQUMvQiIsInNvdXJjZXMiOlsid2VicGFjazovL3NoYXRpYmktbmV4dC1hcHAvLi9ub2RlX21vZHVsZXMvLnBucG0vZGVsYXllZC1zdHJlYW1AMS4wLjAvbm9kZV9tb2R1bGVzL2RlbGF5ZWQtc3RyZWFtL2xpYi9kZWxheWVkX3N0cmVhbS5qcz9jNDIxIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBTdHJlYW0gPSByZXF1aXJlKCdzdHJlYW0nKS5TdHJlYW07XG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBEZWxheWVkU3RyZWFtO1xuZnVuY3Rpb24gRGVsYXllZFN0cmVhbSgpIHtcbiAgdGhpcy5zb3VyY2UgPSBudWxsO1xuICB0aGlzLmRhdGFTaXplID0gMDtcbiAgdGhpcy5tYXhEYXRhU2l6ZSA9IDEwMjQgKiAxMDI0O1xuICB0aGlzLnBhdXNlU3RyZWFtID0gdHJ1ZTtcblxuICB0aGlzLl9tYXhEYXRhU2l6ZUV4Y2VlZGVkID0gZmFsc2U7XG4gIHRoaXMuX3JlbGVhc2VkID0gZmFsc2U7XG4gIHRoaXMuX2J1ZmZlcmVkRXZlbnRzID0gW107XG59XG51dGlsLmluaGVyaXRzKERlbGF5ZWRTdHJlYW0sIFN0cmVhbSk7XG5cbkRlbGF5ZWRTdHJlYW0uY3JlYXRlID0gZnVuY3Rpb24oc291cmNlLCBvcHRpb25zKSB7XG4gIHZhciBkZWxheWVkU3RyZWFtID0gbmV3IHRoaXMoKTtcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgZm9yICh2YXIgb3B0aW9uIGluIG9wdGlvbnMpIHtcbiAgICBkZWxheWVkU3RyZWFtW29wdGlvbl0gPSBvcHRpb25zW29wdGlvbl07XG4gIH1cblxuICBkZWxheWVkU3RyZWFtLnNvdXJjZSA9IHNvdXJjZTtcblxuICB2YXIgcmVhbEVtaXQgPSBzb3VyY2UuZW1pdDtcbiAgc291cmNlLmVtaXQgPSBmdW5jdGlvbigpIHtcbiAgICBkZWxheWVkU3RyZWFtLl9oYW5kbGVFbWl0KGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIHJlYWxFbWl0LmFwcGx5KHNvdXJjZSwgYXJndW1lbnRzKTtcbiAgfTtcblxuICBzb3VyY2Uub24oJ2Vycm9yJywgZnVuY3Rpb24oKSB7fSk7XG4gIGlmIChkZWxheWVkU3RyZWFtLnBhdXNlU3RyZWFtKSB7XG4gICAgc291cmNlLnBhdXNlKCk7XG4gIH1cblxuICByZXR1cm4gZGVsYXllZFN0cmVhbTtcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShEZWxheWVkU3RyZWFtLnByb3RvdHlwZSwgJ3JlYWRhYmxlJywge1xuICBjb25maWd1cmFibGU6IHRydWUsXG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlLnJlYWRhYmxlO1xuICB9XG59KTtcblxuRGVsYXllZFN0cmVhbS5wcm90b3R5cGUuc2V0RW5jb2RpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuc291cmNlLnNldEVuY29kaW5nLmFwcGx5KHRoaXMuc291cmNlLCBhcmd1bWVudHMpO1xufTtcblxuRGVsYXllZFN0cmVhbS5wcm90b3R5cGUucmVzdW1lID0gZnVuY3Rpb24oKSB7XG4gIGlmICghdGhpcy5fcmVsZWFzZWQpIHtcbiAgICB0aGlzLnJlbGVhc2UoKTtcbiAgfVxuXG4gIHRoaXMuc291cmNlLnJlc3VtZSgpO1xufTtcblxuRGVsYXllZFN0cmVhbS5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zb3VyY2UucGF1c2UoKTtcbn07XG5cbkRlbGF5ZWRTdHJlYW0ucHJvdG90eXBlLnJlbGVhc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fcmVsZWFzZWQgPSB0cnVlO1xuXG4gIHRoaXMuX2J1ZmZlcmVkRXZlbnRzLmZvckVhY2goZnVuY3Rpb24oYXJncykge1xuICAgIHRoaXMuZW1pdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfS5iaW5kKHRoaXMpKTtcbiAgdGhpcy5fYnVmZmVyZWRFdmVudHMgPSBbXTtcbn07XG5cbkRlbGF5ZWRTdHJlYW0ucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHIgPSBTdHJlYW0ucHJvdG90eXBlLnBpcGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgdGhpcy5yZXN1bWUoKTtcbiAgcmV0dXJuIHI7XG59O1xuXG5EZWxheWVkU3RyZWFtLnByb3RvdHlwZS5faGFuZGxlRW1pdCA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgaWYgKHRoaXMuX3JlbGVhc2VkKSB7XG4gICAgdGhpcy5lbWl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChhcmdzWzBdID09PSAnZGF0YScpIHtcbiAgICB0aGlzLmRhdGFTaXplICs9IGFyZ3NbMV0ubGVuZ3RoO1xuICAgIHRoaXMuX2NoZWNrSWZNYXhEYXRhU2l6ZUV4Y2VlZGVkKCk7XG4gIH1cblxuICB0aGlzLl9idWZmZXJlZEV2ZW50cy5wdXNoKGFyZ3MpO1xufTtcblxuRGVsYXllZFN0cmVhbS5wcm90b3R5cGUuX2NoZWNrSWZNYXhEYXRhU2l6ZUV4Y2VlZGVkID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLl9tYXhEYXRhU2l6ZUV4Y2VlZGVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHRoaXMuZGF0YVNpemUgPD0gdGhpcy5tYXhEYXRhU2l6ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMuX21heERhdGFTaXplRXhjZWVkZWQgPSB0cnVlO1xuICB2YXIgbWVzc2FnZSA9XG4gICAgJ0RlbGF5ZWRTdHJlYW0jbWF4RGF0YVNpemUgb2YgJyArIHRoaXMubWF4RGF0YVNpemUgKyAnIGJ5dGVzIGV4Y2VlZGVkLidcbiAgdGhpcy5lbWl0KCdlcnJvcicsIG5ldyBFcnJvcihtZXNzYWdlKSk7XG59O1xuIl0sIm5hbWVzIjpbIlN0cmVhbSIsInJlcXVpcmUiLCJ1dGlsIiwibW9kdWxlIiwiZXhwb3J0cyIsIkRlbGF5ZWRTdHJlYW0iLCJzb3VyY2UiLCJkYXRhU2l6ZSIsIm1heERhdGFTaXplIiwicGF1c2VTdHJlYW0iLCJfbWF4RGF0YVNpemVFeGNlZWRlZCIsIl9yZWxlYXNlZCIsIl9idWZmZXJlZEV2ZW50cyIsImluaGVyaXRzIiwiY3JlYXRlIiwib3B0aW9ucyIsImRlbGF5ZWRTdHJlYW0iLCJvcHRpb24iLCJyZWFsRW1pdCIsImVtaXQiLCJfaGFuZGxlRW1pdCIsImFyZ3VtZW50cyIsImFwcGx5Iiwib24iLCJwYXVzZSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwicHJvdG90eXBlIiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsImdldCIsInJlYWRhYmxlIiwic2V0RW5jb2RpbmciLCJyZXN1bWUiLCJyZWxlYXNlIiwiZm9yRWFjaCIsImFyZ3MiLCJiaW5kIiwicGlwZSIsInIiLCJsZW5ndGgiLCJfY2hlY2tJZk1heERhdGFTaXplRXhjZWVkZWQiLCJwdXNoIiwibWVzc2FnZSIsIkVycm9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/delayed-stream@1.0.0/node_modules/delayed-stream/lib/delayed_stream.js\n");

/***/ })

};
;