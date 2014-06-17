stargazerApp.factory('stargazerFactory', function () {
	var factory = {};
	var tags = [
		'Chart',
		'iOS',
		'GitHub',
		'Web'
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

	// var repos = [
	// 	{
	// 		'title': 'TEAChart',
	// 		'stars': 585,
	// 		'description': 'Simple and intuitive iOS chart library. Contribution graph, clock chart, and baralweriujncafwetijnf',
	// 		'tags': ['Chart', 'iOS'],
	// 		'readme': "# TEAChart \r\n TEAChart is a chart."
	// 	},
	// 	{
	// 		'title': 'Stargazer',
	// 		'stars': 1024,
	// 		'description': 'GitHub star management, on web.',
	// 		'tags': ['GitHub', 'Web'],
	// 		'readme': "# Stargazer \r\n GitHub star management, on web."
	// 	}
	// ];
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
		var db = new PouchDB('http://' + $.cookie('username') + ':' + $.cookie('atk') + '@localhost:5984/' + $.cookie('dbname'));
		functionOutOfLoop = function (err, doc) {
			repo = {
				'title': doc.name,
				'stars': doc.stargazers_count,
				'description': doc.description,
				'tags': ['Chart', 'iOS'],
				'readme': doc.description
			};
			repos.push(repo);
			callback();
		};
		db.allDocs(function(err, doc) {
			for (i = 0; i < doc.rows.length; i++) {
				db.get(doc.rows[i].id, functionOutOfLoop);
			}
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