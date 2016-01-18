'use strict';
// =========================================================================
//
// Policies for publicComments
//
// =========================================================================
var acl  = require ('acl');
acl      = new acl (new acl.memoryBackend ());
var helpers  = require (require('path').resolve('./modules/core/server/controllers/core.helpers.controller'));

exports.invokeRolesPolicies = function () {
	helpers.setCRUDPermissions (acl, 'publiccomment');
	//
	// guest can post comment or doc
	//
	acl.allow ('guest', '/api/publiccomment', 'post');
	acl.allow ('guest', '/api/new/publiccomment', 'get');
	helpers.setPathPermissions (acl, [
		[ 'guest', 'user', '/api/publiccomment/project/:projectid/published'         ],
		[ 'guest', 'user', '/api/publiccomment/project/:projectid/published/limit/:limit/offset/:offset'           ],
		[ '', 'user', '/api/publiccomment/project/:projectid/unpublished'           ],
		[ '', 'user', '/api/publiccomment/project/:projectid/unpublished/limit/:limit/offset/:offset'           ],
		[ '', 'user', '/api/publiccomment/:publiccomment/eao/defer'         ],
		[ '', 'user', '/api/publiccomment/:publiccomment/eao/accept'           ],
		[ '', 'user', '/api/publiccomment/:publiccomment/eao/reject'           ],
		[ '', 'user', '/api/publiccomment/:publiccomment/eao/publish'           ],
		[ '', 'user', '/api/publiccomment/:publiccomment/eao/spam'           ],
		[ '', 'user', '/api/publiccomment/:publiccomment/eao/edit'           ],

		[ '', 'user', '/api/publiccomment/project/:projectid/vett/start'           ],
		[ '', 'user', '/api/publiccomment/project/:projectid/vett/claim'           ],
		[ '', 'user', '/api/publiccomment/project/:projectid/classify/start'           ],
		[ '', 'user', '/api/publiccomment/project/:projectid/classify/claim'           ],

		//[ '', 'user', '/api/delete/publiccomment/:publiccomment'         ],

		[ '', 'user', '/api/publiccomment/:publiccomment/proponent/defer'         ],
		[ '', 'user', '/api/publiccomment/:publiccomment/proponent/classify'         ],
		[ '', 'user', '/api/publiccomment/project/:projectid/unvetted'         ],
		[ '', 'user', '/api/publiccomment/project/:projectid/unclassified'         ]
	]);
};

exports.isAllowed = helpers.isAllowed (acl);


