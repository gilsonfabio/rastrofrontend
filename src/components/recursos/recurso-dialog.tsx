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
import { Recurso } from "@/services/recursos";
import { RecursoForm } from "./recurso-form";

interface RecursoDialogProps {
  recurso?: Recurso;
  onSuccess: () => void;
}

export function RecursoDialog({
  recurso,
  onSuccess,
}: RecursoDialogProps) {

  const [open, setOpen] = useState(false);

  const isEditing = !!recurso;

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

            Novo Serviço

          </Button>

        )}

      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">

        <DialogHeader>

          <DialogTitle>

            {isEditing
              ? "Editar Recurso"
              : "Novo Recurso"}

          </DialogTitle>

          <DialogDescription>

            {isEditing
              ? "Atualize as informações do recurso."
              : "Informe os dados do novo recurso."}

          </DialogDescription>

        </DialogHeader>

        <RecursoForm
          recurso={recurso}
          onSuccess={handleSuccess}
        />

      </DialogContent>

    </Dialog>
  );

}