'use strict';

class EnumType {
    /**
     * Contructor for objects used to represent enumeration states. Useful
     * when you need to make programmatic updates to an enumerated data type or
     * wish to encapsulate enum states in a handy, re-usable letiable.
     *
     * @param {Array} choices An array of any possible values (choices)
     */
    constructor(choices) {
        for (let choice in choices) {
            this[choices[choice]] = false;
        }
        this._choices = choices;
    }

    /**
     * Enable one or more choices (accepts a letiable number of arguments)
     * @return {Object} Current instance of EnumType for chaining
     */
    enable() {
        for (let arg in arguments) {
            this[arguments[arg]] = true;
        }
        return this;
    }

    /**
     * Disable one or more choices (accepts a letiable number of arguments)
     * @return {Object} Current instance of EnumType for chaining
     */
    disable() {
        for (let arg in arguments) {
            this[arguments[arg]] = false;
        }
        return this;
    }

    /**
     * Toggles one or more choices (accepts a letiable number of arguments)
     * @return {Object} Current instance of EnumType for chaining
     */
    toggle() {
        for (let arg in arguments) {
            this[arguments[arg]] = !this[arguments[arg]];
        }
        return this;
    }

    /**
     * Return all possible values without regard to current state
     * @return {Array} Choices passed to EnumType constructor
     */
    all() {
        return this._choices;
    }

    /**
     * Return all enabled choices as an array (used to set list params, usually)
     * @return {Array} Choice values for each choice set to true
     */
    values() {
        let value = [];
        for (let choice in this._choices) {
            if (this[this._choices[choice]] === true) {
                value.push(this._choices[choice]);
            }
        }
        return value;
    }
}

module.exports = EnumType;
