const chess = require("../chess.js");
const assert = require("deep-equal");

module.exports = class TestCase {

	constructor(expected,testName) {
		this.expected = expected;
		this.name = testName;
		this.message;
	}

	scenario() {}

	test() {
		var scen = this.scenario();

		if (assert(scen, this.expected)) {
			console.log("\x1b[32m%s\x1b[0m", this.name + ": Success");
		} else {
			console.log("\x1b[31m%s\x1b[0m", this.name + ": Failed");
			console.log("Expected: ");
			console.log(this.expected);
			console.log("Actual: ");
			console.log(scen);
		}

	}

}
