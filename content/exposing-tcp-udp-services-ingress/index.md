---
title: "Ingress Exposing TCP Services"
date: "2021-06-16"
coverImage: "banner.png"
author: "Kunal Saini"
tags: ["Engineering", "Ingress", "Kubernetes", "Helm Charts"]
description: "A guide explains how to expose tcp and udp services running in your cluster, through the ingress controller"
---

Ingress does not support TCP or UDP services. For this reason this Ingress controller uses the flags `--tcp-services-configmap` and `--udp-services-configmap` to point to an existing config map where the key is the external port to use and the value indicates the service to expose using the format: `<namespace/service name>:<service port>:[PROXY]:[PROXY].`

[This guide](https://kubernetes.github.io/ingress-nginx/user-guide/exposing-tcp-udp-services/) is describing how it can be achieved but doing this through your deployement chart is different.

Following guide assumes you have a fresh cluster with no NGINX Ingress installed.

### Install NGINX Ingress using Helm
Follwing commands will install NGINX Ingress using Helm to the default namespace where `nginx` is being the release name and `ingress-nginx/ingress-nginx` is the repo.

#### Install helm 3
```
curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 | bash
```

#### Add Ingress repo
```sh
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
```

#### Install NGINX Ingress on default namespace
```
helm repo update
helm install nginx ingress-nginx/ingress-nginx
```

### Deploy your application

Here we are going to deploy an SMTP application and it's service to **587** port as ClusterIP type and then to expose it later using our ingress.
Remember to replace the `<IMAGE>` value below. 

> deployment.yaml
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: smtp-chart
  labels:
    helm.sh/chart: chart-0.10.0
    app.kubernetes.io/name: chart
    app.kubernetes.io/instance: smtp
    app.kubernetes.io/version: "0.1.0"
    app.kubernetes.io/managed-by: Helm
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: chart
      app.kubernetes.io/instance: smtp
  template:
    metadata:
      labels:
        app.kubernetes.io/name: chart
        app.kubernetes.io/instance: smtp-develop
    spec:
      imagePullSecrets:
        - name: registry-secret
      containers:
        - name: chart
          image: "<IMAGE>"
          env: 
          imagePullPolicy: 
          ports:
            - containerPort: 587
              protocol: TCP
          livenessProbe:
            tcpSocket:
              port: 587
          readinessProbe:
            tcpSocket:
              port: 587
```

> service.yaml
```yaml
apiVersion: v1
kind: Service
metadata:
  name: smtp-chart
  labels:
    helm.sh/chart: chart-0.10.0
    app.kubernetes.io/name: chart
    app.kubernetes.io/instance: smtp
    app.kubernetes.io/version: "0.1.0"
    app.kubernetes.io/managed-by: Helm
spec:
  type: ClusterIP
  ports:
    - port: 587
      targetPort: 587
      protocol: TCP
      name: smtp
      nodePort: 
  selector:
    app.kubernetes.io/name: chart
    app.kubernetes.io/instance: smtp
```

### Patch NGINX Ingress

[**Download**](https://github.com/kubernetes/ingress-nginx/blob/master/charts/ingress-nginx/values.yaml) the default `values.yaml` file for ingress-nginx.

change following:

```yaml
tcp: {}
#  8080: "default/example-tcp-svc:9000"
```

to: 

```yaml
tcp:
  587: default/smtp-chart:587
```
>Here default is the namespace of your TCP service or pod, and smtp-chart is the deployment name that we defined in the deployment.yaml
The following command will update you nginx controller, create the required config map and update config fields:

```
helm upgrade --install -n default nginx ingress-nginx/ingress-nginx --values values.yaml --wait
```

### Check NGINX Ingress service

```
kubectl get svc -n default
NAME                                       TYPE           CLUSTER-IP       EXTERNAL-IP             PORT(S)                                    AGE
nginx-ingress-nginx-controller             LoadBalancer   10.100.106.248   a...elb.amazonaws.com   80:30918/TCP,443:32010/TCP,587:32516/TCP   12m
nginx-ingress-nginx-controller-admission   ClusterIP      10.100.7.167     <none>                  443/TCP                                    13d
```

In above output ingress is listening to port 587.

That's it!

You should be able to test it via telnet your ingress load balancer or external IP.

```
telnet a...elb.amazonaws.com 587
```