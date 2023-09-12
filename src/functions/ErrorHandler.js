/* eslint-disable no-unused-vars */
const { client } = require("..");

async function errors() {
	process.on("unhandledRejection", async (error) => {
		// ! no need to flush its simmlar to timeout 
		//console.log(error)
	});

	process.on("uncaughtException", async (error) => {
		// ! no need to flush its simmlar to timeout 
		//console.log(error)
	});

	process.on("warning", (error) => {
		//console.log(error)
	});

	process.on("uncaughtExceptionMonitor", (err, origin) => {
		//console.log(err)
	});

	client.on("error", (error) => {
		//console.log(error)
		// ! no need to flush its simmlar to timeout 
	});
}

module.exports = errors;