var stargazerApp = angular.module('stargazerApp', ['ngSanitize']);

stargazerApp.controller('stargazerController', function ($scope, $sce, stargazerFactory) {
	$scope.tags = [];
	$scope.languages = [];
	$scope.sorts = [];
	$scope.untagged = 0;
	$scope.selected = '';
	$scope.filter = '';
	$scope.searchText = '';
	$scope.sortSelected = '';
	$scope.repos = [];

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

	init();
	function init() {
		$scope.tags = stargazerFactory.getTags();
		$scope.languages = stargazerFactory.getLanguages();
		$scope.sorts = stargazerFactory.getSorts();
		$scope.untagged = stargazerFactory.getUntagged();
		$scope.sortSelected = $scope.sorts[0];
		$scope.repos = stargazerFactory.getRepos();
		for (i = 0; i < $scope.repos.length; ++i) {
			$scope.repos[i].readme = marked($scope.repos[i].readme);
		}
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

