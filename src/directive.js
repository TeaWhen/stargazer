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
	return factory;
});