/*

    CSE 132 - Assignment 6

    Fill this out so we know whose assignment this is.

    Name:Pranav Bhadharla
    WUSTL Key:pranav.bhadharla

    and if two are partnered together

    Name:Aiden Blinn
    WUSTL Key:apblinn
*/

unsigned long time = 0;
const long delta = 1000;
unsigned long ending = 1000;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  analogReference(INTERNAL);
  pinMode(A0, INPUT);
  pinMode(A1, INPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  time = millis();
  if (time > ending) {
    infoToJava("message");
    timeToJava();
    tempToJava();
    potentialToJava();
    alarmToJava();
    time = time + delta;
  }
}

void infoToJava(char* message) {
  int length = message.length();
  Serial.write('!');
  Serial.write(0x30);
  Serial.write(length >> 8);
  Serial.write(length);
  for(int i = 0; i < length; i++) {
    Serial.write(message[i]);
  }
}

void timeToJava() {
  Serial.write('!');
  Serial.write(0x32);
  Serial.write(time >> 24);
  Serial.write(time >> 16);
  Serial.write(time >> 8);
  Serial.write(time);
}

void tempToJava() {
  Serial.write('!');
  Serial.write(0x34);
  /* insert analog pin here */
  Serial.write(analogRead(A1) >> 8);
  Serial.write(analogRead(A1));
}

void potentialToJava() {
  Serial.write('!');
  Serial.write(0x33);
  /* insert analog pin here */
  Serial.write(analogRead(A0) >> 8);
  Serial.write(analogRead(A0));
}

void alarmToJava() {
  if (analogRead(A0) > 900) {
    Serial.write('!');
    Serial.write(0x31);
    char* alarmMessage = "alarm"
    for (int i = 0; i < 5; i++) {
      Serial.write(alarmMessage[i]);
    }
  }
}
