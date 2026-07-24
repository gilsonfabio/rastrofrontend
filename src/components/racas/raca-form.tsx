"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import {
  criarRaca,
  atualizarRaca,
  Raca,
  RacaFormData,
} from "@/services/racas";

import {
  listarEspecies,
  Especie,
} from "@/services/especies";

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

const racaSchema = z.object({
  racNome: z
    .string()
    .min(2, "Informe o nome da raça.")
    .max(50, "Máximo de 50 caracteres."),

  racEspId: z
    .number({error: "Selecione uma espécie.", })
    .min(1, "Selecione uma espécie."),
});

type FormData = z.infer<typeof racaSchema>;

interface RacaFormProps {
  raca?: Raca;
  onSuccess?: () =>void;
}

export function RacaForm({
  raca,
  onSuccess,
}: RacaFormProps) {

  const [especies, setEspecies] = useState<Especie[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(racaSchema),

    defaultValues: {
      racNome: "",
      racEspId: 0,
    },
  });

  // ============================
  // Carregar Espécies
  // ============================

  useEffect(() => {

    async function carregarEspecies() {
      try {
        const data = await listarEspecies();
        setEspecies(data);
      } catch {
        toast.error("Erro ao carregar espécies.");
      }
    }

    carregarEspecies();

  }, []);

  // ============================
  // Editar
  // ============================

  useEffect(() => {

    if (raca) {
      form.reset({
        racNome: raca.racNome,
        racEspId: raca.racEspId,
      });
    }

  }, [raca, form]);

  // ============================
  // Salvar
  // ============================

  async function onSubmit(values: FormData) {

    try {

      const dados: RacaFormData = {
        racNome: values.racNome,
        racEspId: values.racEspId,
      };

      if (raca) {

        await atualizarRaca(
          raca.racId,
          dados
        );

        toast.success("Raça atualizada com sucesso.");

      } else {

        await criarRaca(dados);

        toast.success("Raça cadastrada com sucesso.");
      }

      onSuccess?.();

      form.reset({
        racNome: "",
        racEspId: 0,
      });

    } catch (error: any) {

      toast.error(
        error?.response?.data?.error ??
        "Erro ao salvar raça."
      );

    }

  }

  return (

    <Form {...form}>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >

        <FormField
          control={form.control}
          name="racNome"
          render={({ field }) => (

            <FormItem>

              <FormLabel>Nome da raça</FormLabel>

              <FormControl>
                <Input
                  placeholder="Ex.: Golden Retriever"
                  {...field}
                />
              </FormControl>

              <FormMessage />

            </FormItem>

          )}
        />

        <FormField
          control={form.control}
          name="racEspId"
          render={({ field }) => (

            <FormItem>

              <FormLabel>Espécie</FormLabel>

              <Select
                onValueChange={(value) =>
                  field.onChange(Number(value))
                }
                value={
                  field.value
                    ? String(field.value)
                    : undefined
                }
              >

                <FormControl>

                  <SelectTrigger>

                    <SelectValue placeholder="Selecione uma espécie" />

                  </SelectTrigger>

                </FormControl>

                <SelectContent>

                  {especies.map((esp) => (

                    <SelectItem
                      key={esp.espId}
                      value={String(esp.espId)}
                    >
                      {esp.espNome}
                    </SelectItem>

                  ))}

                </SelectContent>

              </Select>

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
              : raca
              ? "Atualizar"
              : "Salvar"}
          </Button>

        </div>

      </form>

    </Form>

  );
}