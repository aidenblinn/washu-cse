package communication;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Scanner;

import jssc.SerialPortException;
public class PCToMorseCode {
	public static void main(String[] args) {		
		// TODO:  Fix this: 
		//           a) Uncomment to create a SerialComm object
		//           b) Update the "the port" to refer to the serial port you're using
		//              (The port listed in the Arduino IDE Tools>Port menu.		
		//           c) Deal with the unresolved issue
		 try {
			SerialComm port = new SerialComm("COM5");
			Scanner in = new Scanner(System.in);
			while (true) {
				String morse = in.nextLine();
				for (int i = 0; i<morse.length();i++) {
					port.writeByte((byte)morse.charAt(i));
				}
			}
			
		} catch (SerialPortException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		
		// TODO: Complete section 6 of the Studio (gather sanitized user input
		//       and send it to the Arduino)
	}

}
