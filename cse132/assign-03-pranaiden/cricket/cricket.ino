/* cricket
 *  
 *  CSE 132 - Assignment 3
 *  
 *  Fill this out so we know whose assignment this is.
 *  
 *  Name: Pranav Bhadharla
 *  WUSTL Key: pranav.bhadharla
 *  
 *  and if two are partnered together
 *  
 *  Name: Aiden Blinn
 *  WUSTL Key: apblinn
 */


void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(3,OUTPUT);
  analogReference(INTERNAL);
}

float temperatures[10];
int i = 0;
int read = 250;
float mean = 0;
bool on = false;
int period = 0;
int time = millis();
bool useLight = true;

void loop() {
  // put your main code here, to run repeatedly:
  time = millis();
  if (time >= read) {
    useLight = true;
    period = getPeriod();
  }
//  light(period);
}

int getPeriod() {
  float voltage = analogRead(A1)/1023.0*1.1;
    temperatures[i%10] = voltage*100-50;
    i+=1;
    read += 250;
    int j = 0;
    float sum = 0.0;
    while (j < 10) {
      sum += temperatures[j];
      j++;
    }
    mean = sum/10.0;
    Serial.print(voltage*100-50);
    Serial.print(',');
    Serial.println(mean);
    float numChirps = ((((mean-10.0)*7.0)+40.0)/60.0);
    int period = (1.0/numChirps)*1000.0;

    if (useLight) {
      light(period);
    }
}

int BLINK_DURATION = 200;

void light(int period){
  
  if (on == false) {
      int offWait = millis() + period - BLINK_DURATION;
      while (time < offWait) {
        time = millis();
        if (time >= read) {

        useLight = false;
        period = getPeriod();
  }
      }
//      on = true;
      digitalWrite(3,HIGH);
      while (time < offWait + BLINK_DURATION) {
        time = millis();
        if (time >= read) {

        useLight = false;
        period = getPeriod();
  }       
      }
      digitalWrite(3,LOW);
//      on = false;
//   if (on == true) {
//      
//    }
  }

  
  
}
