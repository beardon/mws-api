'use strict';

// /**
//  * Takes an object and adds an appendTo function that will add
//  * each kvp of object to a query. Used when dealing with complex
//  * parameters that need to be built in an abnormal or unique way.
//  *
//  * @param {String} name Name of parameter, prefixed to each key
//  * @param {Object} obj  Parameters belonging to the complex type
//  */
// function ComplexType(name) {
//  this.pre = name;
//  var _obj = obj;
//  obj.appendTo = function(query) {
//      for (var k in _obj) {
//          query[name + '.' k] = _obj[k];
//      }
//      return query;
//  }
//  return obj;
// }

// ComplexType.prototype.appendTo = function(query) {
//  for (var k in value)
// }

class ComplexListType {
    /**
     * Complex List helper object. Once initialized, you should set
     * an add(args) method which pushes a new complex object to members.
     *
     * @param {String} name Name of Complex Type (including .member or subtype)
     */
    constructor(name) {
        this.pre = name;
        this.members = [];
    }

    /**
     * Appends each member object as a complex list item
     * @param  {Object} query Query object to append to
     * @return {Object}       query
     */
    appendTo(query) {
        var members = this.members;
        for (var i = 0; i < members.length; i++) {
            for (var j in members[i]) {
                query[this.pre + '.' + (i + 1) + '.' + j] = members[i][j];
            }
        }
        return query;
    }
}

module.exports = ComplexListType;
