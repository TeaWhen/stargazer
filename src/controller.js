var stargazerApp = angular.module('stargazerApp', []);

stargazerApp.controller('stargazerController', function ($scope, stargazerFactory) {
	$scope.tags = [];
	$scope.languages = [];
	$scope.sorts = [];
	$scope.untagged = 0;
	$scope.selected = '';
	$scope.filter = '';
	$scope.searchText = '';
	$scope.sortSelected = '';
	$scope.repos = [];

	init();
	function init() {
		$scope.tags = stargazerFactory.getTags();
		$scope.languages = stargazerFactory.getLanguages();
		$scope.sorts = stargazerFactory.getSorts();
		$scope.untagged = stargazerFactory.getUntagged();
		$scope.sortSelected = $scope.sorts[0];
		$scope.repos = stargazerFactory.getRepos();
	}

	$scope.select = function (filter, item) {
		$scope.selected = filter + item;
		$scope.filter = item;
	};

	$scope.isActive = function (filter, item) {
		return $scope.selected === filter + item;
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

