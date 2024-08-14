
void setup() {
  Serial.begin(9600);
  int x = 0;
  pinMode(13, OUTPUT);
}
int x = 0;
void loop() {
  delay(900);
  digitalWrite(13, HIGH);
  Serial.print(x);
  Serial.println(" sec have elapsed ");
  delay(100);
  digitalWrite(13, LOW);
  x = x + 1;
  Serial.println(millis());
}
