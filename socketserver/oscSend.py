from OSC import OSCClient, OSCMessage

client = OSCClient()
client.connect( ("localhost", 7110) )
oscmsg = OSCMessage()
oscmsg.setAddress("/startup")
oscmsg.append('HELLO')
client.send(oscmsg)




