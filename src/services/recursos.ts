import { api } from "@/server/api";

// =======================
// Tipos
// =======================

export interface Recurso {
  recId: number;
  recEmpId: number;
  recNome: string;
  recTipo: string;
  recAtivo: number;
  // Opcional (caso o backend faça JOIN)
  empresa?: {
    empId: number;
    empCnpj: string;
    empNome: string;
  };  
}

export interface RecursoFormData {
  recNome: string;
  recTipo: string;
  recAtivo: number;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

// =======================
// LISTAR
// =======================
export async function listarRecursos(empresaId: number): Promise<Recurso[]> {
  const response = await api.get<Recurso[]>("/recursos", {
    headers: {
      empresaid: empresaId,
    },
  });

  return response.data;
}

// =======================
// BUSCAR POR ID
// =======================

export async function buscarRecurso(
  empresaId: number,
  id: number
): Promise<Recurso> {
  const response = await api.get<Recurso>(`/recursos/${id}`, {
    headers: {
      empresaid: empresaId,
    }  
  });

  return response.data;
}

// =======================
// CRIAR
// =======================

export async function criarRecurso(
  empresaId: number,
  dados: RecursoFormData
): Promise<Recurso> {

  const response = await api.post<Recurso>("/recursos", {
    headers: {
      empresaid: empresaId,
    },  
    body: {
      recNome: dados.recNome,
      recTipo: dados.recTipo,
      recAtivo: dados.recAtivo,
    }
  });

  return response.data;
}

// =======================
// ATUALIZAR
// =======================

export async function atualizarRecurso(
  empresaId: number,
  id: number,
  dados: RecursoFormData
): Promise<void> {

  await api.put(`/recursos/${id}`, {
    headers: {
      empresaid: empresaId,
    },  
    body: {
      recNome: dados.recNome,
      recTipo: dados.recTipo,
      recAtivo: dados.recAtivo,
    }
  });
}

// =======================
// EXCLUIR
// =======================

export async function excluirRecurso( id: number): Promise<void> {

  await api.delete(`/recursos/${id}`);
}