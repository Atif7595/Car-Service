<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use App\Http\Controllers\Controller;
use App\Models\PasswordReset;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:100',
            'password' => 'required|string|min:8',
        ]);
        if ($validator->fails()) {
            return back()->withErrors($validator);
        }
        $userCredential = $request->only('email', 'password');
        if (Auth::attempt($userCredential)) {
                return redirect(route('dashboard'));
        } else {
            return back()->with('error', 'Email or Password is Incorrect');
        }
    }

    public function forgetPasswordLoad()
    {
        return view('auth.forgetpassword');
    }
    public function forgetPassword(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'email|required',
            ]);
            if ($validator->fails()) {
                return back()->withErrors($validator);
            }
            $user = User::where('email', $request->email)->get();
            if (count($user) > 0) {
                $token = Str::random(40);
                $domain = URL::to('/');
                $url = $domain . '/reset-password?token=' . $token;
                $data['url'] = $url;
                $data['email'] = $request->email;
                $data['title'] = 'Password Reset';
                $data['body'] = 'Please click on below link to change reset password';
                Mail::send('email.forgetPasswordMail', ['data' => $data], function ($message) use ($data) {
                    $message->to($data['email'])->subject($data['title']);
                });
                $dataTime = Carbon::now()->format('Y-m-d H-m-s');
                PasswordReset::updateOrCreate(
                    [
                        'email' => $request->email,
                    ],
                    [
                        'email' => $request->email,
                        'token' => $token,
                        'created_at' => $dataTime,
                    ],
                );
                return back()->with('success', 'Please Check your Email to Reset your Password!!');
            } else {
                return back()->with('error', 'Email is not Exists!');
            }
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
    public function resetPasswordLoad(Request $request)
    {
        $resetData = PasswordReset::where('token', $request->token)->get();
        if (isset($request->token) && count($resetData) > 0) {
            $user = User::select('email')
                ->where('email', $resetData[0]['email'])
                ->first();
            return view('auth.resetpassword', compact('user'));
        } else {
            abort(404);
        }
    }
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required|min:8|confirmed',
        ]);
        if ($validator->fails()) {
            return back()->withErrors($validator);
        }
        User::where('email', $request->email)->update([
            'password' => Hash::make($request->password),
        ]);
        PasswordReset::where('email', $request->email)->delete();
        return redirect('/')->with('success', 'Your Password Resest Successfully done!');
    }
    public function logOut(Request $request)
    {
        $request->session()->flush();
        Auth::logout();
        return redirect('/login');
    }
}
