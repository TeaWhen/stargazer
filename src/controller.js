var stargazerApp = angular.module('stargazerApp', ['ngSanitize']);

stargazerApp.controller('stargazerController', function ($scope, $sce, stargazerFactory) {
	marked.setOptions({
	  renderer: new marked.Renderer(),
	  gfm: true,
	  tables: true,
	  breaks: false,
	  pedantic: false,
	  sanitize: true,
	  smartLists: true,
	  smartypants: false
	});

	$scope.tags = [];
	$scope.languages = [];
	$scope.sorts = [];
	$scope.untagged = 0;
	$scope.selected = {};
	$scope.searchText = '';
	$scope.sortSelected = 'title';
	$scope.repos = [];
	$scope.curRepo = {'readme': marked("# Welcome. \r\n Let's show you how to use stargazer.")};
	filters = ['general', 'repo', 'tag', 'language'];

	init();
	function init() {
		for (i = 0; i < filters.length; ++i) {
			$scope.selected[filters[i]] = [];
		}
		stargazerFactory.importFromPouchDB(function () {
			$scope.$apply(function () {
				$scope.tags = stargazerFactory.getTags();
				$scope.languages = stargazerFactory.getLanguages();
				$scope.sorts = stargazerFactory.getSorts();
				$scope.untagged = stargazerFactory.getUntagged();
				$scope.repos = stargazerFactory.getRepos();
				for (i = 0; i < $scope.repos.length; ++i) {
					$scope.repos[i].visible = true;
					// $scope.repos[i].readme = marked($scope.repos[i].readme);
				}
			});
		});
	}

	$scope.select = function (filter, item) {
		index = $scope.selected[filter].indexOf(item);
		if (index > -1) {
			$scope.selected[filter].splice(index, 1);
		} else {
			$scope.selected[filter].push(item);
		}

		if (filter == 'repo') {
			$scope.selected[filter] = [item];
			for (i = 0; i < $scope.repos.length; ++i) {
				if ($scope.repos[i].title == item) {
					$scope.curRepo = $scope.repos[i];
					break;
				}
			}
		} else if (filter == 'tag') {
			for (i = 0; i < $scope.repos.length; ++i) {
				$scope.repos[i].visible = true;
				for (j = 0; j < $scope.selected[filter].length; ++j) {
					if ($scope.repos[i].tags.indexOf($scope.selected.tag[j]) <= -1) {
						$scope.repos[i].visible = false;
					}
				}
			}
		} else if (filter == 'language') {
			for (i = 0; i < $scope.repos.length; ++i) {
				$scope.repos[i].visible = true;
				if ($scope.selected[filter].length > 0 && $scope.selected[filter].indexOf($scope.repos[i].language) <= -1) {
					$scope.repos[i].visible = false;
				}
			}
		}
	};

	$scope.isActive = function (filter, item) {
		return $scope.selected[filter].indexOf(item) > -1;
	};

	$scope.isHidden = function (title) {
		for (i = 0; i < $scope.repos.length; ++i) {
			if ($scope.repos[i].title === title) {
				return !$scope.repos[i].visible;
			}
		}
	};

	$scope.selectSort = function (item) {
		if ($scope.sortSelected === item.toLowerCase()) {
			$scope.sortSelected = '-' + item.toLowerCase();
		}
		else {
			$scope.sortSelected = item.toLowerCase();
		}
	};

	// $(document).ready(function () {
	// 	console.log($(".description"));
	// 	$(".description").ellipsis({
	// 		row: 2
	// 	});
	// });
});
