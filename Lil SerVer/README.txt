GET - curl http://localhost:8000/status
POST 
	- win - Invoke-WebRequest -Uri http://localhost:8000/update_status -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"status": "Hello, world!"}'
	- other - curl -X POST http://localhost:8000/update_status -H "Content-Type: application/json" -d '{"status": "Hello, world!"}'

how to run
	- open cmd from the current directory <cd /path/to/ur/stupid/misserable/life>
		python server.py
 :((((((