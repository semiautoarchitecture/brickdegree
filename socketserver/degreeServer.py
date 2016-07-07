from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket
#from threading import Timer
from OSC import OSCClient, OSCMessage


global osc_client

osc_client = OSCClient()
osc_client.connect( ("192.168.1.154", 8003) )

class SimpleEcho(WebSocket):

    def handleMessage(self):
        global osc_client
        # echo message back to client
        print "we got a msssagatege that said: " + self.data

        try: 
#            osc_client.send( OSCMessage("/user/2", [2.0, 3.0, 4.0 ] ) )

            oscmsg = OSCMessage()
            oscmsg.setAddress("/startup")
            oscmsg.append(str(self.data))
            osc_client.send(oscmsg)

    

        except Exception, e:
            print "sending osc message didn't work: " + str(e) 

        self.sendMessage("so you just said to me: " + self.data)

    def handleConnected(self):
        print self.address, 'connected'

    def handleClose(self):
        print self.address, 'closed'

server = SimpleWebSocketServer('', 9001, SimpleEcho)




server.serveforever()

