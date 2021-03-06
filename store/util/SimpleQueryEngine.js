dojo.provide("dojo.store.util.SimpleQueryEngine");

dojo.store.util.SimpleQueryEngine = function(query, options){
	// summary:
	//		Simple query engine that matches using filter functions, named filter
	// 		functions or objects by name-value on a query object hash
	
	// create our matching query function
	if(typeof query == "string"){
		// named query
		query = this[query];
	}else if(typeof query == "object"){
		var queryObject = query;
		query = function(object){
			for(var key in queryObject){
				if(queryObject[key] != object[key]){
					return false;
				}
			}
			return true;
		};
	}
	function execute(array){
		// execute the whole query, first we filter
		var results = dojo.filter(array, query);
		// next we sort
		if(options && options.sort){
			results.sort(function(a, b){
				for(var sort, i=0; sort = options.sort[i]; i++){
					var aValue = a[sort.attribute];
					var bValue = b[sort.attribute];
					if (aValue != bValue) {
						return sort.descending == aValue > bValue ? -1 : 1;
					}					
				}
				return 0;
			});
		}
		// now we paginate
		if(options && (options.start || options.count)){
			results = results.slice(options.start || 0, (options.start || 0) + (options.count || Infinity));
		}
		return results;
	}
	execute.matches = query;
	return execute;
};