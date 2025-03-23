package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

type Product struct {
	ID            string  `json:"id"`
	Name          string  `json:"name"`
	Price         float64 `json:"price"`
	OriginalPrice float64 `json:"originalPrice"`
	Image         string  `json:"image"`
	StoreName     string  `json:"storeName"`
	StoreIcon     string  `json:"storeIcon"`
	Category      string  `json:"category"`
}

type Category struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Icon  string `json:"icon"`
	Count int    `json:"count"`
}

func main() {
	r := mux.NewRouter()

	// CORS middleware
	r.Use(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
			if r.Method == "OPTIONS" {
				w.WriteHeader(http.StatusOK)
				return
			}
			next.ServeHTTP(w, r)
		})
	})

	// API routes
	r.HandleFunc("/api/search", searchProducts).Methods("GET", "OPTIONS")
	r.HandleFunc("/api/categories", getCategories).Methods("GET", "OPTIONS")
	r.HandleFunc("/api/featured", getFeaturedDeals).Methods("GET", "OPTIONS")

	// Start server
	srv := &http.Server{
		Handler:      r,
		Addr:         ":8080",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Printf("Server starting on port 8080...")
	log.Fatal(srv.ListenAndServe())
}

func searchProducts(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("q")

	// Mock data - in a real app, this would query a database
	products := []Product{
		{
			ID:            "1",
			Name:          "Sample Product 1",
			Price:         99.99,
			OriginalPrice: 129.99,
			Image:         "https://via.placeholder.com/200",
			StoreName:     "Store A",
			StoreIcon:     "https://via.placeholder.com/20",
			Category:      "Electronics",
		},
		// Add more mock products as needed
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
}

func getCategories(w http.ResponseWriter, r *http.Request) {
	categories := []Category{
		{ID: "1", Name: "Electronics", Icon: "laptop", Count: 150},
		{ID: "2", Name: "Fashion", Icon: "tshirt", Count: 200},
		{ID: "3", Name: "Home & Garden", Icon: "home", Count: 180},
		{ID: "4", Name: "Gaming", Icon: "gamepad", Count: 120},
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(categories)
}

func getFeaturedDeals(w http.ResponseWriter, r *http.Request) {
	deals := []Product{
		{
			ID:            "1",
			Name:          "Featured Product 1",
			Price:         79.99,
			OriginalPrice: 149.99,
			Image:         "https://via.placeholder.com/200",
			StoreName:     "Store A",
			StoreIcon:     "https://via.placeholder.com/20",
			Category:      "Electronics",
		},
		// Add more featured deals as needed
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(deals)
}
