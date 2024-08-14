/* display

    CSE 132 - Assignment 7

    Fill this out so we know whose assignment this is.

    Name:
    WUSTL Key:

    Name:
    WUSTL Key:

*/

#include "font.h"

int buttonStateForward;             // the current reading from the input pin
int buttonStateBackward;
int lastButtonStateForward = HIGH;   // the previous reading from the input pin
int lastButtonStateBackward = HIGH;
int Ascii = 0;

unsigned long lastDebounceTime = 0;  // the last time the output pin was toggled
unsigned long debounceDelay = 50;
void setup () {
  // insert code here as needed
  for (int i = 2; i < 14; i++) {
    pinMode(i, OUTPUT);
  }
  Serial.begin(9600);
  pinMode(A0, INPUT_PULLUP); // forward one ASCII character
  pinMode(A1, INPUT_PULLUP); // backward one ASCII character
}
void loop () {

  lightUp(1);
  lightUp(2);
  lightUp(3);
  lightUp(4);
  lightUp(5);
  debounceForward();
  debounceBackward();
  int forward = analogRead(A0);
  int back = analogRead(A1);

}

void debounceForward() {
  int readingForward = digitalRead(A0);
  if (readingForward != 0 ) {
    readingForward = 1;
  }
  if (readingForward != lastButtonStateForward) {
    lastDebounceTime = millis();
  }
  if ((millis() - lastDebounceTime) > debounceDelay) {

    if (readingForward != buttonStateForward) {
      buttonStateForward = readingForward;
      if (buttonStateForward == 0) {
        Ascii = Ascii + 1;
      }
      if (Ascii==96){
        Ascii=0;
      }
    }
  }
  lastButtonStateForward = readingForward;
}

void debounceBackward() {
  int readingBackward = digitalRead(A1);
  if (readingBackward != 0 ) {
    readingBackward = 1;
  }
  if (readingBackward != lastButtonStateBackward) {
    lastDebounceTime = millis();
  }
  if ((millis() - lastDebounceTime) > debounceDelay) {
    if (readingBackward != buttonStateBackward) {
      buttonStateBackward = readingBackward;
      if (buttonStateBackward == 0) {
        Ascii = Ascii - 1;
      }
      if (Ascii == -1) {
        Ascii=95;
      }
    }
  }
  lastButtonStateBackward = readingBackward;
}

void lightUp(int column) {
    digitalWrite(9,HIGH);
    digitalWrite(10,HIGH);
    digitalWrite(11,HIGH);
    digitalWrite(12,HIGH);
    digitalWrite(13,HIGH);
  for (int i = 0; i < 7; i++) {
    int shift = 7 - i;
    int rownum = i + 1;
    unsigned char row = font_5x7[Ascii][column - 1];
    row = row >> shift;
    unsigned char one = 1;
    unsigned char compare = row & one;
    if (compare == 1) {
      digitalWrite(i + 2, HIGH);
      Serial.println("on");
    }
    else {
      digitalWrite(i + 2, LOW);
      Serial.println("off");
    }
  }
  int previous = 0;
  digitalWrite(column + 8, LOW);
  delay(4);
}
