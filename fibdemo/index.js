const { Worker } = require('worker_threads');

const doFib = async (iterations) => {
    return new Promise((resolve, reject) => {
        const start = Date.now()

        // -- start worker
        const worker = new Worker('./fib.js', {
            workerData: {
                iterations
            }
        })

        // --- Listen for messages from worker
        worker.once('message', (data) => {
            console.log(`worker [${worker.threadId}]: done in ${Date.now() - start}ms`);
            resolve(data);
        })

        // --- Listen for error from worker
        worker.once('error', err => reject(err))
    })
}

const main = async () => {
    try {
        const start = Date.now()

        const values = await Promise.all([
            doFib(40),
            doFib(40),
            doFib(40),
            doFib(40),
            doFib(40),
            doFib(40),
            doFib(40),
            doFib(40),
            doFib(40),
            doFib(40),
        ])

        console.log('values:  ', values);

        console.log(`ALL DONE in ${Date.now() - start}ms`);
    } catch (error) {
        console.error('Error in worker catch', error)
    }
}

main().catch(console.error);

/**
 * This suggests that these didnt invoke one at a time sequentially but concurrently on different thread of execution
 * because it didnt block the entire app
 * worker actually do create new threads. This is not same as using fork,
 * because fork creates a new child process which has lot of memory overhead.
 * Also it is very slow to spin those up
 * If you want to spin up a lot of processes on the fly, it's not gonna be very performant
 * This is true multi-threading. passing messages between threads is a popular way of doing 
 * multithreading.
 * 
 * One of the issues using worker threads is little bit different than multithreading
 * 
 * Worker thread runs in its own context. It has its own block of memory.
 * Let's say you have one or two GB memory and you want to pass that to a worker thread
 * and perform some transformations and pass it back to main thread. That's a lot of data transfer
 * especially in a server environment
 * so what you generally wann do with performance is not necessarily copy 
 * the data around but rather pass the ownership of data 
 * you want to share memory between threads and fortunately there is a way to do that
 * with worker threads
 */
