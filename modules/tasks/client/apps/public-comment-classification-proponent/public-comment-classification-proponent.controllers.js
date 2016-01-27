'use strict';

angular.module('tasks')
	.controller('controllerTaskPublicCommentClassificationProponent', controllerTaskPublicCommentClassificationProponent)
	.filter ('filterClassifyComments', filterClassifyComments)
	.filter ('filterClassifyValueComponents', filterClassifyValueComponents)
	.filter ('filterClassifyTopics', filterClassifyTopics);
// -----------------------------------------------------------------------------------
//
// CONTROLLER: Task for Simple Complete
//
// -----------------------------------------------------------------------------------
controllerTaskPublicCommentClassificationProponent.$inject = ['$scope', '$rootScope', '_', 'TaskPublicCommentClassificationProponent', '$filter'];
/* @ngInject */
function controllerTaskPublicCommentClassificationProponent($scope, $rootScope, _, TaskPublicCommentClassificationProponent, $filter) {
	var taskPubComClassProp = this;

	// Keep track of the active comment for display of the edit controls.
	// Only one of these can be seen at a time.
	// All comparisons take place at the template level.
	taskPubComClassProp.filterScopeComment = false;
	taskPubComClassProp.filterScopeValueComponents = true;
	taskPubComClassProp.filterScopeTopics = true;

	taskPubComClassProp.data = {comments: []};

	taskPubComClassProp.noClassificationPossible = false;
	// -----------------------------------------------------------------------------------
	//
	// Get the current project
	//
	// -----------------------------------------------------------------------------------
	$scope.$watch('project', function(newValue) {
		if (newValue) {
			taskPubComClassProp.project = newValue;

			// // get the bucket groups for general classification
			// taskPubComClassProp.bucketGroups = _.unique(_.pluck(taskPubComClassProp.project.buckets, 'group'));
			// taskPubComClassProp.bucketsFiltered = [];

			// GetStart will return all Deferred or Unclassified items for the current user.
			// fetch New Comment will make sure we don't fetch another comment if there already is one unclassified pending.
			TaskPublicCommentClassificationProponent.getStart(newValue._id).then( function(res) {
				taskPubComClassProp.data.comments = res.data;
			});

			// get the count of other pending comments.
			taskPubComClassProp.updateCommentCount();

		}
	});
	// -----------------------------------------------------------------------------------
	//
	// Action to get the next comment.
	//
	// -----------------------------------------------------------------------------------
	$scope.$on('classifyFetchNewComment', function() {
		//taskPubComClassProp.fetchNewComment();
		// get the count of other pending comments.
		taskPubComClassProp.updateCommentCount();

	});

	taskPubComClassProp.updateCommentCount = function() {
		// get the count of other pending comments.
		TaskPublicCommentClassificationProponent.getUnclassifiedCount(taskPubComClassProp.project._id).then( function(res) {
			taskPubComClassProp.unclassifiedCount = res.data.count;
		});
	};
	// -----------------------------------------------------------------------------------
	//
	// Get next comment
	//
	// -----------------------------------------------------------------------------------
	taskPubComClassProp.fetchNewComment = function() {
		taskPubComClassProp.activeComment = null;

		// detect if there is an unclassified comment in the array, if so, select it.
		_.each(taskPubComClassProp.data.comments, function(comment) {
			if ((comment.proponentStatus === taskPubComClassProp.filter) && !taskPubComClassProp.activeComment) {
				taskPubComClassProp.activeComment = comment;
			}
		});


		// there's no found, unclassified so get a new record.
		if (!taskPubComClassProp.activeComment) {
			TaskPublicCommentClassificationProponent.getNextComment(taskPubComClassProp.project._id).then( function(res) {
				taskPubComClassProp.data.comments.push(res.data);
				taskPubComClassProp.filter = 'Unclassified';
				taskPubComClassProp.activeComment = res.data;
			});
		}

		// get the count of other pending comments.
		taskPubComClassProp.updateCommentCount();

	};

	// -----------------------------------------------------------------------------------
	//
	// Get the Task data anchor string.  This is used to record instance data in the project.
	//
	// get the task identifier.  (ID + Task Type)
	//
	// -----------------------------------------------------------------------------------
	$scope.$watch('anchor', function(newValue) {
		if (newValue) {
			taskPubComClassProp.anchor = newValue;
		}
	});
	// -----------------------------------------------------------------------------------
	//
	// Get the Task Specification
	//
	// -----------------------------------------------------------------------------------
	$scope.$watch('task', function(newValue) {
		// get item for title
		if (newValue) {
			taskPubComClassProp.taskId = newValue._id;
			taskPubComClassProp.task = newValue;
		}
	});
	// -----------------------------------------------------------------------------------
	//
	// Set task as complete.  Currently no UI to support.
	//
	// -----------------------------------------------------------------------------------
	taskPubComClassProp.completeTask = function() {
		// validate
		// when ok, broadcast
		taskPubComClassProp.item.value = 'Complete';
		$rootScope.$broadcast('resolveItem', {itemId: taskPubComClassProp.itemId});
	};

}
// -----------------------------------------------------------------------------------
//
// FILTER: Filter comments.  THESE FILTERS NEED TO BE FIGURED OUT BETTER.
//
// -----------------------------------------------------------------------------------
filterClassifyComments.$inject = ['$filter'];
/* @ngInject */
function filterClassifyComments($filter) {
	return function(items, enable, keywords) {
		if (enable) {
			return $filter('filter')(items, keywords);
		} else {
			return items;
		}
	};
}
// -----------------------------------------------------------------------------------
//
// FILTER: Filter Value Components
//
// -----------------------------------------------------------------------------------
filterClassifyValueComponents.$inject = ['$filter'];
/* @ngInject */
function filterClassifyValueComponents($filter) {
	return function(items, enable, keywords) {
		if (enable) {
			return $filter('filter')(items, keywords);
		} else {
			return items;
		}
	};
}
// -----------------------------------------------------------------------------------
//
// FILTER: Filter Value Components
//
// -----------------------------------------------------------------------------------
filterClassifyTopics.$inject = ['$filter'];
/* @ngInject */
function filterClassifyTopics($filter) {
	return function(items, enable, keywords) {
		if (enable) {
			return $filter('filter')(items, keywords);
		} else {
			return items;
		}
	};
}
