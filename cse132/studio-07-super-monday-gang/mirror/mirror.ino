int button = 11;
int led = 12;
unsigned long nextTime;
unsigned long delta = 200;
unsigned long onDelta = 1000;
boolean buttonPressed = false;
unsigned int counter = 0;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(led, OUTPUT);
  pinMode(button, INPUT_PULLUP);
}


void loop() {
  // put your main code here, to run repeatedly:  
  
  if(digitalRead(button) == LOW && !buttonPressed) {
    buttonPressed = true;
    nextTime = millis() + onDelta;
    counter++;
    Serial.println(counter);
    digitalWrite(led, HIGH);
  }
  if(millis() > nextTime) {
    digitalWrite(led, LOW);
  }
  if(digitalRead(button) == HIGH) {
      buttonPressed = false;
  }
}
