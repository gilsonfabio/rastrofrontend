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
import { Raca } from "@/services/racas";
import { RacaForm } from "./raca-form";

interface RacaDialogProps {
  raca?: Raca;
  onSuccess: () => void;
}

export function RacaDialog({
  raca,
  onSuccess,
}: RacaDialogProps) {

  const [open, setOpen] = useState(false);

  const isEditing = !!raca;

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

            Nova Raça

          </Button>

        )}

      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">

        <DialogHeader>

          <DialogTitle>

            {isEditing
              ? "Editar Raça"
              : "Nova Raça"}

          </DialogTitle>

          <DialogDescription>

            {isEditing
              ? "Atualize as informações da raça."
              : "Informe os dados da nova raça."}

          </DialogDescription>

        </DialogHeader>

        <RacaForm
          raca={raca}
          onSuccess={handleSuccess}
        />

      </DialogContent>

    </Dialog>
  );

}