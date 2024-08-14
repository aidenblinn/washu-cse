void setup() {
  Serial.begin(9600);
  pinMode(3,OUTPUT);
  pinMode(4,OUTPUT);
  pinMode(5,OUTPUT);
  pinMode(6,OUTPUT);
  pinMode(7,OUTPUT);
  pinMode(8,OUTPUT);
  pinMode(9,OUTPUT);
  pinMode(10,OUTPUT);
}

int greenOne = 0;
int yellowOne = 3000;
int redOne = 4000;

int greenTwo = 5000;
int yellowTwo = 8000;
int redTwo = 9000;

int walk = 10000;

//digitalWrite(3,LOW);
//digitalWrite(4,LOW);
//digitalWrite(5,LOW);
//digitalWrite(6,LOW);
//digitalWrite(7,LOW);
//digitalWrite(8,LOW);
//digitalWrite(9,LOW);
//digitalWrite(10,LOW);

void loop() {

  int time = millis();

  if (time > greenOne and time < yellowOne) {
    digitalWrite(3,HIGH);
    digitalWrite(10,HIGH);
    digitalWrite(9,LOW);
    digitalWrite(5,LOW);
  }
  
  if (time > yellowOne and time < redOne) {
    digitalWrite(3,LOW);
    digitalWrite(4,HIGH);
  }

  if (time > redOne and time < greenTwo) {
    digitalWrite(4,LOW);
    digitalWrite(5,HIGH);
  }

  if (time > greenTwo and time < yellowTwo) {
    digitalWrite(8,LOW);
    digitalWrite(6,HIGH);
  }

  if (time > yellowTwo and time < redTwo) {
    digitalWrite(6,LOW);
    digitalWrite(7,HIGH);
  }

  if (time > redTwo and time < walk) {
    digitalWrite(7,LOW);
    digitalWrite(8,HIGH);
  }

  if (time > walk and time < greenOne + 13000) {
    digitalWrite(10,LOW);
    digitalWrite(9,HIGH);
    
  }

  if (time > greenOne + 13000) {
    greenOne += 13000;
    yellowOne += 13000;
    redOne += 13000;
    greenTwo += 13000;
    yellowTwo += 13000;
    redTwo += 13000;
    walk += 13000;
  }
}
