const RecintosZoo = require('./src/recintos-zoo.js'); 

describe('Testes para a função analisaRecintos da classe RecintosZoo', () => {
  let zoo;

  // Inicializa a classe RecintosZoo antes de cada teste
  beforeEach(() => {
    zoo = new RecintosZoo();
  });

  /**
   * Teste 1: Deve alocar corretamente um animal em um recinto que suporta seu bioma.
   * Verifica se um animal cujo bioma corresponde ao recinto é alocado corretamente.
   */
  test('Deve alocar corretamente um animal em um recinto que suporta seu bioma', () => {
    const recintos = [{ nome: 'Savana', bioma: 'savana', capacidade: 5 }];
    const animais = [{ nome: 'Leão', bioma: 'savana' }];
    const resultado = zoo.analisaRecintos(recintos, animais);
    expect(resultado['Savana'].length).toBe(1);
    expect(resultado['Savana'][0].nome).toBe('Leão');
  });

  /**
   * Teste 2: Deve retornar um recinto vazio se nenhum animal puder ser alocado.
   * Valida que nenhum animal é alocado quando seus biomas não correspondem aos dos recintos.
   */
  test('Deve retornar um recinto vazio se nenhum animal puder ser alocado', () => {
    const recintos = [{ nome: 'Gelo', bioma: 'polar', capacidade: 3 }];
    const animais = [{ nome: 'Girafa', bioma: 'savana' }];
    const resultado = zoo.analisaRecintos(recintos, animais);
    expect(resultado['Gelo'].length).toBe(0);
  });

  /**
   * Teste 3: Deve alocar vários animais no mesmo recinto quando houver capacidade.
   * Verifica se múltiplos animais são alocados no mesmo recinto, respeitando a capacidade.
   */
  test('Deve alocar vários animais no mesmo recinto quando houver capacidade', () => {
    const recintos = [{ nome: 'Floresta', bioma: 'floresta', capacidade: 3 }];
    const animais = [
      { nome: 'Macaco', bioma: 'floresta' },
      { nome: 'Papagaio', bioma: 'floresta' },
      { nome: 'Tucano', bioma: 'floresta' }
    ];
    const resultado = zoo.analisaRecintos(recintos, animais);
    expect(resultado['Floresta'].length).toBe(3);
  });

  /**
   * Teste 4: Deve alocar animais em diferentes recintos se seus biomas forem compatíveis.
   * Verifica se animais de biomas diferentes são alocados nos respectivos recintos.
   */
  test('Deve alocar animais em diferentes recintos se seus biomas forem compatíveis', () => {
    const recintos = [
      { nome: 'Deserto', bioma: 'deserto', capacidade: 2 },
      { nome: 'Savana', bioma: 'savana', capacidade: 2 }
    ];
    const animais = [
      { nome: 'Camelo', bioma: 'deserto' },
      { nome: 'Leão', bioma: 'savana' }
    ];
    const resultado = zoo.analisaRecintos(recintos, animais);
    expect(resultado['Deserto'].length).toBe(1);
    expect(resultado['Savana'].length).toBe(1);
  });

  /**
   * Teste 5: Deve evitar alocar mais animais do que a capacidade do recinto permite.
   * Valida que o método não aloca mais animais do que a capacidade máxima do recinto.
   */
  test('Deve evitar alocar mais animais do que a capacidade do recinto permite', () => {
    const recintos = [{ nome: 'Pantanal', bioma: 'pantanal', capacidade: 2 }];
    const animais = [
      { nome: 'Jacaré', bioma: 'pantanal' },
      { nome: 'Capivara', bioma: 'pantanal' },
      { nome: 'Tuiuiu', bioma: 'pantanal' }
    ];
    const resultado = zoo.analisaRecintos(recintos, animais);
    expect(resultado['Pantanal'].length).toBe(2);
  });

  /**
   * Teste 6: Deve retornar uma lista vazia quando não houver recintos.
   * Verifica se o método retorna uma lista vazia quando não existem recintos disponíveis.
   */
  test('Deve retornar uma lista vazia quando não houver recintos', () => {
    const recintos = [];
    const animais = [{ nome: 'Tigre', bioma: 'floresta' }];
    const resultado = zoo.analisaRecintos(recintos, animais);
    expect(Object.keys(resultado).length).toBe(0);
  });

  /**
   * Teste 7: Deve retornar uma lista vazia quando não houver animais.
   * Verifica se o método retorna um recinto vazio quando não há animais a serem alocados.
   */
  test('Deve retornar uma lista vazia quando não houver animais', () => {
    const recintos = [{ nome: 'Savana', bioma: 'savana', capacidade: 3 }];
    const animais = [];
    const resultado = zoo.analisaRecintos(recintos, animais);
    expect(resultado['Savana'].length).toBe(0);
  });

  /**
   * Teste 8: Deve priorizar recintos com maior capacidade quando possível.
   * Verifica se o método prioriza recintos com maior capacidade quando aloca animais.
   */
  test('Deve priorizar recintos com maior capacidade quando possível', () => {
    const recintos = [
      { nome: 'Floresta Pequena', bioma: 'floresta', capacidade: 1 },
      { nome: 'Floresta Grande', bioma: 'floresta', capacidade: 3 }
    ];
    const animais = [{ nome: 'Macaco', bioma: 'floresta' }];
    const resultado = zoo.analisaRecintos(recintos, animais);
    expect(resultado['Floresta Grande'].length).toBe(1);
    expect(resultado['Floresta Pequena'].length).toBe(0);
  });

  /**
   * Teste 9: Deve alocar animais corretamente em recintos com capacidade exata.
   * Verifica se o método aloca corretamente animais em recintos cuja capacidade é exata para o número de animais.
   */
  test('Deve alocar animais corretamente em recintos com capacidade exata para o número de animais', () => {
    const recintos = [{ nome: 'Deserto', bioma: 'deserto', capacidade: 2 }];
    const animais = [
      { nome: 'Lagarto', bioma: 'deserto' },
      { nome: 'Escorpião', bioma: 'deserto' }
    ];
    const resultado = zoo.analisaRecintos(recintos, animais);
    expect(resultado['Deserto'].length).toBe(2);
  });

  /**
   * Teste 10: Deve ignorar animais cujos biomas não correspondem a nenhum recinto.
   * Verifica se o método ignora animais cujos biomas não têm recintos compatíveis.
   */
  test('Deve ignorar animais cujos biomas não correspondem a nenhum recinto', () => {
    const recintos = [{ nome: 'Floresta', bioma: 'floresta', capacidade: 2 }];
    const animais = [
      { nome: 'Onça', bioma: 'floresta' },
      { nome: 'Canguru', bioma: 'deserto' }
    ];
    const resultado = zoo.analisaRecintos(recintos, animais);
    expect(resultado['Floresta'].length).toBe(1);
  });
});
