## A Hash Class for JavaScript

This simple implementation of Hash in JavaScript requires no dependencies and provides the basic implementation:

- Getting/setting values
- Merging in values
- Recursive merging of hashes within hashes
- Iterating over the values with an implementation of `Array#forEach`
- Get an array of all keys

### Example Usage

#### Getting and setting

    var hash = new Hash();
    hash.set("title", "A hash!");
    hash.get("title"); // returns "A hash!"
    hash.title; // equals "A hash!"

    hash.set("merge"); // throws an error, "merge" is a reserved property

#### Setting defaults

    new Hash({
      url: "/products",
      timeout: 3000
    });

#### Chained method calls

    hash.merge({timeout: 3000})
      .merge({url: "/products"});

    var keys = hash.set("foo", "bar")
      .merge({timeout: 3000})
      .filter(function(key, value) {
        return key !== "foo";
      })
      .forEach(function(key, value) {
        // do something with key, value
      })
      .keys();
