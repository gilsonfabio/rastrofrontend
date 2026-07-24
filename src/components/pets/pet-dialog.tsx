"use client";

import { useState } from "react";
import { Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pet } from "@/services/pets";
import { PetForm } from "./pet-form";

interface PetDialogProps {
  pet?: Pet;
  onSuccess: () => void;
}

export function PetDialog({
  pet,
  onSuccess,
}: PetDialogProps) {

  const [open, setOpen] = useState(false);

  const isEditing = !!pet;

  function handleSuccess() {
    setOpen(false);
    onSuccess();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>

        {isEditing ? (
          <Button
            variant="ghost"
            size="icon"
          >
            <Pencil className="h-4 w-4" />
          </Button>

        ) : (

          <Button>

            <Plus className="mr-2 h-4 w-4" />

            Novo Pet

          </Button>

        )}

      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">

        <DialogHeader>

          <DialogTitle>

            {isEditing
              ? "Editar Pet"
              : "Novo Pet"}

          </DialogTitle>

          <DialogDescription>

            {isEditing
              ? "Atualize as informações do pet."
              : "Informe os dados do novo pet."}

          </DialogDescription>

        </DialogHeader>

        <PetForm
          pet={pet}
          onSuccess={handleSuccess}
        />

      </DialogContent>

    </Dialog>
  );

}