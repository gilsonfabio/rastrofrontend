"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

import {
  criarPet,
  atualizarPet,
  Pet,
  PetFormData,
} from "@/services/pets";

import { listarEspecies, Especie } from "@/services/especies";
import { listarRacas, Raca } from "@/services/racas";
import { listarTutores, Tutor } from "@/services/tutores";

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

const petSchema = z.object({
  petNome: z.string().min(2, "Informe o nome do pet."),

  petTutId: z.number() .min(1, "Selecione o tutor."),

  petEspId: z.number().min(1, "Selecione a espécie."),

  petRacId: z.number().min(1, "Selecione a raça."),

  petCor: z.string().min(1, "Informe a cor."),

  petPorte: z.string().min(1, "Informe o porte."),

  petNascimento: z.string().min(1, "Informe a data de nascimento."),

  petCaracter: z.string(),

  petSinPatinhas: z.string(),
});

type FormData = z.infer<typeof petSchema>;

interface PetFormProps {
  pet?: Pet;
  onSuccess?: () =>void;
}

export function PetForm({
  pet,
  onSuccess,
}: PetFormProps) {
  const { data: session } = useSession();
  const [especies, setEspecies] = useState<Especie[]>([]);
  const [racas, setRacas] = useState<Raca[]>([]);
  const [tutores, setTutores] = useState<Tutor[]>([]);
  
  const form = useForm<FormData>({
    resolver: zodResolver(petSchema),

    defaultValues: {
      petNome: "",
      petTutId: 0,
      petEspId: 0,
      petRacId: 0,
      petCor: "",
      petPorte: "",
      petNascimento: "",
      petCaracter: "",
      petSinPatinhas: "",
    },
  });

  // ============================
  // Editar
  // ============================

  useEffect(() => {
    if (pet) {
      form.reset({
        petNome: pet.petNome,
        petTutId: pet.petTutId,
        petEspId: pet.petEspId,
        petRacId: pet.petRacId,
        petCor: pet.petCor,
        petPorte: pet.petPorte,
        petNascimento: pet.petNascimento,
        petCaracter: pet.petCaracter ?? "",
        petSinPatinhas: pet.petSinPatinhas ?? "",        
      });
    }
  }, [pet, form]);

  // ============================
  // Salvar
  // ============================

  async function onSubmit(values: FormData) {
    try {
      const dados: PetFormData = {
        petNome: values.petNome,
        petTutId: values.petTutId,
        petEspId: values.petEspId,
        petRacId: values.petRacId,
        petCor: values.petCor,
        petPorte: values.petPorte,
        petNascimento: values.petNascimento,
        petCaracter: values.petCaracter,
        petSinPatinhas: values.petSinPatinhas,
      };

      if (!session?.user?.empresaId) {
        toast.error("Empresa não encontrada.");
        return;
      }

      const empresaId = session.user.empresaId;
      
      if (pet) {
        await atualizarPet(
          empresaId,
          pet.petId,
          dados
        );

        toast.success("Pet atualizado com sucesso.");

      } else {

        await criarPet(empresaId ,dados);

        toast.success("Pet cadastrado com sucesso.");
      }

      onSuccess?.();

      form.reset({
        petNome: "",
        petTutId: 0,
        petEspId: 0,
        petRacId: 0,
        petCor: "",
        petPorte: "",
        petNascimento: "",
        petCaracter: "",
        petSinPatinhas: "",
      });

    } catch (error: any) {

      toast.error(
        error?.response?.data?.error ??
        "Erro ao salvar pet."
      );
    }
  }

  useEffect(() => {
    async function carregarTutores() {
      if (!session?.user?.empresaId) return;

      try {
        const data = await listarTutores(session.user.empresaId);
        setTutores(data);
      } catch (error) {
        toast.error("Erro ao carregar tutores.");
      }
    }

    carregarTutores();
  }, [session]);

  useEffect(() => {
    async function carregarEspecies() {
      try {
        const data = await listarEspecies();
        setEspecies(data);
      } catch (error) {
        toast.error("Erro ao carregar especies.");
      }
    }

    carregarEspecies();
  }, [session]);

  useEffect(() => {
    async function carregarRacas() {
      try {
        const data = await listarRacas();
        setRacas(data);
      } catch (error) {
        toast.error("Erro ao carregar raças.");
      }
    }

    carregarRacas();
  }, [session]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="petNome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Pet</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex.: Nome do Pet"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="petTutId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tutor</FormLabel>
              <Select
                value={field.value ? String(field.value) : ""}
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tutor" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {tutores.map((tutor) => (
                    <SelectItem
                      key={tutor.tutId}
                      value={String(tutor.tutId)}
                    >
                      {tutor.tutNome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="petEspId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Espécie</FormLabel>

              <Select
                value={field.value ? String(field.value) : ""}
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a espécie" />
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

        <FormField
          control={form.control}
          name="petRacId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Raça</FormLabel>

              <Select
                value={field.value ? String(field.value) : ""}
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a raça" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {racas.map((raca) => (
                    <SelectItem
                      key={raca.racId}
                      value={String(raca.racId)}
                    >
                      {raca.racNome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="petCor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cor</FormLabel>
              <FormControl>
                <Input placeholder="Ex.: Branco" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="petPorte"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Porte</FormLabel>

              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value="Pequeno">Pequeno</SelectItem>
                  <SelectItem value="Médio">Médio</SelectItem>
                  <SelectItem value="Grande">Grande</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="petNascimento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de Nascimento</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="petCaracter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Características</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex.: Muito dócil"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="petSinPatinhas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Codigo SinPatinhas</FormLabel>
              <FormControl>
                <Input
                  placeholder="Descreva o codigo"
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
              : pet
              ? "Atualizar"
              : "Salvar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}