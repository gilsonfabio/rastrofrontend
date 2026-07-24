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
import { Tutor } from "@/services/tutores";
import { TutorForm } from "./tutor-form";

interface TutorDialogProps {
  tutor?: Tutor;
  onSuccess: () => void;
}

export function TutorDialog({
  tutor,
  onSuccess,
}: TutorDialogProps) {

  const [open, setOpen] = useState(false);

  const isEditing = !!tutor;

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

            Novo Tutor

          </Button>

        )}

      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">

        <DialogHeader>

          <DialogTitle>

            {isEditing
              ? "Editar Tutor"
              : "Novo Tutor"}

          </DialogTitle>

          <DialogDescription>

            {isEditing
              ? "Atualize as informações do tutor."
              : "Informe os dados do novo tutor."}

          </DialogDescription>

        </DialogHeader>

        <TutorForm
          tutor={tutor}
          onSuccess={handleSuccess}
        />

      </DialogContent>

    </Dialog>
  );

}