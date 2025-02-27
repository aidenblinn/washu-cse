package communication;

import jssc.*;

public class SerialComm {

	static SerialPort port;
	static String x[];

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

	// TODO: Add writeByte() method from Studio 5
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
	// TODO: Add available() method
	public boolean available() {
		try {
			if (port.getInputBufferBytesCount()==0) {

				return false;
			}
		} catch (SerialPortException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return true;
	}
	// TODO: Add readByte() method
	public byte readByte() {
		try {
			byte y= port.readBytes(1)[0];
			return y;
		} catch (SerialPortException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return 0;
	}
	// TODO: Add a main() method

	public static void main(String[] Args) {


	}
}