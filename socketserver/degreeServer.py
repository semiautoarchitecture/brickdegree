from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket

class SimpleEcho(WebSocket):

    def handleMessage(self):
        # echo message back to client
        print "we got a msssagatege that said: " + self.data

        self.sendMessage("so you just said to me: " + self.data)


    def handleConnected(self):
        print self.address, 'connected'

    def handleClose(self):
        print self.address, 'closed'

server = SimpleWebSocketServer('', 8001, SimpleEcho)
server.serveforever()

