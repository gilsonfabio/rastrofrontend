import { api } from "@/server/api";

// =======================
// Tipos
// =======================

export interface Raca {
  racId: number;
  racNome: string;
  racEspId: number;

  // Opcional (caso o backend faça JOIN)
  especie?: {
    espId: number;
    espNome: string;
  };
}

export interface RacaFormData {
  racNome: string;
  racEspId: number;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

// =======================
// LISTAR
// =======================

export async function listarRacas(): Promise<Raca[]> {
  const response = await api.get<Raca[]>("/racas");

  return response.data;
}

// =======================
// BUSCAR POR ID
// =======================

export async function buscarRaca(
  id: number
): Promise<Raca> {
  const response = await api.get<Raca>(
    `/racas/${id}`
  );

  return response.data;
}

// =======================
// CRIAR
// =======================

export async function criarRaca(
  dados: RacaFormData
): Promise<Raca> {

  const response = await api.post<Raca>(
    "/racas",
    {
      racNome: dados.racNome,
      racEspId: dados.racEspId,
    }
  );

  return response.data;
}

// =======================
// ATUALIZAR
// =======================

export async function atualizarRaca(
  id: number,
  dados: RacaFormData
): Promise<void> {

  await api.put(
    `/racas/${id}`,
    {
      racNome: dados.racNome,
      racEspId: dados.racEspId,
    }
  );
}

// =======================
// EXCLUIR
// =======================

export async function excluirRaca(
  id: number
): Promise<void> {

  await api.delete(`/racas/${id}`);
}