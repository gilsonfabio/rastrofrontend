import { api } from "@/server/api";

// =======================
// Tipos
// =======================

export interface Pet {
  petId: number;
  petNome: string;
  petTutId: number;
  petEmpId: number;
  petEspId: number;
  petRacId: number;
  petCor: string;
  petPorte: string;
  petNascimento: string;
  petCaracter: string;
  petSinPatinhas: string;
  petStatus: string;

  // Opcional (caso o backend faça JOIN)
  empresa?: {
    empId: number;
    empCnpj: string;
    empNome: string;
  };
  tutor?: {
    tutId: number;
    tutNome: string;
  };
  especie?: {
    espId: number;
    espNome: string;
  }
  raca?: {
    racId: number;
    racNome: string;
  }
}

export interface PetFormData {
  petNome: string;
  petTutId: number;
  petEspId: number;
  petRacId: number;
  petCor: string;
  petPorte: string;
  petNascimento: string;
  petCaracter: string;
  petSinPatinhas: string;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

// =======================
// LISTAR
// =======================
export async function listarPets(empresaId: number): Promise<Pet[]> {
  const response = await api.get<Pet[]>("/pets", {
    headers: {
      empresaid: empresaId,
    },
  });

  return response.data;
}

// =======================
// BUSCAR POR ID
// =======================

export async function buscarPet(
  empresaId: number,
  id: number
): Promise<Pet> {
  const response = await api.get<Pet>(`/pets/${id}`, {
    headers: {
      empresaid: empresaId,
    }  
  });

  return response.data;
}

// =======================
// CRIAR
// =======================

export async function criarPet(
  empresaId: number,
  dados: PetFormData
): Promise<Pet> {

  const response = await api.post<Pet>("/pets", {
    headers: {
      empresaid: empresaId,
    },  
    body: {
      petNome: dados.petNome,
      petTutId: dados.petTutId,
      petEspId: dados.petEspId,
      petRacId: dados.petRacId,
      petCor: dados.petCor,
      petPorte: dados.petPorte,
      petNascimento: dados.petNascimento,
      petCaracter: dados.petCaracter,
      petSinPatinhas: dados.petSinPatinhas,      
    }
  });

  return response.data;
}

// =======================
// ATUALIZAR
// =======================

export async function atualizarPet(
  empresaId: number,
  id: number,
  dados: PetFormData
): Promise<void> {

  await api.put(`/pets/${id}`, {
    headers: {
      empresaid: empresaId,
    },  
    body: {
      petNome: dados.petNome,
      petTutId: dados.petTutId,
      petEspId: dados.petEspId,
      petRacId: dados.petRacId,
      petCor: dados.petCor,
      petPorte: dados.petPorte,
      petNascimento: dados.petNascimento,
      petCaracter: dados.petCaracter,
      petSinPatinhas: dados.petSinPatinhas,       
    }
  });
}

// =======================
// EXCLUIR
// =======================

export async function excluirPet(
  id: number
): Promise<void> {

  await api.delete(`/pets/${id}`);
}