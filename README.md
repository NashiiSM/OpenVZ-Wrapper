# OpenVZ Wrapper
A node js function wrapper. Written by Nashii

* Very Strict Syntax

How to create a container (ubuntu 18.04)
```javascript
var openvz_function_wrapper = require("./OpenVZFW.js");
const openvz = new openvz_function_wrapper();

openvz.run_command("create(1, ubuntu18.04_x86_64)");
```
or, simply run 
```
node WrapperTest.js
```
then type
```
create(1, osname)
```

The wrapper only supports commands with one argument and the create command.
This wrapper is still in development.
