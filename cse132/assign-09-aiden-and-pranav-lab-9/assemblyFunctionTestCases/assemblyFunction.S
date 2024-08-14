#include <avr/io.h>


  
//boolean hasAOne(byte num)
.global hasAOne
hasAOne:
  ldi r18, 0
  cpse r18, r24 // skips next line if r24 = 0
  ldi r18, 1
  ldi r24, 0
  add r24, r18 // stores 1 into 24
  ret
  
//char byteToAscii(byte num);
.global byteToAscii
byteToAscii:
  ldi r18, 48
  add r24, r18
  ret  
  
//int int8ToInt(int8_t num);
.global int8ToInt
int8ToInt:
  ldi r25, 0
  ldi r31, 255
  sbrc r24, 7
  add r25, r31
  ret
  
//int addInt8ToInt(int8_t num1, int num2);
.global addInt8ToInt
addInt8ToInt:
  call int8ToInt
  add r24, r22
  adc r25, r23
  ret

//int add4Int8(int8_t num1, int8_t num2, int8_t num3, int8_t num4);
.global add4Int8
add4Int8:
  call int8ToInt
  mov 26, 22
  mov 27, 23
  mov 22, 24
  mov 23, 25
  mov 24, 26
  mov 25, 27
  call addInt8ToInt
  mov 22, 24
  mov 23, 25
  mov 24, 20
  mov 25, 21
  call addInt8ToInt
  mov 22, 24
  mov 23, 25
  mov 24, 18
  mov 25, 19
  call addInt8ToInt
  ret

//int average(byte num1, byte num2)
.global average
average:
  add r24, r22
  ror r24
  ret
