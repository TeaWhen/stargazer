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
	$scope.sortSelected = '';
	$scope.repos = [];
	$scope.curRepo = {'readme': marked("# Welcome. \r\n Let's show you how to use stargazer.")};

	init();
	function init() {
		$scope.tags = stargazerFactory.getTags();
		$scope.languages = stargazerFactory.getLanguages();
		$scope.sorts = stargazerFactory.getSorts();
		$scope.untagged = stargazerFactory.getUntagged();
		$scope.sortSelected = $scope.sorts[0];
		$scope.repos = stargazerFactory.getRepos();
		for (i = 0; i < $scope.repos.length; ++i) {
			$scope.repos[i].visible = true;
			$scope.repos[i].readme = marked($scope.repos[i].readme);
		}
	}

	$scope.select = function (filter, item) {
		if ($scope.selected[filter] === item) {
			$scope.selected[filter] = '';
		} else {
			$scope.selected[filter] = item;
		}
		if (filter == 'repo') {
			for (i = 0; i < $scope.repos.length; ++i) {
				if ($scope.repos[i].title == item) {
					$scope.curRepo = $scope.repos[i];
					break;
				}
			}
		} else if (filter == 'tag') {
			for (i = 0; i < $scope.repos.length; ++i) {
				if ($scope.repos[i].tags.indexOf(item) > -1) {
					$scope.repos[i].visible = $scope.selected[filter] !== item;
				} else {
					$scope.repos[i].visible = $scope.selected[filter] === item;
				}
			}
		}
	};

	$scope.isActive = function (filter, item) {
		return $scope.selected[filter] === item;
	};

	$scope.isHidden = function (title) {
		for (i = 0; i < $scope.repos.length; ++i) {
			if ($scope.repos[i].title === title) {
				return !$scope.repos[i].visible;
			}
		}
	};

	$scope.selectSort = function (item) {
		$scope.sortSelected = item;
	};

	$(document).ready(function () {
		console.log($(".description"));
		$(".description").ellipsis({
			row: 2
		});
	});
});

