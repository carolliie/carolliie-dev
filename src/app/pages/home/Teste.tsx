"use client";
import { useState } from "react";

type Variable = {
    title:string;
    values: number[];
    descriptions: {
        value:number;
        description: string;
    }[];
};

const variables: Variable[] = [
  {
    title: "Acessibilidade ao transporte",
    values: [1, 2, 3],
    descriptions: [
      { value: 1, description: "Caminhada confortável (5 min/ 400m)" },
      { value: 2, description: "Caminhada mediana (20 min/1,6km)" },
      { value: 3, description: "Caminhada desconfortável (Acima de 1,7km)" }
    ]
  },
  {
    title: "Caminhabilidade",
    values: [1, 2, 3, 4],
    descriptions: [
      { value: 1, description: "Os percursos diários não demandam de automóveis (90-100)" },
      { value: 2, description: "Maioria dos percursos podem ser vencidos a pé (70-89)" },
      { value: 3, description: "Alguns percursos podem ser vencidos a pé (50-69)" },
      { value: 4, description: "Dependente de carro em quase todos os percursos (25-49)" }
    ]
  }
  // Adicione as demais variáveis aqui
];

export default function SustainabilityForm() {
  const [formData, setFormData] = useState<Record<string, number>>({});
  const [progress, setProgress] = useState(0);

  const handleChange = (variable:string, value:number) => {
    setFormData((prev) => ({ ...prev, [variable]: value }));
    setProgress(Object.keys(formData).length + 1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-black text-2xl font-semibold text-center mb-4">
        Análise de Sustentabilidade do Bairro
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Responda as perguntas abaixo para calcular o índice de sustentabilidade do seu bairro.
      </p>

      {/* linha de progresso */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
        <div
          className="bg-green-500 h-3 rounded-full transition-all"
          style={{ width: `${(progress / variables.length) * 100}%` }}
        ></div>
      </div>

      {/* opções/variaveis */}
      {variables.map((variable, index) => (
        <div key={index} className="mb-6 p-4 bg-gray-100 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-black">{variable.title}</h3>
          <div className="mt-3 flex flex-col space-y-2">
            {variable.descriptions.map((desc) => (
              <label
                key={desc.value}
                className={`text-black flex items-center p-3 border rounded-md cursor-pointer transition-all ${
                  formData[variable.title] === desc.value
                    ? "border-green-500 bg-green-100"
                    : "border-gray-300 hover:border-green-400"
                }`}
              >
                <input
                  type="radio"
                  name={variable.title}
                  value={desc.value}
                  checked={formData[variable.title] === desc.value}
                  onChange={() => handleChange(variable.title, desc.value)}
                  className="mr-3"
                />
                {desc.description}
              </label>
            ))}
          </div>
        </div>
      ))}

      {/* botao pra enviar */}
      <button
        className="w-full bg-green-500 text-white py-2 px-4 rounded-md mt-6 hover:bg-green-600 transition"
        onClick={() => alert("Formulário enviado com sucesso!")}
      >
        Enviar Respostas
      </button>
    </div>
  );
}
