describe("Random data generation", function() {
	var Random;
	
	beforeAll(function() {
		Random = require("./index");
	});
	
	describe("of Strings", function() {
		it("generates a set length string", function() {
			var x, result;
			var pattern = /^[a-zA-Z0-9]+$/;
			
			for(x=0; x<1000; x++) {
				result = Random.string(16);
				expect(result.length).toBe(16);
				expect(pattern.test(result)).toBe(true);
			}
		});
	});
	
	describe("of integers", function() {
		it("generates a number in the set range", function() {
			var x, result;
			
			for(x=0; x<1000; x++) {
				result = Random.integer(10);
				expect(result <= 10).toBe(true);
				expect(result >= 0).toBe(true);
			}
		});
		
		it("generates a number with an offset", function() {
			var x, result;
			
			for(x=0; x<1000; x++) {
				result = Random.integer(10, 5);
				expect(result <= 15).toBe(true);
				expect(result >= 5).toBe(true);
			}
		});
	});
	
	describe("of numbers", function() {
		it("generates a number in the set range", function() {
			var x, result;
			
			for(x=0; x<1000; x++) {
				result = Random.number(10);
				expect(result <= 10).toBe(true);
				expect(result >= 0).toBe(true);
			}
		});
		
		it("generates a number with an offset", function() {
			var x, result;
			
			for(x=0; x<1000; x++) {
				result = Random.number(10, 5);
				expect(result <= 15).toBe(true);
				expect(result >= 5).toBe(true);
			}
		});
	});
	
	describe("of identifiers", function() {
		it("generates a basic ID following defaults", function() {
			var x, result;
			var pattern = /^id:[a-zA-Z0-9]+[0-9]{10,20}$/;
			
			for(x=0; x<1000; x++) {
				result = Random.identifier();
				expect(result.length).toBe(26);
				expect(pattern.test(result)).toBe(true);
			}
		});
		
		it("generates with a custom prefix", function() {
			var x, result;
			var pattern = /^prefix:[a-zA-Z0-9]+[0-9]{10,20}$/;

			for(x=0; x<1000; x++) {
				result = Random.identifier("prefix");
				expect(result.length).toBe(30);
				expect(pattern.test(result)).toBe(true);
			}
		});
		
		it("generates with a set pre-generated length", function() {
			var x, result;
			var pattern = /^prefix:[a-zA-Z0-9]{10}[0-9]{10,20}$/;

			for(x=0; x<1000; x++) {
				result = Random.identifier("prefix", 10);
				expect(result.length).toBe(30);
				expect(pattern.test(result)).toBe(true);
			}
		});
		
		it("generates with a set total length", function() {
			var x, result;
			var pattern = /^prefix:[a-zA-Z0-9]{10}[0-9]{10,20}[a-zA-Z0-9]+$/;

			for(x=0; x<1000; x++) {
				result = Random.identifier("prefix", 10, 32);
				expect(result.length).toBe(39);
				expect(pattern.test(result)).toBe(true);
			}
		});
	});
});
