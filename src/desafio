class RecintosZoo {
    constructor() {
      
      this.recintos = [
        { numero: 1, bioma: "savana", tamanho: 10, animais: [{ especie: "MACACO", quantidade: 3 }] },
        { numero: 2, bioma: "floresta", tamanho: 5, animais: [] },
        { numero: 3, bioma: "savana e rio", tamanho: 7, animais: [{ especie: "GAZELA", quantidade: 1 }] },
        { numero: 4, bioma: "rio", tamanho: 8, animais: [] },
        { numero: 5, bioma: "savana", tamanho: 9, animais: [{ especie: "LEAO", quantidade: 1 }] }
      ];
  
      
      this.animais = {
        "LEAO": { tamanho: 3, biomas: ["savana"], carnivoro: true },
        "LEOPARDO": { tamanho: 2, biomas: ["savana"], carnivoro: true },
        "CROCODILO": { tamanho: 3, biomas: ["rio"], carnivoro: true },
        "MACACO": { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
        "GAZELA": { tamanho: 2, biomas: ["savana"], carnivoro: false },
        "HIPOPOTAMO": { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false }
      };
    }
  
    analisaRecintos(animal, quantidade) {
      
      if (!this.animais[animal]) {
        return { erro: "Animal inválido" };
      }
  
      if (quantidade <= 0 || !Number.isInteger(quantidade)) {
        return { erro: "Quantidade inválida" };
      }
  
      const recintosViaveis = [];
  
      
      this.recintos.forEach(recinto => {
        if (
          this.verificaBioma(recinto, animal) &&
          this.verificaEspaco(recinto, animal, quantidade) &&
          this.verificaConvivencia(recinto, animal)
        ) {
          const espacoLivre = this.calculaEspacoLivre(recinto, animal, quantidade);
          recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`);
        }
      });
  
      if (recintosViaveis.length === 0) {
        return { erro: "Não há recinto viável" };
      }
  
      return { recintosViaveis };
    }
  
    verificaBioma(recinto, animal) {
      const biomasAnimal = this.animais[animal].biomas;
      return biomasAnimal.includes(recinto.bioma) || (recinto.bioma === "savana e rio" && biomasAnimal.includes("savana") && biomasAnimal.includes("rio"));
    }
  
    verificaEspaco(recinto, animal, quantidade) {
      const espacoNecessario = this.animais[animal].tamanho * quantidade;
  
      let espacoOcupado = recinto.animais.reduce((total, animalAtual) => {
        const tamanhoAnimal = this.animais[animalAtual.especie].tamanho;
        return total + tamanhoAnimal * animalAtual.quantidade;
      }, 0);
  
      if (recinto.animais.length > 0 && !recinto.animais.some(animalAtual => animalAtual.especie === animal)) {
        espacoOcupado += 1;
      }
  
      return espacoOcupado + espacoNecessario <= recinto.tamanho;
    }
  
    verificaConvivencia(recinto, animal) {
      const animalNovo = this.animais[animal];
  
      if (animalNovo.carnivoro) {
        return recinto.animais.length === 0 || (recinto.animais.length === 1 && recinto.animais[0].especie === animal);
      }
  
      if (animal === "HIPOPOTAMO" && recinto.bioma !== "savana e rio" && recinto.animais.length > 0) {
        return false;
      }
  
      if (animal === "MACACO" && recinto.animais.length === 0) {
        return false;
      }
  
      return true;
    }
  
    calculaEspacoLivre(recinto, animal, quantidade) {
      const espacoOcupado = recinto.animais.reduce((total, animalAtual) => {
        const tamanhoAnimal = this.animais[animalAtual.especie].tamanho;
        return total + tamanhoAnimal * animalAtual.quantidade;
      }, 0);
  
      const espacoNecessario = this.animais[animal].tamanho * quantidade;
  
      const espacoExtra = recinto.animais.length > 0 && !recinto.animais.some(animalAtual => animalAtual.especie === animal) ? 1 : 0;
  
      return recinto.tamanho - (espacoOcupado + espacoNecessario + espacoExtra);
    }
  }
  
  export { RecintosZoo as RecintosZoo };
