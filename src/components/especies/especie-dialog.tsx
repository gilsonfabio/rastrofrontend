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

import { Especie } from "@/services/especies";

import { EspecieForm } from "./especie-form";

interface EspecieDialogProps {
  especie?: Especie;
  onSuccess: () => void;
}

export function EspecieDialog({
  especie,
  onSuccess,
}: EspecieDialogProps) {

  const [open, setOpen] = useState(false);

  const isEditing = !!especie;

  function handleSuccess() {
    setOpen(false);
    onSuccess();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

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

            Nova Espécie

          </Button>

        )}

      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">

        <DialogHeader>

          <DialogTitle>

            {isEditing
              ? "Editar Espécie"
              : "Nova Espécie"}

          </DialogTitle>

          <DialogDescription>

            {isEditing
              ? "Atualize as informações da espécie."
              : "Informe os dados da nova espécie."}

          </DialogDescription>

        </DialogHeader>

        <EspecieForm
          especie={especie}
          onSuccess={handleSuccess}
        />

      </DialogContent>

    </Dialog>
  );

}