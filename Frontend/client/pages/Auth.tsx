import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Briefcase, Users, MessageSquare } from "lucide-react";
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { saveUserId } from "@/utils/localStorageUser";

export default function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formDataLogin, setFormDataLogin] = useState({
    email: "",
    password: "",
  });

  const [formDataSignup, setFormDataSignup] = useState({
    firstname: "",
    email: "",
    jobtilte: "",
    password: "",
    lastname: "",
  });

 const secretKey = "mySecretKey123"; // Use env var in prod

const encryptPassword = (password: string) => {
  return CryptoJS.AES.encrypt(password, secretKey).toString();
};


  const encryptData = (data: any) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  };

const handleSubmitLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setErrorMsg("");

  try {
    const payload = {
      ...formDataLogin,
      password: formDataLogin.password,
    };

    const res = await axios.post("http://localhost:4000/login", payload);

    if (res.data.success) {
      saveUserId(res.data.userId);
      window.location.href ="/home/"+res.data.userId;
    } else {
      setErrorMsg(res.data.message || "Login failed.");
    }
  } catch (err: any) {
    setErrorMsg(err.response?.data?.message || "Something went wrong.");
  } finally {
    setIsLoading(false);
  }
};


const handleSubmitSignup = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setErrorMsg("");

  try {
    const payload = {
      ...formDataSignup,
      password: encryptPassword(formDataSignup.password),
    };

    const res = await axios.post("http://localhost:4000/signup", payload);

    if (res.data.success) {
      saveUserId(res.data.userId);
      window.location.href = "/home/"+res.data.userId;
    } else {
      setErrorMsg(res.data.message || "Signup failed.");
    }
  } catch (err: any) {
    setErrorMsg(err.response?.data?.message || "Something went wrong.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50/30 to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex items-center gap-12">
        <div className="hidden lg:flex flex-1 flex-col space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-foreground">CIAAN CYBER TECH PRIVATE LIMITED</span>
            </div>
            <p className="text-xl text-muted-foreground max-w-lg">
              Connect with professionals, share insights, and grow your career network.
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Build Your Network</h3>
                <p className="text-muted-foreground">Connect with industry professionals and expand your opportunities.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Share Your Story</h3>
                <p className="text-muted-foreground">Post updates, articles, and insights to showcase your expertise.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Discover Opportunities</h3>
                <p className="text-muted-foreground">Find new career paths and professional development opportunities.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-md w-full mx-auto">
          <Card className="border-0 shadow-2xl">
            <CardHeader className="space-y-1 text-center">
              <div className="lg:hidden flex items-center justify-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold">CIAAN CYBER TECH PRIVATE LIMITED</span>
              </div>
              <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
              <CardDescription>Join the professional community</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleSubmitLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        className="h-11"
                        value={formDataLogin.email}
                        onChange={(e) =>
                          setFormDataLogin({ ...formDataLogin, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          required
                          className="h-11 pr-10"
                          value={formDataLogin.password}
                          onChange={(e) =>
                            setFormDataLogin({ ...formDataLogin, password: e.target.value })
                          }
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
                    <Button type="submit" className="w-full h-11" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSubmitSignup} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          required
                          className="h-11"
                          value={formDataSignup.firstname}
                          onChange={(e) =>
                            setFormDataSignup({ ...formDataSignup, firstname: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          required
                          className="h-11"
                          value={formDataSignup.lastname}
                          onChange={(e) =>
                            setFormDataSignup({ ...formDataSignup, lastname: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        className="h-11"
                        value={formDataSignup.email}
                        onChange={(e) =>
                          setFormDataSignup({ ...formDataSignup, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input
                        id="title"
                        required
                        className="h-11"
                        value={formDataSignup.jobtilte}
                        onChange={(e) =>
                          setFormDataSignup({ ...formDataSignup, jobtilte: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          required
                          className="h-11 pr-10"
                          value={formDataSignup.password}
                          onChange={(e) =>
                            setFormDataSignup({ ...formDataSignup, password: e.target.value })
                          }
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
                    <Button type="submit" className="w-full h-11" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  By continuing, you agree to our{" "}
                  <a href="#" className="text-primary hover:underline">Terms of Service</a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
