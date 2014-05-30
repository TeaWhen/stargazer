stargazerApp.factory('stargazerFactory', function () {
	var factory = {};
	var tags = [
		'UI',
		'Audio'
	];
	var languages = [
		'Objective-C',
		'Python',
		'Ruby',
		'JavaScript'
	];
	var sorts = [
		'Stars',
		'Date',
		'Title'
	];
	var untagged = 33;

	var repos = [
		{
			'title': 'TEAChart',
			'stars': 585,
			'description': 'Simple and intuitive iOS chart library. Contribution graph, clock chart, and baralweriujncafwetijnf',
			'tags': ['Chart', 'iOS'],
			'readme': "# Stargazer \r\n GitHub star management, on web."
		},
		{
			'title': 'Stargazer',
			'stars': 1024,
			'description': 'GitHub star management, on web.',
			'tags': ['GitHub', 'Web'],
			'readme': "# Stargazer \r\n GitHub star management, on web."
		}
	];

	factory.getTags = function () {
		return tags;
	};

	factory.getLanguages = function () {
		return languages;
	};

	factory.getSorts = function () {
		return sorts;
	};

	factory.getUntagged = function () {
		return untagged;
	};

	factory.getRepos = function () {
		return repos;
	};

	return factory;
});