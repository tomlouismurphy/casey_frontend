'use strict';

const app = angular.module('CaseyApp', []);

angular.module('MainApplication', [
		'appRoutes',
		'CaseyApp',
		'ngResource'
	])