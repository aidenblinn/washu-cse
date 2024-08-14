#include <avr/io.h>

; AVR assembly comments start with a semicolon
// (or a double slash, like C)
; Lines without labels should be indented once.

; You can "call printRegs" in your code to help you understand the register values and how they change.

.global giveMeMax
giveMeMax:
  ldi r24, 255 // Load the value 1 into register 24
  ret

// Define further "functions" below:
// .global functionName
// functionName:
//    *code*
//   ret
.global giveMeZero
giveMeZero:
//  call printRegs
  ldi r24, 0
//  call printRegs
  ret
.global addFour
addFour:
  ldi r18, 4
  add r24, r18
  ldi r25, 0
  ret
