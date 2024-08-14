void setup() {  
  Serial.begin(9600);
  pinMode(3,OUTPUT);
  pinMode(5,OUTPUT);
  pinMode(7,OUTPUT);
  pinMode(9,OUTPUT);
}
void loop() {
    if(Serial.available() > 0) {
      digitalWrite(3,LOW);
      digitalWrite(5,LOW);
      digitalWrite(7,LOW);
      digitalWrite(9,LOW);
      
      int myVar = (int)Serial.read();
      if (myVar>=48 && myVar<=57){
        myVar=myVar-48;      
      }
      else if (myVar>=97&&myVar<=102){
        myVar=myVar-87;      
      }
      if (myVar ==15){
      digitalWrite(3,HIGH);
      digitalWrite(5,HIGH);
      digitalWrite(7,HIGH);
      digitalWrite(9,HIGH);
      }
      if (myVar ==14){
      digitalWrite(3,HIGH);
      digitalWrite(5,HIGH);
      digitalWrite(7,HIGH);
      }
      if (myVar ==13){
      digitalWrite(3,HIGH);
      digitalWrite(5,HIGH);
      digitalWrite(9,HIGH);
      }
      if (myVar ==12){
      digitalWrite(3,HIGH);
      digitalWrite(5,HIGH);
      }
      if (myVar ==11){
      digitalWrite(3,HIGH);
      digitalWrite(7,HIGH);
      digitalWrite(9,HIGH);            
      }
      if (myVar ==10){
      digitalWrite(3,HIGH);
      digitalWrite(7,HIGH);
      }
      if (myVar ==9){
      digitalWrite(3,HIGH);
      digitalWrite(9,HIGH);
      }
      if (myVar ==8){
      digitalWrite(3,HIGH);
      }
      if (myVar ==7){
      digitalWrite(5,HIGH);
      digitalWrite(7,HIGH);
      digitalWrite(9,HIGH);
      }
      if (myVar ==6){
      digitalWrite(5,HIGH);
      digitalWrite(7,HIGH);
      }      
      if (myVar ==5){
      digitalWrite(5,HIGH);
      digitalWrite(9,HIGH);
      }
      if (myVar ==4){
      digitalWrite(5,HIGH);
   
      }  
      if (myVar ==3){
      digitalWrite(7,HIGH);
      digitalWrite(9,HIGH);
      }  
      if (myVar ==2){
      digitalWrite(7,HIGH);
      }
      if (myVar ==1){
      digitalWrite(9,HIGH);
      }                 
      delay(1000);
      Serial.println(myVar); 
    }

  
}


  
  
