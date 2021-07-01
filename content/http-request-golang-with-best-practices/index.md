---
title: "How to make an HTTP request in golang with best practices?"
date: "2021-07-01"
coverImage: "banner.jpg"
author: "Kunal Saini"
tags: ["Engineering", "Golang", "HTTP", "Best Practices"]
description: "A guide explains how to make HTTP request in golang with best practices"
---

Making a HTTP request in golang is pretty straightforward and simple, following are the examples by **HTTP verbs**

### GET

The HTTP GET method requests a representation of the specified resource. Requests using GET should only retrieve data.

```go
package main

import (
    "fmt"
    "io/ioutil"
    "log"
    "net/http"
)

func main() {
  resp, err := http.Get("https://httpbin.org/get")
  if err != nil {
      log.Fatal(err)
  }

  defer resp.Body.Close()

  body, err := ioutil.ReadAll(resp.Body)
  if err != nil {
      log.Fatal(err)
  }

  fmt.Println(string(body))
}
```

#### GET with Query Args

```go
package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

func main() {
	client := &http.Client{}
	req, err := http.NewRequest(http.MethodGet, "https://httpbin.org/get", nil)
	if err != nil {
		log.Fatal(err)
	}

	// appending to existing query args
	q := req.URL.Query()
	q.Add("foo", "bar")

	// assign encoded query string to http request
	req.URL.RawQuery = q.Encode()

	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Errored when sending request to the server")
		return
	}

	defer resp.Body.Close()
	responseBody, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(resp.Status)
	fmt.Println(string(responseBody))
}
```

### POST

The following example sends a POST request with data in JSON format.

```go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

func main() {
	values := map[string]string{"foo": "baz"}
	jsonData, err := json.Marshal(values)

	req, err := http.NewRequest(http.MethodPost, "https://httpbin.org/post", bytes.NewBuffer(jsonData))
	if err != nil {
		log.Fatal(err)
	}

	// appending to existing query args
	q := req.URL.Query()
	q.Add("foo", "bar")

	// assign encoded query string to http request
	req.URL.RawQuery = q.Encode()

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Errored when sending request to the server")
		return
	}

	defer resp.Body.Close()
	responseBody, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(resp.Status)
	fmt.Println(string(responseBody))
}
```

### Best Practices

#### Re-use HTTP Client

The HTTP 1.1 protocol supports HTTP Persistent connections, or also known as HTTP Keep-Alive. This allows a client and a server to re-use the same underlying TCP connection when sending multiple HTTP Requests/Responses. So instead of establishing a connection for each HTTP Request, the client re-uses the TCP connection previously created more than once. This is particularly useful for performance reasons and when sending multiple requests to the same host.

```go
func httpClient() *http.Client {
	client := &http.Client{Timeout: 10 * time.Second}
	return client
}
```

Reuse the http.Client throughout your code base.

An example of it as follows:

```go
package main

import (
	"bytes"
	"io/ioutil"
	"log"
	"net/http"
	"time"
)

func httpClient() *http.Client {
	client := &http.Client{Timeout: 10 * time.Second}
	return client
}

func sendRequest(client *http.Client, method string) []byte {
	endpoint := "https://httpbin.org/post"
      values := map[string]string{"foo": "baz"}
	jsonData, err := json.Marshal(values)

	req, err := http.NewRequest(method, endpoint, bytes.NewBuffer(jsonData))
	if err != nil {
		log.Fatalf("Error Occurred. %+v", err)
	}

	response, err := client.Do(req)
	if err != nil {
		log.Fatalf("Error sending request to API endpoint. %+v", err)
	}

	// Close the connection to reuse it
	defer response.Body.Close()

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Fatalf("Couldn't parse response body. %+v", err)
	}

	return body
}

func main() {
  // c should be re-used for further calls
	c := httpClient()
	response := sendRequest(c, http.MethodPost)
	log.Println("Response Body:", string(response))
}
```
