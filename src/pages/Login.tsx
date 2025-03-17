
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // For now, just navigate to home page
    // Later this will be replaced with actual authentication
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-sidebar p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <img 
              src="https://wttgwoxlezqoyzmesekt.supabase.co/storage/v1/object/public/cms-general//logo.png" 
              alt="Logo" 
              className="h-10" 
            />
          </div>
          <CardTitle className="text-2xl text-center">Welcome to mySquad</CardTitle>
          <CardDescription className="text-center">
            Sign in to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button 
            className="w-full" 
            onClick={handleLogin}
          >
            Sign in with ClickUp
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center text-center text-sm text-muted-foreground">
          <p>By continuing, you agree to the Terms of Service and Privacy Policy.</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
