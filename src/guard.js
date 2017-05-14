"use strict";

function required(argInfo) {
    if (!argInfo) {
        throw new Error(`argument exception: argInfo is missing or undefined`);
    }

    const argName = Object.keys(argInfo)[0];
    const argValue = argInfo[argName];
    if (!argValue) {
        throw new Error(`argument exception: '${argName}' is missing or undefined`);
    }
}

module.exports = {
    required: required
};