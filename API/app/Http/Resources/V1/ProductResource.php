<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class ProductResource extends JsonResource
{
    public $preserveKeys = false;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */

    public function toArray($request)
    {
        $isBrazilProvider = isset($this->nome);
        if(!$isBrazilProvider){
            return [
                'id'=>$this->id,
                'name'=>$this->name ,
                'description'=>$this->description,
                'imageSrc'=>head($this->gallery),
                'price'=>$this->price,
                'department'=>"",
                'category'=>"",
                'supplierProductId'=>2,
                'hasDiscount'=>$this->hasDiscount,
                'discountValue'=>$this->discountValue,
                'gallery'=>$this->gallery,
                'details'=>$this->details,
                'uniqueId'=> Str::uuid()->toString(),
            ];
        }

        return [
            'id'=>$this->id,
            'name'=>$this->nome ,
            'description'=>$this->descricao,
            'imageSrc'=>$this->imagem,
            'price'=>$this->preco,
            'department'=>$this->departamento,
            'category'=>$this->categoria,
            'supplierProductId'=>1,
            'hasDiscount'=>false,
            'discountValue'=>0.0,
            'gallery'=>null,
            'material'=>$this->material,
            'details'=>null,
            'uniqueId'=> Str::uuid()->toString(),
        ];
    }

}
