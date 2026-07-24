import { api } from "@/server/api";


// =======================
// Tipos
// =======================

export interface Especie {

  espId: number;

  espNome: string;

}



// Dados enviados no formulário

export interface EspecieFormData {

  espNome: string;

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

export async function listarEspecies()
: Promise<Especie[]> {


  const response =
    await api.get<Especie[]>(
      "/especies"
    );


  return response.data;

}




// =======================
// CRIAR
// =======================

export async function criarEspecie(

  dados: EspecieFormData

)
: Promise<Especie> {


  const response =
    await api.post<Especie>(

      "/newspecie",

      {

        descricao:
          dados.espNome

      }

    );



  return response.data;

}




// =======================
// BUSCAR POR ID
// =======================

export async function buscarEspecie(

  id:number

)
: Promise<Especie>{


  const response =
    await api.get<Especie>(

      `/especies/${id}`

    );


  return response.data;

}




// =======================
// ATUALIZAR
// =======================

export async function atualizarEspecie(

  id:number,

  dados:EspecieFormData

)
: Promise<void>{


  await api.put(

    `/especies/${id}`,

    {

      espNome:
        dados.espNome

    }

  );


}





// =======================
// EXCLUIR
// =======================

export async function excluirEspecie(

  id:number

)
: Promise<void>{


  await api.delete(

    `/especies/${id}`

  );


}