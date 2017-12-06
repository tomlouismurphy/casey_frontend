app
	.factory('Batter', function($resource) {
		return $resource(
			'http://localhost:8081/batters/:id',
			{},
			{
				'query': {
					method: 'GET',
					isArray: true,
					headers: {
						'Content-Type':'application/json'
					}
				}
			},
			{
				stripTrailingSlashes: false
			}

		);
	});