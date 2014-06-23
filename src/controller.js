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
				$scope.languages = stargazerFactory.getLanguages().sort();
				$scope.sorts = stargazerFactory.getSorts();
				$scope.untagged = stargazerFactory.getUntagged();
				$scope.repos = stargazerFactory.getRepos();
				for (i = 0; i < $scope.repos.length; ++i) {
					$scope.repos[i].visible = true;
				}
			});
		});
	}

	function setReadme(index) {
		$.ajax({
			url: $scope.repos[index].readme,
			dataType: "json",
			success: function (data) {
				$scope.$apply(function () {
					result = marked(decodeURIComponent(escape(atob(data.content.replace(/\n/g, "")))));
					$scope.curRepo.readme = result;
				});
			}
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
					setReadme(i);
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

	curTitle = null;

	$scope.tokenfieldClicked = function (title) {
		if (title === curTitle) {
			return;
		}
		curTitle = title;

		console.log(title);
		$('#' + title + ' .tag').hide();

		local = [];
		for (i = 0; i < $scope.tags.length; i++) {
			local.push({value: $scope.tags[i]});
		}

		var engine = new Bloodhound({
			local: local,
			datumTokenizer: function(d) {
				return Bloodhound.tokenizers.whitespace(d.value); 
			},
			queryTokenizer: Bloodhound.tokenizers.whitespace    
		});
		engine.initialize();
		$('#' + title + ' #tokenfield').tokenfield({
			typeahead: [null, { source: engine.ttAdapter() }]
		});

		for (i = 0; i < $scope.repos.length; i++) {
			repo = $scope.repos[i];
			if (repo.title === title) {
				break;
			}
		}

		for (i = 0; i < repo.tags.length; i++) {
			$('#' + title + ' #tokenfield').tokenfield('createToken', repo.tags[i]);
		}

		$('#' + title + ' #tokenfield').show();
		$('#' + title + ' #tokenfield').on('tokenfield:createdtoken', function (event) {
			var existingTokens = $(this).tokenfield('getTokens');
			$scope.$apply(function () {
				repo.tags.push(existingTokens[existingTokens.length - 1].label);
			});
			$('#' + title + ' .tag').show();
			$('#' + title + ' #tokenfield').tokenfield('destroy');
			$('#' + title + ' #tokenfield').hide();
		});
	};

	// $(document).ready(function () {
	// 	console.log($(".description"));
	// 	$(".description").ellipsis({
	// 		row: 2
	// 	});
	// });
});
