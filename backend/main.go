package main

import (
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
)

func getRoot(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("got / request\n")
	io.WriteString(w, "This is my website!")
}
func getHello(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("got /helloworld request\n")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	io.WriteString(w, "Hello, World!")
}

func main() {
	http.HandleFunc("/", getRoot)
	http.HandleFunc("/helloworld", getHello)

	err := http.ListenAndServe("localhost:8070", nil)

	if errors.Is(err, http.ErrServerClosed) {
		fmt.Printf("server closed\n")
	} else if err != nil {
		fmt.Printf("error starting server: %s\n", err)
		os.Exit(1)
	}
}
