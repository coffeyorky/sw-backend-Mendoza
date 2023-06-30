link a mongo desde app:
mongodb+srv://Coffeyorky:<password>@cluster0.j69jxej.mongodb.net/?retryWrites=true&w=majority
***
#sw-backend-Mendoza

Estado del proyecto: en desarrolllo

//nvm
nvm list
nvm list available
nvm install 18.12.1

//Artillery
- artillery quick --count 40 --num 50 "http://localhost:8080/pruebas/senc" -o simple.json
- artillery quick --count 40 --num 50 "http://localhost:8080/pruebas/comp" -o compleja.json
- artillery run config.yaml --output testPerformance.json
- artillery report testPerformance.json -o testResult.html
- docker build -t dockeroperations1 .
- docker run -p 8080:8080 dockeroperations1 .
- docker stop dockeroperations1
