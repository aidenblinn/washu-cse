#include <avr/io.h>
#include "asmMacros.S"


// TODO: Complete functions!

.global lessThan
lessThan:
  cp 24,22
  brlt iffalse
  ldi 24,0
  ret
iffalse:
  ldi 24,1
  ret

.global lessThanOrEqualUnsigned
lessThanOrEqualUnsigned:
  cp 22,24
  brlo greater
  ldi 24,1
  ret
greater:
  ldi 24,0
  ret

.global slowMultiply
slowMultiply:
  ldi 18,1 //incrementer
  ldi 19,0 //counter
  ldi 21,0 //sum
while:
  cp 22,19
  breq whileend
  add 19,18
  add 21,24
  jmp while
whileend:
  mov 24,21
  ret

.global slowExponent
slowExponent:
  ret
