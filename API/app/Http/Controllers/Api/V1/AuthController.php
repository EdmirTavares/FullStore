<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Create User
     * @param Request $request
     * @return User
     */
    public function createUser(Request $request){
        try {
            $validateuser = Validator::make($request->all(),
            [
                'name'=> 'required',
                'email'=> 'required|email|unique:users,email',
                'password'=>'required'
            ]);

            if($validateuser->fails()){
                return response()->json([
                    'status'=>false,
                    'message'=>'validation error',
                    'error'=>$validateuser->errors()
                ],401);
            }

            $user = User::create([
                'name'=> $request->name,
                'email'=> $request->email,
                'password'=> Hash::make($request->password),
            ]);

            return response()->json([
                'status'=>true,
                'message'=>'User Created Successfully',
                'token'=>$user->createToken("API TOKEN")->plainTextToken
            ],200);

        } catch (\Throwable $th) {
            return response()->json([
                'status'=>false,
                'message'=>$th->getMessage()
            ],500);
        }
    }
}
