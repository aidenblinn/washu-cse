package communication;

import jssc.*;

public class SerialComm {

	SerialPort port;

	private boolean debug;  // Indicator of "debugging mode"
	
	// This function can be called to enable or disable "debugging mode"
	void setDebug(boolean mode) {
		debug = mode;
	}	
	

	// Constructor for the SerialComm class
	public SerialComm(String name) throws SerialPortException {
		port = new SerialPort(name);		
		port.openPort();
		port.setParams(SerialPort.BAUDRATE_9600,
			SerialPort.DATABITS_8,
			SerialPort.STOPBITS_1,
			SerialPort.PARITY_NONE);
		
		debug = true; // Default is to NOT be in debug mode
	}
		
	// TODO: Add writeByte() method that you created in Studio 5
	public void writeByte(byte byte1) {
		try {
			port.writeByte(byte1);
			if (debug==true) {
				int x = (int)byte1;
				String hex = Integer.toHexString(x);
				System.out.println("<0x" + hex + ">");
			}			
			}
		catch (SerialPortException e) {
			e.printStackTrace();				
		}
	}
	
}
