dojo.provide("dojo.tests.store.Memory");
dojo.require("dojo.store.Memory");

var store = new dojo.store.Memory({
	data: [
		{id: 1, name: "one", prime: false},
		{id: 2, name: "two", even: true, prime: true},
		{id: 3, name: "three", prime: true},
		{id: 4, name: "four", even: true, prime: false},
		{id: 5, name: "five", prime: true}
	]
});
tests.register("tests.data.Memory", 
	[
		function testGet(t){
			t.is(store.get(1).name, "one");
			t.is(store.get(4).name, "four");
			t.t(store.get(5).prime);
		},
		function testQuery(t){
			t.is(store.query({prime: true}).length, 3);
			t.is(store.query({even: true})[1].name, "four");
		},
		function testQueryWithSort(t){
			t.is(store.query({prime: true}, {sort:[{attribute:"name"}]}).length, 3);
			t.is(store.query({even: true}, {sort:[{attribute:"name"}]})[1].name, "two");
		},
		function testQueryWithPaging(t){
			t.is(store.query({prime: true}, {start: 1, count: 1}).length, 1);
			t.is(store.query({even: true}, {start: 1, count: 1})[0].name, "four");
		},
		function testPutUpdate(t){
			var four = store.get(4);
			four.square = true;
			store.put(four);
			four = store.get(4);
			t.t(four.square);
		},
		function testPutNew(t){
			store.put({
				id: 6,
				perfect: true
			});
			t.t(store.get(6).perfect);
		},
		function testAddDuplicate(t){
			var threw;
			try{
				store.add({
					id: 6,
					perfect: true
				});
			}catch(e){
				threw = true;
			}
			t.t(threw);
		},
		function testAddNew(t){
			store.add({
				id: 7,
				prime: true
			});
			t.t(store.get(7).prime);
		},
		function testIFRSStyleData(t){
			var anotherStore = new dojo.store.Memory({
				data: {
					items:[
						{name: "one", prime: false},
						{name: "two", even: true, prime: true},
						{name: "three", prime: true}
					],
					identifier: "name"
				}
			});
			t.is(anotherStore.get("one").name,"one");
			t.is(anotherStore.query({name:"one"})[0].name,"one");
		}
	]
);

