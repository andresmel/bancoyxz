
export const onlyNumbers = (value: string): string => {
  return value.replace(/[^0-9]/g, '');
};


export const isPositiveNumber = (value: number): boolean => {
  return value > 0;
};


