export const formatValue = (value: string | number): string => {
    if (value === "unknown") {
      return "$ 20.000";
    }
    return `$ ${Number(value).toLocaleString()}`;
  };