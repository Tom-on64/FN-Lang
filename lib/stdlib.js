// λ-Calculus in JavaScript
// Prototypes
Function.prototype.boolean = function() { return this(true)(false); }
Function.prototype.pair    = function() { return [this(a=>b=>a), this(a=>b=>b)]; }
Function.prototype.natural = function() { return this(x=>x+1)(0); }
Function.prototype.integer = function() { return this.pair()[0].natural() - this.pair()[1].natural(); }

// Logic
True  = a => b => a
False = a => b => b

and = p => q => p(q)(False)
or  = p => q => p(True)(q)
not = p => p(False)(True)
xor = p => q => p(not(q))(q)

// Pairs
pair  = a => b => p => p(a)(b)
first = p => p(True)
last  = p => p(False)

// Mathematics

// Natural Numbers
zeroN  = f => x => x
suc    = n => f => x => f(n(f)(x))
oneN   = suc(zeroN)
twoN   = suc(oneN)
threeN = suc(twoN)
fourN  = suc(threeN)
fiveN  = suc(fourN)
sixN   = suc(fiveN)
sevenN = suc(sixN)
eightN = suc(sevenN)
nineN  = suc(eightN)

addN = m => n => f => x => m(f)(n(f)(x))
mulN = m => n => f => m(n(f))

// Integers
neg = k => pair(last(k))(first(k))
add = k => l => pair(addN(last(k))(last(l)))(addN(first(k))(first(l)))
sub = k => l => pair(addN(last(k))(last(neg(l))))(addN(first(k))(first(neg(l))))

zero   = pair(zeroN)(zeroN)
one    = pair(zeroN)(oneN)
two    = pair(zeroN)(twoN)
three  = pair(zeroN)(threeN)
four   = pair(zeroN)(fourN)
five   = pair(zeroN)(fiveN)
six    = pair(zeroN)(sixN)
seven  = pair(zeroN)(sevenN)
eight  = pair(zeroN)(eightN)
nine   = pair(zeroN)(nineN)
nOne   = neg(one)
nTwo   = neg(two)
nThree = neg(three)
nFour  = neg(four)
nFive  = neg(five)
nSix   = neg(six)
nSeven = neg(seven)
nEight = neg(eight)
nNine  = neg(nine)

console.log(sub(eight)(nEight).integer()) // 8 - (-8) = 16

/* 
Multiplication
mult 2 2 => λf.λx. f f f f x
2 = λf.λx. f(f(x))

add  = λm.λn.λf.λx m f (n f x)
mult = λm.λn.λf. m (n f)
*/
