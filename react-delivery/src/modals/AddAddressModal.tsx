import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

interface AddAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: Omit<Address, "id">) => void;
}

const AddAddressModal = ({ isOpen, onClose, onSave }: AddAddressModalProps) => {
  const [newAddress, setNewAddress] = React.useState({
    label: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (
      newAddress.label &&
      newAddress.street &&
      newAddress.city &&
      newAddress.postalCode &&
      newAddress.country
    ) {
      onSave(newAddress);
      setNewAddress({
        label: "",
        street: "",
        city: "",
        postalCode: "",
        country: "",
      });
    }
  };

  const handleClose = () => {
    setNewAddress({
      label: "",
      street: "",
      city: "",
      postalCode: "",
      country: "",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Add new address
          </DialogTitle>
          <DialogDescription>
            Enter the details of your new delivery address
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="label">Address label</Label>
            <Input
              id="label"
              name="label"
              placeholder="e.g., Home, Office, Parents house"
              value={newAddress.label}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="street">Street address</Label>
            <Input
              id="street"
              name="street"
              placeholder="e.g., Nezavisimosti Ave 35"
              value={newAddress.street}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                placeholder="e.g., Minsk"
                value={newAddress.city}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal code</Label>
              <Input
                id="postalCode"
                name="postalCode"
                placeholder="e.g., 220000"
                value={newAddress.postalCode}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              name="country"
              placeholder="e.g., Belarus"
              value={newAddress.country}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Add address</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressModal;
