//Fill in the values below with the pins that you chose to use
const int POT_PIN = A0;
const int BUTTON_PIN = 3 ;

const int HOT_PIN = 5;
const int COLD_PIN = 4;
const int DRY_PIN = 6;
const int LOCK_PIN = 13;


void setup() {
  Serial.begin(9600);
  pinMode(3,INPUT_PULLUP);
  pinMode(4,OUTPUT);
  pinMode(5,OUTPUT);
  pinMode(6,OUTPUT);
  pinMode(13,OUTPUT);
}

void loop() {
  digitalWrite(6,LOW);
  digitalWrite(13,LOW);
  if (digitalRead(3)== LOW){
    digitalWrite(13,HIGH);
    if (analogRead(A0)<=341){
      digitalWrite(5,HIGH);
      delay(7000);
      if(analogRead(A0)>=683){
        digitalWrite(5,LOW);
        digitalWrite(6,HIGH);
        delay(2000);
      }
      else{
        digitalWrite(4,HIGH);
        delay(7000);
        digitalWrite(5,LOW);
        digitalWrite(4,LOW);
      
        digitalWrite(6,HIGH);
        delay(7000);
      }
 
    }
    else if (analogRead(A0)>=683){
      digitalWrite(4,HIGH);
      delay(5000);
      digitalWrite(4,LOW);
      if(analogRead(A0)<683){
        digitalWrite(6,HIGH);
        delay(7000);
      }
      else{
        digitalWrite(6,HIGH);
        delay(2000);
      }
    }
    else {
      digitalWrite(5,HIGH);
      delay(7000);
      if(analogRead(A0)>=683){
        digitalWrite(5,LOW);
        digitalWrite(6,HIGH);
        delay(2000);
      }
      else{

        digitalWrite(5,LOW);
     
      
        digitalWrite(6,HIGH);
        delay(7000);
    }
    }
  }
  Serial.println(analogRead(A0));
}
