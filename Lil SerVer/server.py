import http.server
import socketserver
import json

PORT = 8000
status_message = "No data received"

class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/status':
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"status": status_message}).encode())
        else:
            super().do_GET()

    def do_POST(self):
        global status_message
        if self.path == '/update_status':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)
            status_message = data.get("status", "No object detected")
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"status": "received"}).encode())
        else:
            self.send_response(404)
            self.end_headers()

handler_object = MyHttpRequestHandler

with socketserver.TCPServer(("", PORT), handler_object) as httpd:
    print("Server started at localhost:" + str(PORT))
    httpd.serve_forever()
