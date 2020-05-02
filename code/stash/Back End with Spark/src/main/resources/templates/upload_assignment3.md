# Assignment 3: Http Proxy Server

In this assignment, you will create a proxy cache server. Instead of connecting to the destination, the client will connect to your proxy server and ask for the resource. Your server will check if it has locally cached the demanded resource. If so, it should directly return it to the client. If not, the server will ask for the resource on the client's behalf, cache it locally, then return it to the client.

## Deliverable

You should only submit a file `server.py` that can be run as follows:
```bash
python3 server.py <bind_adr> <bind_port>
```

A sample use:
```bash
python3 server.py 127.0.0.1 6000
```

Clients connect to this server and make requests by using the url `http://<bind_adr>:<bind_port>/<resource_address>`. For instance, `http://127.0.0.1:6000/www.google.com`. You can assume that the address doesn't end with a `/`.

The server should parse the connection message, figure out what resource the client's asking, and search if the resource has been cached. If so, the server should return the content of the file.

If the source hasn't been cached, the server needs to remotely fetch the resource, cache it (by saving it to the local file directory), and returns the content to the client in the exact form of what the server sent you. You're largely on your own for this part, and you can do whatever you want as long as you only use Python standard library.

## Note:
1. Just as last time, we will be requesting resources that are larger than 1024 bytes. Make sure that when your proxy server receives the resource from remote servers, it can take long messages.

2. You don't have to worry about abridged domains. For instance, you can treat "www.google.com" and "google.com" as two different resources in your cache.

3. Please note that we will be directly comparing the message we get from your proxy server with the original resource. You will fail the test case even if you're missing some line breaks, or have additional whitespaces, etc. So please make sure that your proxy server is serving the exact same content.

4. However you're caching your files, you don't need to ensure that the caches persist across processes. That is, if you first ran your proxy server, received and cached the content for `www.google.com`, and then stopped the server, when you start it and receive another request for `www.google.com`, you can consider the previous cache didn't exist and create a new cache.

## Starter Code

Here's some boilerplate code to get you started: You don't need to use this at all: as long as your program meets the specification above you're good. This is only provided to help you get a sense of what you need to do.

NOTE: We're rewriting the boilerplate code from the book so they follow modern Python 3 coding conventions. We're trying our best to make sure the code is correct but there might be small errors. Please let us know ASAP if you suspect something's wrong. Thanks!
```python
from socket import *
import sys
import os.path

if len(sys.argv) <= 2:
    print('Usage : "python3 ProxyServer.py server_ip server_port"\n[server_ip : It is the IP Address Of Proxy Server\n server_port: Port of Proxy Server]')
    sys.exit(2)

with socket(AF_INET, SOCK_STREAM) as tcpSerSock:
    address = None
    port = None
    # TODO: Read in address and port from command line arguments.

    tcpSerSock.bind((address, port))
    tcpSerSock.listen()

    while 1:
        tcpCliSock, addr = tcpSerSock.accept()

        with tcpCliSock:
            message = tcpCliSock.recv(1024).decode()
            resource_name = "/" + message.split()[1].split('/', 1)[1] # Extract the filename from the given message

            if True: #TODO: Some check to see if the content is cached
                # Content is cached. We fetch it and send it back.
                    filename = None
                    with open(filename, "br") as fp:
                        data = fp.read()
                        # TODO: Send the data, or, depending on how you're caching things, you might need some additional checks.
            else:
                #No cache is found. We need to fetch the resource from remote data.
                with socket(AF_INET, SOCK_STREAM) as remote_s:
                    remote_s.connect((resource_name[1:], 80))
                    remote_s.send(('GET / HTTP/1.0\r\n\r\n').encode())
                    #TODO: Receive the data. Cache it. Send it back to the client.
```

