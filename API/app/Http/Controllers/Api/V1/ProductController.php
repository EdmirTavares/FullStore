<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ProductResourceCollection;
use App\Service\ProductService;

class ProductController extends Controller
{
    /**
     * Index
     * @param Request $request
     * @return ProductResourceCollection
     */
    public function index(Request $request)
    {
        $productService = new ProductService();
        $result = $productService -> getAllProducts();
        return $result;// CollectionHelper::paginate($products,10);
    }
}
