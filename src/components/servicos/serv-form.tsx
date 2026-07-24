"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

import {
  criarServico,
  atualizarServico,
  Servico,
  ServicoFormData,
} from "@/services/servicos";

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

const servicoSchema = z.object({
  serNome: z.string().min(2, "Informe o nome do serviço."),
  serTipo: z.string().min(2, "Informe o tipo do serviço."),
  serDuracao: z.number().min(1, "Selecione Duração"),
  serValor: z.number().min(1, "Selecione valor do serviço"),
  serCorAgenda: z.string().min(2, "Informe o tipo do serviço."),
  serAtivo: z.number().min(1, "Selecione se o serviço esta ativo"),
});

type FormData = z.infer<typeof servicoSchema>;

interface ServicoFormProps {
  servico?: Servico;
  onSuccess?: () =>void;
}

export function ServicoForm({
  servico,
  onSuccess,
}: ServicoFormProps) {
  const { data: session } = useSession();
  
  const form = useForm<FormData>({
    resolver: zodResolver(servicoSchema),

    defaultValues: {
      serNome: "",
      serTipo: "",
      serDuracao: 0,
      serValor: 0,
      serCorAgenda: "",
      serAtivo: 0,
    },
  });

  // ============================
  // Editar
  // ============================

  useEffect(() => {
    if (servico) {
      form.reset({
        serNome: servico.serNome, 
        serTipo: servico.serTipo, 
        serDuracao: servico.serDuracao,  
        serValor: servico.serValor, 
        serCorAgenda: servico.serCorAgenda, 
        serAtivo: servico.serAtivo,         
      });
    }
  }, [servico, form]);

  // ============================
  // Salvar
  // ============================

  async function onSubmit(values: FormData) {
    try {
      const dados: ServicoFormData = {
        serNome: values.serNome,
        serTipo: values.serTipo, 
        serDuracao: values.serDuracao,  
        serValor: values.serValor, 
        serCorAgenda: values.serCorAgenda, 
        serAtivo: values.serAtivo,          
      };

      if (!session?.user?.empresaId) {
        toast.error("Empresa não encontrada.");
        return;
      }

      const empresaId = session.user.empresaId;

      if (servico) {
        await atualizarServico(
          empresaId,
          servico.serId,
          dados
        );

        toast.success("Serviço atualizado com sucesso.");

      } else {

        await criarServico(empresaId ,dados);

        toast.success("Serviço cadastrado com sucesso.");
      }

      onSuccess?.();

      form.reset({
        serNome: "",
        
});

    } catch (error: any) {

      toast.error(
        error?.response?.data?.error ??
        "Erro ao salvar serviço."
      );
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="serNome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Tutor</FormLabel>
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
          name="serTipo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo do serviço</FormLabel>
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
          name="serDuracao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duração do serviço</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex.: 30"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serValor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor do serviço</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex.: 40,00"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serCorAgenda"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cor do serviço</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex.: Amarelo"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serAtivo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serviço Ativo</FormLabel>
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
              : servico
              ? "Atualizar"
              : "Salvar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}