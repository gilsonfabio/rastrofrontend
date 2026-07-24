import { api } from "@/server/api";


// =======================
// Tipos
// =======================

export interface Empresa {
  empId: number;
  empNome: string;
}

// Dados enviados no formulário

export interface EmpresaFormData {
  empNome: string;
}

// Resposta padrão da API

export interface ApiResponse<T>{

  data?: T;

  message?: string;

  error?: string;

}

// =======================
// LISTAR
// =======================

export async function listarEmpresas()
: Promise<Empresa[]> {

  const response =
    await api.get<Empresa[]>(
      "/empresas"
    );

  return response.data;

}

// =======================
// CRIAR
// =======================

export async function criarEmpresa(
  dados: EmpresaFormData

)
: Promise<Empresa> {


  const response =
    await api.post<Empresa>(

      "/newempresa",
      {
        descricao:
          dados.empNome
      }
    );

  return response.data;

}

// =======================
// BUSCAR POR ID
// =======================

export async function buscarEmpresa(

  id:number
)
: Promise<Empresa>{


  const response =
    await api.get<Empresa>(

      `/empresas/${id}`

    );


  return response.data;

}

// =======================
// ATUALIZAR
// =======================

export async function atualizarEmpresa(

  id:number,
  dados:EmpresaFormData

)
: Promise<void>{
  
  await api.put(
    `/empresas/${id}`,
    {
      espNome:
        dados.empNome
    }

  );
}

// =======================
// EXCLUIR
// =======================

export async function excluirEmpresa(

  id:number
)
: Promise<void>{

  await api.delete(

    `/empresas/${id}`

  );

}