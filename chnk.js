#!/usr/bin/env node

var stream = require("stream");

function chnk(size) {
	return (this instanceof chnk) ? (function(self){
		
		// check chunk size
		if (typeof size !== 'number' || size === 0) throw new Error('Invalid chunk size');
		
		// allocate initial buffer
		self.mem = Buffer.allocUnsafe(0); 

		// return transform stream 
		return (new stream.Transform({
			transform(chunk, encoding, done) {
			
				// concatenate residue chunk with incoming data
				self.mem = Buffer.concat([self.mem, chunk]);

				// check if memory still holds another chunk
				while (self.mem.length >= size) {

					// get chunk from memory and push to stream
					this.push(self.mem.slice(0,size));

					// remove chunk from memory
					self.mem = self.mem.slice(size);
				
				}
				
				done();
			},
			flush(done) {
				
				// if there is still data in memory, total stream size wasn't a multiple of size
				if (self.mem.length !== 0) this.emit('error', new Error('Input Stream ended unaligned: '+self.mem.length+' bytes remaining'), self.mem);

				done();
			}
		}));
		
	})(this) : new chnk(size);
};

module.exports = chnk;
