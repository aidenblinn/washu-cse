#include"MorseCodes.h"

// Argument: Any character
// Return Value: Either:
//                  1) If the character is a letter, the upper case equivalent.
//                  2) If the character is not a letter, the original value.
char toUpper(char c) {
  // TODO
  if ((int)c >= 97 && (int)c <= 122 ) {
    int toInt = (int)c;
    int toCase = toInt - 32;
    char upper = (char)(toCase);
    return upper;
  }
  else {
    return c;
  }
}

void setup() {
  Serial.begin(9600);
  pinMode(13, OUTPUT);
}

bool sD = true;
bool lD = true;
int time = 0;
int i = 0;
String b = "";
int x = 0;

void convertIncomingCharsToMorseCode() {
  // TODO
  time = millis();
  
  if (Serial.available() == 0 && lD == true) {
    x = millis();
    time=millis();
    digitalWrite(13,LOW);
  }
  if (Serial.available() >= 0 && time >= x) {
    if (lD&&sD) {
      char a = Serial.read();
      lD = false;
      sD = false;
      i = 0;
      b = morseEncode(a);
    }
    if (lD == false && sD==true){
      sD=false;
    }
    if (i <= b.length() && time >= x) {
      if (b[i] == '.' && sD == false) {
        digitalWrite(13, HIGH);
        if (time >= x + 500) {
          digitalWrite(13, LOW);
          sD = true;
          i = i + 1;
          x = x + 500 + 500;

        }
      }
      if (b[i] == '-' && sD == false) {
        digitalWrite(13, HIGH);
        if (time >= x + 1500) {
          digitalWrite(13, LOW);
          sD = true;
          i = i + 1;
          x = x + 500 + 1500;
        }
      }
      if (b[i] == ' ' && sD == false) {
        digitalWrite(13, LOW);
        if (time >= x + 2500) {
          digitalWrite(13, LOW);
          sD = true;
          i = i + 1;
          x = x + 500 + 2500;
        }
      }
      if (i == b.length()) {
        lD = true;
        digitalWrite(13, LOW);
        sD=true;
        x = x + 1500;
      }
    }
  }

}


void loop() {
  // No Need to Modify this.  Put most of your code in "convertIncomingCharsToMorseCode()"
  convertIncomingCharsToMorseCode();
}
