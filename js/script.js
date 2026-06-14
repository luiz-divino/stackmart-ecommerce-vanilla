// responsavel por toda a logica da api
const API = (function () {
    const BASE_URL = "https://dummyjson.com/products";

    // função auxiliar para tratar respostas com erro
    async function handleResponse(response) {
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro ${response.status}: ${errorText}`);
        }
        return response.json();
    }

    // Essa funcao busca todos os produtos com limite e skip opcionais
    async function fetchAllProducts(limit = 30, skip = 0) {
        try {
            const url = `${BASE_URL}?limit=${limit}&skip=${skip}`;
            const response = await fetch(url);
            const data = await handleResponse(response);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            throw error;
        }
    }

    // Essa funcao busca um unico produto pelo id
    async function fetchProductById(id) {
        try {
            const response = await fetch(`${BASE_URL}/${id}`);
            const data = await handleResponse(response);
            return data;
        } catch (error) {
            console.error(`Erro ao buscar produto ${id}:`, error);
            throw error;
        }
    }

    // Essa funcao busca produtos por categoria
    async function fetchProductsByCategory(category, limit = 30) {
        try {
            const url = `${BASE_URL}/category/${category}?limit=${limit}`;
            const response = await fetch(url);
            const data = await handleResponse(response);
            return data.products;
        } catch (error) {
            console.error(`Erro ao buscar categoria ${category}:`, error);
            throw error;
        }
    }

    // Buscar produtos com termo de busca (search)
    async function searchProducts(query, limit = 30) {
        try {
            const url = `${BASE_URL}/search?q=${encodeURIComponent(query)}&limit=${limit}`;
            const response = await fetch(url);
            const data = await handleResponse(response);
            return data.products;
        } catch (error) {
            console.error(`Erro ao buscar por "${query}":`, error);
            throw error;
        }
    }

    // Obter todas as categorias disponíveis
    async function fetchCategories() {
        try {
            const response = await fetch(`${BASE_URL}/categories`);
            const data = await handleResponse(response);
            return data; // array de strings com nomes das categorias
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
            throw error;
        }
    }

    // Retorna o objeto público com as funções
    return {
        fetchAllProducts,
        fetchProductById,
        fetchProductsByCategory,
        fetchCategories,
    };
})();


