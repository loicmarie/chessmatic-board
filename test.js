"use strict";
var Truc = class Truc {
	constructor(){
		this._bl = {
			mac: 1
		};
	}
	get mac(){
		return this._bl.mac+1;
	}
};

var truc = new Truc();
console.log(truc.mac);