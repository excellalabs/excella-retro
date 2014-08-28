describe("Hash", function() {

	it("returns '[object Hash]' when converted to a string", function() {
		expect(new Hash().toString()).toEqual("[object Hash]");
	});

	describe("isReserved", function() {

		beforeEach(function() {
			this.hash = new Hash();
		});

		it("returns true if the key exists on the Hash prototype", function() {
			expect(this.hash.isReserved("isReserved")).toEqual(true);
			expect(this.hash.isReserved("empty")).toEqual(true);
			expect(this.hash.isReserved("isEmpty")).toEqual(true);
			expect(this.hash.isReserved("get")).toEqual(true);
			expect(this.hash.isReserved("set")).toEqual(true);
			expect(this.hash.isReserved("exists")).toEqual(true);
			expect(this.hash.isReserved("merge")).toEqual(true);
			expect(this.hash.isReserved("filter")).toEqual(true);
			expect(this.hash.isReserved("forEach")).toEqual(true);
			expect(this.hash.isReserved("keys")).toEqual(true);
			expect(this.hash.isReserved("size")).toEqual(true);
		});

		it("returns false if the key does not exist on the Hash prototype", function() {
			expect(this.hash.isReserved("foo")).toEqual(false);
		});

	});

	describe("set", function() {

		beforeEach(function() {
			this.hash = new Hash();
		});

		it("sets the value at the key", function() {
			this.hash.set("test", true);
			expect(this.hash.test).toEqual(true);

			this.hash.set("test", "blah");
			expect(this.hash.test).toEqual("blah");

			var o = { foo: "bar" };
			this.hash.set("something", o);
			expect(this.hash.something).toBe(o)
		});

		it("throws an error if the key is a reserved word", function() {
			var hash = this.hash;
			expect(function() {
				hash.set("merge", "explosions!");
			}).toThrow("Cannot set reserved property: merge");
		});

		it("returns a reference to the Hash", function() {
			var returnValue = this.hash.set("foo", "bar");

			expect(returnValue).toBe(this.hash)
		});

	});

	describe("get", function() {

		beforeEach(function() {
			this.hash = new Hash();
		});

		it("returns null if the key is not set", function() {
			expect(this.hash.get("non_existent")).toEqual(null);
		});

		it("returns the value at the key", function() {
			this.hash.set("foo", "bar");
			expect(this.hash.get("foo")).toEqual("bar");
		});

		it("throws an error when trying to get a reserved key", function() {
			var hash = this.hash;
			expect(function() {
				hash.get("get");
			}).toThrow("Cannot get reserved property: get");
		});

	});

	describe("exists", function() {

		beforeEach(function() {
			this.hash = new Hash();
		});

		it("returns false if the key is a reserved word", function() {
			expect(this.hash.exists("merge")).toEqual(false);
		});

		it("returns false if the key has not been set", function() {
			expect(this.hash.exists("non_existent")).toEqual(false);
		});

		it("returns true if the key has been set", function() {
			this.hash.set("foo", "bar");
			expect(this.hash.exists("foo")).toEqual(true);
		});

	});

	describe("forEach", function() {

		beforeEach(function() {
			this.hash = new Hash();
		});

		it("invokes a callback on each iteration", function() {
			var calls = 0;
			var o = {
				callback: function(key, value) {
					calls++;
				}
			};

			spyOn(o, "callback").andCallThrough();

			this.hash.set("a", 1).set("b", "blah");

			this.hash.forEach(o.callback);

			expect(calls).toEqual(2);
			expect(o.callback).wasCalledWith("a", 1);
			expect(o.callback).wasCalledWith("b", "blah");
		});

		it("invokes the callback with the given context on each iteration", function() {
			var o = {
				callback: function(key, value) {
					expect(this).toBe(context);
				}
			};

			var context = {};

			spyOn(o, "callback").andCallThrough();

			this.hash.set("a", 1);

			this.hash.forEach(o.callback, context);

			expect(o.callback).wasCalledWith("a", 1);
		});

		it("returns a reference to the Hash", function() {
			this.hash.set("a", 1);

			var returnValue = this.hash.forEach(function() {});

			expect(returnValue).toBe(this.hash);
		});

	});

	describe("filter", function() {

		beforeEach(function() {
			this.hash = new Hash();
			this.hash
				.set("title", "Testing")
				.set("price", 12.99)
				.set("forSale", true);
		});

		it("passing a context sets the 'this' variable in the callback", function() {
			var context = {};

			this.hash.filter(function(value) {
				expect(this).toBe(context);
				return true;
			}, context);
		});

		it("omits keys when the callback returns any falsey value and keeps then when it returns a truthy value", function() {
			var filtered = this.hash.filter(function(key, value) {
				return value !== true;
			});

			expect(filtered.exists("title")).toEqual(true);
			expect(filtered.exists("price")).toEqual(true);
			expect(filtered.exists("forSale")).toEqual(false);

			var filtered = this.hash.filter(function(value) {
				return 0;
			});

			expect(filtered.exists("title")).toEqual(false);
			expect(filtered.exists("price")).toEqual(false);
			expect(filtered.exists("forSale")).toEqual(false);

			var filtered = this.hash.filter(function(value) {
				return 1;
			});

			expect(filtered.exists("title")).toEqual(true);
			expect(filtered.exists("price")).toEqual(true);
			expect(filtered.exists("forSale")).toEqual(true);
		});


		it("returns a new Hash", function() {
			var filtered = this.hash.filter(function(value) { return value !== "Testing"; });

			expect(filtered).toNotBe(this.hash);
			expect(filtered instanceof Hash).toEqual(true);
		});

	});

	describe("keys", function() {

		beforeEach(function() {
			this.hash = new Hash();
		});

		it("returns an empty Array when no keys have been set", function() {
			expect(this.hash.keys().length).toEqual(0);
		});

		it("returns an array of key names that have been set", function() {
			this.hash.set("a", 1).set("b", "test");

			expect(this.hash.keys()).toEqual(["a", "b"]);
		});

	});

	describe("size", function() {

		beforeEach(function() {
			this.hash = new Hash();
		});

		it("returns 0 if no keys have been set", function() {
			expect(this.hash.size()).toEqual(0);
		});

		it("returns the number of keys that have been set", function() {
			this.hash.set("a", 1).set("b", "test");

			expect(this.hash.size()).toEqual(2);
		});

	});

	describe("isEmpty", function() {

		beforeEach(function() {
			this.hash = new Hash();
		});

		it("returns true if there are no keys set", function() {
			expect(this.hash.isEmpty()).toEqual(true);
		});

		it("returns false if one or more keys have been set", function() {
			this.hash.set("a", 1);

			expect(this.hash.isEmpty()).toEqual(false);
		});

	});

	describe("empty", function() {

		beforeEach(function() {
			this.hash = new Hash();
		});

		it("removes all keys", function() {
			this.hash.set("a", 1).set("b", "test");

			expect(this.hash.size()).toEqual(2);
			expect(this.hash.keys()).toEqual(["a", "b"]);

			this.hash.empty();

			expect(this.hash.size()).toEqual(0);
			expect(this.hash.keys()).toEqual([]);
		});

		it("can be called on an empty Hash", function() {
			this.hash.empty();
		});

		it("returns a reference to the Hash", function() {
			var returnValue = this.hash.empty();

			expect(returnValue).toBe(this.hash);
		});

	});

	describe("merge", function() {

		beforeEach(function() {
			this.hash = new Hash();
		});

		it("adds keys to the hash", function() {
			expect(this.hash.exists("price")).toEqual(false);
			expect(this.hash.exists("title")).toEqual(false);

			this.hash.merge({price: 1.5, title: "Test"});

			expect(this.hash.exists("price")).toEqual(true);
			expect(this.hash.exists("title")).toEqual(true);
		});

		it("overwrites existing keys in the hash", function() {
			this.hash.set("title", "Original Title");
			this.hash.merge({title: "New Title"});

			expect(this.hash.get("title")).toEqual("New Title");
		});

		it("performs a shallow merge on keys containing an Object", function() {
			var o1 = { price: 2.5 };
			var o2 = { price: 50.35 };

			this.hash.set("product", o1);
			this.hash.merge({product: o2});

			expect(this.hash.get("product")).toNotBe(o1);
			expect(this.hash.get("product")).toBe(o2);
			expect(this.hash.get("product").price).toEqual(50.35);
		});

		it("performs a recursive merge on keys containing a Hash", function() {
			var overrides = {
				product: {
					price: 12.99
				}
			};

			var subHash = new Hash();
			subHash.set("price", 3.5);
			spyOn(subHash, "merge").andCallThrough();

			this.hash.set("product", subHash);

			this.hash.merge(overrides);

			expect(this.hash.product).toBe(subHash);
			expect(subHash.merge).wasCalledWith(overrides.product);
			expect(this.hash.product.get("price")).toEqual(12.99);
		});

		it("throws an error if one of the keys contains a reserved property", function() {
			var hash = this.hash;
			expect(function() {
				hash.merge({filter: "Explosions!"});
			}).toThrow("Cannot set reserved property: filter");
		});

		it("performs a shallow merge on array properties", function() {
			this.hash.set("ages", [3, 29, 58]);
			this.hash.merge({ ages: [5, 10] });

			expect(this.hash.get("ages")).toEqual([3, 29, 58, 5, 10]);
		});

		it("adds duplicate values to arrays", function() {
			this.hash.set("ages", [5, 10]);
			this.hash.merge({ ages: [5, 10] });

			expect(this.hash.get("ages")).toEqual([5, 10, 5, 10]);
		});

		it("returns a reference to the Hash", function() {
			var returnValue = this.hash.merge({title: "Test"});

			expect(returnValue).toBe(this.hash);
		});

	});

	describe("constructor", function() {

		it("does not require any arguments", function() {
			new Hash();
		});

		it("takes an Object of key-value pairs to seed the new Hash", function() {
			var hash = new Hash({title: "Test"});

			expect(hash.exists("title"));
			expect(hash.get("title")).toEqual("Test");
		});

		it("throws an error when trying to see the Hash with reserved keys", function() {
			expect(function() {
				new Hash({forEach: "boom"});
			}).toThrow("Cannot set reserved property: forEach");
		});

	});

	it("allows you to overwrite properties by direct assignment --- BEWARE!", function() {
		var hash = new Hash();
		var error = null;

		hash.merge = "bye bye merge function";

		expect(hash.merge).toEqual("bye bye merge function");

		try {
			hash.merge({});
		}
		catch (e) {
			error = e;
		}

		expect(error).toNotBe(null);
		expect(error instanceof Error).toBe(true);
	});

});
