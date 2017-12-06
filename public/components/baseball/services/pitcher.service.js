app
	.factory('Pitcher', function($resource) {
		return $resource(
			'http://localhost:8081/pitchers/:id',
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