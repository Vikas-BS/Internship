How Js is executed and Call stack

When we run the pgm a global execution context (GEC) is created.
In GEC we have 2 phases

a. Memory cration phase.(1st phase)

In this phase the memory will bw allocated to every variable and function which is in pgm and name it as undefined.
For every new function it will crate the new execution context, after finishing it delete it and goes for the next process. 

b. Code cration phase.(2nd phase)

Js manges code execution context cration and deletion with the help of the Call Stack.

Call Stack
It helps to keep tarck of the multiple function place in the script.
Call Stack maintains the order of execution of execution contexts. It is also known as Program Stack, Control Stack, Runtime stack, Machine Stack, Execution context stack.

