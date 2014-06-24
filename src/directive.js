stargazerApp.factory('stargazerFactory', function () {
	var factory = {};
	var tags = [
		'Chart',
		'iOS',
		'GitHub',
		'Web',
		'Bootstrap'
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
		'Name'
	];
	var untagged = 33;

	var repos = [];

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

	factory.importFromPouchDB = function (callback) {
		connectPouchDB(function () {
			docCallback = function (err, doc) {
				doc.readme = 'https://api.github.com/repos/' + doc.full_name + '/readme';
				if (doc.tags === null && doc.language !== null) {
					doc.tags = [doc.language];
				} else if (doc.tags === null) {
					doc.tags = [];
				}
				repos.push(doc);
				if (languages.indexOf(doc.language) <= -1) {
					languages.push(doc.language);
				}
				console.log(doc);
				db.put(doc);
				callback();
			};
			db.allDocs(function(err, doc) {
				for (i = 0; i < doc.rows.length; i++) {
					db.get(doc.rows[i].id, docCallback);
				}
			});
		});
	};

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