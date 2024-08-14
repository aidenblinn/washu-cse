package communication;

import java.nio.charset.StandardCharsets;

import jssc.*;

public class MsgReceiver {

	final private SerialComm port;
	
	public enum State {
		infotype, start, info, time, temp, potential, alarm;
	}

	public MsgReceiver(String portname) throws SerialPortException {
		port = new SerialComm(portname);
	}
	

	public void run() {
		// insert FSM code here to read msgs from port
		// and write to console
		double[] temperatures = new double[6];
		int tempNumber = 0;
		State receiveInfo =  State.start;
		while (1 == 1) {
			switch (receiveInfo) {
			
			case start:
				if (port.available() && port.readByte() == '!') {
					receiveInfo = State.infotype;
				}
			
			case infotype: 
				int type = port.readByte();
				if (type == 0x30) {
					receiveInfo = State.info;
				}
				else if (type == 0x32) {
					receiveInfo = State.time;
				}
				else if (type == 0x34) {
					receiveInfo = State.temp;
				}
				else if (type == 0x33) {
					receiveInfo = State.potential;
				}
				else if (type == 0x31) {
					receiveInfo = State.alarm;
				}
			
			case info:
				int a = port.readByte() >> 8;
				int b = port.readByte();
				int length = a | b;
				
				byte[] message = new byte[length];
						
				for (int i = 0; i < length; i++) {
					message[i] = port.readByte();
				}
				
				String byteToString = new String(message, StandardCharsets.UTF_8);
				System.out.println(byteToString);
				receiveInfo = State.infotype;
				break;
			
			case time:
				long time = 0;
				int shiftBy = 24;
				for (int i = 0; i < 4; i++) {
					long timePiece = port.readByte();
					timePiece = timePiece << shiftBy;
					shiftBy -= 8;
					time = time | timePiece;
				}
				receiveInfo = State.infotype;
				break;
			
			case temp:	
				int tempA = port.readByte();
				int tempB = port.readByte();
				int temp = (tempA >> 8) | tempB;
				double actualTemp = ((((double) temp) * 1.1 / 1023.0) - 0.75) * 100.0 + 25.0;
				tempNumber++;
				temperatures[tempNumber % 6] = actualTemp;
				double tempSum = 0;
				int divideBy = 0;
				for (int i = 0; i < 6; i++) {
					if (temperatures[i] != 0)
					tempSum += temperatures[i];
					divideBy++;
				}
				double averageTemp = tempSum / divideBy;
				System.out.println("Raw temperature: " + temp);
				System.out.println("Actual temperature: " + actualTemp);
				System.out.println("Rolling average: " + averageTemp);
				receiveInfo = State.infotype;
				break;
			
			case potential:
				int potA = port.readByte() << 8;
				int potB = port.readByte();
				int pot = potA | potB;
				System.out.println("Potential: " + pot);
				receiveInfo = State.infotype;
				break;
				
			case alarm:
				byte[] alarm = new byte[5];
				for (int i = 0; i < 5; i++) {
					alarm[i] = port.readByte();
				}
				String error = new String(alarm, StandardCharsets.UTF_8);
				System.out.println(error);
			}
		}

	}
	


	public static void main(String[] args) throws SerialPortException {
		MsgReceiver msgr = new MsgReceiver("COM5"); // Adjust this to be the right port for your machine
		msgr.run();
	}
}