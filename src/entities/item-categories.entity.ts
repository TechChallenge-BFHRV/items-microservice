export const ItemCategory: {
  LANCHE: 'LANCHE';
  ACOMPANHAMENTO: 'ACOMPANHAMENTO';
  BEBIDA: 'BEBIDA';
  SOBREMESA: 'SOBREMESA';
} = {
  LANCHE: 'LANCHE',
  ACOMPANHAMENTO: 'ACOMPANHAMENTO',
  BEBIDA: 'BEBIDA',
  SOBREMESA: 'SOBREMESA',
};

export type ItemCategory = (typeof ItemCategory)[keyof typeof ItemCategory];
