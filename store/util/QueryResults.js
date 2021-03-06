dojo.provide("dojo.store.util.QueryResults");

dojo.store.util.QueryResults = function(results){
	//	summary:
	//		This wraps a query results with the appropriate methods
	function addIterativeMethod(method){
		if(!results[method]){
			results[method] = function(){
				var args = arguments;
				return dojo.when(results, function(results){
					Array.prototype.unshift.call(args, results);
					return dojo[method].apply(dojo, args);
				});
			}
		}
	}
	addIterativeMethod("forEach");
	addIterativeMethod("filter");
	addIterativeMethod("map");
	if(!results.total){
		results.total = dojo.when(results, function(results){ 
			return results.length
		});
	}
	return results;
};