'use strict';
// =========================================================================
//
// Routes for buckets
//
// =========================================================================
var policy     = require ('../policies/bucket.policy');
var controller = require ('../controllers/bucket.controller');

module.exports = function (app) {
	//
	// collection routes
	//
	app.route ('/api/bucket').all (policy.isAllowed)
		.get  (controller.list)
		.post (controller.create);
	//
	// base items only (no project association)
	//
	app.route ('/api/base/bucket').all (policy.isAllowed)
		.get  (controller.base);
	//
	// model routes
	//
	app.route ('/api/bucket/:bucket').all (policy.isAllowed)
		.get    (controller.read)
		.put    (controller.update)
		.delete (controller.delete);
	app.route ('/api/new/bucket').all (policy.isAllowed)
		.get (controller.new);
	//
	// middleware to auto-fetch parameter
	//
	app.param ('bucket', controller.getObject);
	// app.param ('bucketId', controller.getId);


	//
	// collection routes
	//
	app.route ('/api/bucketcomment').all (policy.isAllowed)
		.get  (controller.list)
		.post (controller.create);
	//
	// model routes
	//
	app.route ('/api/bucketcomment/:bucketcomment').all (policy.isAllowed)
		.get    (controller.read)
		.put    (controller.update)
		.delete (controller.delete);
	app.route ('/api/new/bucketcomment').all (policy.isAllowed)
		.get (controller.new);
	//
	// middleware to auto-fetch parameter
	//
	app.param ('bucketcomment', controller.getObject);
	// app.param ('bucketId', controller.getId);


};

