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
- docker build -t dockeroperations .
- docker run -p 8080:8080 dockeroperations .
- docker stop dockeroperations

(se cambio el enlace de Server hacia el archivos server.js y de regreso a app.js)

- docker tag dockeroperations coffeyor/dockeroperations:1.0.0
- docker push coffeyor/dockeroperations:1.0.0
- curl.exe -LO https://dl.k8s.io/release/v1.25.0/bin/windows/amd64/kubectl.exe

- kubectl apply -f kubeusers.yaml
- minikube service kubeservice
- minikube service list
- kubectl get deployments
- kubectl delete service <nombre del servicio>