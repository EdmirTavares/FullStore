<?php

namespace App\Service;

use App\Http\Resources\V1\ProductResourceCollection;
use Illuminate\Support\Facades\Http;

class ProductService
{
    //Api call for supplier
    public function getProductsFromBrasil()
    {
        $products = Http::get("http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider/");
        return new  ProductResourceCollection(json_decode($products));
    }

    public function getProductsFromEuropa()
    {
        $products = Http::get("http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider");
        return new  ProductResourceCollection(json_decode($products));
    }

    public function getAllProducts(){

        $productsFromBrasil = $this->getProductsFromBrasil();
        $productsFromEuropa = $this->getProductsFromEuropa();

        $collectionbr = collect($productsFromBrasil);
        $collectioneur = collect($productsFromEuropa);

        return $collectionbr->concat($collectioneur);
    }
}
