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
import { Servico } from "@/services/servicos";
import { ServicoForm } from "./serv-form";

interface ServicoDialogProps {
  servico?: Servico;
  onSuccess: () => void;
}

export function ServicoDialog({
  servico,
  onSuccess,
}: ServicoDialogProps) {

  const [open, setOpen] = useState(false);

  const isEditing = !!servico;

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
              ? "Editar Serviço"
              : "Novo Serviço"}

          </DialogTitle>

          <DialogDescription>

            {isEditing
              ? "Atualize as informações do serviço."
              : "Informe os dados do novo serviço."}

          </DialogDescription>

        </DialogHeader>

        <ServicoForm
          servico={servico}
          onSuccess={handleSuccess}
        />

      </DialogContent>

    </Dialog>
  );

}