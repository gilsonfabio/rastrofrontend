import { api } from "@/server/api";

// =======================
// Tipos
// =======================

export interface Servico {
  serId: number;
  serEmpId: number;
  serNome: string;
  serTipo: string;
  serDuracao: number;
  serValor: number;
  serCorAgenda: string;
  serAtivo: number;

  // Opcional (caso o backend faça JOIN)
  empresa?: {
    empId: number;
    empCnpj: string;
    empNome: string;
  };  
}

export interface ServicoFormData {
  serNome: string;
  serTipo: string;
  serDuracao: number;
  serValor: number;
  serCorAgenda: string;
  serAtivo: number;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

// =======================
// LISTAR
// =======================
export async function listarServicos(empresaId: number): Promise<Servico[]> {
  const response = await api.get<Servico[]>("/servicos", {
    headers: {
      empresaid: empresaId,
    },
  });

  return response.data;
}

// =======================
// BUSCAR POR ID
// =======================

export async function buscarServico(
  empresaId: number,
  id: number
): Promise<Servico> {
  const response = await api.get<Servico>(`/servicos/${id}`, {
    headers: {
      empresaid: empresaId,
    }  
  });

  return response.data;
}

// =======================
// CRIAR
// =======================

export async function criarServico(
  empresaId: number,
  dados: ServicoFormData
): Promise<Servico> {

  const response = await api.post<Servico>("/servicos", {
    headers: {
      empresaid: empresaId,
    },  
    body: {
      serNome: dados.serNome,
      serTipo: dados.serTipo,
      serDuracao: dados.serDuracao,
      serValor: dados.serValor,
      serCorAgenda: dados.serCorAgenda,
      serAtivo: dados.serAtivo,
    }
  });

  return response.data;
}

// =======================
// ATUALIZAR
// =======================

export async function atualizarServico(
  empresaId: number,
  id: number,
  dados: ServicoFormData
): Promise<void> {

  await api.put(`/servicos/${id}`, {
    headers: {
      empresaid: empresaId,
    },  
    body: {
      serNome: dados.serNome,
      serTipo: dados.serTipo,
      serDuracao: dados.serDuracao,
      serValor: dados.serValor,
      serCorAgenda: dados.serCorAgenda,
      serAtivo: dados.serAtivo,
    }
  });
}

// =======================
// EXCLUIR
// =======================

export async function excluirServico( id: number): Promise<void> {

  await api.delete(`/servicos/${id}`);
}