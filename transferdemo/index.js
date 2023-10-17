const { Worker } = require('worker_threads');

// create a shared buffer
const sharedBuffer = new SharedArrayBuffer(4);
const buffer = new Uint8Array(sharedBuffer);
buffer.fill(5);

console.log('buffer before modify ', buffer);

// create a worker and pass the shared buffer to it
const worker = new Worker('./worker.js', {
    workerData: {sharedBuffer}
}) ;

worker.once('message', () => {
    console.log('buffer after modify: ', buffer);
    // [7,7,7,7]
})

/**
 * the ultimate goal is worker should mutate the buffer directlyw/o needing to copy 
 * it around
 * Great thing when it comes to performance
 * lets say you want to spin off some threads to resize images
 * create  thumbnails convert pdf files and there is lot of things you can do
 * in a very efficient way    
 */