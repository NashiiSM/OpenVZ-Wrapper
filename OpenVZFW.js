const fs = require("fs");

//const path = require("path");
//const node_ssh = require("node-ssh");
//const ssh = new node_ssh();

// was going to connect to an ssh client and run commands but not anymore, you can add if wanted.

const child_process = require('child_process');
const exec = child_process.exec;
const spawn = child_process.spawn;

'use strict';

let os_id = "";

function create_container(id, os_file_name){
	let function_ret = exec("vzctl create --id " + id + " --os " + os_file_name, (error, stdout, stderr) => {
		if(error == null || error.length < 1 )
		{
			console.log(`${stdout}`) 
			os_id = id;
			return 1;
		}
		else
		{
			console.log(`${error}`);
			return 0;
		}
	});
}

function function_handler(call_method, value_to_assign)
{
	let function_ret = exec("vzctl" + os_id + " --" + call_method + " " + value_to_assign, (error, stdout, stderr) => {
		if(error == null || error.length < 1 )
		{
			console.log(`${stdout}`) 
			return 1;
		}
		else
		{
			console.log(`${error}`);
			return 0;
		}
	});
}

function replace_all(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

class OpenVZ
{
	constructor(){ };
	
	run_command(full_string)
	{
		if(full_string.length <= 3)
		{
			throw new Error("syntax error: read the documenation (https://github.com/NashiiSM/OpenVZ-Wrapper)");
		}
		
		let split_string = full_string.split("(");
		let method = split_string[0];
		var args = split_string[1];
		
		args = args.slice(0, -1);
		args = replace_all(args, ',', '');
		
		let args_array = args.split(" ");
		
		if(method.toLowerCase() == "create")
			create_container(args_array[0], args_array[1]);
		else
			function_handler(method, args_array[0]);
		
		return 1;
	}
}

module.exports = OpenVZ;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////