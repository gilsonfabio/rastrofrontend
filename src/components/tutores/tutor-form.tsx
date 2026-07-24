"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

import {
  criarTutor,
  atualizarTutor,
  Tutor,
  TutorFormData,
} from "@/services/tutores";

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

const tutorSchema = z.object({
  tutNome: z.string().min(2, "Informe o nome do tutor."),

  tutCpf: z.string().min(11, "CPF obrigatório"),

  tutNascimento: z.string(),

  tutEmail: z.email("E-mail inválido"),

  tutEndereco: z.string().min(2, "Informe o endereço"),

  tutNumero: z.string().min(1, "Informe o número"),

  tutComplemento: z.string(),

  tutBairro: z.number().min(1, "Selecione um bairro"),

  tutCidade: z.number().min(1, "Selecione uma cidade"),

  tutCep: z.string().min(8, "CEP obrigatório"),

  tutUf: z.string().length(2, "UF inválida"),

  tutCelular: z.string().min(10, "Celular obrigatório"),
});

type FormData = z.infer<typeof tutorSchema>;

interface TutorFormProps {
  tutor?: Tutor;
  onSuccess?: () =>void;
}

export function TutorForm({
  tutor,
  onSuccess,
}: TutorFormProps) {
  const { data: session } = useSession();
  
  const form = useForm<FormData>({
    resolver: zodResolver(tutorSchema),

    defaultValues: {
      tutNome: "",
      tutCpf: "",
      tutNascimento: "",
      tutEmail: "",
      tutEndereco: "",
      tutNumero: "",
      tutComplemento: "",
      tutBairro: 0,
      tutCidade: 0,
      tutCep: "",
      tutUf: "",
      tutCelular: "",
    },
  });

  // ============================
  // Editar
  // ============================

  useEffect(() => {
    if (tutor) {
      form.reset({
        tutNome: tutor.tutNome,
        tutCpf: tutor.tutCpf,
        tutNascimento: tutor.tutNascimento,
        tutEmail: tutor.tutEmail,
        tutEndereco: tutor.tutEndereco,
        tutNumero: tutor.tutNumero,
        tutComplemento: tutor.tutComplemento ?? "",
        tutBairro: tutor.tutBairro,
        tutCidade: tutor.tutCidade,
        tutCep: tutor.tutCep,
        tutUf: tutor.tutUf,
        tutCelular: tutor.tutCelular,
      });
    }
  }, [tutor, form]);

  // ============================
  // Salvar
  // ============================

  async function onSubmit(values: FormData) {
    try {
      const dados: TutorFormData = {
        tutNome: values.tutNome,
        tutCpf: values.tutCpf,
        tutNascimento: values.tutNascimento,
        tutEmail: values.tutEmail,
        tutEndereco: values.tutEndereco,
        tutNumero: values.tutNumero,
        tutComplemento: values.tutComplemento,
        tutBairro: values.tutBairro,
        tutCidade: values.tutCidade,
        tutCep: values.tutCep,
        tutUf: values.tutUf,
        tutCelular: values.tutCelular,
      };

      if (!session?.user?.empresaId) {
        toast.error("Empresa não encontrada.");
        return;
      }

      const empresaId = session.user.empresaId;

      if (tutor) {
        await atualizarTutor(
          empresaId,
          tutor.tutId,
          dados
        );

        toast.success("Tutor atualizado com sucesso.");

      } else {

        await criarTutor(empresaId ,dados);

        toast.success("Tutor cadastrado com sucesso.");
      }

      onSuccess?.();

      form.reset({
        tutNome: "",
        tutCpf: "",
        tutNascimento: "",
        tutEmail: "",
        tutEndereco: "",
        tutNumero: "",
        tutComplemento: "",
        tutBairro: 0,
        tutCidade: 0,
        tutCep: "",
        tutUf: "",
        tutCelular: "",
});

    } catch (error: any) {

      toast.error(
        error?.response?.data?.error ??
        "Erro ao salvar tutor."
      );
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="tutNome"
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
          name="tutCpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <Input placeholder="000.000.000-00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tutNascimento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nascimento</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />  

        <FormField
          control={form.control}
          name="tutEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tutEndereco"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tutNumero"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tutComplemento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Complemento</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tutCep"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tutUf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UF</FormLabel>
              <FormControl>
                <Input maxLength={2} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tutCelular"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Celular</FormLabel>
              <FormControl>
                <Input {...field} />
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
              : tutor
              ? "Atualizar"
              : "Salvar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}