"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

import {
  criarRecurso,
  atualizarRecurso,
  Recurso,
  RecursoFormData,
} from "@/services/recursos";

import {
  listarEmpresas,
  Empresa,
} from "@/services/empresas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const recursoSchema = z.object({
  recNome: z.string().min(2, "Informe o nome do recurso."),
  recTipo: z.string().min(2, "Informe o tipo do recurso."),
  recAtivo: z.number().min(1, "Selecione se o recurso esta ativo"),
});

type FormData = z.infer<typeof recursoSchema>;

interface RecursoFormProps {
  recurso?: Recurso;
  onSuccess?: () =>void;
}

export function RecursoForm({
  recurso,
  onSuccess,
}: RecursoFormProps) {
  const { data: session } = useSession();
  
  const form = useForm<FormData>({
    resolver: zodResolver(recursoSchema),

    defaultValues: {
      recNome: "",
      recTipo: "",
      recAtivo: 0,
    },
  });

  // ============================
  // Editar
  // ============================

  useEffect(() => {
    if (recurso) {
      form.reset({
        recNome: recurso.recNome, 
        recTipo: recurso.recTipo, 
        recAtivo: recurso.recAtivo,         
      });
    }
  }, [recurso, form]);

  // ============================
  // Salvar
  // ============================

  async function onSubmit(values: FormData) {
    try {
      const dados: RecursoFormData = {
        recNome: values.recNome,
        recTipo: values.recTipo, 
        recAtivo: values.recAtivo,          
      };

      if (!session?.user?.empresaId) {
        toast.error("Empresa não encontrada.");
        return;
      }

      const empresaId = session.user.empresaId;

      if (recurso) {
        await atualizarRecurso(
          empresaId,
          recurso.recId,
          dados
        );

        toast.success("Recurso atualizado com sucesso.");

      } else {

        await criarRecurso(empresaId ,dados);

        toast.success("Recurso cadastrado com sucesso.");
      }

      onSuccess?.();

      form.reset({
        recNome: "",
        recTipo: "",
        recAtivo: 0, 
    });

    } catch (error: any) {

      toast.error(
        error?.response?.data?.error ??
        "Erro ao salvar recurso."
      );
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="recNome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Recurso</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex.: Seu Nome"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recTipo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo do recurso</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex.: Banho"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="recAtivo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recurso Ativo</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex.: 0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? "Salvando..."
              : recurso
              ? "Atualizar"
              : "Salvar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}