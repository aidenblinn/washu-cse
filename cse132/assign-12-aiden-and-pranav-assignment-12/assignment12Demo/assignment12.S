#include <avr/io.h>
#include "asmMacros.s"  // Include macros to print log messages or a single register

.data
globalvar: .byte 0

.text


.global updateGlobal
updateGlobal:
  // TODO: void updateGlobal(byte a)
  ldi r30, lo8(globalvar)
  ldi r31, hi8(globalvar)
  ld r18, Z
  add r18, r24
  st Z, r18
  ret


.global getGlobal
getGlobal:
  // TODO: uint8_t getGlobal()
  ldi r30, lo8(globalvar)
  ldi r31, hi8(globalvar)
  ld r24, Z
  ret


.global cStringLength
cStringLength:
  // TODO: uint8_t cStringLength(const char aString[])
  mov r30, r24
  mov r31, r25
  ldi r24, 0
  ldi r19, 0
  ldi r18, 1
 addOne:
  ld r20, Z+
  cp r20, r19
  breq stringEnd
  add r24, r18
  jmp addOne
 stringEnd:
  ret

.global sumArrays
sumArrays:
  // TODO: void sumArrays(uint8_t *a, uint8_t *b, uint8_t *c, byte length)
  push r28
  push r29
  mov r26, r24
  mov r27, r25
  mov r28, r22
  mov r29, r23
  mov r30, r20
  mov r31, r21
  ldi r19, 0
  ldi r20, 0
  ldi r21, 0
 addArray:
  cp r19, r18
  breq endAddition
  inc r19
  ld r20, X+
  ld r21, Y+
  add r20, r21
  st Z+, r20
  jmp addArray
 endAddition:
  pop r29
  pop r28
  mov r24, r30
  mov r25, r31
  ret

.global dot
dot:
  // TODO uint16_t dot(uint8_t *a, uint8_t *b, byte length)
  push r28
  push r29
  mov r26, r24
  mov r27, r25
  mov r28, r22
  mov r29, r23
  mov r23, r0
  ldi r18, 0
  ldi r19, 0
  ldi r24, 0
  ldi r25, 0
 dotProduct:
  cp r20, r18
  breq endDot
  inc r18
  ld r21, X+
  ld r22, Y+
  mul r21, r22
  add r24, r0
  adc r25, r1
  mov r1, r19
  mov r0, r23
  jmp dotProduct
 endDot:
  pop r29
  pop r28
  ret
