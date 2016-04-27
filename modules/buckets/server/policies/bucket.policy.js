'use strict';
// =========================================================================
//
// Policies for buckets
//
// =========================================================================
var acl  = require ('acl');
acl      = new acl (new acl.memoryBackend ());
var helpers  = require (require('path').resolve('./modules/core/server/controllers/core.helpers.controller'));

exports.invokeRolesPolicies = function () {
	helpers.setCRUDPermissions (acl, 'bucket');
	helpers.setCRUDPermissions (acl, 'bucketcomment');
	helpers.setPathPermissions (acl, [
		[ 'guest', 'user', '/api/base/bucket']
	]);
};

exports.isAllowed = helpers.isAllowed (acl);
