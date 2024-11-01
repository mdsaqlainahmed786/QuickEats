// LocationDrawer.js
import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { FaLocationDot } from "react-icons/fa6";

export function LocationDrawer({ onAccept }: { onAccept: () => void }) {
  const [isOpen, setIsOpen] = useState(true); // Start open by default

  const handleAccept = () => {
    setIsOpen(false);
    onAccept(); // Callback to enable geolocation
  };

  const handleDeny = () => {
    setIsOpen(false); // Close if denied
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader>
          <div className="flex flex-col space-y-7 justify-center items-center">
            <FaLocationDot className="text-4xl text-red-600" />
            <DrawerTitle className="text-2xl font-bold text-red-600">Allow Location Access</DrawerTitle>
            <DrawerDescription>
              We need access to your location for the map feature.
            </DrawerDescription>
          </div>
        </DrawerHeader>
        <DrawerFooter>
          <Button className="bg-red-500 hover:bg-red-700" onClick={handleAccept}>Allow</Button>
          <DrawerClose>
            <Button variant="outline" className="text-red-500 hover:text-red-700" onClick={handleDeny}>
              Deny
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
