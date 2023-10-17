function fibonacci(n) {
    return n < 1 ? 0
        : n < 2? 1
        : fibonacci(n - 1) + fibonacci(n - 2);
}

const doFib = (iterations) => new Promise((resolve) => {
    const start = Date.now();
    const result = fibonacci(iterations);
    console.log(`doFib done in ${Date.now() - start}ms`);
    resolve(result);
})

const main = async () => {
    
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

    console.log(`fib done synchronously in ${Date.now() - start}ms`);
}

main().catch(console.error);

/**
 * bad in server environment. didnt execute all concurrently, 
 * but executed synchronously one at a time.
 * 
 * why? 
 *  Because in JS, you just cant take a synchronous function & 
 * wrap it in an asynchronous promise.
 * 
 * so this is a big problem in single thread server environment. 
 * If you do  any CPU intensive calculations, it will block the entire event loop 
 * which inturn blocks entire app & that's especially bad in the server environment.
 */
