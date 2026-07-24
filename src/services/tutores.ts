import { api } from "@/server/api";

// =======================
// Tipos
// =======================

export interface Tutor {
  tutId: number;
  tutEmpId: number;
  tutNome: string;
  tutCpf: string;
  tutNascimento: string;
  tutEmail: string;
  tutEndereco: string;
  tutNumero: string;
  tutComplemento: string;
  tutBairro: number;
  tutCidade: number;
  tutCep: string;
  tutUf: string;
  tutCelular: string;
  tutPassword: string;
  tutStatus: string;

  // Opcional (caso o backend faça JOIN)
  empresa?: {
    empId: number;
    empCnpj: string;
    empNome: string;
  };
  bairro?: {
    baiId: number;
    baiNome: string;
  };
  cidade?: {
    cidId: number;
    cidNome: string;
  }
}

export interface TutorFormData {
  tutNome: string;
  tutCpf: string;
  tutNascimento: string;
  tutEmail: string;
  tutEndereco: string;
  tutNumero: string;
  tutComplemento: string;
  tutBairro: number;
  tutCidade: number;
  tutCep: string;
  tutUf: string;
  tutCelular: string;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

// =======================
// LISTAR
// =======================
export async function listarTutores(empresaId: number): Promise<Tutor[]> {
  const response = await api.get<Tutor[]>("/tutores", {
    headers: {
      empresaid: empresaId,
    },
  });

  return response.data;
}

// =======================
// BUSCAR POR ID
// =======================

export async function buscarTutor(
  empresaId: number,
  id: number
): Promise<Tutor> {
  const response = await api.get<Tutor>(`/tutores/${id}`, {
    headers: {
      empresaid: empresaId,
    }  
  });

  return response.data;
}

// =======================
// CRIAR
// =======================

export async function criarTutor(
  empresaId: number,
  dados: TutorFormData
): Promise<Tutor> {

  const response = await api.post<Tutor>("/tutores", {
    headers: {
      empresaid: empresaId,
    },  
    body: {
      tutNome: dados.tutNome,
      tutCpf: dados.tutCpf, 
      tutNascimento: dados.tutNascimento, 
      tutEmail: dados.tutEmail, 
      tutEndereco: dados.tutEndereco, 
      tutNumero: dados.tutNumero, 
      tutComplemento: dados.tutComplemento, 
      tutBairro: dados.tutBairro, 
      tutCidade: dados.tutCidade, 
      tutCep: dados.tutCep, 
      tutUf: dados.tutUf, 
      tutCelular: dados.tutCelular, 
    }
  });

  return response.data;
}

// =======================
// ATUALIZAR
// =======================

export async function atualizarTutor(
  empresaId: number,
  id: number,
  dados: TutorFormData
): Promise<void> {

  await api.put(`/tutores/${id}`, {
    headers: {
      empresaid: empresaId,
    },  
    body: {
      tutNome: dados.tutNome,
      tutCpf: dados.tutCpf, 
      tutNascimento: dados.tutNascimento, 
      tutEmail: dados.tutEmail, 
      tutEndereco: dados.tutEndereco, 
      tutNumero: dados.tutNumero, 
      tutComplemento: dados.tutComplemento, 
      tutBairro: dados.tutBairro, 
      tutCidade: dados.tutCidade, 
      tutCep: dados.tutCep, 
      tutUf: dados.tutUf, 
      tutCelular: dados.tutCelular, 
    }
  });
}

// =======================
// EXCLUIR
// =======================

export async function excluirTutor(
  id: number
): Promise<void> {

  await api.delete(`/tutores/${id}`);
}