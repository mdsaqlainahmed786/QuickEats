import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { useGetUser } from "@/hooks/useGetUser";
import { usernameState } from "@/RecoilStates/UserDetails";
import { Menu, ShoppingCart } from "lucide-react";

export default function Header() {
  const { user, isLoading } = useGetUser();
  const navigate = useNavigate();
  const [username, setUsername] = useRecoilState(usernameState);
  const { toast } = useToast();

  const onLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/v1/users/logout", {
        withCredentials: true,
      });
      setUsername(null);
      navigate("/sign-in");
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        title: "Logout failed",
        description: "There was an error logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        setUsername(user.userName);
      } else {
        setUsername(null);
      }
    }
  }, [user, isLoading, setUsername]);

  const NavItems = () => (
    <>
      {isLoading ? (
        <span>Loading...</span>
      ) : username ? (
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="text-lg text-orange-600">
                    {username[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem className="flex-col items-start">
                <div className="text-sm font-medium">Welcome,</div>
                <div className="text-xs text-muted-foreground">{username}</div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onLogout}>Log out</DropdownMenuItem>
              <DropdownMenuItem onClick={()=>navigate('/orders')}>My Orders</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <>
          <Button variant="ghost" asChild>
            <Link to="/sign-up">Sign Up</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/sign-in">Sign In</Link>
          </Button>
        </>
      )}

      <Link to="/cart">
        <ShoppingCart className="h-7 w-7 ml-5" />
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center w-full mx-auto justify-between max-w-[80vw]">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="text-2xl font-bold text-orange-600">QuickEats</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <div className="hidden sm:flex">
              <NavItems />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 sm:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="pr-0">
                <nav className="flex flex-col space-y-4">
                  <NavItems />
                </nav>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </div>
    </header>
  );
}
