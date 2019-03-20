/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(requestTimeout) { // eslint-disable-line no-unused-vars
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "986d8c25eebbda2c04f6"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if(cb) {
/******/ 							if(callbacks.indexOf(cb) >= 0) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for(i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch(err) {
/******/ 							if(options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if(!options.ignoreErrored) {
/******/ 								if(!error)
/******/ 									error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err, // TODO remove in webpack 4
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:3000/assets/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(18)(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!************************************************************************************************!*\
  !*** /mnt/c/Users/Smigol/Projects/simply-dev/node_modules/html-entities/lib/html5-entities.js ***!
  \************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var ENTITIES = [['Aacute', [193]], ['aacute', [225]], ['Abreve', [258]], ['abreve', [259]], ['ac', [8766]], ['acd', [8767]], ['acE', [8766, 819]], ['Acirc', [194]], ['acirc', [226]], ['acute', [180]], ['Acy', [1040]], ['acy', [1072]], ['AElig', [198]], ['aelig', [230]], ['af', [8289]], ['Afr', [120068]], ['afr', [120094]], ['Agrave', [192]], ['agrave', [224]], ['alefsym', [8501]], ['aleph', [8501]], ['Alpha', [913]], ['alpha', [945]], ['Amacr', [256]], ['amacr', [257]], ['amalg', [10815]], ['amp', [38]], ['AMP', [38]], ['andand', [10837]], ['And', [10835]], ['and', [8743]], ['andd', [10844]], ['andslope', [10840]], ['andv', [10842]], ['ang', [8736]], ['ange', [10660]], ['angle', [8736]], ['angmsdaa', [10664]], ['angmsdab', [10665]], ['angmsdac', [10666]], ['angmsdad', [10667]], ['angmsdae', [10668]], ['angmsdaf', [10669]], ['angmsdag', [10670]], ['angmsdah', [10671]], ['angmsd', [8737]], ['angrt', [8735]], ['angrtvb', [8894]], ['angrtvbd', [10653]], ['angsph', [8738]], ['angst', [197]], ['angzarr', [9084]], ['Aogon', [260]], ['aogon', [261]], ['Aopf', [120120]], ['aopf', [120146]], ['apacir', [10863]], ['ap', [8776]], ['apE', [10864]], ['ape', [8778]], ['apid', [8779]], ['apos', [39]], ['ApplyFunction', [8289]], ['approx', [8776]], ['approxeq', [8778]], ['Aring', [197]], ['aring', [229]], ['Ascr', [119964]], ['ascr', [119990]], ['Assign', [8788]], ['ast', [42]], ['asymp', [8776]], ['asympeq', [8781]], ['Atilde', [195]], ['atilde', [227]], ['Auml', [196]], ['auml', [228]], ['awconint', [8755]], ['awint', [10769]], ['backcong', [8780]], ['backepsilon', [1014]], ['backprime', [8245]], ['backsim', [8765]], ['backsimeq', [8909]], ['Backslash', [8726]], ['Barv', [10983]], ['barvee', [8893]], ['barwed', [8965]], ['Barwed', [8966]], ['barwedge', [8965]], ['bbrk', [9141]], ['bbrktbrk', [9142]], ['bcong', [8780]], ['Bcy', [1041]], ['bcy', [1073]], ['bdquo', [8222]], ['becaus', [8757]], ['because', [8757]], ['Because', [8757]], ['bemptyv', [10672]], ['bepsi', [1014]], ['bernou', [8492]], ['Bernoullis', [8492]], ['Beta', [914]], ['beta', [946]], ['beth', [8502]], ['between', [8812]], ['Bfr', [120069]], ['bfr', [120095]], ['bigcap', [8898]], ['bigcirc', [9711]], ['bigcup', [8899]], ['bigodot', [10752]], ['bigoplus', [10753]], ['bigotimes', [10754]], ['bigsqcup', [10758]], ['bigstar', [9733]], ['bigtriangledown', [9661]], ['bigtriangleup', [9651]], ['biguplus', [10756]], ['bigvee', [8897]], ['bigwedge', [8896]], ['bkarow', [10509]], ['blacklozenge', [10731]], ['blacksquare', [9642]], ['blacktriangle', [9652]], ['blacktriangledown', [9662]], ['blacktriangleleft', [9666]], ['blacktriangleright', [9656]], ['blank', [9251]], ['blk12', [9618]], ['blk14', [9617]], ['blk34', [9619]], ['block', [9608]], ['bne', [61, 8421]], ['bnequiv', [8801, 8421]], ['bNot', [10989]], ['bnot', [8976]], ['Bopf', [120121]], ['bopf', [120147]], ['bot', [8869]], ['bottom', [8869]], ['bowtie', [8904]], ['boxbox', [10697]], ['boxdl', [9488]], ['boxdL', [9557]], ['boxDl', [9558]], ['boxDL', [9559]], ['boxdr', [9484]], ['boxdR', [9554]], ['boxDr', [9555]], ['boxDR', [9556]], ['boxh', [9472]], ['boxH', [9552]], ['boxhd', [9516]], ['boxHd', [9572]], ['boxhD', [9573]], ['boxHD', [9574]], ['boxhu', [9524]], ['boxHu', [9575]], ['boxhU', [9576]], ['boxHU', [9577]], ['boxminus', [8863]], ['boxplus', [8862]], ['boxtimes', [8864]], ['boxul', [9496]], ['boxuL', [9563]], ['boxUl', [9564]], ['boxUL', [9565]], ['boxur', [9492]], ['boxuR', [9560]], ['boxUr', [9561]], ['boxUR', [9562]], ['boxv', [9474]], ['boxV', [9553]], ['boxvh', [9532]], ['boxvH', [9578]], ['boxVh', [9579]], ['boxVH', [9580]], ['boxvl', [9508]], ['boxvL', [9569]], ['boxVl', [9570]], ['boxVL', [9571]], ['boxvr', [9500]], ['boxvR', [9566]], ['boxVr', [9567]], ['boxVR', [9568]], ['bprime', [8245]], ['breve', [728]], ['Breve', [728]], ['brvbar', [166]], ['bscr', [119991]], ['Bscr', [8492]], ['bsemi', [8271]], ['bsim', [8765]], ['bsime', [8909]], ['bsolb', [10693]], ['bsol', [92]], ['bsolhsub', [10184]], ['bull', [8226]], ['bullet', [8226]], ['bump', [8782]], ['bumpE', [10926]], ['bumpe', [8783]], ['Bumpeq', [8782]], ['bumpeq', [8783]], ['Cacute', [262]], ['cacute', [263]], ['capand', [10820]], ['capbrcup', [10825]], ['capcap', [10827]], ['cap', [8745]], ['Cap', [8914]], ['capcup', [10823]], ['capdot', [10816]], ['CapitalDifferentialD', [8517]], ['caps', [8745, 65024]], ['caret', [8257]], ['caron', [711]], ['Cayleys', [8493]], ['ccaps', [10829]], ['Ccaron', [268]], ['ccaron', [269]], ['Ccedil', [199]], ['ccedil', [231]], ['Ccirc', [264]], ['ccirc', [265]], ['Cconint', [8752]], ['ccups', [10828]], ['ccupssm', [10832]], ['Cdot', [266]], ['cdot', [267]], ['cedil', [184]], ['Cedilla', [184]], ['cemptyv', [10674]], ['cent', [162]], ['centerdot', [183]], ['CenterDot', [183]], ['cfr', [120096]], ['Cfr', [8493]], ['CHcy', [1063]], ['chcy', [1095]], ['check', [10003]], ['checkmark', [10003]], ['Chi', [935]], ['chi', [967]], ['circ', [710]], ['circeq', [8791]], ['circlearrowleft', [8634]], ['circlearrowright', [8635]], ['circledast', [8859]], ['circledcirc', [8858]], ['circleddash', [8861]], ['CircleDot', [8857]], ['circledR', [174]], ['circledS', [9416]], ['CircleMinus', [8854]], ['CirclePlus', [8853]], ['CircleTimes', [8855]], ['cir', [9675]], ['cirE', [10691]], ['cire', [8791]], ['cirfnint', [10768]], ['cirmid', [10991]], ['cirscir', [10690]], ['ClockwiseContourIntegral', [8754]], ['clubs', [9827]], ['clubsuit', [9827]], ['colon', [58]], ['Colon', [8759]], ['Colone', [10868]], ['colone', [8788]], ['coloneq', [8788]], ['comma', [44]], ['commat', [64]], ['comp', [8705]], ['compfn', [8728]], ['complement', [8705]], ['complexes', [8450]], ['cong', [8773]], ['congdot', [10861]], ['Congruent', [8801]], ['conint', [8750]], ['Conint', [8751]], ['ContourIntegral', [8750]], ['copf', [120148]], ['Copf', [8450]], ['coprod', [8720]], ['Coproduct', [8720]], ['copy', [169]], ['COPY', [169]], ['copysr', [8471]], ['CounterClockwiseContourIntegral', [8755]], ['crarr', [8629]], ['cross', [10007]], ['Cross', [10799]], ['Cscr', [119966]], ['cscr', [119992]], ['csub', [10959]], ['csube', [10961]], ['csup', [10960]], ['csupe', [10962]], ['ctdot', [8943]], ['cudarrl', [10552]], ['cudarrr', [10549]], ['cuepr', [8926]], ['cuesc', [8927]], ['cularr', [8630]], ['cularrp', [10557]], ['cupbrcap', [10824]], ['cupcap', [10822]], ['CupCap', [8781]], ['cup', [8746]], ['Cup', [8915]], ['cupcup', [10826]], ['cupdot', [8845]], ['cupor', [10821]], ['cups', [8746, 65024]], ['curarr', [8631]], ['curarrm', [10556]], ['curlyeqprec', [8926]], ['curlyeqsucc', [8927]], ['curlyvee', [8910]], ['curlywedge', [8911]], ['curren', [164]], ['curvearrowleft', [8630]], ['curvearrowright', [8631]], ['cuvee', [8910]], ['cuwed', [8911]], ['cwconint', [8754]], ['cwint', [8753]], ['cylcty', [9005]], ['dagger', [8224]], ['Dagger', [8225]], ['daleth', [8504]], ['darr', [8595]], ['Darr', [8609]], ['dArr', [8659]], ['dash', [8208]], ['Dashv', [10980]], ['dashv', [8867]], ['dbkarow', [10511]], ['dblac', [733]], ['Dcaron', [270]], ['dcaron', [271]], ['Dcy', [1044]], ['dcy', [1076]], ['ddagger', [8225]], ['ddarr', [8650]], ['DD', [8517]], ['dd', [8518]], ['DDotrahd', [10513]], ['ddotseq', [10871]], ['deg', [176]], ['Del', [8711]], ['Delta', [916]], ['delta', [948]], ['demptyv', [10673]], ['dfisht', [10623]], ['Dfr', [120071]], ['dfr', [120097]], ['dHar', [10597]], ['dharl', [8643]], ['dharr', [8642]], ['DiacriticalAcute', [180]], ['DiacriticalDot', [729]], ['DiacriticalDoubleAcute', [733]], ['DiacriticalGrave', [96]], ['DiacriticalTilde', [732]], ['diam', [8900]], ['diamond', [8900]], ['Diamond', [8900]], ['diamondsuit', [9830]], ['diams', [9830]], ['die', [168]], ['DifferentialD', [8518]], ['digamma', [989]], ['disin', [8946]], ['div', [247]], ['divide', [247]], ['divideontimes', [8903]], ['divonx', [8903]], ['DJcy', [1026]], ['djcy', [1106]], ['dlcorn', [8990]], ['dlcrop', [8973]], ['dollar', [36]], ['Dopf', [120123]], ['dopf', [120149]], ['Dot', [168]], ['dot', [729]], ['DotDot', [8412]], ['doteq', [8784]], ['doteqdot', [8785]], ['DotEqual', [8784]], ['dotminus', [8760]], ['dotplus', [8724]], ['dotsquare', [8865]], ['doublebarwedge', [8966]], ['DoubleContourIntegral', [8751]], ['DoubleDot', [168]], ['DoubleDownArrow', [8659]], ['DoubleLeftArrow', [8656]], ['DoubleLeftRightArrow', [8660]], ['DoubleLeftTee', [10980]], ['DoubleLongLeftArrow', [10232]], ['DoubleLongLeftRightArrow', [10234]], ['DoubleLongRightArrow', [10233]], ['DoubleRightArrow', [8658]], ['DoubleRightTee', [8872]], ['DoubleUpArrow', [8657]], ['DoubleUpDownArrow', [8661]], ['DoubleVerticalBar', [8741]], ['DownArrowBar', [10515]], ['downarrow', [8595]], ['DownArrow', [8595]], ['Downarrow', [8659]], ['DownArrowUpArrow', [8693]], ['DownBreve', [785]], ['downdownarrows', [8650]], ['downharpoonleft', [8643]], ['downharpoonright', [8642]], ['DownLeftRightVector', [10576]], ['DownLeftTeeVector', [10590]], ['DownLeftVectorBar', [10582]], ['DownLeftVector', [8637]], ['DownRightTeeVector', [10591]], ['DownRightVectorBar', [10583]], ['DownRightVector', [8641]], ['DownTeeArrow', [8615]], ['DownTee', [8868]], ['drbkarow', [10512]], ['drcorn', [8991]], ['drcrop', [8972]], ['Dscr', [119967]], ['dscr', [119993]], ['DScy', [1029]], ['dscy', [1109]], ['dsol', [10742]], ['Dstrok', [272]], ['dstrok', [273]], ['dtdot', [8945]], ['dtri', [9663]], ['dtrif', [9662]], ['duarr', [8693]], ['duhar', [10607]], ['dwangle', [10662]], ['DZcy', [1039]], ['dzcy', [1119]], ['dzigrarr', [10239]], ['Eacute', [201]], ['eacute', [233]], ['easter', [10862]], ['Ecaron', [282]], ['ecaron', [283]], ['Ecirc', [202]], ['ecirc', [234]], ['ecir', [8790]], ['ecolon', [8789]], ['Ecy', [1069]], ['ecy', [1101]], ['eDDot', [10871]], ['Edot', [278]], ['edot', [279]], ['eDot', [8785]], ['ee', [8519]], ['efDot', [8786]], ['Efr', [120072]], ['efr', [120098]], ['eg', [10906]], ['Egrave', [200]], ['egrave', [232]], ['egs', [10902]], ['egsdot', [10904]], ['el', [10905]], ['Element', [8712]], ['elinters', [9191]], ['ell', [8467]], ['els', [10901]], ['elsdot', [10903]], ['Emacr', [274]], ['emacr', [275]], ['empty', [8709]], ['emptyset', [8709]], ['EmptySmallSquare', [9723]], ['emptyv', [8709]], ['EmptyVerySmallSquare', [9643]], ['emsp13', [8196]], ['emsp14', [8197]], ['emsp', [8195]], ['ENG', [330]], ['eng', [331]], ['ensp', [8194]], ['Eogon', [280]], ['eogon', [281]], ['Eopf', [120124]], ['eopf', [120150]], ['epar', [8917]], ['eparsl', [10723]], ['eplus', [10865]], ['epsi', [949]], ['Epsilon', [917]], ['epsilon', [949]], ['epsiv', [1013]], ['eqcirc', [8790]], ['eqcolon', [8789]], ['eqsim', [8770]], ['eqslantgtr', [10902]], ['eqslantless', [10901]], ['Equal', [10869]], ['equals', [61]], ['EqualTilde', [8770]], ['equest', [8799]], ['Equilibrium', [8652]], ['equiv', [8801]], ['equivDD', [10872]], ['eqvparsl', [10725]], ['erarr', [10609]], ['erDot', [8787]], ['escr', [8495]], ['Escr', [8496]], ['esdot', [8784]], ['Esim', [10867]], ['esim', [8770]], ['Eta', [919]], ['eta', [951]], ['ETH', [208]], ['eth', [240]], ['Euml', [203]], ['euml', [235]], ['euro', [8364]], ['excl', [33]], ['exist', [8707]], ['Exists', [8707]], ['expectation', [8496]], ['exponentiale', [8519]], ['ExponentialE', [8519]], ['fallingdotseq', [8786]], ['Fcy', [1060]], ['fcy', [1092]], ['female', [9792]], ['ffilig', [64259]], ['fflig', [64256]], ['ffllig', [64260]], ['Ffr', [120073]], ['ffr', [120099]], ['filig', [64257]], ['FilledSmallSquare', [9724]], ['FilledVerySmallSquare', [9642]], ['fjlig', [102, 106]], ['flat', [9837]], ['fllig', [64258]], ['fltns', [9649]], ['fnof', [402]], ['Fopf', [120125]], ['fopf', [120151]], ['forall', [8704]], ['ForAll', [8704]], ['fork', [8916]], ['forkv', [10969]], ['Fouriertrf', [8497]], ['fpartint', [10765]], ['frac12', [189]], ['frac13', [8531]], ['frac14', [188]], ['frac15', [8533]], ['frac16', [8537]], ['frac18', [8539]], ['frac23', [8532]], ['frac25', [8534]], ['frac34', [190]], ['frac35', [8535]], ['frac38', [8540]], ['frac45', [8536]], ['frac56', [8538]], ['frac58', [8541]], ['frac78', [8542]], ['frasl', [8260]], ['frown', [8994]], ['fscr', [119995]], ['Fscr', [8497]], ['gacute', [501]], ['Gamma', [915]], ['gamma', [947]], ['Gammad', [988]], ['gammad', [989]], ['gap', [10886]], ['Gbreve', [286]], ['gbreve', [287]], ['Gcedil', [290]], ['Gcirc', [284]], ['gcirc', [285]], ['Gcy', [1043]], ['gcy', [1075]], ['Gdot', [288]], ['gdot', [289]], ['ge', [8805]], ['gE', [8807]], ['gEl', [10892]], ['gel', [8923]], ['geq', [8805]], ['geqq', [8807]], ['geqslant', [10878]], ['gescc', [10921]], ['ges', [10878]], ['gesdot', [10880]], ['gesdoto', [10882]], ['gesdotol', [10884]], ['gesl', [8923, 65024]], ['gesles', [10900]], ['Gfr', [120074]], ['gfr', [120100]], ['gg', [8811]], ['Gg', [8921]], ['ggg', [8921]], ['gimel', [8503]], ['GJcy', [1027]], ['gjcy', [1107]], ['gla', [10917]], ['gl', [8823]], ['glE', [10898]], ['glj', [10916]], ['gnap', [10890]], ['gnapprox', [10890]], ['gne', [10888]], ['gnE', [8809]], ['gneq', [10888]], ['gneqq', [8809]], ['gnsim', [8935]], ['Gopf', [120126]], ['gopf', [120152]], ['grave', [96]], ['GreaterEqual', [8805]], ['GreaterEqualLess', [8923]], ['GreaterFullEqual', [8807]], ['GreaterGreater', [10914]], ['GreaterLess', [8823]], ['GreaterSlantEqual', [10878]], ['GreaterTilde', [8819]], ['Gscr', [119970]], ['gscr', [8458]], ['gsim', [8819]], ['gsime', [10894]], ['gsiml', [10896]], ['gtcc', [10919]], ['gtcir', [10874]], ['gt', [62]], ['GT', [62]], ['Gt', [8811]], ['gtdot', [8919]], ['gtlPar', [10645]], ['gtquest', [10876]], ['gtrapprox', [10886]], ['gtrarr', [10616]], ['gtrdot', [8919]], ['gtreqless', [8923]], ['gtreqqless', [10892]], ['gtrless', [8823]], ['gtrsim', [8819]], ['gvertneqq', [8809, 65024]], ['gvnE', [8809, 65024]], ['Hacek', [711]], ['hairsp', [8202]], ['half', [189]], ['hamilt', [8459]], ['HARDcy', [1066]], ['hardcy', [1098]], ['harrcir', [10568]], ['harr', [8596]], ['hArr', [8660]], ['harrw', [8621]], ['Hat', [94]], ['hbar', [8463]], ['Hcirc', [292]], ['hcirc', [293]], ['hearts', [9829]], ['heartsuit', [9829]], ['hellip', [8230]], ['hercon', [8889]], ['hfr', [120101]], ['Hfr', [8460]], ['HilbertSpace', [8459]], ['hksearow', [10533]], ['hkswarow', [10534]], ['hoarr', [8703]], ['homtht', [8763]], ['hookleftarrow', [8617]], ['hookrightarrow', [8618]], ['hopf', [120153]], ['Hopf', [8461]], ['horbar', [8213]], ['HorizontalLine', [9472]], ['hscr', [119997]], ['Hscr', [8459]], ['hslash', [8463]], ['Hstrok', [294]], ['hstrok', [295]], ['HumpDownHump', [8782]], ['HumpEqual', [8783]], ['hybull', [8259]], ['hyphen', [8208]], ['Iacute', [205]], ['iacute', [237]], ['ic', [8291]], ['Icirc', [206]], ['icirc', [238]], ['Icy', [1048]], ['icy', [1080]], ['Idot', [304]], ['IEcy', [1045]], ['iecy', [1077]], ['iexcl', [161]], ['iff', [8660]], ['ifr', [120102]], ['Ifr', [8465]], ['Igrave', [204]], ['igrave', [236]], ['ii', [8520]], ['iiiint', [10764]], ['iiint', [8749]], ['iinfin', [10716]], ['iiota', [8489]], ['IJlig', [306]], ['ijlig', [307]], ['Imacr', [298]], ['imacr', [299]], ['image', [8465]], ['ImaginaryI', [8520]], ['imagline', [8464]], ['imagpart', [8465]], ['imath', [305]], ['Im', [8465]], ['imof', [8887]], ['imped', [437]], ['Implies', [8658]], ['incare', [8453]], ['in', [8712]], ['infin', [8734]], ['infintie', [10717]], ['inodot', [305]], ['intcal', [8890]], ['int', [8747]], ['Int', [8748]], ['integers', [8484]], ['Integral', [8747]], ['intercal', [8890]], ['Intersection', [8898]], ['intlarhk', [10775]], ['intprod', [10812]], ['InvisibleComma', [8291]], ['InvisibleTimes', [8290]], ['IOcy', [1025]], ['iocy', [1105]], ['Iogon', [302]], ['iogon', [303]], ['Iopf', [120128]], ['iopf', [120154]], ['Iota', [921]], ['iota', [953]], ['iprod', [10812]], ['iquest', [191]], ['iscr', [119998]], ['Iscr', [8464]], ['isin', [8712]], ['isindot', [8949]], ['isinE', [8953]], ['isins', [8948]], ['isinsv', [8947]], ['isinv', [8712]], ['it', [8290]], ['Itilde', [296]], ['itilde', [297]], ['Iukcy', [1030]], ['iukcy', [1110]], ['Iuml', [207]], ['iuml', [239]], ['Jcirc', [308]], ['jcirc', [309]], ['Jcy', [1049]], ['jcy', [1081]], ['Jfr', [120077]], ['jfr', [120103]], ['jmath', [567]], ['Jopf', [120129]], ['jopf', [120155]], ['Jscr', [119973]], ['jscr', [119999]], ['Jsercy', [1032]], ['jsercy', [1112]], ['Jukcy', [1028]], ['jukcy', [1108]], ['Kappa', [922]], ['kappa', [954]], ['kappav', [1008]], ['Kcedil', [310]], ['kcedil', [311]], ['Kcy', [1050]], ['kcy', [1082]], ['Kfr', [120078]], ['kfr', [120104]], ['kgreen', [312]], ['KHcy', [1061]], ['khcy', [1093]], ['KJcy', [1036]], ['kjcy', [1116]], ['Kopf', [120130]], ['kopf', [120156]], ['Kscr', [119974]], ['kscr', [120000]], ['lAarr', [8666]], ['Lacute', [313]], ['lacute', [314]], ['laemptyv', [10676]], ['lagran', [8466]], ['Lambda', [923]], ['lambda', [955]], ['lang', [10216]], ['Lang', [10218]], ['langd', [10641]], ['langle', [10216]], ['lap', [10885]], ['Laplacetrf', [8466]], ['laquo', [171]], ['larrb', [8676]], ['larrbfs', [10527]], ['larr', [8592]], ['Larr', [8606]], ['lArr', [8656]], ['larrfs', [10525]], ['larrhk', [8617]], ['larrlp', [8619]], ['larrpl', [10553]], ['larrsim', [10611]], ['larrtl', [8610]], ['latail', [10521]], ['lAtail', [10523]], ['lat', [10923]], ['late', [10925]], ['lates', [10925, 65024]], ['lbarr', [10508]], ['lBarr', [10510]], ['lbbrk', [10098]], ['lbrace', [123]], ['lbrack', [91]], ['lbrke', [10635]], ['lbrksld', [10639]], ['lbrkslu', [10637]], ['Lcaron', [317]], ['lcaron', [318]], ['Lcedil', [315]], ['lcedil', [316]], ['lceil', [8968]], ['lcub', [123]], ['Lcy', [1051]], ['lcy', [1083]], ['ldca', [10550]], ['ldquo', [8220]], ['ldquor', [8222]], ['ldrdhar', [10599]], ['ldrushar', [10571]], ['ldsh', [8626]], ['le', [8804]], ['lE', [8806]], ['LeftAngleBracket', [10216]], ['LeftArrowBar', [8676]], ['leftarrow', [8592]], ['LeftArrow', [8592]], ['Leftarrow', [8656]], ['LeftArrowRightArrow', [8646]], ['leftarrowtail', [8610]], ['LeftCeiling', [8968]], ['LeftDoubleBracket', [10214]], ['LeftDownTeeVector', [10593]], ['LeftDownVectorBar', [10585]], ['LeftDownVector', [8643]], ['LeftFloor', [8970]], ['leftharpoondown', [8637]], ['leftharpoonup', [8636]], ['leftleftarrows', [8647]], ['leftrightarrow', [8596]], ['LeftRightArrow', [8596]], ['Leftrightarrow', [8660]], ['leftrightarrows', [8646]], ['leftrightharpoons', [8651]], ['leftrightsquigarrow', [8621]], ['LeftRightVector', [10574]], ['LeftTeeArrow', [8612]], ['LeftTee', [8867]], ['LeftTeeVector', [10586]], ['leftthreetimes', [8907]], ['LeftTriangleBar', [10703]], ['LeftTriangle', [8882]], ['LeftTriangleEqual', [8884]], ['LeftUpDownVector', [10577]], ['LeftUpTeeVector', [10592]], ['LeftUpVectorBar', [10584]], ['LeftUpVector', [8639]], ['LeftVectorBar', [10578]], ['LeftVector', [8636]], ['lEg', [10891]], ['leg', [8922]], ['leq', [8804]], ['leqq', [8806]], ['leqslant', [10877]], ['lescc', [10920]], ['les', [10877]], ['lesdot', [10879]], ['lesdoto', [10881]], ['lesdotor', [10883]], ['lesg', [8922, 65024]], ['lesges', [10899]], ['lessapprox', [10885]], ['lessdot', [8918]], ['lesseqgtr', [8922]], ['lesseqqgtr', [10891]], ['LessEqualGreater', [8922]], ['LessFullEqual', [8806]], ['LessGreater', [8822]], ['lessgtr', [8822]], ['LessLess', [10913]], ['lesssim', [8818]], ['LessSlantEqual', [10877]], ['LessTilde', [8818]], ['lfisht', [10620]], ['lfloor', [8970]], ['Lfr', [120079]], ['lfr', [120105]], ['lg', [8822]], ['lgE', [10897]], ['lHar', [10594]], ['lhard', [8637]], ['lharu', [8636]], ['lharul', [10602]], ['lhblk', [9604]], ['LJcy', [1033]], ['ljcy', [1113]], ['llarr', [8647]], ['ll', [8810]], ['Ll', [8920]], ['llcorner', [8990]], ['Lleftarrow', [8666]], ['llhard', [10603]], ['lltri', [9722]], ['Lmidot', [319]], ['lmidot', [320]], ['lmoustache', [9136]], ['lmoust', [9136]], ['lnap', [10889]], ['lnapprox', [10889]], ['lne', [10887]], ['lnE', [8808]], ['lneq', [10887]], ['lneqq', [8808]], ['lnsim', [8934]], ['loang', [10220]], ['loarr', [8701]], ['lobrk', [10214]], ['longleftarrow', [10229]], ['LongLeftArrow', [10229]], ['Longleftarrow', [10232]], ['longleftrightarrow', [10231]], ['LongLeftRightArrow', [10231]], ['Longleftrightarrow', [10234]], ['longmapsto', [10236]], ['longrightarrow', [10230]], ['LongRightArrow', [10230]], ['Longrightarrow', [10233]], ['looparrowleft', [8619]], ['looparrowright', [8620]], ['lopar', [10629]], ['Lopf', [120131]], ['lopf', [120157]], ['loplus', [10797]], ['lotimes', [10804]], ['lowast', [8727]], ['lowbar', [95]], ['LowerLeftArrow', [8601]], ['LowerRightArrow', [8600]], ['loz', [9674]], ['lozenge', [9674]], ['lozf', [10731]], ['lpar', [40]], ['lparlt', [10643]], ['lrarr', [8646]], ['lrcorner', [8991]], ['lrhar', [8651]], ['lrhard', [10605]], ['lrm', [8206]], ['lrtri', [8895]], ['lsaquo', [8249]], ['lscr', [120001]], ['Lscr', [8466]], ['lsh', [8624]], ['Lsh', [8624]], ['lsim', [8818]], ['lsime', [10893]], ['lsimg', [10895]], ['lsqb', [91]], ['lsquo', [8216]], ['lsquor', [8218]], ['Lstrok', [321]], ['lstrok', [322]], ['ltcc', [10918]], ['ltcir', [10873]], ['lt', [60]], ['LT', [60]], ['Lt', [8810]], ['ltdot', [8918]], ['lthree', [8907]], ['ltimes', [8905]], ['ltlarr', [10614]], ['ltquest', [10875]], ['ltri', [9667]], ['ltrie', [8884]], ['ltrif', [9666]], ['ltrPar', [10646]], ['lurdshar', [10570]], ['luruhar', [10598]], ['lvertneqq', [8808, 65024]], ['lvnE', [8808, 65024]], ['macr', [175]], ['male', [9794]], ['malt', [10016]], ['maltese', [10016]], ['Map', [10501]], ['map', [8614]], ['mapsto', [8614]], ['mapstodown', [8615]], ['mapstoleft', [8612]], ['mapstoup', [8613]], ['marker', [9646]], ['mcomma', [10793]], ['Mcy', [1052]], ['mcy', [1084]], ['mdash', [8212]], ['mDDot', [8762]], ['measuredangle', [8737]], ['MediumSpace', [8287]], ['Mellintrf', [8499]], ['Mfr', [120080]], ['mfr', [120106]], ['mho', [8487]], ['micro', [181]], ['midast', [42]], ['midcir', [10992]], ['mid', [8739]], ['middot', [183]], ['minusb', [8863]], ['minus', [8722]], ['minusd', [8760]], ['minusdu', [10794]], ['MinusPlus', [8723]], ['mlcp', [10971]], ['mldr', [8230]], ['mnplus', [8723]], ['models', [8871]], ['Mopf', [120132]], ['mopf', [120158]], ['mp', [8723]], ['mscr', [120002]], ['Mscr', [8499]], ['mstpos', [8766]], ['Mu', [924]], ['mu', [956]], ['multimap', [8888]], ['mumap', [8888]], ['nabla', [8711]], ['Nacute', [323]], ['nacute', [324]], ['nang', [8736, 8402]], ['nap', [8777]], ['napE', [10864, 824]], ['napid', [8779, 824]], ['napos', [329]], ['napprox', [8777]], ['natural', [9838]], ['naturals', [8469]], ['natur', [9838]], ['nbsp', [160]], ['nbump', [8782, 824]], ['nbumpe', [8783, 824]], ['ncap', [10819]], ['Ncaron', [327]], ['ncaron', [328]], ['Ncedil', [325]], ['ncedil', [326]], ['ncong', [8775]], ['ncongdot', [10861, 824]], ['ncup', [10818]], ['Ncy', [1053]], ['ncy', [1085]], ['ndash', [8211]], ['nearhk', [10532]], ['nearr', [8599]], ['neArr', [8663]], ['nearrow', [8599]], ['ne', [8800]], ['nedot', [8784, 824]], ['NegativeMediumSpace', [8203]], ['NegativeThickSpace', [8203]], ['NegativeThinSpace', [8203]], ['NegativeVeryThinSpace', [8203]], ['nequiv', [8802]], ['nesear', [10536]], ['nesim', [8770, 824]], ['NestedGreaterGreater', [8811]], ['NestedLessLess', [8810]], ['nexist', [8708]], ['nexists', [8708]], ['Nfr', [120081]], ['nfr', [120107]], ['ngE', [8807, 824]], ['nge', [8817]], ['ngeq', [8817]], ['ngeqq', [8807, 824]], ['ngeqslant', [10878, 824]], ['nges', [10878, 824]], ['nGg', [8921, 824]], ['ngsim', [8821]], ['nGt', [8811, 8402]], ['ngt', [8815]], ['ngtr', [8815]], ['nGtv', [8811, 824]], ['nharr', [8622]], ['nhArr', [8654]], ['nhpar', [10994]], ['ni', [8715]], ['nis', [8956]], ['nisd', [8954]], ['niv', [8715]], ['NJcy', [1034]], ['njcy', [1114]], ['nlarr', [8602]], ['nlArr', [8653]], ['nldr', [8229]], ['nlE', [8806, 824]], ['nle', [8816]], ['nleftarrow', [8602]], ['nLeftarrow', [8653]], ['nleftrightarrow', [8622]], ['nLeftrightarrow', [8654]], ['nleq', [8816]], ['nleqq', [8806, 824]], ['nleqslant', [10877, 824]], ['nles', [10877, 824]], ['nless', [8814]], ['nLl', [8920, 824]], ['nlsim', [8820]], ['nLt', [8810, 8402]], ['nlt', [8814]], ['nltri', [8938]], ['nltrie', [8940]], ['nLtv', [8810, 824]], ['nmid', [8740]], ['NoBreak', [8288]], ['NonBreakingSpace', [160]], ['nopf', [120159]], ['Nopf', [8469]], ['Not', [10988]], ['not', [172]], ['NotCongruent', [8802]], ['NotCupCap', [8813]], ['NotDoubleVerticalBar', [8742]], ['NotElement', [8713]], ['NotEqual', [8800]], ['NotEqualTilde', [8770, 824]], ['NotExists', [8708]], ['NotGreater', [8815]], ['NotGreaterEqual', [8817]], ['NotGreaterFullEqual', [8807, 824]], ['NotGreaterGreater', [8811, 824]], ['NotGreaterLess', [8825]], ['NotGreaterSlantEqual', [10878, 824]], ['NotGreaterTilde', [8821]], ['NotHumpDownHump', [8782, 824]], ['NotHumpEqual', [8783, 824]], ['notin', [8713]], ['notindot', [8949, 824]], ['notinE', [8953, 824]], ['notinva', [8713]], ['notinvb', [8951]], ['notinvc', [8950]], ['NotLeftTriangleBar', [10703, 824]], ['NotLeftTriangle', [8938]], ['NotLeftTriangleEqual', [8940]], ['NotLess', [8814]], ['NotLessEqual', [8816]], ['NotLessGreater', [8824]], ['NotLessLess', [8810, 824]], ['NotLessSlantEqual', [10877, 824]], ['NotLessTilde', [8820]], ['NotNestedGreaterGreater', [10914, 824]], ['NotNestedLessLess', [10913, 824]], ['notni', [8716]], ['notniva', [8716]], ['notnivb', [8958]], ['notnivc', [8957]], ['NotPrecedes', [8832]], ['NotPrecedesEqual', [10927, 824]], ['NotPrecedesSlantEqual', [8928]], ['NotReverseElement', [8716]], ['NotRightTriangleBar', [10704, 824]], ['NotRightTriangle', [8939]], ['NotRightTriangleEqual', [8941]], ['NotSquareSubset', [8847, 824]], ['NotSquareSubsetEqual', [8930]], ['NotSquareSuperset', [8848, 824]], ['NotSquareSupersetEqual', [8931]], ['NotSubset', [8834, 8402]], ['NotSubsetEqual', [8840]], ['NotSucceeds', [8833]], ['NotSucceedsEqual', [10928, 824]], ['NotSucceedsSlantEqual', [8929]], ['NotSucceedsTilde', [8831, 824]], ['NotSuperset', [8835, 8402]], ['NotSupersetEqual', [8841]], ['NotTilde', [8769]], ['NotTildeEqual', [8772]], ['NotTildeFullEqual', [8775]], ['NotTildeTilde', [8777]], ['NotVerticalBar', [8740]], ['nparallel', [8742]], ['npar', [8742]], ['nparsl', [11005, 8421]], ['npart', [8706, 824]], ['npolint', [10772]], ['npr', [8832]], ['nprcue', [8928]], ['nprec', [8832]], ['npreceq', [10927, 824]], ['npre', [10927, 824]], ['nrarrc', [10547, 824]], ['nrarr', [8603]], ['nrArr', [8655]], ['nrarrw', [8605, 824]], ['nrightarrow', [8603]], ['nRightarrow', [8655]], ['nrtri', [8939]], ['nrtrie', [8941]], ['nsc', [8833]], ['nsccue', [8929]], ['nsce', [10928, 824]], ['Nscr', [119977]], ['nscr', [120003]], ['nshortmid', [8740]], ['nshortparallel', [8742]], ['nsim', [8769]], ['nsime', [8772]], ['nsimeq', [8772]], ['nsmid', [8740]], ['nspar', [8742]], ['nsqsube', [8930]], ['nsqsupe', [8931]], ['nsub', [8836]], ['nsubE', [10949, 824]], ['nsube', [8840]], ['nsubset', [8834, 8402]], ['nsubseteq', [8840]], ['nsubseteqq', [10949, 824]], ['nsucc', [8833]], ['nsucceq', [10928, 824]], ['nsup', [8837]], ['nsupE', [10950, 824]], ['nsupe', [8841]], ['nsupset', [8835, 8402]], ['nsupseteq', [8841]], ['nsupseteqq', [10950, 824]], ['ntgl', [8825]], ['Ntilde', [209]], ['ntilde', [241]], ['ntlg', [8824]], ['ntriangleleft', [8938]], ['ntrianglelefteq', [8940]], ['ntriangleright', [8939]], ['ntrianglerighteq', [8941]], ['Nu', [925]], ['nu', [957]], ['num', [35]], ['numero', [8470]], ['numsp', [8199]], ['nvap', [8781, 8402]], ['nvdash', [8876]], ['nvDash', [8877]], ['nVdash', [8878]], ['nVDash', [8879]], ['nvge', [8805, 8402]], ['nvgt', [62, 8402]], ['nvHarr', [10500]], ['nvinfin', [10718]], ['nvlArr', [10498]], ['nvle', [8804, 8402]], ['nvlt', [60, 8402]], ['nvltrie', [8884, 8402]], ['nvrArr', [10499]], ['nvrtrie', [8885, 8402]], ['nvsim', [8764, 8402]], ['nwarhk', [10531]], ['nwarr', [8598]], ['nwArr', [8662]], ['nwarrow', [8598]], ['nwnear', [10535]], ['Oacute', [211]], ['oacute', [243]], ['oast', [8859]], ['Ocirc', [212]], ['ocirc', [244]], ['ocir', [8858]], ['Ocy', [1054]], ['ocy', [1086]], ['odash', [8861]], ['Odblac', [336]], ['odblac', [337]], ['odiv', [10808]], ['odot', [8857]], ['odsold', [10684]], ['OElig', [338]], ['oelig', [339]], ['ofcir', [10687]], ['Ofr', [120082]], ['ofr', [120108]], ['ogon', [731]], ['Ograve', [210]], ['ograve', [242]], ['ogt', [10689]], ['ohbar', [10677]], ['ohm', [937]], ['oint', [8750]], ['olarr', [8634]], ['olcir', [10686]], ['olcross', [10683]], ['oline', [8254]], ['olt', [10688]], ['Omacr', [332]], ['omacr', [333]], ['Omega', [937]], ['omega', [969]], ['Omicron', [927]], ['omicron', [959]], ['omid', [10678]], ['ominus', [8854]], ['Oopf', [120134]], ['oopf', [120160]], ['opar', [10679]], ['OpenCurlyDoubleQuote', [8220]], ['OpenCurlyQuote', [8216]], ['operp', [10681]], ['oplus', [8853]], ['orarr', [8635]], ['Or', [10836]], ['or', [8744]], ['ord', [10845]], ['order', [8500]], ['orderof', [8500]], ['ordf', [170]], ['ordm', [186]], ['origof', [8886]], ['oror', [10838]], ['orslope', [10839]], ['orv', [10843]], ['oS', [9416]], ['Oscr', [119978]], ['oscr', [8500]], ['Oslash', [216]], ['oslash', [248]], ['osol', [8856]], ['Otilde', [213]], ['otilde', [245]], ['otimesas', [10806]], ['Otimes', [10807]], ['otimes', [8855]], ['Ouml', [214]], ['ouml', [246]], ['ovbar', [9021]], ['OverBar', [8254]], ['OverBrace', [9182]], ['OverBracket', [9140]], ['OverParenthesis', [9180]], ['para', [182]], ['parallel', [8741]], ['par', [8741]], ['parsim', [10995]], ['parsl', [11005]], ['part', [8706]], ['PartialD', [8706]], ['Pcy', [1055]], ['pcy', [1087]], ['percnt', [37]], ['period', [46]], ['permil', [8240]], ['perp', [8869]], ['pertenk', [8241]], ['Pfr', [120083]], ['pfr', [120109]], ['Phi', [934]], ['phi', [966]], ['phiv', [981]], ['phmmat', [8499]], ['phone', [9742]], ['Pi', [928]], ['pi', [960]], ['pitchfork', [8916]], ['piv', [982]], ['planck', [8463]], ['planckh', [8462]], ['plankv', [8463]], ['plusacir', [10787]], ['plusb', [8862]], ['pluscir', [10786]], ['plus', [43]], ['plusdo', [8724]], ['plusdu', [10789]], ['pluse', [10866]], ['PlusMinus', [177]], ['plusmn', [177]], ['plussim', [10790]], ['plustwo', [10791]], ['pm', [177]], ['Poincareplane', [8460]], ['pointint', [10773]], ['popf', [120161]], ['Popf', [8473]], ['pound', [163]], ['prap', [10935]], ['Pr', [10939]], ['pr', [8826]], ['prcue', [8828]], ['precapprox', [10935]], ['prec', [8826]], ['preccurlyeq', [8828]], ['Precedes', [8826]], ['PrecedesEqual', [10927]], ['PrecedesSlantEqual', [8828]], ['PrecedesTilde', [8830]], ['preceq', [10927]], ['precnapprox', [10937]], ['precneqq', [10933]], ['precnsim', [8936]], ['pre', [10927]], ['prE', [10931]], ['precsim', [8830]], ['prime', [8242]], ['Prime', [8243]], ['primes', [8473]], ['prnap', [10937]], ['prnE', [10933]], ['prnsim', [8936]], ['prod', [8719]], ['Product', [8719]], ['profalar', [9006]], ['profline', [8978]], ['profsurf', [8979]], ['prop', [8733]], ['Proportional', [8733]], ['Proportion', [8759]], ['propto', [8733]], ['prsim', [8830]], ['prurel', [8880]], ['Pscr', [119979]], ['pscr', [120005]], ['Psi', [936]], ['psi', [968]], ['puncsp', [8200]], ['Qfr', [120084]], ['qfr', [120110]], ['qint', [10764]], ['qopf', [120162]], ['Qopf', [8474]], ['qprime', [8279]], ['Qscr', [119980]], ['qscr', [120006]], ['quaternions', [8461]], ['quatint', [10774]], ['quest', [63]], ['questeq', [8799]], ['quot', [34]], ['QUOT', [34]], ['rAarr', [8667]], ['race', [8765, 817]], ['Racute', [340]], ['racute', [341]], ['radic', [8730]], ['raemptyv', [10675]], ['rang', [10217]], ['Rang', [10219]], ['rangd', [10642]], ['range', [10661]], ['rangle', [10217]], ['raquo', [187]], ['rarrap', [10613]], ['rarrb', [8677]], ['rarrbfs', [10528]], ['rarrc', [10547]], ['rarr', [8594]], ['Rarr', [8608]], ['rArr', [8658]], ['rarrfs', [10526]], ['rarrhk', [8618]], ['rarrlp', [8620]], ['rarrpl', [10565]], ['rarrsim', [10612]], ['Rarrtl', [10518]], ['rarrtl', [8611]], ['rarrw', [8605]], ['ratail', [10522]], ['rAtail', [10524]], ['ratio', [8758]], ['rationals', [8474]], ['rbarr', [10509]], ['rBarr', [10511]], ['RBarr', [10512]], ['rbbrk', [10099]], ['rbrace', [125]], ['rbrack', [93]], ['rbrke', [10636]], ['rbrksld', [10638]], ['rbrkslu', [10640]], ['Rcaron', [344]], ['rcaron', [345]], ['Rcedil', [342]], ['rcedil', [343]], ['rceil', [8969]], ['rcub', [125]], ['Rcy', [1056]], ['rcy', [1088]], ['rdca', [10551]], ['rdldhar', [10601]], ['rdquo', [8221]], ['rdquor', [8221]], ['CloseCurlyDoubleQuote', [8221]], ['rdsh', [8627]], ['real', [8476]], ['realine', [8475]], ['realpart', [8476]], ['reals', [8477]], ['Re', [8476]], ['rect', [9645]], ['reg', [174]], ['REG', [174]], ['ReverseElement', [8715]], ['ReverseEquilibrium', [8651]], ['ReverseUpEquilibrium', [10607]], ['rfisht', [10621]], ['rfloor', [8971]], ['rfr', [120111]], ['Rfr', [8476]], ['rHar', [10596]], ['rhard', [8641]], ['rharu', [8640]], ['rharul', [10604]], ['Rho', [929]], ['rho', [961]], ['rhov', [1009]], ['RightAngleBracket', [10217]], ['RightArrowBar', [8677]], ['rightarrow', [8594]], ['RightArrow', [8594]], ['Rightarrow', [8658]], ['RightArrowLeftArrow', [8644]], ['rightarrowtail', [8611]], ['RightCeiling', [8969]], ['RightDoubleBracket', [10215]], ['RightDownTeeVector', [10589]], ['RightDownVectorBar', [10581]], ['RightDownVector', [8642]], ['RightFloor', [8971]], ['rightharpoondown', [8641]], ['rightharpoonup', [8640]], ['rightleftarrows', [8644]], ['rightleftharpoons', [8652]], ['rightrightarrows', [8649]], ['rightsquigarrow', [8605]], ['RightTeeArrow', [8614]], ['RightTee', [8866]], ['RightTeeVector', [10587]], ['rightthreetimes', [8908]], ['RightTriangleBar', [10704]], ['RightTriangle', [8883]], ['RightTriangleEqual', [8885]], ['RightUpDownVector', [10575]], ['RightUpTeeVector', [10588]], ['RightUpVectorBar', [10580]], ['RightUpVector', [8638]], ['RightVectorBar', [10579]], ['RightVector', [8640]], ['ring', [730]], ['risingdotseq', [8787]], ['rlarr', [8644]], ['rlhar', [8652]], ['rlm', [8207]], ['rmoustache', [9137]], ['rmoust', [9137]], ['rnmid', [10990]], ['roang', [10221]], ['roarr', [8702]], ['robrk', [10215]], ['ropar', [10630]], ['ropf', [120163]], ['Ropf', [8477]], ['roplus', [10798]], ['rotimes', [10805]], ['RoundImplies', [10608]], ['rpar', [41]], ['rpargt', [10644]], ['rppolint', [10770]], ['rrarr', [8649]], ['Rrightarrow', [8667]], ['rsaquo', [8250]], ['rscr', [120007]], ['Rscr', [8475]], ['rsh', [8625]], ['Rsh', [8625]], ['rsqb', [93]], ['rsquo', [8217]], ['rsquor', [8217]], ['CloseCurlyQuote', [8217]], ['rthree', [8908]], ['rtimes', [8906]], ['rtri', [9657]], ['rtrie', [8885]], ['rtrif', [9656]], ['rtriltri', [10702]], ['RuleDelayed', [10740]], ['ruluhar', [10600]], ['rx', [8478]], ['Sacute', [346]], ['sacute', [347]], ['sbquo', [8218]], ['scap', [10936]], ['Scaron', [352]], ['scaron', [353]], ['Sc', [10940]], ['sc', [8827]], ['sccue', [8829]], ['sce', [10928]], ['scE', [10932]], ['Scedil', [350]], ['scedil', [351]], ['Scirc', [348]], ['scirc', [349]], ['scnap', [10938]], ['scnE', [10934]], ['scnsim', [8937]], ['scpolint', [10771]], ['scsim', [8831]], ['Scy', [1057]], ['scy', [1089]], ['sdotb', [8865]], ['sdot', [8901]], ['sdote', [10854]], ['searhk', [10533]], ['searr', [8600]], ['seArr', [8664]], ['searrow', [8600]], ['sect', [167]], ['semi', [59]], ['seswar', [10537]], ['setminus', [8726]], ['setmn', [8726]], ['sext', [10038]], ['Sfr', [120086]], ['sfr', [120112]], ['sfrown', [8994]], ['sharp', [9839]], ['SHCHcy', [1065]], ['shchcy', [1097]], ['SHcy', [1064]], ['shcy', [1096]], ['ShortDownArrow', [8595]], ['ShortLeftArrow', [8592]], ['shortmid', [8739]], ['shortparallel', [8741]], ['ShortRightArrow', [8594]], ['ShortUpArrow', [8593]], ['shy', [173]], ['Sigma', [931]], ['sigma', [963]], ['sigmaf', [962]], ['sigmav', [962]], ['sim', [8764]], ['simdot', [10858]], ['sime', [8771]], ['simeq', [8771]], ['simg', [10910]], ['simgE', [10912]], ['siml', [10909]], ['simlE', [10911]], ['simne', [8774]], ['simplus', [10788]], ['simrarr', [10610]], ['slarr', [8592]], ['SmallCircle', [8728]], ['smallsetminus', [8726]], ['smashp', [10803]], ['smeparsl', [10724]], ['smid', [8739]], ['smile', [8995]], ['smt', [10922]], ['smte', [10924]], ['smtes', [10924, 65024]], ['SOFTcy', [1068]], ['softcy', [1100]], ['solbar', [9023]], ['solb', [10692]], ['sol', [47]], ['Sopf', [120138]], ['sopf', [120164]], ['spades', [9824]], ['spadesuit', [9824]], ['spar', [8741]], ['sqcap', [8851]], ['sqcaps', [8851, 65024]], ['sqcup', [8852]], ['sqcups', [8852, 65024]], ['Sqrt', [8730]], ['sqsub', [8847]], ['sqsube', [8849]], ['sqsubset', [8847]], ['sqsubseteq', [8849]], ['sqsup', [8848]], ['sqsupe', [8850]], ['sqsupset', [8848]], ['sqsupseteq', [8850]], ['square', [9633]], ['Square', [9633]], ['SquareIntersection', [8851]], ['SquareSubset', [8847]], ['SquareSubsetEqual', [8849]], ['SquareSuperset', [8848]], ['SquareSupersetEqual', [8850]], ['SquareUnion', [8852]], ['squarf', [9642]], ['squ', [9633]], ['squf', [9642]], ['srarr', [8594]], ['Sscr', [119982]], ['sscr', [120008]], ['ssetmn', [8726]], ['ssmile', [8995]], ['sstarf', [8902]], ['Star', [8902]], ['star', [9734]], ['starf', [9733]], ['straightepsilon', [1013]], ['straightphi', [981]], ['strns', [175]], ['sub', [8834]], ['Sub', [8912]], ['subdot', [10941]], ['subE', [10949]], ['sube', [8838]], ['subedot', [10947]], ['submult', [10945]], ['subnE', [10955]], ['subne', [8842]], ['subplus', [10943]], ['subrarr', [10617]], ['subset', [8834]], ['Subset', [8912]], ['subseteq', [8838]], ['subseteqq', [10949]], ['SubsetEqual', [8838]], ['subsetneq', [8842]], ['subsetneqq', [10955]], ['subsim', [10951]], ['subsub', [10965]], ['subsup', [10963]], ['succapprox', [10936]], ['succ', [8827]], ['succcurlyeq', [8829]], ['Succeeds', [8827]], ['SucceedsEqual', [10928]], ['SucceedsSlantEqual', [8829]], ['SucceedsTilde', [8831]], ['succeq', [10928]], ['succnapprox', [10938]], ['succneqq', [10934]], ['succnsim', [8937]], ['succsim', [8831]], ['SuchThat', [8715]], ['sum', [8721]], ['Sum', [8721]], ['sung', [9834]], ['sup1', [185]], ['sup2', [178]], ['sup3', [179]], ['sup', [8835]], ['Sup', [8913]], ['supdot', [10942]], ['supdsub', [10968]], ['supE', [10950]], ['supe', [8839]], ['supedot', [10948]], ['Superset', [8835]], ['SupersetEqual', [8839]], ['suphsol', [10185]], ['suphsub', [10967]], ['suplarr', [10619]], ['supmult', [10946]], ['supnE', [10956]], ['supne', [8843]], ['supplus', [10944]], ['supset', [8835]], ['Supset', [8913]], ['supseteq', [8839]], ['supseteqq', [10950]], ['supsetneq', [8843]], ['supsetneqq', [10956]], ['supsim', [10952]], ['supsub', [10964]], ['supsup', [10966]], ['swarhk', [10534]], ['swarr', [8601]], ['swArr', [8665]], ['swarrow', [8601]], ['swnwar', [10538]], ['szlig', [223]], ['Tab', [9]], ['target', [8982]], ['Tau', [932]], ['tau', [964]], ['tbrk', [9140]], ['Tcaron', [356]], ['tcaron', [357]], ['Tcedil', [354]], ['tcedil', [355]], ['Tcy', [1058]], ['tcy', [1090]], ['tdot', [8411]], ['telrec', [8981]], ['Tfr', [120087]], ['tfr', [120113]], ['there4', [8756]], ['therefore', [8756]], ['Therefore', [8756]], ['Theta', [920]], ['theta', [952]], ['thetasym', [977]], ['thetav', [977]], ['thickapprox', [8776]], ['thicksim', [8764]], ['ThickSpace', [8287, 8202]], ['ThinSpace', [8201]], ['thinsp', [8201]], ['thkap', [8776]], ['thksim', [8764]], ['THORN', [222]], ['thorn', [254]], ['tilde', [732]], ['Tilde', [8764]], ['TildeEqual', [8771]], ['TildeFullEqual', [8773]], ['TildeTilde', [8776]], ['timesbar', [10801]], ['timesb', [8864]], ['times', [215]], ['timesd', [10800]], ['tint', [8749]], ['toea', [10536]], ['topbot', [9014]], ['topcir', [10993]], ['top', [8868]], ['Topf', [120139]], ['topf', [120165]], ['topfork', [10970]], ['tosa', [10537]], ['tprime', [8244]], ['trade', [8482]], ['TRADE', [8482]], ['triangle', [9653]], ['triangledown', [9663]], ['triangleleft', [9667]], ['trianglelefteq', [8884]], ['triangleq', [8796]], ['triangleright', [9657]], ['trianglerighteq', [8885]], ['tridot', [9708]], ['trie', [8796]], ['triminus', [10810]], ['TripleDot', [8411]], ['triplus', [10809]], ['trisb', [10701]], ['tritime', [10811]], ['trpezium', [9186]], ['Tscr', [119983]], ['tscr', [120009]], ['TScy', [1062]], ['tscy', [1094]], ['TSHcy', [1035]], ['tshcy', [1115]], ['Tstrok', [358]], ['tstrok', [359]], ['twixt', [8812]], ['twoheadleftarrow', [8606]], ['twoheadrightarrow', [8608]], ['Uacute', [218]], ['uacute', [250]], ['uarr', [8593]], ['Uarr', [8607]], ['uArr', [8657]], ['Uarrocir', [10569]], ['Ubrcy', [1038]], ['ubrcy', [1118]], ['Ubreve', [364]], ['ubreve', [365]], ['Ucirc', [219]], ['ucirc', [251]], ['Ucy', [1059]], ['ucy', [1091]], ['udarr', [8645]], ['Udblac', [368]], ['udblac', [369]], ['udhar', [10606]], ['ufisht', [10622]], ['Ufr', [120088]], ['ufr', [120114]], ['Ugrave', [217]], ['ugrave', [249]], ['uHar', [10595]], ['uharl', [8639]], ['uharr', [8638]], ['uhblk', [9600]], ['ulcorn', [8988]], ['ulcorner', [8988]], ['ulcrop', [8975]], ['ultri', [9720]], ['Umacr', [362]], ['umacr', [363]], ['uml', [168]], ['UnderBar', [95]], ['UnderBrace', [9183]], ['UnderBracket', [9141]], ['UnderParenthesis', [9181]], ['Union', [8899]], ['UnionPlus', [8846]], ['Uogon', [370]], ['uogon', [371]], ['Uopf', [120140]], ['uopf', [120166]], ['UpArrowBar', [10514]], ['uparrow', [8593]], ['UpArrow', [8593]], ['Uparrow', [8657]], ['UpArrowDownArrow', [8645]], ['updownarrow', [8597]], ['UpDownArrow', [8597]], ['Updownarrow', [8661]], ['UpEquilibrium', [10606]], ['upharpoonleft', [8639]], ['upharpoonright', [8638]], ['uplus', [8846]], ['UpperLeftArrow', [8598]], ['UpperRightArrow', [8599]], ['upsi', [965]], ['Upsi', [978]], ['upsih', [978]], ['Upsilon', [933]], ['upsilon', [965]], ['UpTeeArrow', [8613]], ['UpTee', [8869]], ['upuparrows', [8648]], ['urcorn', [8989]], ['urcorner', [8989]], ['urcrop', [8974]], ['Uring', [366]], ['uring', [367]], ['urtri', [9721]], ['Uscr', [119984]], ['uscr', [120010]], ['utdot', [8944]], ['Utilde', [360]], ['utilde', [361]], ['utri', [9653]], ['utrif', [9652]], ['uuarr', [8648]], ['Uuml', [220]], ['uuml', [252]], ['uwangle', [10663]], ['vangrt', [10652]], ['varepsilon', [1013]], ['varkappa', [1008]], ['varnothing', [8709]], ['varphi', [981]], ['varpi', [982]], ['varpropto', [8733]], ['varr', [8597]], ['vArr', [8661]], ['varrho', [1009]], ['varsigma', [962]], ['varsubsetneq', [8842, 65024]], ['varsubsetneqq', [10955, 65024]], ['varsupsetneq', [8843, 65024]], ['varsupsetneqq', [10956, 65024]], ['vartheta', [977]], ['vartriangleleft', [8882]], ['vartriangleright', [8883]], ['vBar', [10984]], ['Vbar', [10987]], ['vBarv', [10985]], ['Vcy', [1042]], ['vcy', [1074]], ['vdash', [8866]], ['vDash', [8872]], ['Vdash', [8873]], ['VDash', [8875]], ['Vdashl', [10982]], ['veebar', [8891]], ['vee', [8744]], ['Vee', [8897]], ['veeeq', [8794]], ['vellip', [8942]], ['verbar', [124]], ['Verbar', [8214]], ['vert', [124]], ['Vert', [8214]], ['VerticalBar', [8739]], ['VerticalLine', [124]], ['VerticalSeparator', [10072]], ['VerticalTilde', [8768]], ['VeryThinSpace', [8202]], ['Vfr', [120089]], ['vfr', [120115]], ['vltri', [8882]], ['vnsub', [8834, 8402]], ['vnsup', [8835, 8402]], ['Vopf', [120141]], ['vopf', [120167]], ['vprop', [8733]], ['vrtri', [8883]], ['Vscr', [119985]], ['vscr', [120011]], ['vsubnE', [10955, 65024]], ['vsubne', [8842, 65024]], ['vsupnE', [10956, 65024]], ['vsupne', [8843, 65024]], ['Vvdash', [8874]], ['vzigzag', [10650]], ['Wcirc', [372]], ['wcirc', [373]], ['wedbar', [10847]], ['wedge', [8743]], ['Wedge', [8896]], ['wedgeq', [8793]], ['weierp', [8472]], ['Wfr', [120090]], ['wfr', [120116]], ['Wopf', [120142]], ['wopf', [120168]], ['wp', [8472]], ['wr', [8768]], ['wreath', [8768]], ['Wscr', [119986]], ['wscr', [120012]], ['xcap', [8898]], ['xcirc', [9711]], ['xcup', [8899]], ['xdtri', [9661]], ['Xfr', [120091]], ['xfr', [120117]], ['xharr', [10231]], ['xhArr', [10234]], ['Xi', [926]], ['xi', [958]], ['xlarr', [10229]], ['xlArr', [10232]], ['xmap', [10236]], ['xnis', [8955]], ['xodot', [10752]], ['Xopf', [120143]], ['xopf', [120169]], ['xoplus', [10753]], ['xotime', [10754]], ['xrarr', [10230]], ['xrArr', [10233]], ['Xscr', [119987]], ['xscr', [120013]], ['xsqcup', [10758]], ['xuplus', [10756]], ['xutri', [9651]], ['xvee', [8897]], ['xwedge', [8896]], ['Yacute', [221]], ['yacute', [253]], ['YAcy', [1071]], ['yacy', [1103]], ['Ycirc', [374]], ['ycirc', [375]], ['Ycy', [1067]], ['ycy', [1099]], ['yen', [165]], ['Yfr', [120092]], ['yfr', [120118]], ['YIcy', [1031]], ['yicy', [1111]], ['Yopf', [120144]], ['yopf', [120170]], ['Yscr', [119988]], ['yscr', [120014]], ['YUcy', [1070]], ['yucy', [1102]], ['yuml', [255]], ['Yuml', [376]], ['Zacute', [377]], ['zacute', [378]], ['Zcaron', [381]], ['zcaron', [382]], ['Zcy', [1047]], ['zcy', [1079]], ['Zdot', [379]], ['zdot', [380]], ['zeetrf', [8488]], ['ZeroWidthSpace', [8203]], ['Zeta', [918]], ['zeta', [950]], ['zfr', [120119]], ['Zfr', [8488]], ['ZHcy', [1046]], ['zhcy', [1078]], ['zigrarr', [8669]], ['zopf', [120171]], ['Zopf', [8484]], ['Zscr', [119989]], ['zscr', [120015]], ['zwj', [8205]], ['zwnj', [8204]]];

var alphaIndex = {};
var charIndex = {};

createIndexes(alphaIndex, charIndex);

/**
 * @constructor
 */
function Html5Entities() {}

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.decode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/&(#?[\w\d]+);?/g, function(s, entity) {
        var chr;
        if (entity.charAt(0) === "#") {
            var code = entity.charAt(1) === 'x' ?
                parseInt(entity.substr(2).toLowerCase(), 16) :
                parseInt(entity.substr(1));

            if (!(isNaN(code) || code < -32768 || code > 65535)) {
                chr = String.fromCharCode(code);
            }
        } else {
            chr = alphaIndex[entity];
        }
        return chr || s;
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.decode = function(str) {
    return new Html5Entities().decode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.encode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var charInfo = charIndex[str.charCodeAt(i)];
        if (charInfo) {
            var alpha = charInfo[str.charCodeAt(i + 1)];
            if (alpha) {
                i++;
            } else {
                alpha = charInfo[''];
            }
            if (alpha) {
                result += "&" + alpha + ";";
                i++;
                continue;
            }
        }
        result += str.charAt(i);
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.encode = function(str) {
    return new Html5Entities().encode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.encodeNonUTF = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        var charInfo = charIndex[c];
        if (charInfo) {
            var alpha = charInfo[str.charCodeAt(i + 1)];
            if (alpha) {
                i++;
            } else {
                alpha = charInfo[''];
            }
            if (alpha) {
                result += "&" + alpha + ";";
                i++;
                continue;
            }
        }
        if (c < 32 || c > 126) {
            result += '&#' + c + ';';
        } else {
            result += str.charAt(i);
        }
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.encodeNonUTF = function(str) {
    return new Html5Entities().encodeNonUTF(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.encodeNonASCII = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        if (c <= 255) {
            result += str[i++];
            continue;
        }
        result += '&#' + c + ';';
        i++
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.encodeNonASCII = function(str) {
    return new Html5Entities().encodeNonASCII(str);
 };

/**
 * @param {Object} alphaIndex Passed by reference.
 * @param {Object} charIndex Passed by reference.
 */
function createIndexes(alphaIndex, charIndex) {
    var i = ENTITIES.length;
    var _results = [];
    while (i--) {
        var e = ENTITIES[i];
        var alpha = e[0];
        var chars = e[1];
        var chr = chars[0];
        var addChar = (chr < 32 || chr > 126) || chr === 62 || chr === 60 || chr === 38 || chr === 34 || chr === 39;
        var charInfo;
        if (addChar) {
            charInfo = charIndex[chr] = charIndex[chr] || {};
        }
        if (chars[1]) {
            var chr2 = chars[1];
            alphaIndex[alpha] = String.fromCharCode(chr) + String.fromCharCode(chr2);
            _results.push(addChar && (charInfo[chr2] = alpha));
        } else {
            alphaIndex[alpha] = String.fromCharCode(chr);
            _results.push(addChar && (charInfo[''] = alpha));
        }
    }
}

module.exports = Html5Entities;


/***/ }),
/* 1 */
/*!*************************************!*\
  !*** ./build/helpers/hmr-client.js ***!
  \*************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var hotMiddlewareScript = __webpack_require__(/*! webpack-hot-middleware/client?noInfo=true&timeout=20000&reload=true */ 2);

hotMiddlewareScript.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload();
  }
});


/***/ }),
/* 2 */
/*!********************************************************************************!*\
  !*** (webpack)-hot-middleware/client.js?noInfo=true&timeout=20000&reload=true ***!
  \********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery, module) {/*eslint-env browser*/
/*global __resourceQuery __webpack_public_path__*/

var options = {
  path: "/__webpack_hmr",
  timeout: 20 * 1000,
  overlay: true,
  reload: false,
  log: true,
  warn: true,
  name: '',
  autoConnect: true,
  overlayStyles: {},
  overlayWarnings: false,
  ansiColors: {}
};
if (true) {
  var querystring = __webpack_require__(/*! querystring */ 4);
  var overrides = querystring.parse(__resourceQuery.slice(1));
  setOverrides(overrides);
}

if (typeof window === 'undefined') {
  // do nothing
} else if (typeof window.EventSource === 'undefined') {
  console.warn(
    "webpack-hot-middleware's client requires EventSource to work. " +
    "You should include a polyfill if you want to support this browser: " +
    "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools"
  );
} else {
  if (options.autoConnect) {
    connect();
  }
}

/* istanbul ignore next */
function setOptionsAndConnect(overrides) {
  setOverrides(overrides);
  connect();
}

function setOverrides(overrides) {
  if (overrides.autoConnect) options.autoConnect = overrides.autoConnect == 'true';
  if (overrides.path) options.path = overrides.path;
  if (overrides.timeout) options.timeout = overrides.timeout;
  if (overrides.overlay) options.overlay = overrides.overlay !== 'false';
  if (overrides.reload) options.reload = overrides.reload !== 'false';
  if (overrides.noInfo && overrides.noInfo !== 'false') {
    options.log = false;
  }
  if (overrides.name) {
    options.name = overrides.name;
  }
  if (overrides.quiet && overrides.quiet !== 'false') {
    options.log = false;
    options.warn = false;
  }

  if (overrides.dynamicPublicPath) {
    options.path = __webpack_require__.p + options.path;
  }

  if (overrides.ansiColors) options.ansiColors = JSON.parse(overrides.ansiColors);
  if (overrides.overlayStyles) options.overlayStyles = JSON.parse(overrides.overlayStyles);

  if (overrides.overlayWarnings) {
    options.overlayWarnings = overrides.overlayWarnings == 'true';
  }
}

function EventSourceWrapper() {
  var source;
  var lastActivity = new Date();
  var listeners = [];

  init();
  var timer = setInterval(function() {
    if ((new Date() - lastActivity) > options.timeout) {
      handleDisconnect();
    }
  }, options.timeout / 2);

  function init() {
    source = new window.EventSource(options.path);
    source.onopen = handleOnline;
    source.onerror = handleDisconnect;
    source.onmessage = handleMessage;
  }

  function handleOnline() {
    if (options.log) console.log("[HMR] connected");
    lastActivity = new Date();
  }

  function handleMessage(event) {
    lastActivity = new Date();
    for (var i = 0; i < listeners.length; i++) {
      listeners[i](event);
    }
  }

  function handleDisconnect() {
    clearInterval(timer);
    source.close();
    setTimeout(init, options.timeout);
  }

  return {
    addMessageListener: function(fn) {
      listeners.push(fn);
    }
  };
}

function getEventSourceWrapper() {
  if (!window.__whmEventSourceWrapper) {
    window.__whmEventSourceWrapper = {};
  }
  if (!window.__whmEventSourceWrapper[options.path]) {
    // cache the wrapper for other entries loaded on
    // the same page with the same options.path
    window.__whmEventSourceWrapper[options.path] = EventSourceWrapper();
  }
  return window.__whmEventSourceWrapper[options.path];
}

function connect() {
  getEventSourceWrapper().addMessageListener(handleMessage);

  function handleMessage(event) {
    if (event.data == "\uD83D\uDC93") {
      return;
    }
    try {
      processMessage(JSON.parse(event.data));
    } catch (ex) {
      if (options.warn) {
        console.warn("Invalid HMR message: " + event.data + "\n" + ex);
      }
    }
  }
}

// the reporter needs to be a singleton on the page
// in case the client is being used by multiple bundles
// we only want to report once.
// all the errors will go to all clients
var singletonKey = '__webpack_hot_middleware_reporter__';
var reporter;
if (typeof window !== 'undefined') {
  if (!window[singletonKey]) {
    window[singletonKey] = createReporter();
  }
  reporter = window[singletonKey];
}

function createReporter() {
  var strip = __webpack_require__(/*! strip-ansi */ 7);

  var overlay;
  if (typeof document !== 'undefined' && options.overlay) {
    overlay = __webpack_require__(/*! ./client-overlay */ 9)({
      ansiColors: options.ansiColors,
      overlayStyles: options.overlayStyles
    });
  }

  var styles = {
    errors: "color: #ff0000;",
    warnings: "color: #999933;"
  };
  var previousProblems = null;
  function log(type, obj) {
    var newProblems = obj[type].map(function(msg) { return strip(msg); }).join('\n');
    if (previousProblems == newProblems) {
      return;
    } else {
      previousProblems = newProblems;
    }

    var style = styles[type];
    var name = obj.name ? "'" + obj.name + "' " : "";
    var title = "[HMR] bundle " + name + "has " + obj[type].length + " " + type;
    // NOTE: console.warn or console.error will print the stack trace
    // which isn't helpful here, so using console.log to escape it.
    if (console.group && console.groupEnd) {
      console.group("%c" + title, style);
      console.log("%c" + newProblems, style);
      console.groupEnd();
    } else {
      console.log(
        "%c" + title + "\n\t%c" + newProblems.replace(/\n/g, "\n\t"),
        style + "font-weight: bold;",
        style + "font-weight: normal;"
      );
    }
  }

  return {
    cleanProblemsCache: function () {
      previousProblems = null;
    },
    problems: function(type, obj) {
      if (options.warn) {
        log(type, obj);
      }
      if (overlay) {
        if (options.overlayWarnings || type === 'errors') {
          overlay.showProblems(type, obj[type]);
          return false;
        }
        overlay.clear();
      }
      return true;
    },
    success: function() {
      if (overlay) overlay.clear();
    },
    useCustomOverlay: function(customOverlay) {
      overlay = customOverlay;
    }
  };
}

var processUpdate = __webpack_require__(/*! ./process-update */ 14);

var customHandler;
var subscribeAllHandler;
function processMessage(obj) {
  switch(obj.action) {
    case "building":
      if (options.log) {
        console.log(
          "[HMR] bundle " + (obj.name ? "'" + obj.name + "' " : "") +
          "rebuilding"
        );
      }
      break;
    case "built":
      if (options.log) {
        console.log(
          "[HMR] bundle " + (obj.name ? "'" + obj.name + "' " : "") +
          "rebuilt in " + obj.time + "ms"
        );
      }
      // fall through
    case "sync":
      if (obj.name && options.name && obj.name !== options.name) {
        return;
      }
      var applyUpdate = true;
      if (obj.errors.length > 0) {
        if (reporter) reporter.problems('errors', obj);
        applyUpdate = false;
      } else if (obj.warnings.length > 0) {
        if (reporter) {
          var overlayShown = reporter.problems('warnings', obj);
          applyUpdate = overlayShown;
        }
      } else {
        if (reporter) {
          reporter.cleanProblemsCache();
          reporter.success();
        }
      }
      if (applyUpdate) {
        processUpdate(obj.hash, obj.modules, options);
      }
      break;
    default:
      if (customHandler) {
        customHandler(obj);
      }
  }

  if (subscribeAllHandler) {
    subscribeAllHandler(obj);
  }
}

if (module) {
  module.exports = {
    subscribeAll: function subscribeAll(handler) {
      subscribeAllHandler = handler;
    },
    subscribe: function subscribe(handler) {
      customHandler = handler;
    },
    useCustomOverlay: function useCustomOverlay(customOverlay) {
      if (reporter) reporter.useCustomOverlay(customOverlay);
    },
    setOptionsAndConnect: setOptionsAndConnect
  };
}

/* WEBPACK VAR INJECTION */}.call(exports, "?noInfo=true&timeout=20000&reload=true", __webpack_require__(/*! ./../webpack/buildin/module.js */ 3)(module)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 4 */
/*!*************************************************************************************!*\
  !*** /mnt/c/Users/Smigol/Projects/simply-dev/node_modules/querystring-es3/index.js ***!
  \*************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ 5);
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ 6);


/***/ }),
/* 5 */
/*!**************************************************************************************!*\
  !*** /mnt/c/Users/Smigol/Projects/simply-dev/node_modules/querystring-es3/decode.js ***!
  \**************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 6 */
/*!**************************************************************************************!*\
  !*** /mnt/c/Users/Smigol/Projects/simply-dev/node_modules/querystring-es3/encode.js ***!
  \**************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 7 */
/*!********************************************************************************!*\
  !*** /mnt/c/Users/Smigol/Projects/simply-dev/node_modules/strip-ansi/index.js ***!
  \********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ansiRegex = __webpack_require__(/*! ansi-regex */ 8)();

module.exports = function (str) {
	return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
};


/***/ }),
/* 8 */
/*!********************************************************************************!*\
  !*** /mnt/c/Users/Smigol/Projects/simply-dev/node_modules/ansi-regex/index.js ***!
  \********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function () {
	return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;
};


/***/ }),
/* 9 */
/*!**************************************************!*\
  !*** (webpack)-hot-middleware/client-overlay.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/*eslint-env browser*/

var clientOverlay = document.createElement('div');
clientOverlay.id = 'webpack-hot-middleware-clientOverlay';
var styles = {
  background: 'rgba(0,0,0,0.85)',
  color: '#E8E8E8',
  lineHeight: '1.2',
  whiteSpace: 'pre',
  fontFamily: 'Menlo, Consolas, monospace',
  fontSize: '13px',
  position: 'fixed',
  zIndex: 9999,
  padding: '10px',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  overflow: 'auto',
  dir: 'ltr',
  textAlign: 'left'
};

var ansiHTML = __webpack_require__(/*! ansi-html */ 10);
var colors = {
  reset: ['transparent', 'transparent'],
  black: '181818',
  red: 'E36049',
  green: 'B3CB74',
  yellow: 'FFD080',
  blue: '7CAFC2',
  magenta: '7FACCA',
  cyan: 'C3C2EF',
  lightgrey: 'EBE7E3',
  darkgrey: '6D7891'
};

var Entities = __webpack_require__(/*! html-entities */ 11).AllHtmlEntities;
var entities = new Entities();

function showProblems(type, lines) {
  clientOverlay.innerHTML = '';
  lines.forEach(function(msg) {
    msg = ansiHTML(entities.encode(msg));
    var div = document.createElement('div');
    div.style.marginBottom = '26px';
    div.innerHTML = problemType(type) + ' in ' + msg;
    clientOverlay.appendChild(div);
  });
  if (document.body) {
    document.body.appendChild(clientOverlay);
  }
}

function clear() {
  if (document.body && clientOverlay.parentNode) {
    document.body.removeChild(clientOverlay);
  }
}

function problemType (type) {
  var problemColors = {
    errors: colors.red,
    warnings: colors.yellow
  };
  var color = problemColors[type] || colors.red;
  return (
    '<span style="background-color:#' + color + '; color:#fff; padding:2px 4px; border-radius: 2px">' +
      type.slice(0, -1).toUpperCase() +
    '</span>'
  );
}

module.exports = function(options) {
  for (var color in options.overlayColors) {
    if (color in colors) {
      colors[color] = options.overlayColors[color];
    }
    ansiHTML.setColors(colors);
  }

  for (var style in options.overlayStyles) {
    styles[style] = options.overlayStyles[style];
  }

  for (var key in styles) {
    clientOverlay.style[key] = styles[key];
  }

  return {
    showProblems: showProblems,
    clear: clear
  }
};

module.exports.clear = clear;
module.exports.showProblems = showProblems;


/***/ }),
/* 10 */
/*!*******************************************************************************!*\
  !*** /mnt/c/Users/Smigol/Projects/simply-dev/node_modules/ansi-html/index.js ***!
  \*******************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = ansiHTML

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/

var _defColors = {
  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
}
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
}
var _openTags = {
  '1': 'font-weight:bold', // bold
  '2': 'opacity:0.5', // dim
  '3': '<i>', // italic
  '4': '<u>', // underscore
  '8': 'display:none', // hidden
  '9': '<del>' // delete
}
var _closeTags = {
  '23': '</i>', // reset italic
  '24': '</u>', // reset underscore
  '29': '</del>' // reset delete
}

;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>'
})

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
function ansiHTML (text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text
  }

  // Cache opened sequence.
  var ansiCodes = []
  // Replace with markup.
  var ret = text.replace(/\033\[(\d+)*m/g, function (match, seq) {
    var ot = _openTags[seq]
    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop()
        return '</span>'
      }
      // Open tag.
      ansiCodes.push(seq)
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
    }

    var ct = _closeTags[seq]
    if (ct) {
      // Pop sequence
      ansiCodes.pop()
      return ct
    }
    return ''
  })

  // Make sure tags are closed.
  var l = ansiCodes.length
  ;(l > 0) && (ret += Array(l + 1).join('</span>'))

  return ret
}

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.')
  }

  var _finalColors = {}
  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null
    if (!hex) {
      _finalColors[key] = _defColors[key]
      continue
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex]
      }
      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string'
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
      }
      var defHexColor = _defColors[key]
      if (!hex[0]) {
        hex[0] = defHexColor[0]
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]]
        hex.push(defHexColor[1])
      }

      hex = hex.slice(0, 2)
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
    }
    _finalColors[key] = hex
  }
  _setTags(_finalColors)
}

/**
 * Reset colors.
 */
ansiHTML.reset = function () {
  _setTags(_defColors)
}

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
ansiHTML.tags = {}

if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () { return _openTags }
  })
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () { return _closeTags }
  })
} else {
  ansiHTML.tags.open = _openTags
  ansiHTML.tags.close = _closeTags
}

function _setTags (colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
  // inverse
  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
  // dark grey
  _openTags['90'] = 'color:#' + colors.darkgrey

  for (var code in _styles) {
    var color = _styles[code]
    var oriColor = colors[color] || '000'
    _openTags[code] = 'color:#' + oriColor
    code = parseInt(code)
    _openTags[(code + 10).toString()] = 'background:#' + oriColor
  }
}

ansiHTML.reset()


/***/ }),
/* 11 */
/*!***********************************************************************************!*\
  !*** /mnt/c/Users/Smigol/Projects/simply-dev/node_modules/html-entities/index.js ***!
  \***********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  XmlEntities: __webpack_require__(/*! ./lib/xml-entities.js */ 12),
  Html4Entities: __webpack_require__(/*! ./lib/html4-entities.js */ 13),
  Html5Entities: __webpack_require__(/*! ./lib/html5-entities.js */ 0),
  AllHtmlEntities: __webpack_require__(/*! ./lib/html5-entities.js */ 0)
};


/***/ }),
/* 12 */
/*!**********************************************************************************************!*\
  !*** /mnt/c/Users/Smigol/Projects/simply-dev/node_modules/html-entities/lib/xml-entities.js ***!
  \**********************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var ALPHA_INDEX = {
    '&lt': '<',
    '&gt': '>',
    '&quot': '"',
    '&apos': '\'',
    '&amp': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': '\'',
    '&amp;': '&'
};

var CHAR_INDEX = {
    60: 'lt',
    62: 'gt',
    34: 'quot',
    39: 'apos',
    38: 'amp'
};

var CHAR_S_INDEX = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&apos;',
    '&': '&amp;'
};

/**
 * @constructor
 */
function XmlEntities() {}

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.encode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/<|>|"|'|&/g, function(s) {
        return CHAR_S_INDEX[s];
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.encode = function(str) {
    return new XmlEntities().encode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.decode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/&#?[0-9a-zA-Z]+;?/g, function(s) {
        if (s.charAt(1) === '#') {
            var code = s.charAt(2).toLowerCase() === 'x' ?
                parseInt(s.substr(3), 16) :
                parseInt(s.substr(2));

            if (isNaN(code) || code < -32768 || code > 65535) {
                return '';
            }
            return String.fromCharCode(code);
        }
        return ALPHA_INDEX[s] || s;
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.decode = function(str) {
    return new XmlEntities().decode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.encodeNonUTF = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        var alpha = CHAR_INDEX[c];
        if (alpha) {
            result += "&" + alpha + ";";
            i++;
            continue;
        }
        if (c < 32 || c > 126) {
            result += '&#' + c + ';';
        } else {
            result += str.charAt(i);
        }
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.encodeNonUTF = function(str) {
    return new XmlEntities().encodeNonUTF(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.encodeNonASCII = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLenght = str.length;
    var result = '';
    var i = 0;
    while (i < strLenght) {
        var c = str.charCodeAt(i);
        if (c <= 255) {
            result += str[i++];
            continue;
        }
        result += '&#' + c + ';';
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.encodeNonASCII = function(str) {
    return new XmlEntities().encodeNonASCII(str);
 };

module.exports = XmlEntities;


/***/ }),
/* 13 */
/*!************************************************************************************************!*\
  !*** /mnt/c/Users/Smigol/Projects/simply-dev/node_modules/html-entities/lib/html4-entities.js ***!
  \************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var HTML_ALPHA = ['apos', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'Aelig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'quot', 'amp', 'lt', 'gt', 'OElig', 'oelig', 'Scaron', 'scaron', 'Yuml', 'circ', 'tilde', 'ensp', 'emsp', 'thinsp', 'zwnj', 'zwj', 'lrm', 'rlm', 'ndash', 'mdash', 'lsquo', 'rsquo', 'sbquo', 'ldquo', 'rdquo', 'bdquo', 'dagger', 'Dagger', 'permil', 'lsaquo', 'rsaquo', 'euro', 'fnof', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigmaf', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'thetasym', 'upsih', 'piv', 'bull', 'hellip', 'prime', 'Prime', 'oline', 'frasl', 'weierp', 'image', 'real', 'trade', 'alefsym', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'crarr', 'lArr', 'uArr', 'rArr', 'dArr', 'hArr', 'forall', 'part', 'exist', 'empty', 'nabla', 'isin', 'notin', 'ni', 'prod', 'sum', 'minus', 'lowast', 'radic', 'prop', 'infin', 'ang', 'and', 'or', 'cap', 'cup', 'int', 'there4', 'sim', 'cong', 'asymp', 'ne', 'equiv', 'le', 'ge', 'sub', 'sup', 'nsub', 'sube', 'supe', 'oplus', 'otimes', 'perp', 'sdot', 'lceil', 'rceil', 'lfloor', 'rfloor', 'lang', 'rang', 'loz', 'spades', 'clubs', 'hearts', 'diams'];
var HTML_CODES = [39, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 34, 38, 60, 62, 338, 339, 352, 353, 376, 710, 732, 8194, 8195, 8201, 8204, 8205, 8206, 8207, 8211, 8212, 8216, 8217, 8218, 8220, 8221, 8222, 8224, 8225, 8240, 8249, 8250, 8364, 402, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 977, 978, 982, 8226, 8230, 8242, 8243, 8254, 8260, 8472, 8465, 8476, 8482, 8501, 8592, 8593, 8594, 8595, 8596, 8629, 8656, 8657, 8658, 8659, 8660, 8704, 8706, 8707, 8709, 8711, 8712, 8713, 8715, 8719, 8721, 8722, 8727, 8730, 8733, 8734, 8736, 8743, 8744, 8745, 8746, 8747, 8756, 8764, 8773, 8776, 8800, 8801, 8804, 8805, 8834, 8835, 8836, 8838, 8839, 8853, 8855, 8869, 8901, 8968, 8969, 8970, 8971, 9001, 9002, 9674, 9824, 9827, 9829, 9830];

var alphaIndex = {};
var numIndex = {};

var i = 0;
var length = HTML_ALPHA.length;
while (i < length) {
    var a = HTML_ALPHA[i];
    var c = HTML_CODES[i];
    alphaIndex[a] = String.fromCharCode(c);
    numIndex[c] = a;
    i++;
}

/**
 * @constructor
 */
function Html4Entities() {}

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.decode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/&(#?[\w\d]+);?/g, function(s, entity) {
        var chr;
        if (entity.charAt(0) === "#") {
            var code = entity.charAt(1).toLowerCase() === 'x' ?
                parseInt(entity.substr(2), 16) :
                parseInt(entity.substr(1));

            if (!(isNaN(code) || code < -32768 || code > 65535)) {
                chr = String.fromCharCode(code);
            }
        } else {
            chr = alphaIndex[entity];
        }
        return chr || s;
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.decode = function(str) {
    return new Html4Entities().decode(str);
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.encode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var alpha = numIndex[str.charCodeAt(i)];
        result += alpha ? "&" + alpha + ";" : str.charAt(i);
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.encode = function(str) {
    return new Html4Entities().encode(str);
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.encodeNonUTF = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var cc = str.charCodeAt(i);
        var alpha = numIndex[cc];
        if (alpha) {
            result += "&" + alpha + ";";
        } else if (cc < 32 || cc > 126) {
            result += "&#" + cc + ";";
        } else {
            result += str.charAt(i);
        }
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.encodeNonUTF = function(str) {
    return new Html4Entities().encodeNonUTF(str);
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.encodeNonASCII = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        if (c <= 255) {
            result += str[i++];
            continue;
        }
        result += '&#' + c + ';';
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.encodeNonASCII = function(str) {
    return new Html4Entities().encodeNonASCII(str);
};

module.exports = Html4Entities;


/***/ }),
/* 14 */
/*!**************************************************!*\
  !*** (webpack)-hot-middleware/process-update.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Based heavily on https://github.com/webpack/webpack/blob/
 *  c0afdf9c6abc1dd70707c594e473802a566f7b6e/hot/only-dev-server.js
 * Original copyright Tobias Koppers @sokra (MIT license)
 */

/* global window __webpack_hash__ */

if (false) {
  throw new Error("[HMR] Hot Module Replacement is disabled.");
}

var hmrDocsUrl = "https://webpack.js.org/concepts/hot-module-replacement/"; // eslint-disable-line max-len

var lastHash;
var failureStatuses = { abort: 1, fail: 1 };
var applyOptions = { 				
  ignoreUnaccepted: true,
  ignoreDeclined: true,
  ignoreErrored: true,
  onUnaccepted: function(data) {
    console.warn("Ignored an update to unaccepted module " + data.chain.join(" -> "));
  },
  onDeclined: function(data) {
    console.warn("Ignored an update to declined module " + data.chain.join(" -> "));
  },
  onErrored: function(data) {
    console.error(data.error);
    console.warn("Ignored an error while updating module " + data.moduleId + " (" + data.type + ")");
  } 
}

function upToDate(hash) {
  if (hash) lastHash = hash;
  return lastHash == __webpack_require__.h();
}

module.exports = function(hash, moduleMap, options) {
  var reload = options.reload;
  if (!upToDate(hash) && module.hot.status() == "idle") {
    if (options.log) console.log("[HMR] Checking for updates on the server...");
    check();
  }

  function check() {
    var cb = function(err, updatedModules) {
      if (err) return handleError(err);

      if(!updatedModules) {
        if (options.warn) {
          console.warn("[HMR] Cannot find update (Full reload needed)");
          console.warn("[HMR] (Probably because of restarting the server)");
        }
        performReload();
        return null;
      }

      var applyCallback = function(applyErr, renewedModules) {
        if (applyErr) return handleError(applyErr);

        if (!upToDate()) check();

        logUpdates(updatedModules, renewedModules);
      };

      var applyResult = module.hot.apply(applyOptions, applyCallback);
      // webpack 2 promise
      if (applyResult && applyResult.then) {
        // HotModuleReplacement.runtime.js refers to the result as `outdatedModules`
        applyResult.then(function(outdatedModules) {
          applyCallback(null, outdatedModules);
        });
        applyResult.catch(applyCallback);
      }

    };

    var result = module.hot.check(false, cb);
    // webpack 2 promise
    if (result && result.then) {
        result.then(function(updatedModules) {
            cb(null, updatedModules);
        });
        result.catch(cb);
    }
  }

  function logUpdates(updatedModules, renewedModules) {
    var unacceptedModules = updatedModules.filter(function(moduleId) {
      return renewedModules && renewedModules.indexOf(moduleId) < 0;
    });

    if(unacceptedModules.length > 0) {
      if (options.warn) {
        console.warn(
          "[HMR] The following modules couldn't be hot updated: " +
          "(Full reload needed)\n" +
          "This is usually because the modules which have changed " +
          "(and their parents) do not know how to hot reload themselves. " +
          "See " + hmrDocsUrl + " for more details."
        );
        unacceptedModules.forEach(function(moduleId) {
          console.warn("[HMR]  - " + moduleMap[moduleId]);
        });
      }
      performReload();
      return;
    }

    if (options.log) {
      if(!renewedModules || renewedModules.length === 0) {
        console.log("[HMR] Nothing hot updated.");
      } else {
        console.log("[HMR] Updated modules:");
        renewedModules.forEach(function(moduleId) {
          console.log("[HMR]  - " + moduleMap[moduleId]);
        });
      }

      if (upToDate()) {
        console.log("[HMR] App is up to date.");
      }
    }
  }

  function handleError(err) {
    if (module.hot.status() in failureStatuses) {
      if (options.warn) {
        console.warn("[HMR] Cannot check for update (Full reload needed)");
        console.warn("[HMR] " + err.stack || err.message);
      }
      performReload();
      return;
    }
    if (options.warn) {
      console.warn("[HMR] Update check failed: " + err.stack || err.message);
    }
  }

  function performReload() {
    if (reload) {
      if (options.warn) console.warn("[HMR] Reloading page");
      window.location.reload();
    }
  }
};


/***/ }),
/* 15 */
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /mnt/c/Users/Smigol/Projects/simply-dev/node_modules/cache-loader/dist/cjs.js!/mnt/c/Users/Smigol/Projects/simply-dev/node_modules/css-loader?{"sourceMap":true}!/mnt/c/Users/Smigol/Projects/simply-dev/node_modules/postcss-loader/lib?{"config":{"path":"/mnt/c/Users/Smigol/projects/paway/src/build","ctx":{"open":true,"copy":"images/**_/*","proxyUrl":"http://localhost:3000","cacheBusting":"[name]","paths":{"root":"/mnt/c/Users/Smigol/projects/paway","assets":"/mnt/c/Users/Smigol/projects/paway/src","dist":"/mnt/c/Users/Smigol/projects/paway/assets"},"enabled":{"sourceMaps":true,"optimize":false,"cacheBusting":false,"watcher":true},"watch":["**_/*.hbs"],"entry":{"main":["./scripts/main.js","./styles/main.scss"],"search":"./scripts/search.js"},"publicPath":"/assets/","devUrl":"http://localhost:2368","env":{"production":false,"development":true},"manifest":{}}},"sourceMap":true}!/mnt/c/Users/Smigol/Projects/simply-dev/node_modules/resolve-url-loader?{"sourceMap":true}!/mnt/c/Users/Smigol/Projects/simply-dev/node_modules/sass-loader/lib/loader.js?{"sourceMap":true,"sourceComments":true}!/mnt/c/Users/Smigol/Projects/simply-dev/node_modules/import-glob!./styles/main.scss ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../../../Projects/simply-dev/node_modules/css-loader/lib/url/escape.js */ 24);
exports = module.exports = __webpack_require__(/*! ../../../../Projects/simply-dev/node_modules/css-loader/lib/css-base.js */ 25)(true);
// imports


// module
exports.push([module.i, "/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\n/* line 11, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nhtml {\n  line-height: 1.15;\n  /* 1 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\n/* line 23, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\n/* line 31, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\n/* line 40, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\n/* line 53, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nhr {\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\n/* line 64, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\n/* line 76, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\n/* line 85, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted;\n  /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\n/* line 95, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\n/* line 105, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\n/* line 116, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\n/* line 125, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\n/* line 133, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nsub {\n  bottom: -0.25em;\n}\n\n/* line 137, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\n/* line 148, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\n/* line 160, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\n/* line 176, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\n/* line 186, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\n/* line 195, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\n/* line 206, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\n/* line 218, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\n/* line 229, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\n/* line 240, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nlegend {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\n/* line 253, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\n/* line 261, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n/* line 270, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n/* line 280, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n/* line 290, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n/* line 299, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n/* line 308, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\n/* line 320, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\n/* line 328, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\n/* line 339, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n/* line 347, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\n[hidden] {\n  display: none;\n}\n\n/* line 1, src/styles/common/_mixins.scss */\n\n[class^=\"i-\"]::before,\n[class*=\" i-\"]::before {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: 'paway' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: inherit;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n/* line 16, src/styles/common/_mixins.scss */\n\n.u-absolute0 {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n/* line 25, src/styles/common/_mixins.scss */\n\nbody,\nblockquote,\n.subscribe-title,\n.sss-title,\n.pn-title {\n  font-family: \"Playfair Display\", Whitney SSm A, Whitney SSm B, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif;\n}\n\n/* line 26, src/styles/common/_mixins.scss */\n\nfigcaption,\n.pagination,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\n.u-meta,\n.navbar ul li,\n.footer,\n.post-tags-link,\n.au-meta li {\n  font-family: \"Roboto\", Mercury SSm A, Mercury SSm B, Georgia, serif;\n}\n\n/* line 29, src/styles/common/_mixins.scss */\n\n.u-flex,\n.u-flexCenter,\n.u-flexContentCenter,\n.u-flexColumn,\n.u-flexColumnTop,\n.row,\n.navbar ul,\n.post-body,\n.kg-gallery-container,\n.kg-gallery-row,\n.kg-embed-card {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n/* line 30, src/styles/common/_mixins.scss */\n\n.u-flexCenter,\n.u-flexContentCenter,\n.u-flexEnd,\n.post-body,\n.kg-embed-card {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n\n/* line 31, src/styles/common/_mixins.scss */\n\n.u-flexColumn,\n.u-flexColumnTop,\n.post-body,\n.kg-gallery-container,\n.kg-embed-card {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n/* line 32, src/styles/common/_mixins.scss */\n\n.row,\n.kg-gallery-row {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n}\n\n/* line 34, src/styles/common/_mixins.scss */\n\n.u-flexContentCenter,\n.u-flexColumn,\n.kg-gallery-row {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n/* line 1, src/styles/common/_global.scss */\n\n*,\n*::before,\n*::after {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\n/* line 5, src/styles/common/_global.scss */\n\nhtml {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  font-size: 16px;\n}\n\n/* line 10, src/styles/common/_global.scss */\n\na {\n  color: inherit;\n  text-decoration: none;\n  -webkit-transition: all 0.3s ease-in-out 0s;\n  -o-transition: all 0.3s ease-in-out 0s;\n  transition: all 0.3s ease-in-out 0s;\n}\n\n/* line 15, src/styles/common/_global.scss */\n\na:active,\na:hover {\n  outline: 0;\n}\n\n/* line 21, src/styles/common/_global.scss */\n\nbody {\n  background: #fff;\n  color: #505050;\n  font-size: 18px;\n  line-height: 1.8em;\n  overflow-x: hidden;\n  text-rendering: optimizeLegibility;\n}\n\n/* line 32, src/styles/common/_global.scss */\n\nblockquote {\n  border-left: 5px solid #151515;\n  color: #151515;\n  font-size: 1.5rem;\n  font-style: italic;\n  font-weight: 400;\n  line-height: 1.6em;\n  margin: 0;\n  padding-left: 20px;\n}\n\n/* line 44, src/styles/common/_global.scss */\n\nblockquote p:first-of-type {\n  margin-top: 0;\n}\n\n/* line 48, src/styles/common/_global.scss */\n\nfigure {\n  margin: 0;\n}\n\n/* line 52, src/styles/common/_global.scss */\n\nfigcaption {\n  text-align: center;\n  margin-top: 15px;\n  text-transform: none;\n  font-style: italic;\n  color: #999;\n  font-size: 15px;\n}\n\n/* line 63, src/styles/common/_global.scss */\n\nol,\nul {\n  list-style: none;\n  list-style-image: none;\n  margin: 0;\n  padding: 0;\n}\n\n/* line 70, src/styles/common/_global.scss */\n\nhr {\n  margin-top: 24px;\n  margin-bottom: 24px;\n  border: 0;\n  border-top: 1px solid #eee;\n}\n\n/* line 79, src/styles/common/_global.scss */\n\nkbd,\nsamp,\ncode {\n  background: #f0f0f0;\n  border-radius: 4px;\n  color: #333;\n  font-size: 15px;\n  padding: 3px;\n  white-space: pre-wrap;\n}\n\n/* line 88, src/styles/common/_global.scss */\n\npre {\n  background-color: #29292e;\n  border-radius: 4px;\n  font-size: 15px;\n  margin: 0;\n  max-width: 100%;\n  padding: 1rem;\n  word-wrap: normal;\n}\n\n/* line 97, src/styles/common/_global.scss */\n\npre code {\n  background: transparent;\n  color: #f8f8f2;\n  padding: 0;\n}\n\n/* line 104, src/styles/common/_global.scss */\n\nimg {\n  height: auto;\n  max-width: 100%;\n  vertical-align: middle;\n  width: auto;\n}\n\n/* line 110, src/styles/common/_global.scss */\n\nimg:not([src]) {\n  visibility: hidden;\n}\n\n/* line 115, src/styles/common/_global.scss */\n\ni {\n  vertical-align: middle;\n}\n\n/* line 121, src/styles/common/_global.scss */\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n  display: block;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  font-size: 1rem;\n  line-height: 1.5;\n  margin: 35px 0 0;\n  max-width: 100%;\n  overflow-x: auto;\n  white-space: nowrap;\n  width: auto;\n  -webkit-overflow-scrolling: touch;\n}\n\n/* line 136, src/styles/common/_global.scss */\n\ntable th,\ntable td {\n  padding: 6px 13px;\n  border: 1px solid #dfe2e5;\n}\n\n/* line 142, src/styles/common/_global.scss */\n\ntable tr:nth-child(2n) {\n  background-color: #f6f8fa;\n}\n\n/* line 146, src/styles/common/_global.scss */\n\ntable th {\n  letter-spacing: 0.2px;\n  text-transform: uppercase;\n  font-weight: 600;\n}\n\n/* line 154, src/styles/common/_global.scss */\n\n.pagination {\n  text-align: center;\n  margin: 70px 0;\n  font-weight: 500;\n  font-size: 1rem;\n  line-height: 1.4;\n}\n\n/* line 164, src/styles/common/_global.scss */\n\n.pagination > span {\n  margin: 0 10px;\n}\n\n/* line 166, src/styles/common/_global.scss */\n\n.pagination a {\n  color: #999;\n}\n\n/* line 169, src/styles/common/_global.scss */\n\n.pagination a:hover {\n  color: #505050;\n  border-bottom: 1px solid #999;\n}\n\n/* line 178, src/styles/common/_global.scss */\n\n.video-responsive {\n  display: block;\n  height: 0;\n  overflow: hidden;\n  padding: 0 0 56.25%;\n  position: relative;\n  width: 100%;\n}\n\n/* line 186, src/styles/common/_global.scss */\n\n.video-responsive iframe {\n  border: 0;\n  bottom: 0;\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n\n/* line 196, src/styles/common/_global.scss */\n\n.video-responsive video {\n  border: 0;\n  bottom: 0;\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n\n/* line 216, src/styles/common/_global.scss */\n\n.instagram-img {\n  height: 264px;\n}\n\n/* line 219, src/styles/common/_global.scss */\n\n.instagram-img img {\n  -webkit-filter: brightness(65%);\n          filter: brightness(65%);\n  -webkit-transition: all .2s ease;\n  -o-transition: all .2s ease;\n  transition: all .2s ease;\n}\n\n/* line 221, src/styles/common/_global.scss */\n\n.instagram-img:hover > img {\n  -webkit-filter: brightness(90%);\n          filter: brightness(90%);\n}\n\n/* line 224, src/styles/common/_global.scss */\n\n.instagram-name {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n       -o-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  z-index: 10;\n}\n\n/* line 231, src/styles/common/_global.scss */\n\n.instagram-btn {\n  background-color: #fff;\n  color: #000;\n  display: block;\n  font-weight: 600;\n  line-height: 1;\n  min-width: 200px;\n  padding: 10px;\n  text-align: center;\n}\n\n/* line 2, src/styles/common/_typography.scss */\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  color: inherit;\n  font-weight: 500;\n  line-height: 1.5em;\n  margin: 0;\n}\n\n/* line 11, src/styles/common/_typography.scss */\n\nh1 a,\nh2 a,\nh3 a,\nh4 a,\nh5 a,\nh6 a {\n  color: inherit;\n  line-height: inherit;\n}\n\n/* line 17, src/styles/common/_typography.scss */\n\nh1 {\n  font-size: 3rem;\n}\n\n/* line 18, src/styles/common/_typography.scss */\n\nh2 {\n  font-size: 2.875rem;\n}\n\n/* line 19, src/styles/common/_typography.scss */\n\nh3 {\n  font-size: 2.125rem;\n}\n\n/* line 20, src/styles/common/_typography.scss */\n\nh4 {\n  font-size: 1.875rem;\n}\n\n/* line 21, src/styles/common/_typography.scss */\n\nh5 {\n  font-size: 1.625rem;\n}\n\n/* line 22, src/styles/common/_typography.scss */\n\nh6 {\n  font-size: 1.375rem;\n}\n\n/* line 24, src/styles/common/_typography.scss */\n\np {\n  margin: 0;\n}\n\n/* line 1, src/styles/common/_utilities.scss */\n\n.u-image {\n  -o-object-fit: cover;\n     object-fit: cover;\n  height: 100%;\n  width: 100%;\n}\n\n/* line 7, src/styles/common/_utilities.scss */\n\n.u-hide {\n  display: none;\n}\n\n/* line 8, src/styles/common/_utilities.scss */\n\n.u-pointer {\n  cursor: pointer;\n}\n\n/* line 10, src/styles/common/_utilities.scss */\n\n.u-meta {\n  font-size: 12px;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  color: rgba(255, 255, 255, 0.7);\n  text-align: center;\n}\n\n/* line 20, src/styles/common/_utilities.scss */\n\n.u-round {\n  border-radius: 50%;\n}\n\n/* line 23, src/styles/common/_utilities.scss */\n\n.zindex1 {\n  z-index: 1;\n}\n\n/* line 24, src/styles/common/_utilities.scss */\n\n.zindex2 {\n  z-index: 2;\n}\n\n/* line 25, src/styles/common/_utilities.scss */\n\n.zindex3 {\n  z-index: 3;\n}\n\n/* line 26, src/styles/common/_utilities.scss */\n\n.zindex4 {\n  z-index: 4;\n}\n\n/* line 29, src/styles/common/_utilities.scss */\n\n.u-margin-0-15 {\n  margin: 0 15px;\n}\n\n/* line 32, src/styles/common/_utilities.scss */\n\n.u-relative {\n  position: relative;\n}\n\n/* line 33, src/styles/common/_utilities.scss */\n\n.u-absolute {\n  position: absolute;\n}\n\n/* line 35, src/styles/common/_utilities.scss */\n\n.u-fixed {\n  position: fixed;\n}\n\n/* line 37, src/styles/common/_utilities.scss */\n\n.u-block {\n  display: block;\n}\n\n/* line 38, src/styles/common/_utilities.scss */\n\n.u-inlineBlock {\n  display: inline-block;\n}\n\n/* line 41, src/styles/common/_utilities.scss */\n\n.u-overlay {\n  background-color: rgba(0, 0, 0, 0.6);\n  -webkit-transition: all 0.3s ease;\n  -o-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n\n/* line 62, src/styles/common/_utilities.scss */\n\n.u-flex1 {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n}\n\n/* line 63, src/styles/common/_utilities.scss */\n\n.u-flex0 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 auto;\n          flex: 0 0 auto;\n}\n\n/* line 64, src/styles/common/_utilities.scss */\n\n.u-flexWrap {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n\n/* line 75, src/styles/common/_utilities.scss */\n\n.u-flexEnd {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n/* line 81, src/styles/common/_utilities.scss */\n\n.u-flexColumnTop {\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n\n/* line 1, src/styles/components/_grid.scss */\n\n.container {\n  width: 100%;\n  max-width: 1170px;\n  margin: auto;\n}\n\n/* line 7, src/styles/components/_grid.scss */\n\n.row {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -webkit-box-flex: 0;\n      -ms-flex: 0 1 auto;\n          flex: 0 1 auto;\n  margin-left: -15px;\n  margin-right: -15px;\n}\n\n/* line 17, src/styles/components/_grid.scss */\n\n.row .col {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 auto;\n          flex: 0 0 auto;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding-left: 15px;\n  padding-right: 15px;\n}\n\n/* line 28, src/styles/components/_grid.scss */\n\n.row .col.s1 {\n  -ms-flex-preferred-size: 8.33333%;\n      flex-basis: 8.33333%;\n  max-width: 8.33333%;\n}\n\n/* line 28, src/styles/components/_grid.scss */\n\n.row .col.s2 {\n  -ms-flex-preferred-size: 16.66667%;\n      flex-basis: 16.66667%;\n  max-width: 16.66667%;\n}\n\n/* line 28, src/styles/components/_grid.scss */\n\n.row .col.s3 {\n  -ms-flex-preferred-size: 25%;\n      flex-basis: 25%;\n  max-width: 25%;\n}\n\n/* line 28, src/styles/components/_grid.scss */\n\n.row .col.s4 {\n  -ms-flex-preferred-size: 33.33333%;\n      flex-basis: 33.33333%;\n  max-width: 33.33333%;\n}\n\n/* line 28, src/styles/components/_grid.scss */\n\n.row .col.s5 {\n  -ms-flex-preferred-size: 41.66667%;\n      flex-basis: 41.66667%;\n  max-width: 41.66667%;\n}\n\n/* line 28, src/styles/components/_grid.scss */\n\n.row .col.s6 {\n  -ms-flex-preferred-size: 50%;\n      flex-basis: 50%;\n  max-width: 50%;\n}\n\n/* line 28, src/styles/components/_grid.scss */\n\n.row .col.s7 {\n  -ms-flex-preferred-size: 58.33333%;\n      flex-basis: 58.33333%;\n  max-width: 58.33333%;\n}\n\n/* line 28, src/styles/components/_grid.scss */\n\n.row .col.s8 {\n  -ms-flex-preferred-size: 66.66667%;\n      flex-basis: 66.66667%;\n  max-width: 66.66667%;\n}\n\n/* line 28, src/styles/components/_grid.scss */\n\n.row .col.s9 {\n  -ms-flex-preferred-size: 75%;\n      flex-basis: 75%;\n  max-width: 75%;\n}\n\n/* line 28, src/styles/components/_grid.scss */\n\n.row .col.s10 {\n  -ms-flex-preferred-size: 83.33333%;\n      flex-basis: 83.33333%;\n  max-width: 83.33333%;\n}\n\n/* line 28, src/styles/components/_grid.scss */\n\n.row .col.s11 {\n  -ms-flex-preferred-size: 91.66667%;\n      flex-basis: 91.66667%;\n  max-width: 91.66667%;\n}\n\n/* line 28, src/styles/components/_grid.scss */\n\n.row .col.s12 {\n  -ms-flex-preferred-size: 100%;\n      flex-basis: 100%;\n  max-width: 100%;\n}\n\n@media only screen and (min-width: 766px) {\n  /* line 43, src/styles/components/_grid.scss */\n\n  .row .col.m1 {\n    -ms-flex-preferred-size: 8.33333%;\n        flex-basis: 8.33333%;\n    max-width: 8.33333%;\n  }\n\n  /* line 43, src/styles/components/_grid.scss */\n\n  .row .col.m2 {\n    -ms-flex-preferred-size: 16.66667%;\n        flex-basis: 16.66667%;\n    max-width: 16.66667%;\n  }\n\n  /* line 43, src/styles/components/_grid.scss */\n\n  .row .col.m3 {\n    -ms-flex-preferred-size: 25%;\n        flex-basis: 25%;\n    max-width: 25%;\n  }\n\n  /* line 43, src/styles/components/_grid.scss */\n\n  .row .col.m4 {\n    -ms-flex-preferred-size: 33.33333%;\n        flex-basis: 33.33333%;\n    max-width: 33.33333%;\n  }\n\n  /* line 43, src/styles/components/_grid.scss */\n\n  .row .col.m5 {\n    -ms-flex-preferred-size: 41.66667%;\n        flex-basis: 41.66667%;\n    max-width: 41.66667%;\n  }\n\n  /* line 43, src/styles/components/_grid.scss */\n\n  .row .col.m6 {\n    -ms-flex-preferred-size: 50%;\n        flex-basis: 50%;\n    max-width: 50%;\n  }\n\n  /* line 43, src/styles/components/_grid.scss */\n\n  .row .col.m7 {\n    -ms-flex-preferred-size: 58.33333%;\n        flex-basis: 58.33333%;\n    max-width: 58.33333%;\n  }\n\n  /* line 43, src/styles/components/_grid.scss */\n\n  .row .col.m8 {\n    -ms-flex-preferred-size: 66.66667%;\n        flex-basis: 66.66667%;\n    max-width: 66.66667%;\n  }\n\n  /* line 43, src/styles/components/_grid.scss */\n\n  .row .col.m9 {\n    -ms-flex-preferred-size: 75%;\n        flex-basis: 75%;\n    max-width: 75%;\n  }\n\n  /* line 43, src/styles/components/_grid.scss */\n\n  .row .col.m10 {\n    -ms-flex-preferred-size: 83.33333%;\n        flex-basis: 83.33333%;\n    max-width: 83.33333%;\n  }\n\n  /* line 43, src/styles/components/_grid.scss */\n\n  .row .col.m11 {\n    -ms-flex-preferred-size: 91.66667%;\n        flex-basis: 91.66667%;\n    max-width: 91.66667%;\n  }\n\n  /* line 43, src/styles/components/_grid.scss */\n\n  .row .col.m12 {\n    -ms-flex-preferred-size: 100%;\n        flex-basis: 100%;\n    max-width: 100%;\n  }\n}\n\n@media only screen and (min-width: 1000px) {\n  /* line 59, src/styles/components/_grid.scss */\n\n  .row .col.l1 {\n    -ms-flex-preferred-size: 8.33333%;\n        flex-basis: 8.33333%;\n    max-width: 8.33333%;\n  }\n\n  /* line 59, src/styles/components/_grid.scss */\n\n  .row .col.l2 {\n    -ms-flex-preferred-size: 16.66667%;\n        flex-basis: 16.66667%;\n    max-width: 16.66667%;\n  }\n\n  /* line 59, src/styles/components/_grid.scss */\n\n  .row .col.l3 {\n    -ms-flex-preferred-size: 25%;\n        flex-basis: 25%;\n    max-width: 25%;\n  }\n\n  /* line 59, src/styles/components/_grid.scss */\n\n  .row .col.l4 {\n    -ms-flex-preferred-size: 33.33333%;\n        flex-basis: 33.33333%;\n    max-width: 33.33333%;\n  }\n\n  /* line 59, src/styles/components/_grid.scss */\n\n  .row .col.l5 {\n    -ms-flex-preferred-size: 41.66667%;\n        flex-basis: 41.66667%;\n    max-width: 41.66667%;\n  }\n\n  /* line 59, src/styles/components/_grid.scss */\n\n  .row .col.l6 {\n    -ms-flex-preferred-size: 50%;\n        flex-basis: 50%;\n    max-width: 50%;\n  }\n\n  /* line 59, src/styles/components/_grid.scss */\n\n  .row .col.l7 {\n    -ms-flex-preferred-size: 58.33333%;\n        flex-basis: 58.33333%;\n    max-width: 58.33333%;\n  }\n\n  /* line 59, src/styles/components/_grid.scss */\n\n  .row .col.l8 {\n    -ms-flex-preferred-size: 66.66667%;\n        flex-basis: 66.66667%;\n    max-width: 66.66667%;\n  }\n\n  /* line 59, src/styles/components/_grid.scss */\n\n  .row .col.l9 {\n    -ms-flex-preferred-size: 75%;\n        flex-basis: 75%;\n    max-width: 75%;\n  }\n\n  /* line 59, src/styles/components/_grid.scss */\n\n  .row .col.l10 {\n    -ms-flex-preferred-size: 83.33333%;\n        flex-basis: 83.33333%;\n    max-width: 83.33333%;\n  }\n\n  /* line 59, src/styles/components/_grid.scss */\n\n  .row .col.l11 {\n    -ms-flex-preferred-size: 91.66667%;\n        flex-basis: 91.66667%;\n    max-width: 91.66667%;\n  }\n\n  /* line 59, src/styles/components/_grid.scss */\n\n  .row .col.l12 {\n    -ms-flex-preferred-size: 100%;\n        flex-basis: 100%;\n    max-width: 100%;\n  }\n}\n\n/* line 69, src/styles/components/_grid.scss */\n\n.row.no-space {\n  margin-left: 0;\n  margin-right: 0;\n}\n\n/* line 73, src/styles/components/_grid.scss */\n\n.row.no-space > .col {\n  padding-left: 0;\n  padding-right: 0;\n}\n\n@font-face {\n  font-family: 'paway';\n  src: url(" + escape(__webpack_require__(/*! ../fonts/paway.eot */ 16)) + ");\n  src: url(" + escape(__webpack_require__(/*! ../fonts/paway.eot */ 16)) + ") format(\"embedded-opentype\"), url(" + escape(__webpack_require__(/*! ../fonts/paway.ttf */ 26)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(/*! ../fonts/paway.woff */ 27)) + ") format(\"woff\"), url(" + escape(__webpack_require__(/*! ../fonts/paway.svg */ 28)) + ") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n\n/* line 17, src/styles/components/_icons.scss */\n\n.i-circle:before {\n  content: \"\\F111\";\n}\n\n/* line 20, src/styles/components/_icons.scss */\n\n.i-google:before {\n  content: \"\\F1A0\";\n}\n\n/* line 23, src/styles/components/_icons.scss */\n\n.i-telegram:before {\n  content: \"\\F2C6\";\n}\n\n/* line 26, src/styles/components/_icons.scss */\n\n.i-reddit:before {\n  content: \"\\F281\";\n}\n\n/* line 29, src/styles/components/_icons.scss */\n\n.i-twitter:before {\n  content: \"\\F099\";\n}\n\n/* line 32, src/styles/components/_icons.scss */\n\n.i-github:before {\n  content: \"\\F09B\";\n}\n\n/* line 35, src/styles/components/_icons.scss */\n\n.i-linkedin:before {\n  content: \"\\F0E1\";\n}\n\n/* line 38, src/styles/components/_icons.scss */\n\n.i-youtube:before {\n  content: \"\\F16A\";\n}\n\n/* line 41, src/styles/components/_icons.scss */\n\n.i-stack-overflow:before {\n  content: \"\\F16C\";\n}\n\n/* line 44, src/styles/components/_icons.scss */\n\n.i-instagram:before {\n  content: \"\\F16D\";\n}\n\n/* line 47, src/styles/components/_icons.scss */\n\n.i-flickr:before {\n  content: \"\\F16E\";\n}\n\n/* line 50, src/styles/components/_icons.scss */\n\n.i-dribbble:before {\n  content: \"\\F17D\";\n}\n\n/* line 53, src/styles/components/_icons.scss */\n\n.i-behance:before {\n  content: \"\\F1B4\";\n}\n\n/* line 56, src/styles/components/_icons.scss */\n\n.i-spotify:before {\n  content: \"\\F1BC\";\n}\n\n/* line 59, src/styles/components/_icons.scss */\n\n.i-codepen:before {\n  content: \"\\F1CB\";\n}\n\n/* line 62, src/styles/components/_icons.scss */\n\n.i-facebook:before {\n  content: \"\\F230\";\n}\n\n/* line 65, src/styles/components/_icons.scss */\n\n.i-pinterest:before {\n  content: \"\\F231\";\n}\n\n/* line 68, src/styles/components/_icons.scss */\n\n.i-whatsapp:before {\n  content: \"\\F232\";\n}\n\n/* line 71, src/styles/components/_icons.scss */\n\n.i-snapchat:before {\n  content: \"\\F2AC\";\n}\n\n/* line 74, src/styles/components/_icons.scss */\n\n.i-tag:before {\n  content: \"\\E903\";\n}\n\n/* line 77, src/styles/components/_icons.scss */\n\n.i-warning:before {\n  content: \"\\E904\";\n}\n\n/* line 80, src/styles/components/_icons.scss */\n\n.i-arrow-left:before {\n  content: \"\\E905\";\n}\n\n/* line 83, src/styles/components/_icons.scss */\n\n.i-arrow-down:before {\n  content: \"\\E906\";\n}\n\n/* line 86, src/styles/components/_icons.scss */\n\n.i-arrow-right:before {\n  content: \"\\E907\";\n}\n\n/* line 89, src/styles/components/_icons.scss */\n\n.i-arrow-top:before {\n  content: \"\\E908\";\n}\n\n/* line 92, src/styles/components/_icons.scss */\n\n.i-send:before {\n  content: \"\\E909\";\n}\n\n/* line 95, src/styles/components/_icons.scss */\n\n.i-search:before {\n  content: \"\\E90A\";\n}\n\n/* line 98, src/styles/components/_icons.scss */\n\n.i-link:before {\n  content: \"\\E90B\";\n}\n\n/* line 101, src/styles/components/_icons.scss */\n\n.i-star:before {\n  content: \"\\E90C\";\n}\n\n/* line 104, src/styles/components/_icons.scss */\n\n.i-star-line:before {\n  content: \"\\E90D\";\n}\n\n/* line 107, src/styles/components/_icons.scss */\n\n.i-comments:before {\n  content: \"\\E900\";\n}\n\n/* line 110, src/styles/components/_icons.scss */\n\n.i-arrow_left:before {\n  content: \"\\E314\";\n}\n\n/* line 113, src/styles/components/_icons.scss */\n\n.i-arrow_right:before {\n  content: \"\\E315\";\n}\n\n/* line 116, src/styles/components/_icons.scss */\n\n.i-play:before {\n  content: \"\\E037\";\n}\n\n/* line 119, src/styles/components/_icons.scss */\n\n.i-photo:before {\n  content: \"\\E412\";\n}\n\n/* line 122, src/styles/components/_icons.scss */\n\n.i-location:before {\n  content: \"\\E8B4\";\n}\n\n/* line 125, src/styles/components/_icons.scss */\n\n.i-check-circle:before {\n  content: \"\\E86C\";\n}\n\n/* line 128, src/styles/components/_icons.scss */\n\n.i-close:before {\n  content: \"\\E5CD\";\n}\n\n/* line 131, src/styles/components/_icons.scss */\n\n.i-favorite:before {\n  content: \"\\E87D\";\n}\n\n/* line 134, src/styles/components/_icons.scss */\n\n.i-rss:before {\n  content: \"\\E0E5\";\n}\n\n/* line 137, src/styles/components/_icons.scss */\n\n.i-share:before {\n  content: \"\\E80D\";\n}\n\n/* line 1, src/styles/layouts/_header.scss */\n\n.header {\n  background: #fff;\n  color: #151515;\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n\n/* line 8, src/styles/layouts/_header.scss */\n\n.header-wrap {\n  height: 60px;\n}\n\n/* line 12, src/styles/layouts/_header.scss */\n\n.header-right {\n  width: 20%;\n}\n\n/* line 16, src/styles/layouts/_header.scss */\n\n.logo {\n  width: 20%;\n}\n\n/* line 19, src/styles/layouts/_header.scss */\n\n.logo-txt {\n  font-size: 36px;\n  font-weight: 700;\n  color: #151515;\n  line-height: 1;\n}\n\n/* line 28, src/styles/layouts/_header.scss */\n\n.search-toggle,\n.social-media > li {\n  font-size: 20px;\n  margin: 0 5px;\n}\n\n/* line 34, src/styles/layouts/_header.scss */\n\n.header .social-media span {\n  display: none;\n}\n\n/* line 37, src/styles/layouts/_header.scss */\n\n.navbar {\n  width: 60%;\n}\n\n/* line 43, src/styles/layouts/_header.scss */\n\n.navbar ul li {\n  margin: 0 14px;\n  font-size: 14px;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  font-weight: 700;\n}\n\n/* line 54, src/styles/layouts/_header.scss */\n\n.navbar ul > li > a {\n  padding: 16px 0;\n  color: #151515;\n  display: block;\n  position: relative;\n}\n\n/* line 60, src/styles/layouts/_header.scss */\n\n.navbar ul > li > a:hover {\n  color: #FF4F58;\n}\n\n/* line 1, src/styles/layouts/_footer.scss */\n\n.footer {\n  background-color: #000;\n  color: #fff;\n  text-align: center;\n}\n\n/* line 9, src/styles/layouts/_footer.scss */\n\n.subscribe {\n  width: 50%;\n  margin: 70px auto 0;\n}\n\n/* line 13, src/styles/layouts/_footer.scss */\n\n.subscribe-title {\n  font-style: italic;\n  font-weight: 400;\n  font-size: 2.25rem;\n}\n\n/* line 22, src/styles/layouts/_footer.scss */\n\n.subscribe .form-group {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n}\n\n/* line 24, src/styles/layouts/_footer.scss */\n\n.subscribe-description {\n  color: #999;\n  font-size: 1rem;\n  padding: 10px 0 30px 0;\n}\n\n/* line 30, src/styles/layouts/_footer.scss */\n\n.subscribe input {\n  background-color: #000;\n  border-radius: 25px 0 0 25px;\n  border: 2px solid #262626;\n  color: #fff;\n  font-size: 1rem;\n  font-style: normal;\n  font-weight: 400;\n  height: 50px;\n  letter-spacing: 0;\n  line-height: 1.5em;\n  padding: 10px 160px 10px 24px;\n  text-decoration: none;\n  text-transform: none;\n  width: 100%;\n}\n\n/* line 47, src/styles/layouts/_footer.scss */\n\n.subscribe button {\n  background-color: #ae9678;\n  border-radius: 0 25px 25px 0;\n  border: 0;\n  color: #fff;\n  cursor: pointer;\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: 1px;\n  padding: 0 2.3em 0 1.5em;\n  text-decoration: none;\n  text-transform: uppercase;\n  width: auto;\n}\n\n/* line 62, src/styles/layouts/_footer.scss */\n\n.subscribe button::before {\n  font-size: 24px;\n  margin-right: 5px;\n}\n\n/* line 67, src/styles/layouts/_footer.scss */\n\n.footer-social {\n  color: #fff;\n  margin: 70px auto 0;\n}\n\n/* line 71, src/styles/layouts/_footer.scss */\n\n.footer-social .social-media {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n\n/* line 75, src/styles/layouts/_footer.scss */\n\n.footer-social .social-media li {\n  margin-right: 70px;\n}\n\n/* line 78, src/styles/layouts/_footer.scss */\n\n.footer-social .social-media li:last-child {\n  margin-right: 0;\n}\n\n/* line 83, src/styles/layouts/_footer.scss */\n\n.footer-social .social-media span {\n  display: block;\n  color: #adadad;\n  margin-top: 0;\n  font-size: 14px;\n  line-height: 19px;\n  letter-spacing: .3px;\n}\n\n/* line 95, src/styles/layouts/_footer.scss */\n\n.copyright {\n  margin: 70px auto 0;\n  text-align: center;\n  font-size: 14px;\n  padding: 43px 0;\n  border-top: 1px solid #262626;\n  color: #adadad;\n  letter-spacing: .015em;\n}\n\n/* line 104, src/styles/layouts/_footer.scss */\n\n.copyright a {\n  color: #fff;\n}\n\n/* line 106, src/styles/layouts/_footer.scss */\n\n.copyright a:hover {\n  color: #ae9678;\n}\n\n/* line 1, src/styles/layouts/_story.scss */\n\n.story {\n  height: 30em;\n}\n\n/* line 5, src/styles/layouts/_story.scss */\n\n.story:hover .u-overlay {\n  background-color: rgba(0, 0, 0, 0.4);\n}\n\n/* line 8, src/styles/layouts/_story.scss */\n\n.sss {\n  color: #fff;\n  text-align: center;\n}\n\n/* line 12, src/styles/layouts/_story.scss */\n\n.sss-body {\n  padding: 10px 20px;\n}\n\n/* line 17, src/styles/layouts/_story.scss */\n\n.sss-title {\n  font-weight: 400;\n  font-size: 2.125rem;\n  line-height: 1.5em;\n}\n\n/* line 26, src/styles/layouts/_story.scss */\n\n.sss-excerpt {\n  font-size: 1.25rem;\n  font-style: italic;\n  font-weight: 400;\n  margin: 0 auto;\n  max-width: 1000px;\n  position: relative;\n}\n\n/* line 34, src/styles/layouts/_story.scss */\n\n.sss-excerpt::before {\n  content: \"\";\n  border-top: 2px solid #ae9678;\n  display: block;\n  margin: 18px auto 26px auto;\n  width: 10%;\n}\n\n/* line 44, src/styles/layouts/_story.scss */\n\n.sss-tag {\n  border-bottom: 1px solid rgba(255, 255, 255, 0.7);\n  padding-bottom: 2px;\n}\n\n/* line 48, src/styles/layouts/_story.scss */\n\n.sss-tag:hover {\n  border: none;\n}\n\n/* line 52, src/styles/layouts/_story.scss */\n\n.sss-meta {\n  margin-top: 20px;\n}\n\n/* line 55, src/styles/layouts/_story.scss */\n\n.sss-meta a:hover {\n  color: #ae9678;\n}\n\n/* line 69, src/styles/layouts/_story.scss */\n\n.ss12 .sss {\n  height: 40em;\n}\n\n/* line 72, src/styles/layouts/_story.scss */\n\n.ss12 .sss .sss-title {\n  font-size: 4rem;\n}\n\n/* line 76, src/styles/layouts/_story.scss */\n\n.ss12 .sss .sss-excerpt {\n  font-size: 24px;\n}\n\n/* line 79, src/styles/layouts/_story.scss */\n\n.point {\n  font-size: 5px;\n  padding: 0 5px;\n  vertical-align: middle;\n}\n\n/* line 2, src/styles/layouts/_post.scss */\n\n.post .sss {\n  height: 40em;\n}\n\n/* line 3, src/styles/layouts/_post.scss */\n\n.post .sss-title {\n  font-size: 4rem;\n}\n\n/* line 5, src/styles/layouts/_post.scss */\n\n.post-wrap {\n  width: 84%;\n  margin: 70px auto;\n}\n\n/* line 10, src/styles/layouts/_post.scss */\n\n.post-footer {\n  margin-top: 50px;\n}\n\n/* line 22, src/styles/layouts/_post.scss */\n\n.post-body a {\n  color: #FF4F58;\n  border-bottom: 1px solid #999;\n}\n\n/* line 26, src/styles/layouts/_post.scss */\n\n.post-body a:hover {\n  border: none;\n}\n\n/* line 29, src/styles/layouts/_post.scss */\n\n.post-body h1,\n.post-body h2,\n.post-body h3,\n.post-body h4,\n.post-body h5,\n.post-body h6,\n.post-body p,\n.post-body ol,\n.post-body ul,\n.post-body hr,\n.post-body pre,\n.post-body dl,\n.post-body blockquote,\n.post-body table,\n.post-body .kg-embed-card {\n  min-width: 100%;\n  margin-bottom: 24px;\n}\n\n/* line 35, src/styles/layouts/_post.scss */\n\n.post-body h1,\n.post-body h2,\n.post-body h3,\n.post-body h4,\n.post-body h5,\n.post-body h6 {\n  color: #151515;\n  margin-bottom: 5px;\n}\n\n/* line 37, src/styles/layouts/_post.scss */\n\n.post-body blockquote {\n  margin-bottom: 36px;\n}\n\n/* line 39, src/styles/layouts/_post.scss */\n\n.post-body ul,\n.post-body ol {\n  counter-reset: post;\n}\n\n/* line 45, src/styles/layouts/_post.scss */\n\n.post-body ul li,\n.post-body ol li {\n  margin-bottom: 5px;\n  margin-left: 30px;\n}\n\n/* line 50, src/styles/layouts/_post.scss */\n\n.post-body ul li::before,\n.post-body ol li::before {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  display: inline-block;\n  margin-left: -22px;\n  position: absolute;\n  text-align: right;\n}\n\n/* line 60, src/styles/layouts/_post.scss */\n\n.post-body ul > li::before {\n  content: \"\\2022\";\n  font-family: Georgia, Arial, system-ui;\n  -webkit-transform: scale(1.1);\n       -o-transform: scale(1.1);\n          transform: scale(1.1);\n}\n\n/* line 66, src/styles/layouts/_post.scss */\n\n.post-body ol > li::before {\n  content: counter(post) \".\";\n  counter-increment: post;\n  padding-right: 12px;\n}\n\n/* line 72, src/styles/layouts/_post.scss */\n\n.post-body > iframe,\n.post-body > img,\n.post-body > .video-responsive,\n.post-body .kg-image-card,\n.post-body .kg-gallery-card,\n.post-body .kg-card,\n.post-body .kg-embed-card {\n  margin-bottom: 24px;\n}\n\n/* line 86, src/styles/layouts/_post.scss */\n\n.post-tags-link {\n  border-radius: 30px;\n  display: inline-block;\n  font-size: 13px;\n  font-weight: 400;\n  height: 30px;\n  letter-spacing: 1px;\n  line-height: 30px;\n  margin: 0 5px 5px 0;\n  padding: 0 18px;\n  text-transform: uppercase;\n  vertical-align: middle;\n}\n\n/* line 105, src/styles/layouts/_post.scss */\n\n.post-share {\n  color: #000;\n}\n\n/* line 108, src/styles/layouts/_post.scss */\n\n.post-share-link {\n  font-size: 18px;\n  border-radius: 50%;\n  margin-left: 5px;\n  height: 40px;\n  width: 40px;\n  line-height: 40px;\n  text-align: center;\n}\n\n/* line 119, src/styles/layouts/_post.scss */\n\n.post-tags-link,\n.post-share-link {\n  background: #000;\n  color: #fff;\n}\n\n/* line 124, src/styles/layouts/_post.scss */\n\n.post-tags-link:hover,\n.post-share-link:hover {\n  background-color: #ae9678;\n}\n\n/* line 129, src/styles/layouts/_post.scss */\n\n.au {\n  width: 100%;\n  text-align: center;\n  margin: 60px auto 30px;\n  padding: 50px 30px 30px 30px;\n  border-top: 1px solid #f1f1f1;\n  /* stylelint-disable-next-line */\n}\n\n/* line 136, src/styles/layouts/_post.scss */\n\n.au-avatar {\n  width: 90px;\n  margin-bottom: 15px;\n}\n\n/* line 141, src/styles/layouts/_post.scss */\n\n.au-name {\n  color: #151515;\n  font-size: 2rem;\n}\n\n/* line 148, src/styles/layouts/_post.scss */\n\n.au-bio {\n  margin: 24px auto;\n  font-size: 1rem;\n  line-height: 1.5rem;\n  max-width: 750px;\n}\n\n/* line 156, src/styles/layouts/_post.scss */\n\n.au-meta li {\n  font-size: 12px;\n  color: #999;\n  font-weight: 500;\n  text-transform: uppercase;\n  display: inline-block;\n  letter-spacing: 1px;\n  /* stylelint-disable-next-line */\n}\n\n/* line 166, src/styles/layouts/_post.scss */\n\n.au-meta li:not(:last-child)::after {\n  content: \"/\";\n  margin-left: 6px;\n  color: #999;\n}\n\n/* line 173, src/styles/layouts/_post.scss */\n\n.au-meta li a {\n  color: #151515;\n  border-bottom: solid 1px #f1f1f1;\n}\n\n/* line 182, src/styles/layouts/_post.scss */\n\n.pn {\n  color: #fff;\n}\n\n/* line 186, src/styles/layouts/_post.scss */\n\n.pn-body {\n  height: 400px;\n  text-align: center;\n}\n\n/* line 191, src/styles/layouts/_post.scss */\n\n.pn-header {\n  padding: 20px 10px;\n}\n\n/* line 193, src/styles/layouts/_post.scss */\n\n.pn-title {\n  font-weight: 400;\n  font-size: 2rem;\n  line-height: 1.5em;\n}\n\n/* line 204, src/styles/layouts/_post.scss */\n\n.post-comments {\n  padding: 15px;\n  max-width: 950px;\n  margin: 24px auto;\n}\n\n/* line 213, src/styles/layouts/_post.scss */\n\n.kg-gallery-container {\n  max-width: 1040px;\n  width: 100vw;\n}\n\n/* line 226, src/styles/layouts/_post.scss */\n\n.kg-gallery-row:not(:first-of-type) {\n  margin: 0.75em 0 0 0;\n}\n\n/* line 230, src/styles/layouts/_post.scss */\n\n.kg-gallery-image img {\n  display: block;\n  margin: 0;\n  width: 100%;\n  height: 100%;\n}\n\n/* line 237, src/styles/layouts/_post.scss */\n\n.kg-gallery-image:not(:first-of-type) {\n  margin: 0 0 0 0.75em;\n}\n\n/* line 248, src/styles/layouts/_post.scss */\n\n.kg-embed-card {\n  max-width: 100%;\n}\n\n/* line 256, src/styles/layouts/_post.scss */\n\n.kg-width-full .kg-image {\n  max-width: 100vw;\n  padding: 0 20px;\n}\n\n/* line 257, src/styles/layouts/_post.scss */\n\n.kg-width-wide .kg-image {\n  max-width: 1040px;\n}\n\n/* line 1, src/styles/layouts/_search.scss */\n\n.search {\n  width: 100%;\n  height: 100vh;\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  padding-top: 6.25rem;\n  background: rgba(0, 0, 0, 0.9);\n  color: #fff;\n  -webkit-transition: all .3s;\n  -o-transition: all .3s;\n  transition: all .3s;\n}\n\n/* line 15, src/styles/layouts/_search.scss */\n\n.search-close {\n  position: absolute;\n  top: 60px;\n  right: 60px;\n  font-size: 3.5rem;\n  color: #999;\n}\n\n/* line 23, src/styles/layouts/_search.scss */\n\n.search-wrap {\n  max-width: 1280px;\n  margin: auto;\n  padding: 0 15px;\n}\n\n@media only screen and (min-width: 766px) {\n  /* line 23, src/styles/layouts/_search.scss */\n\n  .search-wrap {\n    width: 70%;\n  }\n}\n\n/* line 32, src/styles/layouts/_search.scss */\n\n.search-input {\n  background: none;\n  border: 0;\n  border-bottom: 2px solid #3c3c3c;\n  width: 100%;\n  color: #fff;\n  padding: 15px 15px 15px 0;\n  font-size: 2.5rem;\n  font-weight: 4000;\n  text-align: center;\n}\n\n/* line 44, src/styles/layouts/_search.scss */\n\n.search-results {\n  overflow: auto;\n  padding-top: 10px;\n  margin: 0 auto;\n}\n\n/* line 49, src/styles/layouts/_search.scss */\n\n.search-results a {\n  padding: 10px 20px;\n  background: #ae9678;\n  text-decoration: none;\n  display: block;\n  -webkit-transition: all .2s ease-in-out;\n  -o-transition: all .2s ease-in-out;\n  transition: all .2s ease-in-out;\n  border-top: 1px solid #c3ad91;\n}\n\n/* line 57, src/styles/layouts/_search.scss */\n\n.search-results a:hover {\n  background: #c3ad91;\n}\n\n/* line 62, src/styles/layouts/_search.scss */\n\nbody.is-search {\n  overflow: hidden;\n}\n\n", "", {"version":3,"sources":["/mnt/c/Users/Smigol/projects/paway/Projects/simply-dev/node_modules/normalize.css/normalize.css","/mnt/c/Users/Smigol/projects/paway/src/styles/main.scss","/mnt/c/Users/Smigol/projects/paway/src/styles/src/styles/common/_mixins.scss","/mnt/c/Users/Smigol/projects/paway/src/styles/src/styles/common/_global.scss","/mnt/c/Users/Smigol/projects/paway/src/styles/src/styles/common/_typography.scss","/mnt/c/Users/Smigol/projects/paway/src/styles/src/styles/common/_utilities.scss","/mnt/c/Users/Smigol/projects/paway/src/styles/src/styles/components/_grid.scss","/mnt/c/Users/Smigol/projects/paway/src/styles/src/styles/components/_icons.scss","/mnt/c/Users/Smigol/projects/paway/src/styles/src/styles/layouts/_header.scss","/mnt/c/Users/Smigol/projects/paway/src/styles/src/styles/layouts/_footer.scss","/mnt/c/Users/Smigol/projects/paway/src/styles/src/styles/layouts/_story.scss","/mnt/c/Users/Smigol/projects/paway/src/styles/src/styles/layouts/_post.scss","/mnt/c/Users/Smigol/projects/paway/src/styles/src/styles/layouts/_search.scss"],"names":[],"mappings":"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","file":"main.scss","sourcesContent":["/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n","/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\n/* line 11, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nhtml {\n  line-height: 1.15;\n  /* 1 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\n/* line 23, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\n/* line 31, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\n/* line 40, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\n/* line 53, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\n/* line 64, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\n/* line 76, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\n/* line 85, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\n/* line 95, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\n/* line 105, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\n/* line 116, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\n/* line 125, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\n/* line 133, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nsub {\n  bottom: -0.25em;\n}\n\n/* line 137, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\n/* line 148, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\n/* line 160, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\n/* line 176, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\n/* line 186, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\n/* line 195, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\n/* line 206, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\n/* line 218, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\n/* line 229, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\n/* line 240, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\n/* line 253, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\n/* line 261, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n/* line 270, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n/* line 280, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n/* line 290, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n/* line 299, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n/* line 308, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\n/* line 320, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\n/* line 328, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\n/* line 339, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n/* line 347, ../../Projects/simply-dev/node_modules/normalize.css/normalize.css */\n\n[hidden] {\n  display: none;\n}\n\n/* line 1, src/styles/common/_mixins.scss */\n\n[class^=\"i-\"]::before,\n[class*=\" i-\"]::before {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: 'paway' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: inherit;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n/* line 16, src/styles/common/_mixins.scss */\n\n.u-absolute0 {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n/* line 25, src/styles/common/_mixins.scss */\n\nbody,\nblockquote,\n.subscribe-title,\n.sss-title,\n.pn-title {\n  font-family: \"Playfair Display\", Whitney SSm A, Whitney SSm B, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif;\n}\n\n/* line 26, src/styles/common/_mixins.scss */\n\nfigcaption,\n.pagination,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\n.u-meta,\n.navbar ul li,\n.footer,\n.post-tags-link,\n.au-meta li {\n  font-family: \"Roboto\", Mercury SSm A, Mercury SSm B, Georgia, serif;\n}\n\n/* line 29, src/styles/common/_mixins.scss */\n\n.u-flex,\n.u-flexCenter,\n.u-flexContentCenter,\n.u-flexColumn,\n.u-flexColumnTop,\n.row,\n.navbar ul,\n.post-body,\n.kg-gallery-container,\n.kg-gallery-row,\n.kg-embed-card {\n  display: flex;\n}\n\n/* line 30, src/styles/common/_mixins.scss */\n\n.u-flexCenter,\n.u-flexContentCenter,\n.u-flexEnd,\n.post-body,\n.kg-embed-card {\n  align-items: center;\n}\n\n/* line 31, src/styles/common/_mixins.scss */\n\n.u-flexColumn,\n.u-flexColumnTop,\n.post-body,\n.kg-gallery-container,\n.kg-embed-card {\n  flex-direction: column;\n}\n\n/* line 32, src/styles/common/_mixins.scss */\n\n.row,\n.kg-gallery-row {\n  flex-direction: row;\n}\n\n/* line 34, src/styles/common/_mixins.scss */\n\n.u-flexContentCenter,\n.u-flexColumn,\n.kg-gallery-row {\n  justify-content: center;\n}\n\n/* line 1, src/styles/common/_global.scss */\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n/* line 5, src/styles/common/_global.scss */\n\nhtml {\n  box-sizing: border-box;\n  font-size: 16px;\n}\n\n/* line 10, src/styles/common/_global.scss */\n\na {\n  color: inherit;\n  text-decoration: none;\n  transition: all 0.3s ease-in-out 0s;\n}\n\n/* line 15, src/styles/common/_global.scss */\n\na:active,\na:hover {\n  outline: 0;\n}\n\n/* line 21, src/styles/common/_global.scss */\n\nbody {\n  background: #fff;\n  color: #505050;\n  font-size: 18px;\n  line-height: 1.8em;\n  overflow-x: hidden;\n  text-rendering: optimizeLegibility;\n}\n\n/* line 32, src/styles/common/_global.scss */\n\nblockquote {\n  border-left: 5px solid #151515;\n  color: #151515;\n  font-size: 1.5rem;\n  font-style: italic;\n  font-weight: 400;\n  line-height: 1.6em;\n  margin: 0;\n  padding-left: 20px;\n}\n\n/* line 44, src/styles/common/_global.scss */\n\nblockquote p:first-of-type {\n  margin-top: 0;\n}\n\n/* line 48, src/styles/common/_global.scss */\n\nfigure {\n  margin: 0;\n}\n\n/* line 52, src/styles/common/_global.scss */\n\nfigcaption {\n  text-align: center;\n  margin-top: 15px;\n  text-transform: none;\n  font-style: italic;\n  color: #999;\n  font-size: 15px;\n}\n\n/* line 63, src/styles/common/_global.scss */\n\nol,\nul {\n  list-style: none;\n  list-style-image: none;\n  margin: 0;\n  padding: 0;\n}\n\n/* line 70, src/styles/common/_global.scss */\n\nhr {\n  margin-top: 24px;\n  margin-bottom: 24px;\n  border: 0;\n  border-top: 1px solid #eee;\n}\n\n/* line 79, src/styles/common/_global.scss */\n\nkbd,\nsamp,\ncode {\n  background: #f0f0f0;\n  border-radius: 4px;\n  color: #333;\n  font-size: 15px;\n  padding: 3px;\n  white-space: pre-wrap;\n}\n\n/* line 88, src/styles/common/_global.scss */\n\npre {\n  background-color: #29292e;\n  border-radius: 4px;\n  font-size: 15px;\n  margin: 0;\n  max-width: 100%;\n  padding: 1rem;\n  word-wrap: normal;\n}\n\n/* line 97, src/styles/common/_global.scss */\n\npre code {\n  background: transparent;\n  color: #f8f8f2;\n  padding: 0;\n}\n\n/* line 104, src/styles/common/_global.scss */\n\nimg {\n  height: auto;\n  max-width: 100%;\n  vertical-align: middle;\n  width: auto;\n}\n\n/* line 110, src/styles/common/_global.scss */\n\nimg:not([src]) {\n  visibility: hidden;\n}\n\n/* line 115, src/styles/common/_global.scss */\n\ni {\n  vertical-align: middle;\n}\n\n/* line 121, src/styles/common/_global.scss */\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n  display: block;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  font-size: 1rem;\n  line-height: 1.5;\n  margin: 35px 0 0;\n  max-width: 100%;\n  overflow-x: auto;\n  white-space: nowrap;\n  width: auto;\n  -webkit-overflow-scrolling: touch;\n}\n\n/* line 136, src/styles/common/_global.scss */\n\ntable th,\ntable td {\n  padding: 6px 13px;\n  border: 1px solid #dfe2e5;\n}\n\n/* line 142, src/styles/common/_global.scss */\n\ntable tr:nth-child(2n) {\n  background-color: #f6f8fa;\n}\n\n/* line 146, src/styles/common/_global.scss */\n\ntable th {\n  letter-spacing: 0.2px;\n  text-transform: uppercase;\n  font-weight: 600;\n}\n\n/* line 154, src/styles/common/_global.scss */\n\n.pagination {\n  text-align: center;\n  margin: 70px 0;\n  font-weight: 500;\n  font-size: 1rem;\n  line-height: 1.4;\n}\n\n/* line 164, src/styles/common/_global.scss */\n\n.pagination > span {\n  margin: 0 10px;\n}\n\n/* line 166, src/styles/common/_global.scss */\n\n.pagination a {\n  color: #999;\n}\n\n/* line 169, src/styles/common/_global.scss */\n\n.pagination a:hover {\n  color: #505050;\n  border-bottom: 1px solid #999;\n}\n\n/* line 178, src/styles/common/_global.scss */\n\n.video-responsive {\n  display: block;\n  height: 0;\n  overflow: hidden;\n  padding: 0 0 56.25%;\n  position: relative;\n  width: 100%;\n}\n\n/* line 186, src/styles/common/_global.scss */\n\n.video-responsive iframe {\n  border: 0;\n  bottom: 0;\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n\n/* line 196, src/styles/common/_global.scss */\n\n.video-responsive video {\n  border: 0;\n  bottom: 0;\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n\n/* line 216, src/styles/common/_global.scss */\n\n.instagram-img {\n  height: 264px;\n}\n\n/* line 219, src/styles/common/_global.scss */\n\n.instagram-img img {\n  filter: brightness(65%);\n  transition: all .2s ease;\n}\n\n/* line 221, src/styles/common/_global.scss */\n\n.instagram-img:hover > img {\n  filter: brightness(90%);\n}\n\n/* line 224, src/styles/common/_global.scss */\n\n.instagram-name {\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 10;\n}\n\n/* line 231, src/styles/common/_global.scss */\n\n.instagram-btn {\n  background-color: #fff;\n  color: #000;\n  display: block;\n  font-weight: 600;\n  line-height: 1;\n  min-width: 200px;\n  padding: 10px;\n  text-align: center;\n}\n\n/* line 2, src/styles/common/_typography.scss */\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  color: inherit;\n  font-weight: 500;\n  line-height: 1.5em;\n  margin: 0;\n}\n\n/* line 11, src/styles/common/_typography.scss */\n\nh1 a,\nh2 a,\nh3 a,\nh4 a,\nh5 a,\nh6 a {\n  color: inherit;\n  line-height: inherit;\n}\n\n/* line 17, src/styles/common/_typography.scss */\n\nh1 {\n  font-size: 3rem;\n}\n\n/* line 18, src/styles/common/_typography.scss */\n\nh2 {\n  font-size: 2.875rem;\n}\n\n/* line 19, src/styles/common/_typography.scss */\n\nh3 {\n  font-size: 2.125rem;\n}\n\n/* line 20, src/styles/common/_typography.scss */\n\nh4 {\n  font-size: 1.875rem;\n}\n\n/* line 21, src/styles/common/_typography.scss */\n\nh5 {\n  font-size: 1.625rem;\n}\n\n/* line 22, src/styles/common/_typography.scss */\n\nh6 {\n  font-size: 1.375rem;\n}\n\n/* line 24, src/styles/common/_typography.scss */\n\np {\n  margin: 0;\n}\n\n/* line 1, src/styles/common/_utilities.scss */\n\n.u-image {\n  object-fit: cover;\n  height: 100%;\n  width: 100%;\n}\n\n/* line 7, src/styles/common/_utilities.scss */\n\n.u-hide {\n  display: none;\n}\n\n/* line 8, src/styles/common/_utilities.scss */\n\n.u-pointer {\n  cursor: pointer;\n}\n\n/* line 10, src/styles/common/_utilities.scss */\n\n.u-meta {\n  font-size: 12px;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  color: rgba(255, 255, 255, 0.7);\n  text-align: center;\n}\n\n/* line 20, src/styles/common/_utilities.scss */\n\n.u-round {\n  border-radius: 50%;\n}\n\n/* line 23, src/styles/common/_utilities.scss */\n\n.zindex1 {\n  z-index: 1;\n}\n\n/* line 24, src/styles/common/_utilities.scss */\n\n.zindex2 {\n  z-index: 2;\n}\n\n/* line 25, src/styles/common/_utilities.scss */\n\n.zindex3 {\n  z-index: 3;\n}\n\n/* line 26, src/styles/common/_utilities.scss */\n\n.zindex4 {\n  z-index: 4;\n}\n\n/* line 29, src/styles/common/_utilities.scss */\n\n.u-margin-0-15 {\n  margin: 0 15px;\n}\n\n/* line 32, src/styles/common/_utilities.scss */\n\n.u-relative {\n  position: relative;\n}\n\n/* line 33, src/styles/common/_utilities.scss */\n\n.u-absolute {\n  position: absolute;\n}\n\n/* line 35, src/styles/common/_utilities.scss */\n\n.u-fixed {\n  position: fixed;\n}\n\n/* line 37, src/styles/common/_utilities.scss */\n\n.u-block {\n  display: block;\n}\n\n/* line 38, src/styles/common/_utilities.scss */\n\n.u-inlineBlock {\n  display: inline-block;\n}\n\n/* line 41, src/styles/common/_utilities.scss */\n\n.u-overlay {\n  background-color: rgba(0, 0, 0, 0.6);\n  transition: all 0.3s ease;\n}\n\n/* line 62, src/styles/common/_utilities.scss */\n\n.u-flex1 {\n  flex: 1 1 auto;\n}\n\n/* line 63, src/styles/common/_utilities.scss */\n\n.u-flex0 {\n  flex: 0 0 auto;\n}\n\n/* line 64, src/styles/common/_utilities.scss */\n\n.u-flexWrap {\n  flex-wrap: wrap;\n}\n\n/* line 75, src/styles/common/_utilities.scss */\n\n.u-flexEnd {\n  justify-content: flex-end;\n}\n\n/* line 81, src/styles/common/_utilities.scss */\n\n.u-flexColumnTop {\n  justify-content: flex-start;\n}\n\n/* line 1, src/styles/components/_grid.scss */\n\n.container {\n  width: 100%;\n  max-width: 1170px;\n  margin: auto;\n}\n\n/* line 7, src/styles/components/_grid.scss */\n\n.row {\n  flex-wrap: wrap;\n  flex: 0 1 auto;\n  margin-left: -15px;\n  margin-right: -15px;\n}\n\n/* line 17, src/styles/components/_grid.scss */\n\n.row .col {\n  flex: 0 0 auto;\n  box-sizing: border-box;\n  padding-left: 15px;\n  padding-right: 15px;\n}\n\n/* line 28, src/styles/components/_grid.scss */\n\n.row .col.s1 {\n  flex-basis: 8.33333%;\n  max-width: 8.33333%;\n}\n\n/* line 28, src/styles/components/_grid.scss */\n\n.row .col.s2 {\n  flex-basis: 16.66667%;\n  max-width: 16.66667%;\n}\n\n/* line 28, src/styles/components/_grid.scss */\n\n.row .col.s3 {\n  flex-basis: 25%;\n  max-width: 25%;\n}\n\n/* line 28, src/styles/components/_grid.scss */\n\n.row .col.s4 {\n  flex-basis: 33.33333%;\n  max-width: 33.33333%;\n}\n\n/* line 28, src/styles/components/_grid.scss */\n\n.row .col.s5 {\n  flex-basis: 41.66667%;\n  max-width: 41.66667%;\n}\n\n/* line 28, src/styles/components/_grid.scss */\n\n.row .col.s6 {\n  flex-basis: 50%;\n  max-width: 50%;\n}\n\n/* line 28, src/styles/components/_grid.scss */\n\n.row .col.s7 {\n  flex-basis: 58.33333%;\n  max-width: 58.33333%;\n}\n\n/* line 28, src/styles/components/_grid.scss */\n\n.row .col.s8 {\n  flex-basis: 66.66667%;\n  max-width: 66.66667%;\n}\n\n/* line 28, src/styles/components/_grid.scss */\n\n.row .col.s9 {\n  flex-basis: 75%;\n  max-width: 75%;\n}\n\n/* line 28, src/styles/components/_grid.scss */\n\n.row .col.s10 {\n  flex-basis: 83.33333%;\n  max-width: 83.33333%;\n}\n\n/* line 28, src/styles/components/_grid.scss */\n\n.row .col.s11 {\n  flex-basis: 91.66667%;\n  max-width: 91.66667%;\n}\n\n/* line 28, src/styles/components/_grid.scss */\n\n.row .col.s12 {\n  flex-basis: 100%;\n  max-width: 100%;\n}\n\n@media only screen and (min-width: 766px) {\n  /* line 43, src/styles/components/_grid.scss */\n\n  .row .col.m1 {\n    flex-basis: 8.33333%;\n    max-width: 8.33333%;\n  }\n\n  /* line 43, src/styles/components/_grid.scss */\n\n  .row .col.m2 {\n    flex-basis: 16.66667%;\n    max-width: 16.66667%;\n  }\n\n  /* line 43, src/styles/components/_grid.scss */\n\n  .row .col.m3 {\n    flex-basis: 25%;\n    max-width: 25%;\n  }\n\n  /* line 43, src/styles/components/_grid.scss */\n\n  .row .col.m4 {\n    flex-basis: 33.33333%;\n    max-width: 33.33333%;\n  }\n\n  /* line 43, src/styles/components/_grid.scss */\n\n  .row .col.m5 {\n    flex-basis: 41.66667%;\n    max-width: 41.66667%;\n  }\n\n  /* line 43, src/styles/components/_grid.scss */\n\n  .row .col.m6 {\n    flex-basis: 50%;\n    max-width: 50%;\n  }\n\n  /* line 43, src/styles/components/_grid.scss */\n\n  .row .col.m7 {\n    flex-basis: 58.33333%;\n    max-width: 58.33333%;\n  }\n\n  /* line 43, src/styles/components/_grid.scss */\n\n  .row .col.m8 {\n    flex-basis: 66.66667%;\n    max-width: 66.66667%;\n  }\n\n  /* line 43, src/styles/components/_grid.scss */\n\n  .row .col.m9 {\n    flex-basis: 75%;\n    max-width: 75%;\n  }\n\n  /* line 43, src/styles/components/_grid.scss */\n\n  .row .col.m10 {\n    flex-basis: 83.33333%;\n    max-width: 83.33333%;\n  }\n\n  /* line 43, src/styles/components/_grid.scss */\n\n  .row .col.m11 {\n    flex-basis: 91.66667%;\n    max-width: 91.66667%;\n  }\n\n  /* line 43, src/styles/components/_grid.scss */\n\n  .row .col.m12 {\n    flex-basis: 100%;\n    max-width: 100%;\n  }\n}\n\n@media only screen and (min-width: 1000px) {\n  /* line 59, src/styles/components/_grid.scss */\n\n  .row .col.l1 {\n    flex-basis: 8.33333%;\n    max-width: 8.33333%;\n  }\n\n  /* line 59, src/styles/components/_grid.scss */\n\n  .row .col.l2 {\n    flex-basis: 16.66667%;\n    max-width: 16.66667%;\n  }\n\n  /* line 59, src/styles/components/_grid.scss */\n\n  .row .col.l3 {\n    flex-basis: 25%;\n    max-width: 25%;\n  }\n\n  /* line 59, src/styles/components/_grid.scss */\n\n  .row .col.l4 {\n    flex-basis: 33.33333%;\n    max-width: 33.33333%;\n  }\n\n  /* line 59, src/styles/components/_grid.scss */\n\n  .row .col.l5 {\n    flex-basis: 41.66667%;\n    max-width: 41.66667%;\n  }\n\n  /* line 59, src/styles/components/_grid.scss */\n\n  .row .col.l6 {\n    flex-basis: 50%;\n    max-width: 50%;\n  }\n\n  /* line 59, src/styles/components/_grid.scss */\n\n  .row .col.l7 {\n    flex-basis: 58.33333%;\n    max-width: 58.33333%;\n  }\n\n  /* line 59, src/styles/components/_grid.scss */\n\n  .row .col.l8 {\n    flex-basis: 66.66667%;\n    max-width: 66.66667%;\n  }\n\n  /* line 59, src/styles/components/_grid.scss */\n\n  .row .col.l9 {\n    flex-basis: 75%;\n    max-width: 75%;\n  }\n\n  /* line 59, src/styles/components/_grid.scss */\n\n  .row .col.l10 {\n    flex-basis: 83.33333%;\n    max-width: 83.33333%;\n  }\n\n  /* line 59, src/styles/components/_grid.scss */\n\n  .row .col.l11 {\n    flex-basis: 91.66667%;\n    max-width: 91.66667%;\n  }\n\n  /* line 59, src/styles/components/_grid.scss */\n\n  .row .col.l12 {\n    flex-basis: 100%;\n    max-width: 100%;\n  }\n}\n\n/* line 69, src/styles/components/_grid.scss */\n\n.row.no-space {\n  margin-left: 0;\n  margin-right: 0;\n}\n\n/* line 73, src/styles/components/_grid.scss */\n\n.row.no-space > .col {\n  padding-left: 0;\n  padding-right: 0;\n}\n\n@font-face {\n  font-family: 'paway';\n  src: url(\"../fonts/paway.eot\");\n  src: url(\"../fonts/paway.eot\") format(\"embedded-opentype\"), url(\"../fonts/paway.ttf\") format(\"truetype\"), url(\"../fonts/paway.woff\") format(\"woff\"), url(\"../fonts/paway.svg\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n\n/* line 17, src/styles/components/_icons.scss */\n\n.i-circle:before {\n  content: \"\\f111\";\n}\n\n/* line 20, src/styles/components/_icons.scss */\n\n.i-google:before {\n  content: \"\\f1a0\";\n}\n\n/* line 23, src/styles/components/_icons.scss */\n\n.i-telegram:before {\n  content: \"\\f2c6\";\n}\n\n/* line 26, src/styles/components/_icons.scss */\n\n.i-reddit:before {\n  content: \"\\f281\";\n}\n\n/* line 29, src/styles/components/_icons.scss */\n\n.i-twitter:before {\n  content: \"\\f099\";\n}\n\n/* line 32, src/styles/components/_icons.scss */\n\n.i-github:before {\n  content: \"\\f09b\";\n}\n\n/* line 35, src/styles/components/_icons.scss */\n\n.i-linkedin:before {\n  content: \"\\f0e1\";\n}\n\n/* line 38, src/styles/components/_icons.scss */\n\n.i-youtube:before {\n  content: \"\\f16a\";\n}\n\n/* line 41, src/styles/components/_icons.scss */\n\n.i-stack-overflow:before {\n  content: \"\\f16c\";\n}\n\n/* line 44, src/styles/components/_icons.scss */\n\n.i-instagram:before {\n  content: \"\\f16d\";\n}\n\n/* line 47, src/styles/components/_icons.scss */\n\n.i-flickr:before {\n  content: \"\\f16e\";\n}\n\n/* line 50, src/styles/components/_icons.scss */\n\n.i-dribbble:before {\n  content: \"\\f17d\";\n}\n\n/* line 53, src/styles/components/_icons.scss */\n\n.i-behance:before {\n  content: \"\\f1b4\";\n}\n\n/* line 56, src/styles/components/_icons.scss */\n\n.i-spotify:before {\n  content: \"\\f1bc\";\n}\n\n/* line 59, src/styles/components/_icons.scss */\n\n.i-codepen:before {\n  content: \"\\f1cb\";\n}\n\n/* line 62, src/styles/components/_icons.scss */\n\n.i-facebook:before {\n  content: \"\\f230\";\n}\n\n/* line 65, src/styles/components/_icons.scss */\n\n.i-pinterest:before {\n  content: \"\\f231\";\n}\n\n/* line 68, src/styles/components/_icons.scss */\n\n.i-whatsapp:before {\n  content: \"\\f232\";\n}\n\n/* line 71, src/styles/components/_icons.scss */\n\n.i-snapchat:before {\n  content: \"\\f2ac\";\n}\n\n/* line 74, src/styles/components/_icons.scss */\n\n.i-tag:before {\n  content: \"\\e903\";\n}\n\n/* line 77, src/styles/components/_icons.scss */\n\n.i-warning:before {\n  content: \"\\e904\";\n}\n\n/* line 80, src/styles/components/_icons.scss */\n\n.i-arrow-left:before {\n  content: \"\\e905\";\n}\n\n/* line 83, src/styles/components/_icons.scss */\n\n.i-arrow-down:before {\n  content: \"\\e906\";\n}\n\n/* line 86, src/styles/components/_icons.scss */\n\n.i-arrow-right:before {\n  content: \"\\e907\";\n}\n\n/* line 89, src/styles/components/_icons.scss */\n\n.i-arrow-top:before {\n  content: \"\\e908\";\n}\n\n/* line 92, src/styles/components/_icons.scss */\n\n.i-send:before {\n  content: \"\\e909\";\n}\n\n/* line 95, src/styles/components/_icons.scss */\n\n.i-search:before {\n  content: \"\\e90a\";\n}\n\n/* line 98, src/styles/components/_icons.scss */\n\n.i-link:before {\n  content: \"\\e90b\";\n}\n\n/* line 101, src/styles/components/_icons.scss */\n\n.i-star:before {\n  content: \"\\e90c\";\n}\n\n/* line 104, src/styles/components/_icons.scss */\n\n.i-star-line:before {\n  content: \"\\e90d\";\n}\n\n/* line 107, src/styles/components/_icons.scss */\n\n.i-comments:before {\n  content: \"\\e900\";\n}\n\n/* line 110, src/styles/components/_icons.scss */\n\n.i-arrow_left:before {\n  content: \"\\e314\";\n}\n\n/* line 113, src/styles/components/_icons.scss */\n\n.i-arrow_right:before {\n  content: \"\\e315\";\n}\n\n/* line 116, src/styles/components/_icons.scss */\n\n.i-play:before {\n  content: \"\\e037\";\n}\n\n/* line 119, src/styles/components/_icons.scss */\n\n.i-photo:before {\n  content: \"\\e412\";\n}\n\n/* line 122, src/styles/components/_icons.scss */\n\n.i-location:before {\n  content: \"\\e8b4\";\n}\n\n/* line 125, src/styles/components/_icons.scss */\n\n.i-check-circle:before {\n  content: \"\\e86c\";\n}\n\n/* line 128, src/styles/components/_icons.scss */\n\n.i-close:before {\n  content: \"\\e5cd\";\n}\n\n/* line 131, src/styles/components/_icons.scss */\n\n.i-favorite:before {\n  content: \"\\e87d\";\n}\n\n/* line 134, src/styles/components/_icons.scss */\n\n.i-rss:before {\n  content: \"\\e0e5\";\n}\n\n/* line 137, src/styles/components/_icons.scss */\n\n.i-share:before {\n  content: \"\\e80d\";\n}\n\n/* line 1, src/styles/layouts/_header.scss */\n\n.header {\n  background: #fff;\n  color: #151515;\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n\n/* line 8, src/styles/layouts/_header.scss */\n\n.header-wrap {\n  height: 60px;\n}\n\n/* line 12, src/styles/layouts/_header.scss */\n\n.header-right {\n  width: 20%;\n}\n\n/* line 16, src/styles/layouts/_header.scss */\n\n.logo {\n  width: 20%;\n}\n\n/* line 19, src/styles/layouts/_header.scss */\n\n.logo-txt {\n  font-size: 36px;\n  font-weight: 700;\n  color: #151515;\n  line-height: 1;\n}\n\n/* line 28, src/styles/layouts/_header.scss */\n\n.search-toggle,\n.social-media > li {\n  font-size: 20px;\n  margin: 0 5px;\n}\n\n/* line 34, src/styles/layouts/_header.scss */\n\n.header .social-media span {\n  display: none;\n}\n\n/* line 37, src/styles/layouts/_header.scss */\n\n.navbar {\n  width: 60%;\n}\n\n/* line 43, src/styles/layouts/_header.scss */\n\n.navbar ul li {\n  margin: 0 14px;\n  font-size: 14px;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  font-weight: 700;\n}\n\n/* line 54, src/styles/layouts/_header.scss */\n\n.navbar ul > li > a {\n  padding: 16px 0;\n  color: #151515;\n  display: block;\n  position: relative;\n}\n\n/* line 60, src/styles/layouts/_header.scss */\n\n.navbar ul > li > a:hover {\n  color: #FF4F58;\n}\n\n/* line 1, src/styles/layouts/_footer.scss */\n\n.footer {\n  background-color: #000;\n  color: #fff;\n  text-align: center;\n}\n\n/* line 9, src/styles/layouts/_footer.scss */\n\n.subscribe {\n  width: 50%;\n  margin: 70px auto 0;\n}\n\n/* line 13, src/styles/layouts/_footer.scss */\n\n.subscribe-title {\n  font-style: italic;\n  font-weight: 400;\n  font-size: 2.25rem;\n}\n\n/* line 22, src/styles/layouts/_footer.scss */\n\n.subscribe .form-group {\n  flex: 1 1 auto;\n}\n\n/* line 24, src/styles/layouts/_footer.scss */\n\n.subscribe-description {\n  color: #999;\n  font-size: 1rem;\n  padding: 10px 0 30px 0;\n}\n\n/* line 30, src/styles/layouts/_footer.scss */\n\n.subscribe input {\n  background-color: #000;\n  border-radius: 25px 0 0 25px;\n  border: 2px solid #262626;\n  color: #fff;\n  font-size: 1rem;\n  font-style: normal;\n  font-weight: 400;\n  height: 50px;\n  letter-spacing: 0;\n  line-height: 1.5em;\n  padding: 10px 160px 10px 24px;\n  text-decoration: none;\n  text-transform: none;\n  width: 100%;\n}\n\n/* line 47, src/styles/layouts/_footer.scss */\n\n.subscribe button {\n  background-color: #ae9678;\n  border-radius: 0 25px 25px 0;\n  border: 0;\n  color: #fff;\n  cursor: pointer;\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: 1px;\n  padding: 0 2.3em 0 1.5em;\n  text-decoration: none;\n  text-transform: uppercase;\n  width: auto;\n}\n\n/* line 62, src/styles/layouts/_footer.scss */\n\n.subscribe button::before {\n  font-size: 24px;\n  margin-right: 5px;\n}\n\n/* line 67, src/styles/layouts/_footer.scss */\n\n.footer-social {\n  color: #fff;\n  margin: 70px auto 0;\n}\n\n/* line 71, src/styles/layouts/_footer.scss */\n\n.footer-social .social-media {\n  justify-content: center;\n  align-items: center;\n}\n\n/* line 75, src/styles/layouts/_footer.scss */\n\n.footer-social .social-media li {\n  margin-right: 70px;\n}\n\n/* line 78, src/styles/layouts/_footer.scss */\n\n.footer-social .social-media li:last-child {\n  margin-right: 0;\n}\n\n/* line 83, src/styles/layouts/_footer.scss */\n\n.footer-social .social-media span {\n  display: block;\n  color: #adadad;\n  margin-top: 0;\n  font-size: 14px;\n  line-height: 19px;\n  letter-spacing: .3px;\n}\n\n/* line 95, src/styles/layouts/_footer.scss */\n\n.copyright {\n  margin: 70px auto 0;\n  text-align: center;\n  font-size: 14px;\n  padding: 43px 0;\n  border-top: 1px solid #262626;\n  color: #adadad;\n  letter-spacing: .015em;\n}\n\n/* line 104, src/styles/layouts/_footer.scss */\n\n.copyright a {\n  color: #fff;\n}\n\n/* line 106, src/styles/layouts/_footer.scss */\n\n.copyright a:hover {\n  color: #ae9678;\n}\n\n/* line 1, src/styles/layouts/_story.scss */\n\n.story {\n  height: 30em;\n}\n\n/* line 5, src/styles/layouts/_story.scss */\n\n.story:hover .u-overlay {\n  background-color: rgba(0, 0, 0, 0.4);\n}\n\n/* line 8, src/styles/layouts/_story.scss */\n\n.sss {\n  color: #fff;\n  text-align: center;\n}\n\n/* line 12, src/styles/layouts/_story.scss */\n\n.sss-body {\n  padding: 10px 20px;\n}\n\n/* line 17, src/styles/layouts/_story.scss */\n\n.sss-title {\n  font-weight: 400;\n  font-size: 2.125rem;\n  line-height: 1.5em;\n}\n\n/* line 26, src/styles/layouts/_story.scss */\n\n.sss-excerpt {\n  font-size: 1.25rem;\n  font-style: italic;\n  font-weight: 400;\n  margin: 0 auto;\n  max-width: 1000px;\n  position: relative;\n}\n\n/* line 34, src/styles/layouts/_story.scss */\n\n.sss-excerpt::before {\n  content: \"\";\n  border-top: 2px solid #ae9678;\n  display: block;\n  margin: 18px auto 26px auto;\n  width: 10%;\n}\n\n/* line 44, src/styles/layouts/_story.scss */\n\n.sss-tag {\n  border-bottom: 1px solid rgba(255, 255, 255, 0.7);\n  padding-bottom: 2px;\n}\n\n/* line 48, src/styles/layouts/_story.scss */\n\n.sss-tag:hover {\n  border: none;\n}\n\n/* line 52, src/styles/layouts/_story.scss */\n\n.sss-meta {\n  margin-top: 20px;\n}\n\n/* line 55, src/styles/layouts/_story.scss */\n\n.sss-meta a:hover {\n  color: #ae9678;\n}\n\n/* line 69, src/styles/layouts/_story.scss */\n\n.ss12 .sss {\n  height: 40em;\n}\n\n/* line 72, src/styles/layouts/_story.scss */\n\n.ss12 .sss .sss-title {\n  font-size: 4rem;\n}\n\n/* line 76, src/styles/layouts/_story.scss */\n\n.ss12 .sss .sss-excerpt {\n  font-size: 24px;\n}\n\n/* line 79, src/styles/layouts/_story.scss */\n\n.point {\n  font-size: 5px;\n  padding: 0 5px;\n  vertical-align: middle;\n}\n\n/* line 2, src/styles/layouts/_post.scss */\n\n.post .sss {\n  height: 40em;\n}\n\n/* line 3, src/styles/layouts/_post.scss */\n\n.post .sss-title {\n  font-size: 4rem;\n}\n\n/* line 5, src/styles/layouts/_post.scss */\n\n.post-wrap {\n  width: 84%;\n  margin: 70px auto;\n}\n\n/* line 10, src/styles/layouts/_post.scss */\n\n.post-footer {\n  margin-top: 50px;\n}\n\n/* line 22, src/styles/layouts/_post.scss */\n\n.post-body a {\n  color: #FF4F58;\n  border-bottom: 1px solid #999;\n}\n\n/* line 26, src/styles/layouts/_post.scss */\n\n.post-body a:hover {\n  border: none;\n}\n\n/* line 29, src/styles/layouts/_post.scss */\n\n.post-body h1,\n.post-body h2,\n.post-body h3,\n.post-body h4,\n.post-body h5,\n.post-body h6,\n.post-body p,\n.post-body ol,\n.post-body ul,\n.post-body hr,\n.post-body pre,\n.post-body dl,\n.post-body blockquote,\n.post-body table,\n.post-body .kg-embed-card {\n  min-width: 100%;\n  margin-bottom: 24px;\n}\n\n/* line 35, src/styles/layouts/_post.scss */\n\n.post-body h1,\n.post-body h2,\n.post-body h3,\n.post-body h4,\n.post-body h5,\n.post-body h6 {\n  color: #151515;\n  margin-bottom: 5px;\n}\n\n/* line 37, src/styles/layouts/_post.scss */\n\n.post-body blockquote {\n  margin-bottom: 36px;\n}\n\n/* line 39, src/styles/layouts/_post.scss */\n\n.post-body ul,\n.post-body ol {\n  counter-reset: post;\n}\n\n/* line 45, src/styles/layouts/_post.scss */\n\n.post-body ul li,\n.post-body ol li {\n  margin-bottom: 5px;\n  margin-left: 30px;\n}\n\n/* line 50, src/styles/layouts/_post.scss */\n\n.post-body ul li::before,\n.post-body ol li::before {\n  box-sizing: border-box;\n  display: inline-block;\n  margin-left: -22px;\n  position: absolute;\n  text-align: right;\n}\n\n/* line 60, src/styles/layouts/_post.scss */\n\n.post-body ul > li::before {\n  content: \"\\2022\";\n  font-family: Georgia, Arial, system-ui;\n  transform: scale(1.1);\n}\n\n/* line 66, src/styles/layouts/_post.scss */\n\n.post-body ol > li::before {\n  content: counter(post) \".\";\n  counter-increment: post;\n  padding-right: 12px;\n}\n\n/* line 72, src/styles/layouts/_post.scss */\n\n.post-body > iframe,\n.post-body > img,\n.post-body > .video-responsive,\n.post-body .kg-image-card,\n.post-body .kg-gallery-card,\n.post-body .kg-card,\n.post-body .kg-embed-card {\n  margin-bottom: 24px;\n}\n\n/* line 86, src/styles/layouts/_post.scss */\n\n.post-tags-link {\n  border-radius: 30px;\n  display: inline-block;\n  font-size: 13px;\n  font-weight: 400;\n  height: 30px;\n  letter-spacing: 1px;\n  line-height: 30px;\n  margin: 0 5px 5px 0;\n  padding: 0 18px;\n  text-transform: uppercase;\n  vertical-align: middle;\n}\n\n/* line 105, src/styles/layouts/_post.scss */\n\n.post-share {\n  color: #000;\n}\n\n/* line 108, src/styles/layouts/_post.scss */\n\n.post-share-link {\n  font-size: 18px;\n  border-radius: 50%;\n  margin-left: 5px;\n  height: 40px;\n  width: 40px;\n  line-height: 40px;\n  text-align: center;\n}\n\n/* line 119, src/styles/layouts/_post.scss */\n\n.post-tags-link,\n.post-share-link {\n  background: #000;\n  color: #fff;\n}\n\n/* line 124, src/styles/layouts/_post.scss */\n\n.post-tags-link:hover,\n.post-share-link:hover {\n  background-color: #ae9678;\n}\n\n/* line 129, src/styles/layouts/_post.scss */\n\n.au {\n  width: 100%;\n  text-align: center;\n  margin: 60px auto 30px;\n  padding: 50px 30px 30px 30px;\n  border-top: 1px solid #f1f1f1;\n  /* stylelint-disable-next-line */\n}\n\n/* line 136, src/styles/layouts/_post.scss */\n\n.au-avatar {\n  width: 90px;\n  margin-bottom: 15px;\n}\n\n/* line 141, src/styles/layouts/_post.scss */\n\n.au-name {\n  color: #151515;\n  font-size: 2rem;\n}\n\n/* line 148, src/styles/layouts/_post.scss */\n\n.au-bio {\n  margin: 24px auto;\n  font-size: 1rem;\n  line-height: 1.5rem;\n  max-width: 750px;\n}\n\n/* line 156, src/styles/layouts/_post.scss */\n\n.au-meta li {\n  font-size: 12px;\n  color: #999;\n  font-weight: 500;\n  text-transform: uppercase;\n  display: inline-block;\n  letter-spacing: 1px;\n  /* stylelint-disable-next-line */\n}\n\n/* line 166, src/styles/layouts/_post.scss */\n\n.au-meta li:not(:last-child)::after {\n  content: \"/\";\n  margin-left: 6px;\n  color: #999;\n}\n\n/* line 173, src/styles/layouts/_post.scss */\n\n.au-meta li a {\n  color: #151515;\n  border-bottom: solid 1px #f1f1f1;\n}\n\n/* line 182, src/styles/layouts/_post.scss */\n\n.pn {\n  color: #fff;\n}\n\n/* line 186, src/styles/layouts/_post.scss */\n\n.pn-body {\n  height: 400px;\n  text-align: center;\n}\n\n/* line 191, src/styles/layouts/_post.scss */\n\n.pn-header {\n  padding: 20px 10px;\n}\n\n/* line 193, src/styles/layouts/_post.scss */\n\n.pn-title {\n  font-weight: 400;\n  font-size: 2rem;\n  line-height: 1.5em;\n}\n\n/* line 204, src/styles/layouts/_post.scss */\n\n.post-comments {\n  padding: 15px;\n  max-width: 950px;\n  margin: 24px auto;\n}\n\n/* line 213, src/styles/layouts/_post.scss */\n\n.kg-gallery-container {\n  max-width: 1040px;\n  width: 100vw;\n}\n\n/* line 226, src/styles/layouts/_post.scss */\n\n.kg-gallery-row:not(:first-of-type) {\n  margin: 0.75em 0 0 0;\n}\n\n/* line 230, src/styles/layouts/_post.scss */\n\n.kg-gallery-image img {\n  display: block;\n  margin: 0;\n  width: 100%;\n  height: 100%;\n}\n\n/* line 237, src/styles/layouts/_post.scss */\n\n.kg-gallery-image:not(:first-of-type) {\n  margin: 0 0 0 0.75em;\n}\n\n/* line 248, src/styles/layouts/_post.scss */\n\n.kg-embed-card {\n  max-width: 100%;\n}\n\n/* line 256, src/styles/layouts/_post.scss */\n\n.kg-width-full .kg-image {\n  max-width: 100vw;\n  padding: 0 20px;\n}\n\n/* line 257, src/styles/layouts/_post.scss */\n\n.kg-width-wide .kg-image {\n  max-width: 1040px;\n}\n\n/* line 1, src/styles/layouts/_search.scss */\n\n.search {\n  width: 100%;\n  height: 100vh;\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  padding-top: 6.25rem;\n  background: rgba(0, 0, 0, 0.9);\n  color: #fff;\n  transition: all .3s;\n}\n\n/* line 15, src/styles/layouts/_search.scss */\n\n.search-close {\n  position: absolute;\n  top: 60px;\n  right: 60px;\n  font-size: 3.5rem;\n  color: #999;\n}\n\n/* line 23, src/styles/layouts/_search.scss */\n\n.search-wrap {\n  max-width: 1280px;\n  margin: auto;\n  padding: 0 15px;\n}\n\n@media only screen and (min-width: 766px) {\n  /* line 23, src/styles/layouts/_search.scss */\n\n  .search-wrap {\n    width: 70%;\n  }\n}\n\n/* line 32, src/styles/layouts/_search.scss */\n\n.search-input {\n  background: none;\n  border: 0;\n  border-bottom: 2px solid #3c3c3c;\n  width: 100%;\n  color: #fff;\n  padding: 15px 15px 15px 0;\n  font-size: 2.5rem;\n  font-weight: 4000;\n  text-align: center;\n}\n\n/* line 44, src/styles/layouts/_search.scss */\n\n.search-results {\n  overflow: auto;\n  padding-top: 10px;\n  margin: 0 auto;\n}\n\n/* line 49, src/styles/layouts/_search.scss */\n\n.search-results a {\n  padding: 10px 20px;\n  background: #ae9678;\n  text-decoration: none;\n  display: block;\n  transition: all .2s ease-in-out;\n  border-top: 1px solid #c3ad91;\n}\n\n/* line 57, src/styles/layouts/_search.scss */\n\n.search-results a:hover {\n  background: #c3ad91;\n}\n\n/* line 62, src/styles/layouts/_search.scss */\n\nbody.is-search {\n  overflow: hidden;\n}\n\n","%fonts-icons {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: 'paway' !important; //stylelint-disable-line\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: inherit;\n\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n%u-absolute0 {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n//  Fonts\n%primary-font { font-family: $primary-font }\n%secundary-font { font-family: $secundary-font }\n\n// flexbox\n%flex { display: flex }\n%flex-align-items-center { align-items: center }\n%flex-direction-column { flex-direction: column }\n%flex-direction-row { flex-direction: row }\n%flex-direction-wrap { flex-direction: wrap }\n%flex-justify-content-center { justify-content: center }\n","*, *::before, *::after {\n  box-sizing: border-box;\n}\n\nhtml {\n  box-sizing: border-box;\n  font-size: $font-size-root;\n}\n\na {\n  color: inherit;\n  text-decoration: none;\n  transition: all 0.3s ease-in-out 0s;\n\n  &:active,\n  &:hover {\n    outline: 0;\n  }\n}\n\nbody {\n  @extend %primary-font;\n\n  background: #fff;\n  color: $primary-text-color;\n  font-size: 18px;\n  line-height: 1.8em;\n  overflow-x: hidden;\n  text-rendering: optimizeLegibility;\n}\n\nblockquote {\n  @extend %primary-font;\n\n  border-left: 5px solid #151515;\n  color: #151515;\n  font-size: 1.5rem;\n  font-style: italic;\n  font-weight: 400;\n  line-height: 1.6em;\n  margin: 0;\n  padding-left: 20px;\n\n  p:first-of-type { margin-top: 0 }\n  // a { background-position: 0 1.07em !important } //stylelint-disable-line\n}\n\nfigure {\n  margin: 0;\n}\n\nfigcaption {\n  @extend %secundary-font;\n\n  text-align: center;\n  margin-top: 15px;\n  text-transform: none;\n  font-style: italic;\n  color: #999;\n  font-size: 15px;\n}\n\nol, ul {\n  list-style: none;\n  list-style-image: none;\n  margin: 0;\n  padding: 0;\n}\n\nhr {\n  margin-top: 24px;\n  margin-bottom: 24px;\n  border: 0;\n  border-top: 1px solid #eee;\n}\n\n// Code\n// ==========================================================================\nkbd, samp, code {\n  background: $code-bg-color;\n  border-radius: 4px;\n  color: $code-color;\n  font-size: $font-size-code;\n  padding: 3px;\n  white-space: pre-wrap;\n}\n\npre {\n  background-color: #29292e;\n  border-radius: 4px;\n  font-size: $font-size-code;\n  margin: 0;\n  max-width: 100%;\n  padding: 1rem;\n  word-wrap: normal;\n\n  code {\n    background: transparent;\n    color: $pre-code-color;\n    padding: 0;\n  }\n}\n\nimg {\n  height: auto;\n  max-width: 100%;\n  vertical-align: middle;\n  width: auto;\n\n  &:not([src]) {\n    visibility: hidden;\n  }\n}\n\ni {\n  // display: inline-block;\n  vertical-align: middle;\n}\n\n// Table\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n  display: block;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  font-size: 1rem;\n  line-height: 1.5;\n  margin: 35px 0 0;\n  max-width: 100%;\n  overflow-x: auto;\n  // vertical-align: top;\n  white-space: nowrap;\n  width: auto;\n  -webkit-overflow-scrolling: touch;\n\n  th,\n  td {\n    padding: 6px 13px;\n    border: 1px solid #dfe2e5;\n  }\n\n  tr:nth-child(2n) {\n    background-color: #f6f8fa;\n  }\n\n  th {\n    letter-spacing: 0.2px;\n    text-transform: uppercase;\n    font-weight: 600;\n  }\n}\n\n// Pagination\n.pagination {\n  @extend %secundary-font;\n\n  text-align: center;\n  margin: 70px 0;\n  font-weight: 500;\n  font-size: 1rem;\n  // letter-spacing: 1px;\n  line-height: 1.4;\n\n  & > span { margin: 0 10px }\n\n  a {\n    color: #999;\n\n    &:hover {\n      color: $primary-text-color;\n      border-bottom: 1px solid #999;\n    }\n  }\n}\n\n// Video Responsive\n// ==========================================================================\n.video-responsive {\n  display: block;\n  height: 0;\n  overflow: hidden;\n  padding: 0 0 56.25%;\n  position: relative;\n  width: 100%;\n\n  iframe {\n    border: 0;\n    bottom: 0;\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%;\n  }\n\n  video {\n    border: 0;\n    bottom: 0;\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%;\n  }\n}\n\n// Instagram Fedd\n// ==========================================================================\n.instagram {\n  // &-hover {\n  //   background-color: rgba(0, 0, 0, .3);\n  //   // transition: opacity 1s ease-in-out;\n  //   opacity: 0;\n  // }\n\n  &-img {\n    height: 264px;\n\n    img { filter: brightness(65%); transition: all .2s ease; }\n\n    &:hover > img { filter: brightness(90%) }\n  }\n\n  &-name {\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n    z-index: 10;\n  }\n\n  &-btn {\n    background-color: #fff;\n    color: #000;\n    display: block;\n    font-weight: 600;\n    line-height: 1;\n    min-width: 200px;\n    padding: 10px;\n    text-align: center;\n  }\n}\n","\nh1, h2, h3, h4, h5, h6 {\n  @extend %secundary-font;\n\n  color: $headings-color;\n  // font-family: $headings-font-family;\n  font-weight: $headings-font-weight;\n  line-height: $headings-line-height;\n  margin: 0;\n\n  a {\n    color: inherit;\n    line-height: inherit;\n  }\n}\n\nh1 { font-size: $font-size-h1; }\nh2 { font-size: $font-size-h2; }\nh3 { font-size: $font-size-h3; }\nh4 { font-size: $font-size-h4; }\nh5 { font-size: $font-size-h5; }\nh6 { font-size: $font-size-h6; }\n\np { margin: 0 }\n",".u-image {\n  object-fit: cover;\n  height: 100%;\n  width: 100%;\n}\n\n.u-hide { display: none }\n.u-pointer { cursor: pointer; }\n\n.u-meta {\n  @extend %secundary-font;\n\n  font-size: 12px;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  color: rgba(255, 255, 255, 0.7);\n  text-align: center;\n}\n\n.u-round { border-radius: 50% }\n\n// zindex\n.zindex1 { z-index: 1 }\n.zindex2 { z-index: 2 }\n.zindex3 { z-index: 3 }\n.zindex4 { z-index: 4 }\n\n// margin\n.u-margin-0-15 { margin: 0 15px }\n\n// Positions\n.u-relative { position: relative; }\n.u-absolute { position: absolute; }\n.u-absolute0 { @extend %u-absolute0; }\n.u-fixed { position: fixed }\n\n.u-block { display: block }\n.u-inlineBlock { display: inline-block }\n\n//  Background\n.u-overlay {\n  background-color: rgba(0, 0, 0, .6);\n  transition: all 0.3s ease;\n}\n// .u-bgGradient { background: linear-gradient(to bottom, rgba(0, 0, 0, .3) 29%, rgba(0, 0, 0, .7) 81%) }\n\n//  flex\n.u-flex { @extend %flex }\n\n.u-flexCenter {\n  @extend %flex;\n  @extend %flex-align-items-center;\n}\n\n.u-flexContentCenter {\n  @extend %flex;\n  @extend %flex-align-items-center;\n  @extend %flex-justify-content-center;\n}\n\n// .u-flex--1 { flex: 1 }\n.u-flex1 { flex: 1 1 auto; }\n.u-flex0 { flex: 0 0 auto; }\n.u-flexWrap { flex-wrap: wrap }\n\n.u-flexColumn {\n  @extend %flex;\n  @extend %flex-direction-column;\n  @extend %flex-justify-content-center;\n  // display: flex;\n  // flex-direction: column;\n  // justify-content: center;\n}\n\n.u-flexEnd {\n  @extend %flex-align-items-center;\n  // align-items: center;\n  justify-content: flex-end;\n}\n\n.u-flexColumnTop {\n  @extend %flex;\n  @extend %flex-direction-column;\n  // display: flex;\n  // flex-direction: column;\n  justify-content: flex-start;\n}\n",".container {\n  width: 100%;\n  max-width: 1170px;\n  margin: auto;\n}\n\n.row {\n  @extend %flex;\n  @extend %flex-direction-row;\n  // display: flex;\n  // flex-direction: row;\n  flex-wrap: wrap;\n  flex: 0 1 auto;\n  margin-left: - $container-gutter-width;\n  margin-right: - $container-gutter-width;\n\n  .col {\n    flex: 0 0 auto;\n    box-sizing: border-box;\n    padding-left: $container-gutter-width;\n    padding-right: $container-gutter-width;\n\n    $i: 1;\n\n    @while $i <= $num-cols {\n      $perc: unquote((100 / ($num-cols / $i)) + \"%\");\n\n      &.s#{$i} {\n        flex-basis: $perc;\n        max-width: $perc;\n      }\n\n      $i: $i + 1;\n    }\n\n    @media #{$md-and-up} {\n\n      $i: 1;\n\n      @while $i <= $num-cols {\n        $perc: unquote((100 / ($num-cols / $i)) + \"%\");\n\n        &.m#{$i} {\n          flex-basis: $perc;\n          max-width: $perc;\n        }\n\n        $i: $i + 1;\n      }\n    }\n\n    @media #{$lg-and-up} {\n\n      $i: 1;\n\n      @while $i <= $num-cols {\n        $perc: unquote((100 / ($num-cols / $i)) + \"%\");\n\n        &.l#{$i} {\n          flex-basis: $perc;\n          max-width: $perc;\n        }\n\n        $i: $i + 1;\n      }\n    }\n  }\n\n  &.no-space {\n    margin-left: 0;\n    margin-right: 0;\n\n    & > .col {\n      padding-left: 0;\n      padding-right: 0;\n    }\n  }\n}\n","// stylelint-disable\n@font-face {\n  font-family: 'paway';\n  src:  url('../fonts/paway.eot?9mlquk');\n  src:  url('../fonts/paway.eot?9mlquk#iefix') format('embedded-opentype'),\n    url('../fonts/paway.ttf?9mlquk') format('truetype'),\n    url('../fonts/paway.woff?9mlquk') format('woff'),\n    url('../fonts/paway.svg?9mlquk#paway') format('svg');\n  font-weight: normal;\n  font-style: normal;\n}\n\n[class^=\"i-\"]::before, [class*=\" i-\"]::before {\n  @extend %fonts-icons;\n}\n\n.i-circle:before {\n  content: \"\\f111\";\n}\n.i-google:before {\n  content: \"\\f1a0\";\n}\n.i-telegram:before {\n  content: \"\\f2c6\";\n}\n.i-reddit:before {\n  content: \"\\f281\";\n}\n.i-twitter:before {\n  content: \"\\f099\";\n}\n.i-github:before {\n  content: \"\\f09b\";\n}\n.i-linkedin:before {\n  content: \"\\f0e1\";\n}\n.i-youtube:before {\n  content: \"\\f16a\";\n}\n.i-stack-overflow:before {\n  content: \"\\f16c\";\n}\n.i-instagram:before {\n  content: \"\\f16d\";\n}\n.i-flickr:before {\n  content: \"\\f16e\";\n}\n.i-dribbble:before {\n  content: \"\\f17d\";\n}\n.i-behance:before {\n  content: \"\\f1b4\";\n}\n.i-spotify:before {\n  content: \"\\f1bc\";\n}\n.i-codepen:before {\n  content: \"\\f1cb\";\n}\n.i-facebook:before {\n  content: \"\\f230\";\n}\n.i-pinterest:before {\n  content: \"\\f231\";\n}\n.i-whatsapp:before {\n  content: \"\\f232\";\n}\n.i-snapchat:before {\n  content: \"\\f2ac\";\n}\n.i-tag:before {\n  content: \"\\e903\";\n}\n.i-warning:before {\n  content: \"\\e904\";\n}\n.i-arrow-left:before {\n  content: \"\\e905\";\n}\n.i-arrow-down:before {\n  content: \"\\e906\";\n}\n.i-arrow-right:before {\n  content: \"\\e907\";\n}\n.i-arrow-top:before {\n  content: \"\\e908\";\n}\n.i-send:before {\n  content: \"\\e909\";\n}\n.i-search:before {\n  content: \"\\e90a\";\n}\n.i-link:before {\n  content: \"\\e90b\";\n}\n.i-star:before {\n  content: \"\\e90c\";\n}\n.i-star-line:before {\n  content: \"\\e90d\";\n}\n.i-comments:before {\n  content: \"\\e900\";\n}\n.i-arrow_left:before {\n  content: \"\\e314\";\n}\n.i-arrow_right:before {\n  content: \"\\e315\";\n}\n.i-play:before {\n  content: \"\\e037\";\n}\n.i-photo:before {\n  content: \"\\e412\";\n}\n.i-location:before {\n  content: \"\\e8b4\";\n}\n.i-check-circle:before {\n  content: \"\\e86c\";\n}\n.i-close:before {\n  content: \"\\e5cd\";\n}\n.i-favorite:before {\n  content: \"\\e87d\";\n}\n.i-rss:before {\n  content: \"\\e0e5\";\n}\n.i-share:before {\n  content: \"\\e80d\";\n}\n",".header {\n  background: #fff;\n  color: #151515;\n  position: sticky;\n  top: 0;\n  z-index: 10;\n\n  &-wrap {\n    height: $header-height;\n  }\n\n  &-right { width: 20% }\n}\n\n// Logo\n.logo {\n  width: 20%;\n\n  &-txt {\n    font-size: 36px;\n    font-weight: 700;\n    color: #151515;\n    line-height: 1;\n  }\n}\n\n// Social media\n.search-toggle,\n.social-media > li {\n  font-size: 20px;\n  margin: 0 5px;\n}\n\n.header .social-media span { display: none }\n\n// Nav\n.navbar {\n  width: 60%;\n\n  ul {\n    @extend %flex;\n\n    li {\n      @extend %secundary-font;\n\n      margin: 0 14px;\n      font-size: 14px;\n      text-transform: uppercase;\n      letter-spacing: 1px;\n      font-weight: 700;\n    }\n  }\n\n  ul > li > a {\n    padding: 16px 0;\n    color: $header-color;\n    display: block;\n    position: relative;\n\n    &:hover {\n      color: $header-color-hover;\n    }\n  }\n}\n",".footer {\n  @extend %secundary-font;\n\n  background-color: #000;\n  color: #fff;\n  text-align: center;\n}\n\n.subscribe {\n  width: 50%;\n  margin: 70px auto 0;\n\n  &-title {\n    @extend %primary-font;\n\n    font-style: italic;\n    font-weight: 400;\n    font-size: 2.25rem\n  }\n\n  // Subscribe\n  .form-group { flex: 1 1 auto }\n\n  &-description {\n    color: #999;\n    font-size: 1rem;\n    padding: 10px 0 30px 0;\n  }\n\n  input {\n    background-color: #000;\n    border-radius: 25px 0 0 25px;\n    border: 2px solid #262626;\n    color: #fff;\n    font-size: 1rem;\n    font-style: normal;\n    font-weight: 400;\n    height: 50px;\n    letter-spacing: 0;\n    line-height: 1.5em;\n    padding: 10px 160px 10px 24px;\n    text-decoration: none;\n    text-transform: none;\n    width: 100%;\n  }\n\n  button {\n    background-color: #ae9678;\n    border-radius: 0 25px 25px 0;\n    border: 0;\n    color: #fff;\n    cursor: pointer;\n    font-size: 12px;\n    font-style: normal;\n    font-weight: 700;\n    letter-spacing: 1px;\n    padding: 0 2.3em 0 1.5em;\n    text-decoration: none;\n    text-transform: uppercase;\n    width: auto;\n\n    &::before { font-size: 24px; margin-right: 5px }\n  }\n}\n\n// Social Media\n.footer-social {\n  color: #fff;\n  margin: 70px auto 0;\n\n  .social-media {\n    justify-content: center;\n    align-items: center;\n\n    li {\n      margin-right: 70px;\n\n      &:last-child {\n        margin-right: 0\n      }\n    }\n\n    span {\n      display: block;\n      color: #adadad;\n      margin-top: 0;\n      font-size: 14px;\n      line-height: 19px;\n      letter-spacing: .3px;\n    }\n  }\n}\n\n// copyright\n.copyright {\n  margin: 70px auto 0;\n  text-align: center;\n  font-size: 14px;\n  padding: 43px 0;\n  border-top: 1px solid #262626;\n  color: #adadad;\n  letter-spacing: .015em;\n\n  a {\n    color: #fff;\n    &:hover { color: $color-text-3 }\n  }\n}\n",".story {\n  height: 30em;\n\n  // Hover\n  &:hover .u-overlay { background-color: rgba(0, 0, 0, .4) }\n}\n\n.sss {\n  color: #fff;\n  text-align: center;\n\n  &-body {\n    padding: 10px 20px;\n  }\n\n  // Title\n  &-title {\n    @extend %primary-font;\n    //\n    font-weight: 400;\n    font-size: 2.125rem;\n    line-height: 1.5em;\n  }\n\n  // Exerpt\n  &-excerpt {\n    font-size: 1.25rem;\n    font-style: italic;\n    font-weight: 400;\n    margin: 0 auto;\n    max-width: 1000px;\n    position: relative;\n\n    &::before {\n      content: \"\";\n      border-top: 2px solid $color-text-3;\n      display: block;\n      margin: 18px auto 26px auto;\n      width: 10%;\n    }\n  }\n\n  // tag\n  &-tag {\n    border-bottom: 1px solid rgba(255, 255, 255, 0.7);\n    padding-bottom: 2px;\n\n    &:hover { border: none }\n  }\n\n  // Meta\n  &-meta {\n    margin-top: 20px;\n\n    a:hover { color: $color-text-3 }\n  }\n}\n\n// .sss-meta,\n// .date {\n//   @extend %secundary-font;\n//   // font-family: $secundary-font;\n//   font-size: 12px;\n//   text-transform: uppercase;\n//   letter-spacing: 1px;\n//   color: rgba(255, 255, 255, 0.7);\n// }\n\n.ss12 .sss {\n  height: 40em;\n\n  .sss-title {\n    font-size: 4rem;\n  }\n\n  .sss-excerpt { font-size: 24px }\n}\n\n.point {\n  font-size: 5px;\n  padding: 0 5px;\n  vertical-align: middle;\n}\n",".post {\n  .sss { height: 40em }\n  .sss-title { font-size: 4rem }\n\n  &-wrap {\n    width: 84%;\n    margin: 70px auto;\n  }\n\n  &-footer {\n    margin-top: 50px;\n  }\n}\n\n// Post Content\n// ==========================================================================\n.post-body {\n  @extend %flex;\n  @extend %flex-direction-column;\n  @extend %flex-align-items-center;\n\n  a {\n    color: $secundary-text-color;\n    border-bottom: 1px solid #999;\n\n    &:hover { border: none }\n  }\n\n  h1, h2, h3, h4, h5, h6, p,\n  ol, ul, hr, pre, dl, blockquote, table, .kg-embed-card {\n    min-width: 100%;\n    margin-bottom: 24px;\n  }\n\n  h1, h2, h3, h4, h5, h6 { color: #151515; margin-bottom: 5px }\n\n  blockquote { margin-bottom: 36px }\n\n  ul,\n  ol {\n    counter-reset: post;\n    // margin-left: 30px;\n    // margin-top: 20px;\n\n    li {\n      // letter-spacing: -.003em;\n      margin-bottom: 5px;\n      margin-left: 30px;\n\n      &::before {\n        box-sizing: border-box;\n        display: inline-block;\n        margin-left: -22px;\n        position: absolute;\n        text-align: right;\n      }\n    }\n  }\n\n  ul > li::before {\n    content: \"\\2022\";\n    font-family: Georgia, Arial, system-ui; // stylelint-disable-line\n    transform: scale(1.1);\n  }\n\n  ol > li::before {\n    content: counter(post) \".\";\n    counter-increment: post;\n    padding-right: 12px;\n  }\n\n  & > iframe,\n  & > img,\n  & > .video-responsive,\n  .kg-image-card,\n  .kg-gallery-card,\n  .kg-card,\n  .kg-embed-card {\n    margin-bottom: 24px;\n  }\n}\n\n// Post Tags\n// ==========================================================================\n.post-tags {\n  &-link {\n    @extend %secundary-font;\n\n    border-radius: 30px;\n    display: inline-block;\n    font-size: 13px;\n    font-weight: 400;\n    height: 30px;\n    letter-spacing: 1px;\n    line-height: 30px;\n    margin: 0 5px 5px 0;\n    padding: 0 18px;\n    text-transform: uppercase;\n    vertical-align: middle;\n  }\n}\n\n// Post Share\n// ==========================================================================\n.post-share {\n  color: #000;\n\n  &-link {\n    font-size: 18px;\n    border-radius: 50%;\n    margin-left: 5px;\n    height: 40px;\n    width: 40px;\n    line-height: 40px;\n    text-align: center;\n  }\n}\n\n.post-tags-link,\n.post-share-link {\n  background: #000;\n  color: #fff;\n\n  &:hover { background-color: $color-text-3 }\n}\n\n// Post Author\n// ==========================================================================\n.au {\n  width: 100%;\n  text-align: center;\n  margin: 60px auto 30px;\n  padding: 50px 30px 30px 30px;\n  border-top: 1px solid #f1f1f1;\n\n  &-avatar {\n    width: 90px;\n    margin-bottom: 15px;\n  }\n\n  &-name {\n    // @extend %primary-font;\n\n    color: #151515;\n    font-size: 2rem;\n  }\n\n  &-bio {\n    margin: 24px auto;\n    font-size: 1rem;\n    line-height: 1.5rem;\n    max-width: 750px;\n  }\n\n  /* stylelint-disable-next-line */\n  &-meta li {\n    @extend %secundary-font;\n\n    font-size: 12px;\n    color: #999;\n    font-weight: 500;\n    text-transform: uppercase;\n    display: inline-block;\n    letter-spacing: 1px;\n\n    &:not(:last-child)::after {\n      content: \"/\";\n      margin-left: 6px;\n      color: #999;\n    }\n\n    /* stylelint-disable-next-line */\n    a {\n      color: #151515;\n      border-bottom: solid 1px #f1f1f1;\n    }\n  }\n}\n\n// Post Next Prev\n// ==========================================================================\n.pn {\n  color: #fff;\n  // width: calc(100% / 2 - 30px);\n\n  &-body {\n    height: 400px;\n    text-align: center;\n  }\n\n  &-header { padding: 20px 10px; }\n\n  &-title {\n    @extend %primary-font;\n    //\n    font-weight: 400;\n    font-size: 2rem;\n    line-height: 1.5em;\n  }\n}\n\n// Post Comments\n// ==========================================================================\n.post-comments {\n  padding: 15px;\n  max-width: 950px;\n  margin: 24px auto;\n}\n\n// Clases for box of ghost\n// ==========================================================================\n.kg-gallery {\n  &-container {\n    @extend %flex;\n    @extend %flex-direction-column;\n\n    max-width: 1040px;\n    width: 100vw;\n  }\n\n  &-row {\n    @extend %flex;\n    @extend %flex-direction-row;\n    @extend %flex-justify-content-center;\n\n    &:not(:first-of-type) { margin: 0.75em 0 0 0 }\n  }\n\n  &-image {\n    img {\n      display: block;\n      margin: 0;\n      width: 100%;\n      height: 100%;\n    }\n\n    &:not(:first-of-type) { margin: 0 0 0 0.75em }\n  }\n}\n\n// stylelint-disable-next-line\n.kg-embed-card, .kg-gallery-container {\n  @extend %flex;\n  @extend %flex-direction-column;\n}\n\n// stylelint-disable-next-line\n.kg-embed-card {\n  @extend %flex-align-items-center;\n\n  max-width: 100%;\n}\n\n// Image\n// ==========================================================================\n.kg-width-full .kg-image { max-width: 100vw; padding: 0 20px }\n.kg-width-wide .kg-image { max-width: 1040px }\n// .kg-width-full, .kg-width-wide { position: relative; z-index: 2; }\n",".search {\n  width: 100%;\n  height: 100vh;\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  padding-top: 6.25rem;\n  // display: none;\n  background: rgba(0, 0, 0, .9);\n  color: #fff;\n  transition: all .3s;\n\n  // Close\n  &-close {\n    position: absolute;\n    top: 60px;\n    right: 60px;\n    font-size: 3.5rem;\n    color: #999\n  }\n\n  &-wrap {\n    // width: 70%;\n    max-width: 1280px;\n    margin: auto;\n    padding: 0 15px;\n\n    @media #{$md-and-up} { width: 70% }\n  }\n\n  &-input {\n    background: none;\n    border: 0;\n    border-bottom: 2px solid #3c3c3c;\n    width: 100%;\n    color: #fff;\n    padding: 15px 15px 15px 0;\n    font-size: 2.5rem;\n    font-weight: 4000;\n    text-align: center;\n  }\n\n  &-results {\n    overflow: auto;\n    padding-top: 10px;\n    margin: 0 auto;\n\n    a {\n      padding: 10px 20px;\n      background: #ae9678;\n      text-decoration: none;\n      display: block;\n      transition: all .2s ease-in-out;\n      border-top: 1px solid #c3ad91;\n\n      &:hover { background: #c3ad91 }\n    }\n  }\n}\n\nbody.is-search { overflow: hidden; }\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 16 */
/*!*************************!*\
  !*** ./fonts/paway.eot ***!
  \*************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/paway.eot";

/***/ }),
/* 17 */,
/* 18 */
/*!****************************************************************************************!*\
  !*** multi ./build/util/../helpers/hmr-client.js ./scripts/main.js ./styles/main.scss ***!
  \****************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /mnt/c/Users/Smigol/projects/paway/src/build/util/../helpers/hmr-client.js */1);
__webpack_require__(/*! ./scripts/main.js */19);
module.exports = __webpack_require__(/*! ./styles/main.scss */23);


/***/ }),
/* 19 */
/*!*************************!*\
  !*** ./scripts/main.js ***!
  \*************************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lazysizes__ = __webpack_require__(/*! lazysizes */ 20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lazysizes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lazysizes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_app_instagram__ = __webpack_require__(/*! ./app/app.instagram */ 21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_social_media__ = __webpack_require__(/*! ./app/app.social-media */ 22);
/* global instagramFeed followSocialMedia */

// import external dependencies


// Impost App



document.addEventListener('DOMContentLoaded', function() {

  // Social Media
  if (typeof followSocialMedia === 'object' && followSocialMedia !== null) { Object(__WEBPACK_IMPORTED_MODULE_2__app_app_social_media__["a" /* default */])(followSocialMedia); }

  // Video Responsive
  // const hasClass = (el, cls) => el.className && new RegExp(`(\\s|^)${cls}(\\s|$)`).test(el.className);
  // const $body = document.querySelector('body');

  if (document.body.classList.contains('is-article')) {
    /* Iframe SRC video */
    var iframeVideo = [
      'iframe[src*="player.vimeo.com"]',
      'iframe[src*="dailymotion.com"]',
      'iframe[src*="youtube.com"]',
      'iframe[src*="youtube-nocookie.com"]',
      'iframe[src*="vid.me"]',
      'iframe[src*="kickstarter.com"][src*="video.html"]' ];

    // Select all Iframe
    var $allIframe = document.getElementById('post-body').querySelectorAll(iframeVideo.join(','));

    if($allIframe.length) {
      // Run Iframe
      $allIframe.forEach( function (el) {
        var parentForVideo = document.createElement('div');
        parentForVideo.className = 'video-responsive';
        el.parentNode.insertBefore(parentForVideo, el);
        parentForVideo.appendChild(el);
      });
    }
  }

  // Instagram Feed
  if (typeof instagramFeed === 'object' && instagramFeed !== null) {
    var url = "https://api.instagram.com/v1/users/" + (instagramFeed.userId) + "/media/recent/?access_token=" + (instagramFeed.token) + "&count=10&callback=?";
    var user = "<a href=\"https://www.instagram.com/" + (instagramFeed.userName) + "\" class=\"instagram-btn\" target=\"_blank\" rel=\"noopener noreferrer\"><i class=\"i-instagram\"></i> " + (instagramFeed.userName) + "</a>";

    if( window.innerWidth > 768 ){
      Object(__WEBPACK_IMPORTED_MODULE_1__app_app_instagram__["a" /* default */])(url, user);
    }
  }
});


/***/ }),
/* 20 */
/*!***********************************************************************************!*\
  !*** /mnt/c/Users/Smigol/Projects/simply-dev/node_modules/lazysizes/lazysizes.js ***!
  \***********************************************************************************/
/*! dynamic exports provided */
/***/ (function(module, exports) {

(function(window, factory) {
	var lazySizes = factory(window, window.document);
	window.lazySizes = lazySizes;
	if(typeof module == 'object' && module.exports){
		module.exports = lazySizes;
	}
}(window, function l(window, document) {
	'use strict';
	/*jshint eqnull:true */
	if(!document.getElementsByClassName){return;}

	var lazysizes, lazySizesConfig;

	var docElem = document.documentElement;

	var Date = window.Date;

	var supportPicture = window.HTMLPictureElement;

	var _addEventListener = 'addEventListener';

	var _getAttribute = 'getAttribute';

	var addEventListener = window[_addEventListener];

	var setTimeout = window.setTimeout;

	var requestAnimationFrame = window.requestAnimationFrame || setTimeout;

	var requestIdleCallback = window.requestIdleCallback;

	var regPicture = /^picture$/i;

	var loadEvents = ['load', 'error', 'lazyincluded', '_lazyloaded'];

	var regClassCache = {};

	var forEach = Array.prototype.forEach;

	var hasClass = function(ele, cls) {
		if(!regClassCache[cls]){
			regClassCache[cls] = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		}
		return regClassCache[cls].test(ele[_getAttribute]('class') || '') && regClassCache[cls];
	};

	var addClass = function(ele, cls) {
		if (!hasClass(ele, cls)){
			ele.setAttribute('class', (ele[_getAttribute]('class') || '').trim() + ' ' + cls);
		}
	};

	var removeClass = function(ele, cls) {
		var reg;
		if ((reg = hasClass(ele,cls))) {
			ele.setAttribute('class', (ele[_getAttribute]('class') || '').replace(reg, ' '));
		}
	};

	var addRemoveLoadEvents = function(dom, fn, add){
		var action = add ? _addEventListener : 'removeEventListener';
		if(add){
			addRemoveLoadEvents(dom, fn);
		}
		loadEvents.forEach(function(evt){
			dom[action](evt, fn);
		});
	};

	var triggerEvent = function(elem, name, detail, noBubbles, noCancelable){
		var event = document.createEvent('Event');

		if(!detail){
			detail = {};
		}

		detail.instance = lazysizes;

		event.initEvent(name, !noBubbles, !noCancelable);

		event.detail = detail;

		elem.dispatchEvent(event);
		return event;
	};

	var updatePolyfill = function (el, full){
		var polyfill;
		if( !supportPicture && ( polyfill = (window.picturefill || lazySizesConfig.pf) ) ){
			if(full && full.src && !el[_getAttribute]('srcset')){
				el.setAttribute('srcset', full.src);
			}
			polyfill({reevaluate: true, elements: [el]});
		} else if(full && full.src){
			el.src = full.src;
		}
	};

	var getCSS = function (elem, style){
		return (getComputedStyle(elem, null) || {})[style];
	};

	var getWidth = function(elem, parent, width){
		width = width || elem.offsetWidth;

		while(width < lazySizesConfig.minSize && parent && !elem._lazysizesWidth){
			width =  parent.offsetWidth;
			parent = parent.parentNode;
		}

		return width;
	};

	var rAF = (function(){
		var running, waiting;
		var firstFns = [];
		var secondFns = [];
		var fns = firstFns;

		var run = function(){
			var runFns = fns;

			fns = firstFns.length ? secondFns : firstFns;

			running = true;
			waiting = false;

			while(runFns.length){
				runFns.shift()();
			}

			running = false;
		};

		var rafBatch = function(fn, queue){
			if(running && !queue){
				fn.apply(this, arguments);
			} else {
				fns.push(fn);

				if(!waiting){
					waiting = true;
					(document.hidden ? setTimeout : requestAnimationFrame)(run);
				}
			}
		};

		rafBatch._lsFlush = run;

		return rafBatch;
	})();

	var rAFIt = function(fn, simple){
		return simple ?
			function() {
				rAF(fn);
			} :
			function(){
				var that = this;
				var args = arguments;
				rAF(function(){
					fn.apply(that, args);
				});
			}
		;
	};

	var throttle = function(fn){
		var running;
		var lastTime = 0;
		var gDelay = lazySizesConfig.throttleDelay;
		var rICTimeout = lazySizesConfig.ricTimeout;
		var run = function(){
			running = false;
			lastTime = Date.now();
			fn();
		};
		var idleCallback = requestIdleCallback && rICTimeout > 49 ?
			function(){
				requestIdleCallback(run, {timeout: rICTimeout});

				if(rICTimeout !== lazySizesConfig.ricTimeout){
					rICTimeout = lazySizesConfig.ricTimeout;
				}
			} :
			rAFIt(function(){
				setTimeout(run);
			}, true)
		;

		return function(isPriority){
			var delay;

			if((isPriority = isPriority === true)){
				rICTimeout = 33;
			}

			if(running){
				return;
			}

			running =  true;

			delay = gDelay - (Date.now() - lastTime);

			if(delay < 0){
				delay = 0;
			}

			if(isPriority || delay < 9){
				idleCallback();
			} else {
				setTimeout(idleCallback, delay);
			}
		};
	};

	//based on http://modernjavascript.blogspot.de/2013/08/building-better-debounce.html
	var debounce = function(func) {
		var timeout, timestamp;
		var wait = 99;
		var run = function(){
			timeout = null;
			func();
		};
		var later = function() {
			var last = Date.now() - timestamp;

			if (last < wait) {
				setTimeout(later, wait - last);
			} else {
				(requestIdleCallback || run)(run);
			}
		};

		return function() {
			timestamp = Date.now();

			if (!timeout) {
				timeout = setTimeout(later, wait);
			}
		};
	};

	(function(){
		var prop;

		var lazySizesDefaults = {
			lazyClass: 'lazyload',
			loadedClass: 'lazyloaded',
			loadingClass: 'lazyloading',
			preloadClass: 'lazypreload',
			errorClass: 'lazyerror',
			//strictClass: 'lazystrict',
			autosizesClass: 'lazyautosizes',
			srcAttr: 'data-src',
			srcsetAttr: 'data-srcset',
			sizesAttr: 'data-sizes',
			//preloadAfterLoad: false,
			minSize: 40,
			customMedia: {},
			init: true,
			expFactor: 1.5,
			hFac: 0.8,
			loadMode: 2,
			loadHidden: true,
			ricTimeout: 0,
			throttleDelay: 125,
		};

		lazySizesConfig = window.lazySizesConfig || window.lazysizesConfig || {};

		for(prop in lazySizesDefaults){
			if(!(prop in lazySizesConfig)){
				lazySizesConfig[prop] = lazySizesDefaults[prop];
			}
		}

		window.lazySizesConfig = lazySizesConfig;

		setTimeout(function(){
			if(lazySizesConfig.init){
				init();
			}
		});
	})();

	var loader = (function(){
		var preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;

		var eLvW, elvH, eLtop, eLleft, eLright, eLbottom, isBodyHidden;

		var regImg = /^img$/i;
		var regIframe = /^iframe$/i;

		var supportScroll = ('onscroll' in window) && !(/(gle|ing)bot/.test(navigator.userAgent));

		var shrinkExpand = 0;
		var currentExpand = 0;

		var isLoading = 0;
		var lowRuns = -1;

		var resetPreloading = function(e){
			isLoading--;
			if(e && e.target){
				addRemoveLoadEvents(e.target, resetPreloading);
			}

			if(!e || isLoading < 0 || !e.target){
				isLoading = 0;
			}
		};

		var isVisible = function (elem) {
			if (isBodyHidden == null) {
				isBodyHidden = getCSS(document.body, 'visibility') == 'hidden';
			}

			return isBodyHidden || (getCSS(elem.parentNode, 'visibility') != 'hidden' && getCSS(elem, 'visibility') != 'hidden');
		};

		var isNestedVisible = function(elem, elemExpand){
			var outerRect;
			var parent = elem;
			var visible = isVisible(elem);

			eLtop -= elemExpand;
			eLbottom += elemExpand;
			eLleft -= elemExpand;
			eLright += elemExpand;

			while(visible && (parent = parent.offsetParent) && parent != document.body && parent != docElem){
				visible = ((getCSS(parent, 'opacity') || 1) > 0);

				if(visible && getCSS(parent, 'overflow') != 'visible'){
					outerRect = parent.getBoundingClientRect();
					visible = eLright > outerRect.left &&
						eLleft < outerRect.right &&
						eLbottom > outerRect.top - 1 &&
						eLtop < outerRect.bottom + 1
					;
				}
			}

			return visible;
		};

		var checkElements = function() {
			var eLlen, i, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal,
				beforeExpandVal, defaultExpand, preloadExpand, hFac;
			var lazyloadElems = lazysizes.elements;

			if((loadMode = lazySizesConfig.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)){

				i = 0;

				lowRuns++;

				defaultExpand = (!lazySizesConfig.expand || lazySizesConfig.expand < 1) ?
					docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370 :
					lazySizesConfig.expand;

				preloadExpand = defaultExpand * lazySizesConfig.expFactor;
				hFac = lazySizesConfig.hFac;
				isBodyHidden = null;

				if(currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document.hidden){
					currentExpand = preloadExpand;
					lowRuns = 0;
				} else if(loadMode > 1 && lowRuns > 1 && isLoading < 6){
					currentExpand = defaultExpand;
				} else {
					currentExpand = shrinkExpand;
				}

				for(; i < eLlen; i++){

					if(!lazyloadElems[i] || lazyloadElems[i]._lazyRace){continue;}

					if(!supportScroll){unveilElement(lazyloadElems[i]);continue;}

					if(!(elemExpandVal = lazyloadElems[i][_getAttribute]('data-expand')) || !(elemExpand = elemExpandVal * 1)){
						elemExpand = currentExpand;
					}

					if(beforeExpandVal !== elemExpand){
						eLvW = innerWidth + (elemExpand * hFac);
						elvH = innerHeight + elemExpand;
						elemNegativeExpand = elemExpand * -1;
						beforeExpandVal = elemExpand;
					}

					rect = lazyloadElems[i].getBoundingClientRect();

					if ((eLbottom = rect.bottom) >= elemNegativeExpand &&
						(eLtop = rect.top) <= elvH &&
						(eLright = rect.right) >= elemNegativeExpand * hFac &&
						(eLleft = rect.left) <= eLvW &&
						(eLbottom || eLright || eLleft || eLtop) &&
						(lazySizesConfig.loadHidden || isVisible(lazyloadElems[i])) &&
						((isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4)) || isNestedVisible(lazyloadElems[i], elemExpand))){
						unveilElement(lazyloadElems[i]);
						loadedSomething = true;
						if(isLoading > 9){break;}
					} else if(!loadedSomething && isCompleted && !autoLoadElem &&
						isLoading < 4 && lowRuns < 4 && loadMode > 2 &&
						(preloadElems[0] || lazySizesConfig.preloadAfterLoad) &&
						(preloadElems[0] || (!elemExpandVal && ((eLbottom || eLright || eLleft || eLtop) || lazyloadElems[i][_getAttribute](lazySizesConfig.sizesAttr) != 'auto')))){
						autoLoadElem = preloadElems[0] || lazyloadElems[i];
					}
				}

				if(autoLoadElem && !loadedSomething){
					unveilElement(autoLoadElem);
				}
			}
		};

		var throttledCheckElements = throttle(checkElements);

		var switchLoadingClass = function(e){
			addClass(e.target, lazySizesConfig.loadedClass);
			removeClass(e.target, lazySizesConfig.loadingClass);
			addRemoveLoadEvents(e.target, rafSwitchLoadingClass);
			triggerEvent(e.target, 'lazyloaded');
		};
		var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);
		var rafSwitchLoadingClass = function(e){
			rafedSwitchLoadingClass({target: e.target});
		};

		var changeIframeSrc = function(elem, src){
			try {
				elem.contentWindow.location.replace(src);
			} catch(e){
				elem.src = src;
			}
		};

		var handleSources = function(source){
			var customMedia;

			var sourceSrcset = source[_getAttribute](lazySizesConfig.srcsetAttr);

			if( (customMedia = lazySizesConfig.customMedia[source[_getAttribute]('data-media') || source[_getAttribute]('media')]) ){
				source.setAttribute('media', customMedia);
			}

			if(sourceSrcset){
				source.setAttribute('srcset', sourceSrcset);
			}
		};

		var lazyUnveil = rAFIt(function (elem, detail, isAuto, sizes, isImg){
			var src, srcset, parent, isPicture, event, firesLoad;

			if(!(event = triggerEvent(elem, 'lazybeforeunveil', detail)).defaultPrevented){

				if(sizes){
					if(isAuto){
						addClass(elem, lazySizesConfig.autosizesClass);
					} else {
						elem.setAttribute('sizes', sizes);
					}
				}

				srcset = elem[_getAttribute](lazySizesConfig.srcsetAttr);
				src = elem[_getAttribute](lazySizesConfig.srcAttr);

				if(isImg) {
					parent = elem.parentNode;
					isPicture = parent && regPicture.test(parent.nodeName || '');
				}

				firesLoad = detail.firesLoad || (('src' in elem) && (srcset || src || isPicture));

				event = {target: elem};

				if(firesLoad){
					addRemoveLoadEvents(elem, resetPreloading, true);
					clearTimeout(resetPreloadingTimer);
					resetPreloadingTimer = setTimeout(resetPreloading, 2500);

					addClass(elem, lazySizesConfig.loadingClass);
					addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
				}

				if(isPicture){
					forEach.call(parent.getElementsByTagName('source'), handleSources);
				}

				if(srcset){
					elem.setAttribute('srcset', srcset);
				} else if(src && !isPicture){
					if(regIframe.test(elem.nodeName)){
						changeIframeSrc(elem, src);
					} else {
						elem.src = src;
					}
				}

				if(isImg && (srcset || isPicture)){
					updatePolyfill(elem, {src: src});
				}
			}

			if(elem._lazyRace){
				delete elem._lazyRace;
			}
			removeClass(elem, lazySizesConfig.lazyClass);

			rAF(function(){
				if( !firesLoad || (elem.complete && elem.naturalWidth > 1)){
					if(firesLoad){
						resetPreloading(event);
					} else {
						isLoading--;
					}
					switchLoadingClass(event);
				}
			}, true);
		});

		var unveilElement = function (elem){
			var detail;

			var isImg = regImg.test(elem.nodeName);

			//allow using sizes="auto", but don't use. it's invalid. Use data-sizes="auto" or a valid value for sizes instead (i.e.: sizes="80vw")
			var sizes = isImg && (elem[_getAttribute](lazySizesConfig.sizesAttr) || elem[_getAttribute]('sizes'));
			var isAuto = sizes == 'auto';

			if( (isAuto || !isCompleted) && isImg && (elem[_getAttribute]('src') || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesConfig.errorClass) && hasClass(elem, lazySizesConfig.lazyClass)){return;}

			detail = triggerEvent(elem, 'lazyunveilread').detail;

			if(isAuto){
				 autoSizer.updateElem(elem, true, elem.offsetWidth);
			}

			elem._lazyRace = true;
			isLoading++;

			lazyUnveil(elem, detail, isAuto, sizes, isImg);
		};

		var onload = function(){
			if(isCompleted){return;}
			if(Date.now() - started < 999){
				setTimeout(onload, 999);
				return;
			}
			var afterScroll = debounce(function(){
				lazySizesConfig.loadMode = 3;
				throttledCheckElements();
			});

			isCompleted = true;

			lazySizesConfig.loadMode = 3;

			throttledCheckElements();

			addEventListener('scroll', function(){
				if(lazySizesConfig.loadMode == 3){
					lazySizesConfig.loadMode = 2;
				}
				afterScroll();
			}, true);
		};

		return {
			_: function(){
				started = Date.now();

				lazysizes.elements = document.getElementsByClassName(lazySizesConfig.lazyClass);
				preloadElems = document.getElementsByClassName(lazySizesConfig.lazyClass + ' ' + lazySizesConfig.preloadClass);

				addEventListener('scroll', throttledCheckElements, true);

				addEventListener('resize', throttledCheckElements, true);

				if(window.MutationObserver){
					new MutationObserver( throttledCheckElements ).observe( docElem, {childList: true, subtree: true, attributes: true} );
				} else {
					docElem[_addEventListener]('DOMNodeInserted', throttledCheckElements, true);
					docElem[_addEventListener]('DOMAttrModified', throttledCheckElements, true);
					setInterval(throttledCheckElements, 999);
				}

				addEventListener('hashchange', throttledCheckElements, true);

				//, 'fullscreenchange'
				['focus', 'mouseover', 'click', 'load', 'transitionend', 'animationend', 'webkitAnimationEnd'].forEach(function(name){
					document[_addEventListener](name, throttledCheckElements, true);
				});

				if((/d$|^c/.test(document.readyState))){
					onload();
				} else {
					addEventListener('load', onload);
					document[_addEventListener]('DOMContentLoaded', throttledCheckElements);
					setTimeout(onload, 20000);
				}

				if(lazysizes.elements.length){
					checkElements();
					rAF._lsFlush();
				} else {
					throttledCheckElements();
				}
			},
			checkElems: throttledCheckElements,
			unveil: unveilElement
		};
	})();


	var autoSizer = (function(){
		var autosizesElems;

		var sizeElement = rAFIt(function(elem, parent, event, width){
			var sources, i, len;
			elem._lazysizesWidth = width;
			width += 'px';

			elem.setAttribute('sizes', width);

			if(regPicture.test(parent.nodeName || '')){
				sources = parent.getElementsByTagName('source');
				for(i = 0, len = sources.length; i < len; i++){
					sources[i].setAttribute('sizes', width);
				}
			}

			if(!event.detail.dataAttr){
				updatePolyfill(elem, event.detail);
			}
		});
		var getSizeElement = function (elem, dataAttr, width){
			var event;
			var parent = elem.parentNode;

			if(parent){
				width = getWidth(elem, parent, width);
				event = triggerEvent(elem, 'lazybeforesizes', {width: width, dataAttr: !!dataAttr});

				if(!event.defaultPrevented){
					width = event.detail.width;

					if(width && width !== elem._lazysizesWidth){
						sizeElement(elem, parent, event, width);
					}
				}
			}
		};

		var updateElementsSizes = function(){
			var i;
			var len = autosizesElems.length;
			if(len){
				i = 0;

				for(; i < len; i++){
					getSizeElement(autosizesElems[i]);
				}
			}
		};

		var debouncedUpdateElementsSizes = debounce(updateElementsSizes);

		return {
			_: function(){
				autosizesElems = document.getElementsByClassName(lazySizesConfig.autosizesClass);
				addEventListener('resize', debouncedUpdateElementsSizes);
			},
			checkElems: debouncedUpdateElementsSizes,
			updateElem: getSizeElement
		};
	})();

	var init = function(){
		if(!init.i){
			init.i = true;
			autoSizer._();
			loader._();
		}
	};

	lazysizes = {
		cfg: lazySizesConfig,
		autoSizer: autoSizer,
		loader: loader,
		init: init,
		uP: updatePolyfill,
		aC: addClass,
		rC: removeClass,
		hC: hasClass,
		fire: triggerEvent,
		gW: getWidth,
		rAF: rAF,
	};

	return lazysizes;
}
));


/***/ }),
/* 21 */
/*!**************************************!*\
  !*** ./scripts/app/app.instagram.js ***!
  \**************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// user id => 1397790551
// token => 1397790551.1aa422d.37dca7d33ba34544941e111aa03e85c7
// user nname => GodoFredoNinja
// http://instagram.com/oauth/authorize/?client_id=YOURCLIENTIDHERE&redirect_uri=HTTP://YOURREDIRECTURLHERE.COM&response_type=token

/* Template for images */
var templateInstagram = function (data) {
  return ("<div class=\"instagram-col col s6 m4 l2\">\n  <a href=\"" + (data.link) + "\" class=\"instagram-img u-relative u-block\" target=\"_blank\" rel=\"noopener noreferrer\">\n    <img class=\"u-absolute u-image u-block lazyload\" data-src=\"" + (data.images.standard_resolution.url) + "\"/>\n  </a>\n</div>")
}

// Shuffle Array
var shuffleInstagram = function (arr) { return arr
  .map(function (a) { return [Math.random(), a]; })
  .sort(function (a, b) { return a[0] - b[0]; })
  .map(function (a) { return a[1]; }); };

// Display Instagram Images
var displayInstagram = function (res, user) {
  var shuffle = shuffleInstagram(res.data);
  var sf = shuffle.slice(0, 6);

  document.querySelector('.instagram').classList.remove('u-hide');
  var box = document.querySelector('.instagram-wrap');
  document.querySelector('.instagram-name').innerHTML= user;
  // document.querySelector('.instagram-name').appendChild(user);

  sf.map(function (img) {
    var images = templateInstagram(img);
    box.innerHTML += images;
  });
}

/* harmony default export */ __webpack_exports__["a"] = (function (url, user) {
  // $.get(url).done(function (data){
  //   console.log('posts', data.data);
  // }).fail(function (err){
  //   console.log(err);
  // });

  fetch(url)
  .then(function (response) { return response.json(); })
  .then(function (resource) { return displayInstagram(resource, user); })
  .catch( function () { return document.querySelector('.instagram').remove(); });
  // .catch(error => console.log(error))
});


/***/ }),
/* 22 */
/*!*****************************************!*\
  !*** ./scripts/app/app.social-media.js ***!
  \*****************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (links) {
  var urlRegexp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \+\.-]*)*\/?$/; // eslint-disable-line
  var templateSocialMedia = function (name, url) { return ("<a href=\"" + url + "\" title=\"Follow me in " + name + "\" target=\"_blank\" rel=\"noopener noreferrer\"><i class=\"i-" + name + "\"></i><span>" + name + "</span></a>"); };

  function createPasteElement(parent) {
    Object.entries(links).forEach(function (ref) {
      var name = ref[0];
      var url = ref[1];

      if (typeof url === 'string' && urlRegexp.test(url)) {
        var template = templateSocialMedia(name, url);

        var li = document.createElement('li');
        li.innerHTML = template;
        parent.appendChild(li);
      }
    });
  }

  document.querySelectorAll('.social-media').forEach( function (el) { return createPasteElement(el); });
});;


/***/ }),
/* 23 */
/*!**************************!*\
  !*** ./styles/main.scss ***!
  \**************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../Projects/simply-dev/node_modules/cache-loader/dist/cjs.js!../../../../Projects/simply-dev/node_modules/css-loader??ref--4-3!../../../../Projects/simply-dev/node_modules/postcss-loader/lib??ref--4-4!../../../../Projects/simply-dev/node_modules/resolve-url-loader??ref--4-5!../../../../Projects/simply-dev/node_modules/sass-loader/lib/loader.js??ref--4-6!../../../../Projects/simply-dev/node_modules/import-glob!./main.scss */ 15);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../Projects/simply-dev/node_modules/style-loader/lib/addStyles.js */ 29)(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../Projects/simply-dev/node_modules/cache-loader/dist/cjs.js!../../../../Projects/simply-dev/node_modules/css-loader??ref--4-3!../../../../Projects/simply-dev/node_modules/postcss-loader/lib??ref--4-4!../../../../Projects/simply-dev/node_modules/resolve-url-loader??ref--4-5!../../../../Projects/simply-dev/node_modules/sass-loader/lib/loader.js??ref--4-6!../../../../Projects/simply-dev/node_modules/import-glob!./main.scss */ 15, function() {
		var newContent = __webpack_require__(/*! !../../../../Projects/simply-dev/node_modules/cache-loader/dist/cjs.js!../../../../Projects/simply-dev/node_modules/css-loader??ref--4-3!../../../../Projects/simply-dev/node_modules/postcss-loader/lib??ref--4-4!../../../../Projects/simply-dev/node_modules/resolve-url-loader??ref--4-5!../../../../Projects/simply-dev/node_modules/sass-loader/lib/loader.js??ref--4-6!../../../../Projects/simply-dev/node_modules/import-glob!./main.scss */ 15);

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 24 */
/*!*****************************************************************************************!*\
  !*** /mnt/c/Users/Smigol/Projects/simply-dev/node_modules/css-loader/lib/url/escape.js ***!
  \*****************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),
/* 25 */
/*!***************************************************************************************!*\
  !*** /mnt/c/Users/Smigol/Projects/simply-dev/node_modules/css-loader/lib/css-base.js ***!
  \***************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 26 */
/*!*************************!*\
  !*** ./fonts/paway.ttf ***!
  \*************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/paway.ttf";

/***/ }),
/* 27 */
/*!**************************!*\
  !*** ./fonts/paway.woff ***!
  \**************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/paway.woff";

/***/ }),
/* 28 */
/*!*************************!*\
  !*** ./fonts/paway.svg ***!
  \*************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/paway.svg";

/***/ }),
/* 29 */
/*!******************************************************************************************!*\
  !*** /mnt/c/Users/Smigol/Projects/simply-dev/node_modules/style-loader/lib/addStyles.js ***!
  \******************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ 30);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {
		return null;
	}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 30 */
/*!*************************************************************************************!*\
  !*** /mnt/c/Users/Smigol/Projects/simply-dev/node_modules/style-loader/lib/urls.js ***!
  \*************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map