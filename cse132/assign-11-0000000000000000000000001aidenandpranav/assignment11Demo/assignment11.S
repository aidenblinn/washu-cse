#include <avr/io.h>
#include "asmMacros.s"  // Include macros to print log messages or a single register
.text


.global slowDivisionUint8
slowDivisionUint8:
  // TODO: uint8_t slowDivisionUint8(uint8_t a, uint8_t b)
  // a = r24, b = r22
  // if a >= b repeat subtraction (brge)
  ldi r18, 0
  ldi r19, 1
  jmp subtract
subtract:
  cp r24, r22
  brlo finish
  sub r24,r22
  add r18,r19
  jmp subtract
finish:
  mov r24, r18
  ret

.global greaterThanOrEqualUInt16
greaterThanOrEqualUInt16:
  // TODO: bool greaterThanOrEqualUInt16(uint16_t a, uint16_t b)
  cp r23, r25
  brlo ifTrue
  cp r23, r25
  breq secondByte
  jmp ifFalse
secondByte:
  cp r22, r24
  brlo ifTrue
  cp r22, r24
  breq ifTrue
  jmp ifFalse
ifTrue:
  ldi r24, 1
  ret
ifFalse:
  ldi r24, 0
  ret


.global slowDivisionUint16
slowDivisionUint16:
  // TODO: uint16_t slowDivisionUint16(uint16_t a, uint16_t b)
  ldi r18, 0
  ldi r19, 0
  ldi r20, 1
  mov r26, r24
  mov r27, r25
  jmp subtract1
subtract1:
  call greaterThanOrEqualUInt16
  cp r24, r1
  breq finish1
  add r18, r20
  adc r19, r1
  mov r24, r26
  mov r25, r27
  sub r24, r22
  sbc r25, r23
  mov r26, r24
  mov r27, r25
  jmp subtract1
finish1:
  mov r24, r18
  mov r25, r19
  ret

.global slowModulusUint8
slowModulusUint8:
  // TODO: uint16_t slowModulusUint8(uint8_t a, uint8_t b)
  mov r26, r24
  mov r18, r0
  call slowDivisionUint8
  mul r24, r22
  mov r24, r0
  mov r25, r1
  mov r0, r18
  ldi r19, 0
  mov r1, r19
  sub r26, r24
  mov r24, r26
  ret

.global sumOddsUint8
sumOddsUint8:
  // TODO uint16_t sumOddsUint8(uint8_t a, uint8_t b)
  mov r21, r22 // max
  mov r31, r24 // min
  ldi r22, 2
  call slowModulusUint8
  ldi r19, 0 // sum
  ldi r25, 0
  cp r1, r24
  breq addOne
  jmp whileLoop
addOne:
  ldi r18, 1
  add r31, r18
  adc r25, r1
whileLoop:
  cp r21, r31
  brsh addToSum
  jmp endLoop
addToSum:
  add r19, r31
  adc r25, r1
  add r31, r22
  jmp whileLoop
endLoop:
  mov r24, r19
  ret
