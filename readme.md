# chnk

Split a binary data stream into equal size chunks

## Install

`npm install chnk`

## Usage

`chnk(<size>)` - returns a transform stream that reads from a stream of variable length buffers and writes a stream of fixed length chunks of `size` bytes;

## Example

``` javascript

var chnk = require("chnk");

process.stdin.pipe(chnk(32)).on("data", function(buf){
	console.log("received: "+buf.toString("hex"));
}).on("error", function(err, buf){
	console.log(err.toString(), buf.toString("hex"));
}).on("end", function(){
	console.log("done.");
});

```

## License

[Unlicense](https://unlicense.org/UNLICENSE)