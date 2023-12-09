# FN Lang
---
## The 100% Functional language
If it doesn't function properly, it's your fault.

## What is it?
FN is an esoteric programing language that i wrote in one day.
It takes functional programming to it's limit.

## Syntax
### Variables
Variables can be defined as follows:
```FN
[{name}] {value}

? An example variable
[example] a: b: a(b)
```
The variable name is in square brackets, followed by it's value.
All variables are immutable, unless the identifier is followed by '!'.

### Functions
What would a functional programming language be without functions?

Functions are defined like this:
```FN
{arg}: {return}

? Example: Set the value of test to a function that accepts an argument x and returns it back
[test] x: x
```

You can call functions like in most other languages:
```FN
? Define the function 'hey'
[hey] val: val
? Call hey in the function main
[main] x: hey(x)
```

### Comments
As you may have noticed, comments are anything after a '?'.
Example: 
```FN
? This is a really cool and nice function
[cool] nice: nice
```

### The main function
This is the only function required for the code to run. 
It is the first thing to be called when the program runs.

### Packages
While functions might be cool, maybe you don't want to have to write some code yourself.
That's why packages exist! You can import them and use their code even though you never wrote it.
A package can be imported like so:
```FN
@packageName
```

This works simular to C's '#include' and just pastes the code from the package, instead of the import statement.

There's currently only support for packages inside the Standard Library.

### Raw
_Warning: Raw is only meant to be used for packages!_

If you ever need to enter raw JavaScript, you can using raw. 
Just be warned, it can be unstable. (The JS not Raw)
Just put any JS code between two '%' symbols and it'll be compiled as JS.

Example:
```FN
%
function thingInJs(arg) {
    console.log(arg);
}
%

? Run the function defined in JS
[main] x: thingInJs(x)
```

## Standard Library

### @bool
 - [true]    | Represents a True boolean value
 - [false]   | Represents a False boolean value
 - [and]p:q: | Takes in two booleans and returns their logical AND
 - [or] p:q: | Takes in two booleans and returns their logical OR
 - [not]p:q: | Takes in one boolean and returns it's logical NOT
 - [xor]p:q: | Takes in two booleans and returns their logical XOR

### @pair
 - [pair] a:b: | Represents an ordered pair. Takes in two values and returns their pair
 - [first]p:   | Takes in a pair and returns it's first element
 - [last] p:   | Takes in a pair and returns it's last element

### @natural
 - [0-9]     | Represents the first ten natural numbers (including 0)
 - [add]m:n: | Takes in two natural numbers and returns their sum
 - [mul]m:n: | Takes in two natural numbers and returns their product

### @int _Warning: This package might not work Idk_
 - [0-9]     | Represents the first ten positive integers (including 0)
 - [neg]k:   | Takes in an integer and negates it
 - [add]k:l: | Takes in two integers and returns their sum
 - [sub]k:l: | Takes in two integers and returns their difference
 - [mul]k:l: | Takes in two integers and returns their product

### @io
 - [logBool]b: | Logs a boolean to the console
 - [logPair]p: | Logs a pair to the console
 - [logNat]n:  | Logs a natural number to the console
 - [logInt]i:  | Logs an integer to the console
