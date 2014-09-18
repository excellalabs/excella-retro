/* jslint node: true */
'use strict';

var excellaPrimaryRed = '#C41230';
var excellaPrimaryBlue = '#002D62';

var excellaSecondaryOrange = '#D4711A';
var excellaSecondaryBlue = '#5D87A1';
var excellaSecondaryGreen = '#89904A';
var excellaSecondaryYellow = '#EBB111';

var excellaTernaryWarmGray = '#D7CFC5';
var excellaTernaryCoolGray = '#9C9B9E';
var excellaTernaryLightYellow = '#B9B084';
var excellaTernaryDarkYellow = '#4B4C31';
var excellaTernaryMutedRed = '#917578';
var excellaTernaryMutedOrange = '#E4AA55';
var excellaTernaryAqua = '#6B9A8B';
var excellaTernaryRedOrange = '#D9531E';

exports = module.exports = {
    // here we can modify the colors baked into bootstrap
    '@brand-primary': excellaPrimaryBlue,
    '@brand-success': excellaSecondaryGreen,
    '@brand-info': excellaSecondaryBlue,
    '@brand-warning': excellaSecondaryYellow,
    '@brand-danger': excellaPrimaryRed
    //'@btn-default-border': '#C9B9A7',
    //'@navbar-default-border': '#C9B9A7',
    //'@navbar-default-link-color': '#0F0534',
    //'@navbar-default-link-hover-color': '#5A7A92',
    //'@navbar-default-link-active-color': '#5A7A92',
    //'@navbar-default-link-disabled-color': '#8A717F',
};